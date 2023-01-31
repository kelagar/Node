const { json } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let users = require("../../DataBase/Users");

router.post("/", (req, res) => {
  users.forEach((user) => {
    if (user.email === req.body.email) {
      jwt.sign({ user: user }, "secretkey", (err, token) => {
        res.json({
          token,
        });
      });
    }
  });
});

module.exports = router;
