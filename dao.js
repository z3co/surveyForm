// for loading data out of the database
const fs = require("fs");
function readDB(nameDB) {
	try {
		const data = fs.readFileSync(nameDB, "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Failed to read data:", err);
		return null;
	}
}

function writeDB(data, nameDB) {
	if (!data) return console.log("No data found");
	try {
		fs.writeFileSync(nameDB, JSON.stringify(data));
		console.log("Data saved to db");
	} catch (error) {
		console.error("Failed to write to db", error);
	}
}

function updateDB(updatedRecord, nameDB, uniqueIdentifier = "id") {
	const existingData = readDB(nameDB);

	if (!existingData) {
		console.error("No existing data found");
		return;
	}
	const indexToUpdate = existingData.findIndex(
		(record) => record[uniqueIdentifier] === updatedRecord[uniqueIdentifier],
	);

	if (indexToUpdate === -1) {
		console.error("Record not foundfor update");
		return;
	}
	existingData[indexToUpdate] = {
		...existingData[indexToUpdate],
		...updatedRecord,
	};
	writeDB(existingData, nameDB);
}

function findValidId(data) {
	if (!data) {
		console.error("Data equals null pls provide valid data");
	}
	largest = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i].id > largest) {
			largest = data[i].id;
		}
	}
	return largest + 1;
}

function appendDB(nameDB, newData) {
	let info = readDB("db.json");
	console.log("Read data from database", info);

	if (info === null) {
		info = [];
	}

	info.push(newData);

	writeDB(info, "db.json");

	info = readDB("db.json");

	console.log(info);
}

function findById(data, id) {
	if (!data) {
		console.error("data is null pls provide valid data");
		return null;
	}
	try {
		let user = null;
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				user = data[i];
			}
		}
		return user;
	} catch (error) {
		console.error("A problem occured while finding by id");
		return null;
	}
}

module.exports = { readDB, writeDB, updateDB, findValidId, appendDB };
