const express = require("express");
const { addArt } = require("../Controllers/artController");

const router = express.Router();

router.post("/", addArt);

module.exports = router;
