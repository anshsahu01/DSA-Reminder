import axios from "axios";
import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const LEETCODE_USERNAME = "Ansh_Sahu1";

// mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

// function to check leetcode submissions
async function checkDSA() {
  const query = `
    query recentSubmissions($username: String!) {
      recentSubmissionList(username: $username) {
        title
        statusDisplay
        timestamp
      }
    }`;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username: LEETCODE_USERNAME }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const submissions = response.data.data.recentSubmissionList;
    const today = new Date().toISOString().split("T")[0];

    // count how many problems solved today
    const solvedCount = submissions.reduce((count, sub) => {
      const date = new Date(sub.timestamp * 1000).toISOString().split("T")[0];
      if (date === today && sub.statusDisplay === "Accepted") {
        return count + 1;
      }
      return count;
    }, 0);

    console.log(`✅ Problems solved today: ${solvedCount}`);

    // check if less than 5 solved today
    if (solvedCount < 5) {
      console.log("❌ Less than 5 problems solved today, sending email...");
      await sendEmail(solvedCount);
    } else {
      console.log("🎉 Great! 5 or more problems solved today.");
    }

  } catch (error) {
    console.log("Error:", error.message);
  }
}

// func to send mail
async function sendEmail(solvedCount) {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "⚠️ DSA Consistency Alert",
    text: `You solved only ${solvedCount} problems today. Aim for at least 5! 🚀`
  });
  console.log("📧 EMAIL SENT!");
}

// schedule email sending at 4:40 PM
cron.schedule("0 22 * * *", () => {
  console.log("⏰ Running scheduled task at 4:40 PM...");
  checkDSA();
});



