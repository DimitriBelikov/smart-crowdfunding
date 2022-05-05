const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/.env" });

//Authenticate user for every request
const auth = (req, res, next) => {
	console.log(req.cookies);
	const { cookies } = req;
	if ("jwt" in cookies) {
		try {
			console.log("JWT exists");
			const token = cookies.jwt;
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);

			res.cookie("jwt", token, {
				maxAge: 1000 * 60 * 15,
				httpOnly: false,
			});
			next();
		} catch (e) {
			console.log(e);
			res.status(400).json({ msg: "Invalid token" });
		}
	} else {
		console.log("Cookie not found");
		// res.status(400).json({ msg: "Cookie not found" });
		next();
	}
};

module.exports = auth;
