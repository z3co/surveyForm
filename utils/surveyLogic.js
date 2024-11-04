const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const dao = require("../dao.js");
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

exports.answer = async (req, res, next) => {
	const { answer, questionid } = req.body;
	const user = res.locals.user;

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

exports.questions = async (req, res, next) => {
	try {
		const { questionid } = req.body;
		if (!questionid || questionid === null) {
			throw new Error("You failed to provide a questionid");
		}
		if (!questions[questionid]) {
			throw new Error("That question does not exist");
		}
		const question = questions[questionid].question;
		res.status(200).json({
			message: "Success while returning question",
			question: question,
		});
	} catch (err) {
		console.error("An error occured while returning question");
		res.status(400).json({
			message: "An error occured",
			error: error.message,
		});
	}
};
