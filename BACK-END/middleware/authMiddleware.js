const jwt = require('jsonwebtoken');
const models = require('../models/index');
const asyncHandler = require('./asyncHandler');
const User = models.User;
const mongoose = require('mongoose');

const protectedMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.session;
  if (!token) {
    return res.status(401).json({ status: 'failed', message: 'No token Found, please log in' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('_id username email role');
    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'User not found. Please log in again.',
      });
    }
    req.user = user;
    console.log(req.user, req.user._id.toString());
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'You do not have permission',
    });
  }
});

// validasi akses spesifik user atau admin
const protectedUser = asyncHandler(async (req, res, next) => {
  const userIdFromParams = req.params.id;
  const currentUserId = req.user?._id?.toString();

  if (!req.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'User failed to authenticated ',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(userIdFromParams)) {
    return res.status(400).json({
      status: 'failed',
      message: 'ID tidak valid',
    });
  }

  const user = await User.findById(userIdFromParams);
  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: 'User tidak ditemukan',
    });
  }

  // Admin bisa akses semua user
  if (req.user.role === 'admin') {
    return next();
  }

  if (currentUserId !== userIdFromParams) {
    return res.status(403).json({
      status: 'failed',
      message: 'Forbidden, access denied for this user',
    });
  }

  next();
});

module.exports = { protectedMiddleware, isAdmin, protectedUser };
