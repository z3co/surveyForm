const express = require("express");
const path = require("path");
const script = express();
script.use("/app", express.static(path.join("../app")));
script.use(express.static(path.join('../app')));
script.use(express.static(path.join('../public')));

const form = document.querySelector("form");
const username = document.querySelector("#username");
const display = document.querySelector(".error");
console.log(username);
form.addEventListener("submit", async (e) => {
	e.preventDefault();
	console.log("register1");
	display.textContent = "";
	try {
		console.log("register");
		const res = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify({
				username: username.value,
			}),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.status === 400 || res.status === 401) {
			return (display.textContent = `${data.message}. ${
				data.error ? data.error : ""
			}`);
		}
		location.assign("/survey");
	} catch (err) {
		console.log(err.message);
	}
});
