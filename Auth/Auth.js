const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
	"0b8ae16af9c1099b78fbdc038259aac2c3bc1b2631efac43dc56caed1f99f25200807463";
const dao = require("../dao.js");

exports.register = async (req, res, next) => {
	const { username } = req.body;
	try {
		let data = dao.readDB("db.json");
    if (data === null) {
      data = [];
    };
		const newUser = new User(username, dao.findValidId(data));
		await dao.appendDB("db.json", newUser);
		const maxAge = 3 * 60 * 60;
    console.log(newUser.id);
		const token = jwt.sign({ id: newUser.id, username }, jwtSecret, {
			expiresIn: maxAge,
		});
		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: maxAge * 1000,
		});
    res.send(201).json({
      message: "User created successfully",
      user: newUser.id,
    });
	} catch (error) {
		res.status(401).json({
			message: "Error while creating user",
			error: error.message,
		});
	}
};
