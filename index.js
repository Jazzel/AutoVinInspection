const express = require("express");
var bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3200;

const config = require("config");

const axios = require("axios").default;
const stripe = require("stripe")("sk_test_8SOdjDCD0QJmzrT1dC77rNhO00RUbDsJAX");
const data = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/img", express.static(__dirname + "/assets/img"));

app.use("", require("./routes/home"));
app.use("", require("./routes/auth"));

app.post("/fetch-report", async (req, res) => {
  const { name, email, vinNumber, insuranceType } = req.body;

  const key = config.get("apiKEY");

  // ! Fetching VehicleSpecs from the API

  if (vinNumber) {
    const vehicleSpecs = await axios
      .get(`http://api.carsxe.com/specs?key=${key}&vin=${vinNumber}`)
      .then((response) => response?.data)
      .catch((err) => err?.response?.data);

    if (vehicleSpecs.error === null) {
      return res.status(400).send({ msg: "Invalid VIN Number" });
    } else {
      return res.status(200).send(vehicleSpecs);
    }
  } else {
    return res
      .status(400)
      .send({ msg: "Something went wrong. Try again later !" });
  }
});

const calculateOrderAmount = (items) => {
  return 2500;
};

app.post("/create-payment-intent", async (req, res) => {
  const { username, email, reportType, reportPrice, vin } = req.body;
  console.log(req.body);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(reportPrice) * 100 || 2500,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      user: username,
      email: email,
      vin: vin,
      reportType:
        reportType === "information"
          ? "Vehicle Information History"
          : reportType === "history"
          ? "Vehicle History Specification"
          : "Vehicle Information + History",
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/fetch-history-report", async (req, res) => {
  const { vin } = req.body;

  const key = config.get("apiKEY");
  console.log("dasd");

  if (vin) {
    const vehicleSpecs = await axios
      .get(`http://api.carsxe.com/history?key=${key}&vin=${vin}`)
      .then((response) => response?.data)
      .catch((err) => err?.response?.data);

    if (vehicleSpecs.error === null) {
      return res.status(400).send({ msg: "Invalid VIN Number" });
    } else {
      return res.status(200).send(vehicleSpecs);
    }
  } else {
    return res
      .status(400)
      .send({ msg: "Something went wrong. Try again later !" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
