export const getOtpEmailTemplate = (name, otp, purpose = "Verification") => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="background: #3B82F6; color: white; padding: 20px 30px;">
        <h2 style="margin: 0;">@Ease - ${purpose} OTP</h2>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 16px; margin: 0 0 10px;">Hi ${name || "there"},</p>
        <p style="font-size: 15px; line-height: 1.6;">
          Your One Time Password (OTP) for <strong>${purpose}</strong> is:
        </p>
        <p style="font-size: 30px; font-weight: bold; color: #3B82F6; margin: 20px 0;">${otp}</p>
        <p style="font-size: 14px; color: #666;">This OTP will expire in 5 minutes. Please do not share it with anyone.</p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 13px; color: #999;">If you didn’t request this, you can ignore this email.</p>
        <p style="font-size: 13px; color: #999;">Thank you,<br />Team @Ease</p>
      </div>
    </div>
  </div>
`;
