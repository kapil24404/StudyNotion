// const nodemailer = require("nodemailer");
// require("dotenv").config();

// exports.mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: "StudyNotion | by Kapil",
//       to: `${email}`,
//       subject: `${title}`,
//       html: `${body}`,
//     });

//     console.log(info);
//     return info;
//   } catch (error) {
//     console.error(error);
//   }
// };


// const nodemailer = require("nodemailer");
// require("dotenv").config();

// async function mailSender(email, title, body) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: process.env.MAIL_PORT,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"StudyNotion | by Kapil" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("✅ Email sent successfully:", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     throw error;
//   }
// }

// module.exports = { mailSender };


const nodemailer = require("nodemailer");
require("dotenv").config();

async function mailSender(email, title, body) {
  try {
    // Log environment values for debugging
    console.log("📧 Attempting to send mail...");
    console.log("MAIL_HOST:", process.env.MAIL_HOST);
    console.log("MAIL_PORT:", process.env.MAIL_PORT);
    console.log("MAIL_USER:", process.env.MAIL_USER ? "✔ Loaded" : "❌ Missing");
    console.log("MAIL_PASS:", process.env.MAIL_PASS ? "✔ Loaded" : "❌ Missing");

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: process.env.MAIL_PORT || 587,
      secure: false, // Use true only if port = 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Verify connection first
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully.");

    // Send the mail
    const info = await transporter.sendMail({
      from: `"StudyNotion | by Kapil" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    console.error("🔍 Full error:", error);
    throw new Error("Could not send OTP. Please try again later.");
  }
}

module.exports = { mailSender };
