const express = require("express");
const router = express.Router();
const { register } = require("./Auth");
const { answer, questions } = require("../utils/surveyLogic");
const { userAuth } = require("../middleware/auth");
router.route("/answer").post(userAuth, answer);
router.route("/register").post(register);
router.route("/question").get(userAuth, questions);
module.exports = router;
