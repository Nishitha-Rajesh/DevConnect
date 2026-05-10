// Cron job for sending daily email reminders
// This requires AWS SES credentials to be configured in .env
// If not configured, it will log errors but won't crash the app

try {
  const cron = require("node-cron");
  const { subDays, startOfDay, endOfDay } = require("date-fns");
  const ConnectionRequestModel = require("../Models/connectionRequest");

  // This job will run at 8 AM in the morning everyday
  cron.schedule("0 8 * * *", async () => {
    try {
      const yesterday = subDays(new Date(), 1);
      const yesterdayStart = startOfDay(yesterday);
      const yesterdayEnd = endOfDay(yesterday);

      const pendingRequests = await ConnectionRequestModel.find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      }).populate("fromUserId toUserId");

      const listOfEmails = [
        ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
      ];

      console.log("Pending request emails:", listOfEmails);

      // Email sending is disabled unless AWS SES is configured
      // for (const email of listOfEmails) {
      //   try {
      //     const sendEmail = require("./sendEmail");
      //     const res = await sendEmail.run(
      //       "New Friend Requests pending for " + email,
      //       "There are pending friend requests. Please login to DevConnect and accept or reject them."
      //     );
      //     console.log(res);
      //   } catch (err) {
      //     console.log("Email send failed:", err.message);
      //   }
      // }
    } catch (err) {
      console.error("Cron job error:", err);
    }
  });

  console.log("Cron job scheduled successfully");
} catch (err) {
  console.log("Cron job setup skipped:", err.message);
}
