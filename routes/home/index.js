const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home/index");
});

router.get("/about", (req, res) => {
  res.render("home/about");
});

router.get("/contact", (req, res) => {
  res.render("home/contact");
});

router.get("/why-us", (req, res) => {
  res.render("home/why-us");
});

router.get("/pricing", (req, res) => {
  res.render("home/pricing");
});

module.exports = router;
