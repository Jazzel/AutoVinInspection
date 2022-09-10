const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home/index");
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

router.get("/report", (req, res) => {
  res.render("home/report");
});

router.get("/generate-report", (req, res) => {
  res.render("home/generate-report");
});

module.exports = router;
