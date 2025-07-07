// controllers/pushController.js

// Simulated push service (e.g., Firebase or custom logic)
const sendPushNotification = async (token, title, message) => {
  // Replace this with actual push logic (e.g., Firebase Admin SDK)
  console.log(`Sending push to ${token}: ${title} - ${message}`);
  return { success: true, token };
};

exports.sendNotification = async (req, res) => {
  const { token, title, message } = req.body;

  if (!token || !title || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const result = await sendPushNotification(token, title, message);
    res.status(200).json({ message: "Push sent", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send push notification." });
  }
};