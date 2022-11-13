const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const user = require("./modals/registration");
const eventRegistered = require("./modals/eventRegistration");
const app = express();
const port = process.env.port || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/registration", (req, res) => {
  res.render("registration");
});
app.post("/registration", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password === cpassword) {
      const users = new user({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });
      const registered = await users.save();
      res.status(201).render("login");
    } else {
      res.send("Password not matching ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
app.get("/home", (req, res) => {
  res.render("index");
});
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;

    const userEmail = await user.findOne({ email: email });
    if (userEmail.password === pass) {
      res.status(201).render("index");
    } else {
      res.send("Incorrect Data");
    }
  } catch (error) {
    res.status(400).send("Invalid data");
  }
});

app.get("/eventRegistration", (req, res) => {
  res.render("eventRegistration");
});
app.post("/eventRegistration", async (req, res) => {
  try {
    const eventRegisters = new eventRegistered({
      event: req.body.event,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
    });
    const userRegistered = await eventRegisters.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(port, () => {
  console.log("Server is running");
});
