const asyncHandler = require("../middleware/asyncHandler");
const models = require("../models/index");
const User = models.User;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// FUNCTION create token jwt berdasarkan id
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
    algorithm: "HS256",
  });
};

// function create cookie jwt
const createResToken = (user) => {
  try {
    const token = signToken(user._id);
    if (!token) {
      throw new Error("Token tidak dibuat!");
    }

    const cookieOption = {
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 hari
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };
    const cookie = { name: "session", token, cookieOption };
    return cookie;
  } catch (error) {
    console.error(
      "❌ Error saat membuat token atau mengatur cookie:",
      error.message
    );
    throw new Error(
      "internal server error gagal membuat token atau mengatur cookie"
    );
  }
};

const verifyEmailRegist = asyncHandler(async (req, res) => {
  const frontEndUrl = process.env.FRONT_END_URL;
  const token = req.query.key;
  const email = req.query.login;
  let status = "failed";
  let message = "";

  if (!token || !email) {
    message = "token atau email tidak ditemukan";
    console.log("Error: Token atau email tidak ditemukan");
  } else {
    const user = await User.findOne({ email });

    if (!user) {
      message = "user tidak ditemukan";
    } else {
      if (user.token_verify === token && user.token_expires > Date.now()) {
        await User.updateOne(
          { email },
          {
            $set: { is_verified: true },
            $unset: { token_verify: "", token_expires: "" },
          }
        );

        status = "success";
        message = "email berhasil di verifikasi";
        console.log("Success: Email berhasil diverifikasi");
      } else {
        message = "link kadaluarsa atau salah";
        console.log("Error: Link kadaluarsa atau salah");
      }
    }
  }

  const redirectUrl = `${frontEndUrl}/email-verified?status=${status}&message=${encodeURIComponent(message)}`;
  console.log("Redirecting to:", redirectUrl);

  res.redirect(redirectUrl);
});

const createSession = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email dan password harus diisi" });
    }
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(404).json({
        status: "failed",
        message: "User tidak ditemukan",
      });
    }

    if (!userData.is_verified) {
      return res.status(401).json({
        status: "failed",
        message: "Email belum diverifikasi",
      });
    }
    // jika mendaftar dengan oauth harus login dengan cara yang sama
    if (userData.is_oauth) {
      return res.status(401).json({
        status: "failed",
        message: "Sepertinya anda menggunakan metode login yang salah",
      });
    }
    // validasi password
    const isMatch = await userData.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "failed", message: "Password salah" });
    }
    const cookie = createResToken(userData);
    res.cookie(cookie.name, cookie.token, cookie.cookieOption);

    console.log(`${userData.name} berhasil login.`);
    res.json({ status: "success", message: "Berhasil login" });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "internal server error",
      error: err.message,
    });
  }
});
module.exports = { verifyEmailRegist, createSession };
