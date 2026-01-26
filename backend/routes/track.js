const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

router.post("/", async (req, res) => {
  try {
    const { url, domain, title, duration } = req.body;

    // Basic validation
    if (!url || !domain || !duration) {
      return res.status(400).json({ error: "Invalid tracking data" });
    }

    const session = new Session({
      url,
      domain,
      title,
      duration
    });

    await session.save();

    console.log("📊 Session saved:", domain, duration + "s");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Track error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
