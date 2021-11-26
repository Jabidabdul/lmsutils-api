const express = require("express");
const router = express.Router();
const calculateDisbursal = require("../controllers/calculateDisbursal")


router.post("/",calculateDisbursal);
module.exports = router;
