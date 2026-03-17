const express = require("express");
const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: "Welcome to Dashboard" });
});

// Admin only route
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Admin Access Granted" });
});

module.exports = router;