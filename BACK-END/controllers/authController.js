const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { sendOTP, verifyOTP } = require("../services/otpServices");

require("dotenv").config();

// FUNCTION create token jwt berdasarkan id
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
    algorithm: "HS256",
  });
};

// function create cookie jwt
const createResToken = (user, statusCode, res) => {
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

    res.cookie("jwt", token, cookieOption);
    console.log("✅ token jwt dan cookie berhasil di kirim");
  } catch (error) {
    console.error(
      "❌ Error saat membuat token atau mengatur cookie:",
      error.message
    );
    res.status(500).json({
      status: "fail",
      message: "Gagal membuat token. Internal Server Error",
    });
  }
};
