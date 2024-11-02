const express = require("express");
const router = express.Router();
const { register } = require("./Auth");
const { answer } = require ("../utils/surveyLogic");
const { userAuth } = require("../middleware/auth");
router.route("/answer").post(userAuth, answer);
router.route("/register").post(register);
module.exports = router;
