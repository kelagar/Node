const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("Hello World!");
});

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/companies", require("./routes/api/companies"));
app.use("/api/login", require("./routes/api/login"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

