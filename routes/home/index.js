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

router.get("/report", async (req, res) => {
  // const clientId = CLIENT_ID;
  const clientId =
    "AYPtqjxuRAlpgI4gL5nx5uJz2Ixi_QN91YsjjAiabanfFR7edl1bUW3wLvvZqOTtD2oNAyocboodaU4I";

  res.render("home/report", { clientId });
});

router.get("/generate-report", (req, res) => {
  res.render("home/generate-report");
});

module.exports = router;
