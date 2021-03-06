const express = require("express");
const { addArt, getArts } = require("../Controllers/artController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.get("/", getArts);
router.post("/", protect, restrictTo("artist"), addArt);

module.exports = router;
