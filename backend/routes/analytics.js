const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

const domainNames = {
  "linkedin.com": "LinkedIn",
  "youtube.com": "YouTube",
  "web.whatsapp.com": "WhatsApp",
  "github.com": "GitHub",
  "leetcode.com": "LeetCode",
  "stackoverflow.com": "StackOverflow",
  "chatgpt.com": "ChatGPT"
};

// GET analytics summary
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: 1 });

    const formatted = sessions.map(s => ({
      id: s._id,
      domain: s.domain,
      friendlyName: domainNames[s.domain] || s.domain,
      duration: s.duration,
      date: s.date
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Analytics error:", err);
    res.status(500).json({ error: "Analytics failed" });
  }
});

module.exports = router;
