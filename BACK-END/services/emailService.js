const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const models = require('../models/index');
const User = models.User;
require('dotenv').config();

const emailSender = process.env.EMAIL;
const emailPass = process.env.EMAIL_PASS;
const frontendUrl = process.env.FRONT_END_URL;

// Generate verification link
const generateLinkVerification = (token) => `${frontendUrl}/auth/email-verify?token=${token}`;

// Generate reset password link
const generateLinkResetPassword = (token) => `${frontendUrl}/auth/reset-password?token=${token}`;

// Nodemailer transporter config
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailSender,
    pass: emailPass,
  },
});

// Read and render email HTML template
const getHtmlTemplate = (link, username, action, expiresAt = '24 jam') => {
  const templatePath = path.join(__dirname, 'template', 'template-email.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error('Email template not found');
  }

  let htmlContent = fs.readFileSync(templatePath, 'utf8');
  htmlContent = htmlContent.replace(/{{link}}/g, link);
  htmlContent = htmlContent.replace(/{{username}}/g, username);
  htmlContent = htmlContent.replace(/{{action}}/g, action);
  htmlContent = htmlContent.replace(/{{expiresAt}}/g, expiresAt);

  return htmlContent;
};

// Send verification email
const verificationRegistEmail = async (email, username) => {
  try {
    const token = await generateToken(email, 24 * 60 * 60 * 1000);
    const link = generateLinkVerification(token);
    const html = getHtmlTemplate(link, username, 'Registrasi Account');

    await transporter.sendMail({
      from: `"JualApa" <${emailSender}>`,
      to: email,
      subject: 'Verifikasi Email Registrasi Akun',
      html,
    });

    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.error('Failed to send verification email:', err.message);
    throw new Error(`Failed to send email: ${err.message}`);
  }
};

// Send reset password email
const sendLinkResetPassword = async (email, username) => {
  try {
    const token = await generateToken(email, 15 * 60 * 1000);
    const link = generateLinkResetPassword(token);
    const html = getHtmlTemplate(link, username, 'Reset Password', '15 menit');

    await transporter.sendMail({
      from: `"JualApa" <${emailSender}>`,
      to: email,
      subject: 'Reset Password Akun',
      html,
    });

    console.log(`Reset password email sent to ${email}`);
  } catch (err) {
    console.error('Failed to send reset password email:', err.message);
    throw new Error(`Failed to send email: ${err.message}`);
  }
};

// Generate secure token and store it on user
const generateToken = async (email, expiresInMs = 24 * 60 * 60 * 1000) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + expiresInMs);

  user.token_verify = token;
  user.token_expires = expires;
  await user.save();
  return token;
};

module.exports = {
  verificationRegistEmail,
  sendLinkResetPassword,
};
