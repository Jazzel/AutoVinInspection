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
    "AVDGXhHkorW11TMKjH57_1GGSJVDZUPzWeRudvxoCcPSS9m7DoUBKw3O3WjLGCXn_E1naOiDkl3Uc7Ic";

  res.render("home/report", { clientId });
});

router.get("/generate-report", (req, res) => {
  res.render("home/generate-report");
});

module.exports = router;
