// testMail.js
const { mailSender } = require("./utils/mailSender");

async function test() {
  await mailSender(
    "garg2440kapil@example.com", // change to your email to test
    "Test OTP Email",
    "<h1>Hello from StudyNotion!</h1><p>This is a test email.</p>"
  );
}

test();
