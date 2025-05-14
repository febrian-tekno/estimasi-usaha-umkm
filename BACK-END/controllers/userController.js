const asyncHandler = require("../middleware/asyncHandler");
const models = require("../models/index");
const User = models.User;
const { verificationRegistEmail } = require("../services/verificationEmail");

// POST register {username, email, password}
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Username, email, dan password wajib diisi",
    });
  }

  const existingUser = await User.findOne({ email });

  // Jika user sudah terdaftar dan sudah terverifikasi
  if (existingUser && existingUser.is_verified) {
    return res.status(400).json({
      status: "failed",
      message: "User sudah terdaftar dan terverifikasi",
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
      status: "success",
      message: "User created, please verify your email",
      data: { email },
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Gagal mengirim verifikasi email, coba lagi nanti",
      error: error.message,
    });
  }
});

module.exports = { registerUser };
