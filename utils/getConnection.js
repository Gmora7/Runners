import mongoose from "mongoose";

class Database {
	constructor() {
		this.connect();
	}

	connect() {
		mongoose
			.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
			.then(() => {
				console.log("Database connection successful");
			})
			.catch((err) => {
				console.error("Database connection error:", err);
			});
	}
}

module.exports = new Database();
