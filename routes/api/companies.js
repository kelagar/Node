const express = require("express");
const router = express.Router();

let companies = require("../../DataBase/Companies");

//get all companies
router.get("/", (req, res) => {
  res.json(companies);
});

module.exports = router;
