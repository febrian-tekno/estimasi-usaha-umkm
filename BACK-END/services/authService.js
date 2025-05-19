const jwt = require('jsonwebtoken');

// FUNCTION create token jwt berdasarkan id
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '14d',
    algorithm: 'HS256',
  });
};

// function create cookie jwt
const createResToken = (user) => {
  try {
    const token = signToken(user._id);
    if (!token) {
      throw new Error('Token tidak dibuat!');
    }

    const cookieOption = {
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 hari
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
    };
    const cookie = { name: 'session', token, cookieOption };
    return cookie;
  } catch (err) {
    throw new Error(err.message || 'internal server error gagal membuat token atau mengatur cookie');
  }
};

module.exports = createResToken;
