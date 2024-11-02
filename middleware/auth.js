const jwToken = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const dao = require("../dao.js");

exports.userAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwToken.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				return res.status(401).json({ message: "Not authorized" });
			}
			const info = dao.readDB("db.json");
			const user = dao.findById(info, decodedToken.id);
			if (user === null) {
				return res.status(401).json({ message: "Not authorized" });
			}
			console.log(`User authorized ${JSON.stringify(user)}`);
			res.locals.user = user;
			next();
		});
	} else {
		return res
			.status(401)
			.json({ message: "not authorized token not available" });
	}
};
