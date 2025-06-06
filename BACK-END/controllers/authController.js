const asyncHandler = require('../middleware/asyncHandler');
const models = require('../models/index');
const User = models.User;
const axios = require('axios');
const createResToken = require('../services/authService');
const { sendLinkResetPassword, verificationRegistEmail } = require('../services/emailService');
require('dotenv').config();

const verifyEmailRegist = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ status: 'failed', message: 'Request body kosong' });
  }
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        status: 'failed',
        message: 'Token tidak ditemukan',
      });
    }

    const user = await User.findOne({ token_verify: token });

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Link tidak valid',
      });
    }

    if (user.token_expires < Date.now()) {
      return res.status(400).json({
        status: 'failed',
        message: 'Link kadaluarsa',
      });
    }

    user.is_verified = true;
    user.token_verify = undefined;
    user.token_expires = undefined;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Email berhasil diverifikasi',
      data: {
        email: user.email,
      },
    });
  } catch (error) {
    next(error); // lempar error ke error-handling middleware
  }
});

const resendEmailVerification = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ status: 'failed', message: 'Request body kosong' });
  }
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        status: 'failed',
        message: 'Username, email, dan password wajib diisi',
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(401).json({ status: 'failed', message: 'User tidak ditemukan' });

    // Jika user sudah terdaftar dan sudah terverifikasi
    if (existingUser && existingUser.is_verified) {
      return res.status(400).json({
        status: 'failed',
        message: 'User sudah terdaftar dan terverifikasi',
      });
    }
    if (existingUser && !existingUser.is_verified) {
      await verificationRegistEmail(email, existingUser.username);

      return res.status(201).json({
        status: 'success',
        message: 'User created, please verify your email',
        data: { email },
      });
    }
  } catch (error) {
    next(error);
  }
});
const createSession = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ status: 'failed', message: 'Request body kosong' });
  }
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ status: 'failed', message: 'Email dan password harus diisi' });
  }
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(404).json({
        status: 'failed',
        message: 'User tidak ditemukan',
      });
    }

    if (!userData.is_verified) {
      return res.status(401).json({
        status: 'failed',
        message: 'Email belum diverifikasi',
      });
    }
    // jika mendaftar dengan oauth harus login dengan cara yang sama
    if (userData.is_oauth) {
      return res.status(401).json({
        status: 'failed',
        message: 'Sepertinya anda menggunakan metode login yang salah',
      });
    }
    // validasi password
    const isMatch = await userData.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ status: 'failed', message: 'Password salah' });
    }
    await User.updateOne({ _id: userData._id }, { last_login: new Date() });

    const cookie = createResToken(userData);
    await res.cookie(cookie.name, cookie.token, cookie.cookieOption);

    res.json({ status: 'success', message: 'Berhasil login' });
  } catch (err) {
    next(err);
  }
});

const deleteSession = asyncHandler(async (req, res, next) => {
  console.log('log out handler running');
  try {
    res.cookie('session', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/',
    });
    console.log('log out berhasil');
    res.status(200).json({
      status: 'success',
      message: 'Logout berhasil',
    });
  } catch (err) {
    next(err);
  }
});

/// GOOGLE OAUTH

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const InitiatesGoogleFlow = (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
};

const googleCallbackHandler = asyncHandler(async (req, res) => {
  const { code } = req.query;
  const urlFrontEnd = process.env.FRONT_END_URL;

  let status = 'failed';
  let message = '';

  try {
    if (!code) throw new Error('Kode otorisasi tidak ditemukan');
    if (!urlFrontEnd) throw new Error('Configuration error: FRONT_END_URL is not defined');

    const { data: tokenData } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token } = tokenData;

    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    let userData = await User.findOne({ email: profile.email });

    // Kalau user sudah ada tapi bukan dari Google OAuth, langsung tolak
    if (userData && !userData.is_oauth) {
      throw new Error('Akun ini tidak menggunakan metode login Google');
    }

    // Buat userData baru kalau belum ada
    if (!userData) {
      userData = await User.create({
        username: profile.name,
        email: profile.email,
        is_verified: profile.verified_email,
        is_oauth: true,
        picture: profile.picture,
      });
    }

    // Set cookie token
    const cookie = createResToken(userData);
    res.cookie(cookie.name, cookie.token, cookie.cookieOption);

    status = 'success';
    message = 'Berhasil login';
  } catch (err) {
    message = err.message || 'Terjadi kesalahan saat login menggunakan Google';
  }

  const redirectUrl = `${urlFrontEnd}/auth/login?provider=google&status=${status}&message=${encodeURIComponent(message)}`;
  res.redirect(redirectUrl);
});

const resetPasswordRequest = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ status: 'failed', message: 'Request body kosong' });
  }
  const email = req.body.email;
  if (!email) return res.status(400).json({ status: 'failed', message: 'email wajib diisi' });
  try {
    const userData = await User.findOne({ email });
    if (!userData || !userData.is_verified)
      return res.status(404).json({ status: 'failed', message: 'user not found' });

    await sendLinkResetPassword(email, userData.username);
    return res.status(200).json({ status: 'success', message: 'link reset password telah dikirim ke email' });
  } catch (err) {
    next(err);
  }
});

const confirmResetAndUpdatePassword = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ status: 'failed', message: 'Request body kosong' });
  }
  const token = req.body.token;
  const newPassword = req.body.newPassword;
  if (!token || !newPassword)
    return res.status(400).json({ status: 'failed', message: 'token atau password baru harus di isi' });

  try {
    const userData = await User.findOne({ token_verify: token });

    if (!userData || userData.token_expires < Date.now()) {
      return res.status(401).json({ status: 'failed', message: 'link salah atau kadaluarsa' });
    } else {
      userData.password = newPassword;
      userData.token_verify = undefined;
      userData.token_expires = undefined;
      await userData.save();

      return res.status(200).json({ status: 'success', message: 'password berhasil di ganti' });
    }
  } catch (err) {
    next(err);
  }
});

const validateTokenResetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ status: 'failed', message: 'Request body kosong' });
  }
  const token = req.body.token;
  if (!token) return res.status(400).json({ status: 'failed', message: 'token harus di isi' });

  try {
    const userData = await User.findOne({ token_verify: token });

    if (!userData || userData.token_expires < Date.now()) {
      return res.status(401).json({ status: 'failed', message: 'link salah atau kadaluarsa' });
    } else {
      return res
        .status(200)
        .json({ status: 'success', message: 'berhasil validasi token, anda dapat mebuat password baru sekarang' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = {
  verifyEmailRegist,
  createSession,
  deleteSession,
  InitiatesGoogleFlow,
  googleCallbackHandler,
  resetPasswordRequest,
  confirmResetAndUpdatePassword,
  validateTokenResetPassword,
  resendEmailVerification,
};
