const asyncHandler = require('../middleware/asyncHandler');
const models = require('../models/index');
const User = models.User;
const { verificationRegistEmail } = require('../services/verificationEmail');

// POST register {username, email, password}
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: 'failed',
      message: 'Username, email, dan password wajib diisi',
    });
  }

  const existingUser = await User.findOne({ email });

  // Jika user sudah terdaftar dan sudah terverifikasi
  if (existingUser && existingUser.is_verified) {
    return res.status(400).json({
      status: 'failed',
      message: 'User sudah terdaftar dan terverifikasi',
    });
  }

  try {
    let user;

    // Jika user sudah ada tapi belum verifikasi
    if (existingUser && !existingUser.is_verified) {
      user = existingUser;
      user.username = username;
      user.password = password;
    } else {
      // User baru
      user = new User({ username, email, password });
    }

    await user.save(); // update atau simpan baru
    await verificationRegistEmail(email, username);

    return res.status(201).json({
      status: 'success',
      message: 'User created, please verify your email',
      data: { email },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Gagal mengirim verifikasi email, coba lagi nanti',
      error: error.message,
    });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  // mengambil data user
  const user = await User.findById(req.user._id).select('_id username email picture');
  console.log(user);

  if (user) {
    res.status(200).json({
      status: 'success',
      message: 'berhasil mendapat data user',
      data: user,
    });
  } else {
    res.status(401).json({ status: 'failed', message: 'user not found' });
  }
});

const getAllUserHandler = asyncHandler(async (req, res) => {
  // Ambil query string untuk pagination dan filter
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // filter
  const filter = {};

  if (req.query.role) {
    filter.role = req.query.role;
  }

  if (req.query.is_verified !== undefined) {
    filter.is_verified = req.query.is_verified === 'true';
  }

  // data user sesuai filter dan pagination
  const users = await User.find(filter).skip(skip).limit(limit).select('-password');

  const totalUsers = await User.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    message: 'all user',
    currentPage: page,
    totalPages: Math.ceil(totalUsers / limit),
    totalUsers,
    results: users.length,
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ status: 'failed', message: 'User tidak ditemukan' });
    }

    res.json({ status: 'success', message: 'data user berhasil diambil', data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'failed', message: 'Terjadi kesalahan server', error: err.message });
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User tidak ditemukan',
      });
    }
    if (user && user.role === 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'akun dengan role admin tidak dapat dihapus. hubungi admin jika terdapat masalah.',
      });
    }

    // hapus user
    await user.deleteOne();

    // Hapus session
    res.cookie('session', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
    });

    res.status(200).json({
      status: 'success',
      message: `User ${user.name} berhasil dihapus`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error Terjadi kesalahan',
      error: error.message,
    });
  }
});

const updatePasswordHandler = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    console.log('id : ' + id);
    const { oldPassword, newPassword } = req.body;

    // cari user berdasarkan id
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ status: 'failed', message: 'User Not Found' });
    if (user && user.is_oauth)
      return res.status(403).json({
        status: 'failed',
        message: 'User login menggunakan google, tidak dapat mengupdate password',
      });

    // Cek apakah password lama benar
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ status: 'failed', message: 'Password lama salah' });

    // menyimpan password baru
    user.password = newPassword;
    await user.save();

    res.status(200).json({ status: 'success', message: 'Password berhasil diperbarui' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'failed', message: 'Terjadi kesalahan', error: err.message });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { username, bio } = req.body;
    const userId = req.user._id;

    if (username && username.length < 3) {
      return res.status(400).json({ status: 'failed', message: 'Username minimal 3 karakter' });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (bio !== undefined) updateData.bio = bio; // bio boleh kosong string juga

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select('_id username email bio');

    if (!updatedUser) {
      return res.status(404).json({ status: 'failed', message: 'User tidak ditemukan' });
    }

    res.json({ status: 'success', message: 'Profil berhasil diperbarui', data: updatedUser });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: 'Internal server error', error: err.message });
  }
});

module.exports = {
  registerUser,
  currentUser,
  getAllUserHandler,
  getUserById,
  deleteUserById,
  updatePasswordHandler,
  updateUserProfile,
};
