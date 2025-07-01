import { User } from "../../Schemas/user.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../uitls/sendEmail.js";
import { getOtpEmailTemplate } from "../../uitls/emailTemplates.js";

// === Utility to generate 6-digit OTP ===
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// === Register (or re-send OTP if already exists) ===
export const registerUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res
          .status(400)
          .json({ message: "User already registered and verified" });
      }
      user.otp = { code: otp, expiresAt: otpExpiry };
      if (name) user.name = name;
    } else {
      user = new User({
        email,
        name,
        otp: { code: otp, expiresAt: otpExpiry },
      });
    }

    await user.save();

    await sendEmail(
      email,
      "Your @Ease OTP - Registration",
      getOtpEmailTemplate(name, otp, "Registration")
    );

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Error in registerUser:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === Verify OTP for Registration ===
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp?.code || !user.otp?.expiresAt)
      return res.status(400).json({ message: "No OTP requested" });

    if (user.otp.code !== otp)
      return res.status(401).json({ message: "Invalid OTP" });

    if (user.otp.expiresAt < new Date())
      return res.status(410).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = {};
    await user.save();

    res.status(200).json({ message: "OTP verified. You can now log in." });
  } catch (err) {
    console.error("❌ Error in verifyOTP:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === Request OTP for Login ===
export const requestLoginOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });

    if (!user || !user.isVerified)
      return res
        .status(404)
        .json({ message: "User not found or not verified" });

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = { code: otp, expiresAt: otpExpiry };
    await user.save();

    await sendEmail(
      email,
      "Your @Ease OTP - Login",
      getOtpEmailTemplate(user.name, otp, "Login")
    );

    res.status(200).json({ message: "OTP sent for login" });
  } catch (err) {
    console.error("❌ Error in requestLoginOTP:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === Verify Login OTP and Issue JWT ===
export const verifyLoginOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP are required" });

  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp?.code)
      return res
        .status(404)
        .json({ message: "OTP not requested or user not found" });

    if (user.otp.code !== otp)
      return res.status(401).json({ message: "Invalid OTP" });

    if (user.otp.expiresAt < new Date())
      return res.status(410).json({ message: "OTP expired" });

    user.otp = {};
    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isProvider: user.serviceProvider?.isProvider || false,
      },
    });
  } catch (err) {
    console.error("❌ Error in verifyLoginOTP:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
