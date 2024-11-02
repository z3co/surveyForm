const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const dao = require("../dao.js");

exports.answer = async (req, res, next) => {
	const { answer, questionid } = req.body;
	const user = res.locals.user;
	const questions = [
		{
			question: "Who is Donald duck",
			answer: "me",
		},
		{
			question: "Who am i",
			answer: "Donald duck",
		},
		{
			question: "How old am i",
			answer: "90",
		},
	];

	try {
		if (answer !== questions[questionid].answer) {
			res.status(200).json({
				message: "Wrong answer",
				command: 0,
			});
		} else {
			res.status(200).json({
				message: "Thats correct",
				command: 1,
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Server errror",
			error: error.message,
		});
	}
};
