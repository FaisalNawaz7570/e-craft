const express = require("express");
const { addArt, getArts } = require("../Controllers/artController");

const router = express.Router();

router.get("/", getArts);
router.post("/", addArt);

module.exports = router;
