const express = require("express");
const router = express.Router();
const emicalculator = require("../controllers/emicalculator");
const calculateDues = require("../controllers/calculateDues");


router.post("/monthlyemi",emicalculator);
router.post("/dues",calculateDues)
module.exports = router;
