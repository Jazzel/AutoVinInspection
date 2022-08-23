const express = require("express");

const app = express();

const PORT = process.env.PORT || 3200;

app.use(express.json());
app.set("view engine", "ejs");

app.use("", require("./routes/home"));
app.use("", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
