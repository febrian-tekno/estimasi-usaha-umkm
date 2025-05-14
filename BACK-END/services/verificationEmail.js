const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const models = require("../models/index");
const User = models.User;
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// example: https://yourapp.com/verify-email?action=verify&key=<TOKEN>&login=<EMAIL>

const emailHost = process.env.EMAIL;
const emailPass = process.env.EMAIL_PASS;
const host =
  process.env.NODE_ENV === "production" ? process.env.HOST : "api.localhost";
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;

const generateLinkVerification = (token, email) => {
  return `${host}:${port}/auth/verify-email?action=verify&key=${token}&login=${encodeURIComponent(email)}`;
};

// Konfigurasi transporter email (Nodemailer)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailHost,
    pass: emailPass,
  },
});

// ambil template dari file html
const getHtmlTemplate = (link, username, action) => {
  const templatePath = path.join(__dirname, "template", "template-email.html");
  console.log(templatePath);
  let htmlContent = fs.readFileSync(templatePath, "utf8");
  htmlContent = htmlContent.replace(/{{link}}/g, link);
  htmlContent = htmlContent.replace(/{{username}}/g, username);
  htmlContent = htmlContent.replace(/{{action}}/g, action);
  return htmlContent;
};

// mengirim verification link ke email user
const verificationRegistEmail = async (email, username) => {
  try {
    const token = await generateToken(email);
    const link = generateLinkVerification(token, email);
    const mailOptions = {
      from: `"JualApa" <${emailHost}>`,
      to: email,
      subject: `verifikasi email Registrasi Account`,
      html: getHtmlTemplate(link, username, "Registrasi Account"),
    };
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.log("failed to send email verification link");
    throw new Error(`Failed to send email: ${err.message}`);
  }
};

const generateToken = async (email) => {
  const token = uuidv4();
  const tokenExpires = new Date(Date.now() + 15 * 60 * 1000); // expired 15 menit
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  user.token_verify = token;
  user.token_expires = tokenExpires;
  await user.save();
  return token;
};

module.exports = { verificationRegistEmail };
