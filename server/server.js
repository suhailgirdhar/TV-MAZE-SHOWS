const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", function (req, res) {});

app.listen(8080, function () {
  console.log("Server is running on port 8080");
});
