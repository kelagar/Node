const express = require("express");
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const { extname } = require("path");

//require the DB model
require('./models/db');

//require User controller
const userController = require("./Controllers/userController");


//create app
const app = express();

//create port connection
const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//use bodyparser - middleware to parse incoming request bodies before our handlers. This is to validate the the values in the object before handling it.
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


//Main page
app.get("/", (req, res) => {
  res.send(`
  <h2>Hello World!</h2>
  <h3>Click here to get access to the <b> <a href="/user/list">Database</a></b></h3>`);
});

//Set 'views' to the path ../views/
app.set('views', path.join(__dirname, '/views/'));

//Create the app engine (usually html, but in this case its using the handlebars layout). Here we are setting setting the MainLayout as default, and other layouts can be found in '../views/layouts'
app.engine('hbs', exphbs.engine({
  handlebars: allowInsecurePrototypeAccess(handlebars),
  extname: 'hbs',
  defaultLayout: "MainLayout",
  layoutsDir: __dirname + "/views/layouts/",
}));

//Set 'view engine' to be the engine we created above called 'hbs'
app.set('view engine', "hbs");

//When url is /user -> use the User controller
app.use("/user", userController);


