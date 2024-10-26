const db = require("./dao.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
const User = require("./model/user.js");
const PORT = 5000;

function main() {
  
  let info = db.readDB("db.json");

  if (info === null) {
    info = [];
  };

  const newUser = new User("Jeppe", db.findValidId(info));

  db.appendDB("db.json", newUser);

  console.log(newUser);

  console.log(db.readDB("db.json"));

  const updatedUser = {
    "id": 1,
    "correct": 5
  };

  db.updateDB(updatedUser, "db.json");

  info = db.readDB("db.json");

  console.log("updated info:")
  console.log(info);
}

app.get("/", (req, res) => {
  res.send("Hello user");
  main();
});

const Server = app.listen(PORT, () => 
  console.log(`Server listening on port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection", err.message);
  Server.close(() => {
    process.exit(1);
  });
});

