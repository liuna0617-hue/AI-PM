import { runReminderScan } from "../lib/reminders";

runReminderScan()
  .then((result) => {
    console.log(`Reminder scan complete. Sent: ${result.sent}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
