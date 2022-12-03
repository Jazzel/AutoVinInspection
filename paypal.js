const { response } = require("express");
const fetch = require("node-fetch");

const { CLIENT_ID, APP_SECRET } = {
  CLIENT_ID:
    "AVDGXhHkorW11TMKjH57_1GGSJVDZUPzWeRudvxoCcPSS9m7DoUBKw3O3WjLGCXn_E1naOiDkl3Uc7Ic",
  APP_SECRET:
    "EBAm6gezlG1g3zS7N2_eJRINW7XBnRaLv6riwf0RRbPy3HEhrtdXxvIRY0zqoiOpSWr2DmZZRxXMThc9",
};
const base = "https://api-m.sandbox.paypal.com";

async function createOrder(reportPrice) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${reportPrice}`,
          },
        },
      ],
    }),
  });

  const data = await response.json();
  return data;
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();

  console.log(accessToken);
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function generateAccessToken() {
  const response = await fetch(base + "/v1/oauth2/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization:
        "Basic " + Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64"),
    },
  });
  const data = await response.json();
  return data.access_token;
}
module.exports.createOrder = createOrder;
module.exports.capturePayment = capturePayment;
