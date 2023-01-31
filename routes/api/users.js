const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const uuid = require("uuid");

let users = require("../../DataBase/Users");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403); //forbidden access
  }
}

//get all users
router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403); //forbidden
    } else {
      res.json({
        message: "Authorized",
        users,
      });
    }
  });
  res.json(users);
});

//get user by id
router.get("/:id", (req, res) => {
  let found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});

//create a new user
router.post("/", (req, res) => {
  let newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  if (!newUser.name || !newUser.email) {
    return res.sendStatus(400);
  }

  users.push(newUser);
  res.json(users);
});

//update user
router.put("/:id", (req, res) => {
  let found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    let updateUser = req.body;
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.email = updateUser.email ? updateUser.email : user.email;
        res.json({ msg: "User updated", user });
      }
    });
  } else {
    res.sendStatus(400);
  }
});

//delete user
router.delete("/:id", (req, res) => {
  let found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    res.json({
      msg: "User deleted",
      users,
    });
  } else {
    res.json({ msg: "no user found" });
  }
});

module.exports = router;
