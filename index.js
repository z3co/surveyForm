const db = require("./dao.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
const PORT = 5000;

const Server = app.listen(PORT, () => 
  console.log(`Server listening on port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection", err.message);
  Server.close(() => {
    process.exit(1);
  });
});

