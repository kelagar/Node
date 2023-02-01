const { json } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let users = require("../../DataBase/Users");

router.post("/", (req, res) => {
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

module.exports = router;
