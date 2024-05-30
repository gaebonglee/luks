const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Failed to logout." });
      }
      res.clearCookie("session_cookie_name");
      return res.status(200).json({ success: true, message: "Logged out successfully." });
    });
  } else {
    return res.status(200).json({ success: false, message: "No user logged in." });
  }
});

module.exports = router;
