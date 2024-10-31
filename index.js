const dao = require("./dao.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./Auth/Route"));
const User = require("./model/user.js");
const PORT = 5000;

function main() {
  let info = dao.readDB("db.json");

  if (info === null) {
    info = [];
  }

  const newUser = new User("Jeppe", dao.findValidId(info));

  dao.appendDB("db.json", newUser);

  console.log(newUser);
  console.log(newUser.id);

  console.log(dao.readDB("db.json"));

  const updatedUser = {
    id: 1,
    correct: 5,
  };

  dao.updateDB(updatedUser, "db.json");

  info = dao.readDB("db.json");

  console.log("updated info:");
  console.log(info);
}

app.get("/", (req, res) => res.render("home"));

const Server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`),
);

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection", err.message);
  Server.close(() => {
    process.exit(1);
  });
});
