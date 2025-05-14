const express = require("express");
const {
  verifyEmailRegist,
  createSession,
} = require("../controllers/authController");
const router = express.Router();

// verifikasi email
router.get("/verify-email", verifyEmailRegist);

// user login
router.post("/sessions", createSession);

module.exports = router;
