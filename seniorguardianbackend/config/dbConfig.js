const mongoose = require('mongoose');

const connectDb = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(
			'Database Connected: ',
			connect.connection.host,
			connect.connection.name
		);
	} catch (error) {
		console.log('Database connection failed', error);
		process.exit(1); // 1- fail 0- pass
	}
};

module.exports = connectDb;