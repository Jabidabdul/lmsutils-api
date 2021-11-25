const express = require("express");
const router = express.Router();
const emicalculator = require("../controllers/emicalculator")


router.post("/monthlyemi",emicalculator);
module.exports = router;
