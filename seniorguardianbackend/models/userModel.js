const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: [true, 'please add your email-id']
		},
		first_name: {
			type: String,
			require: [true, 'please add your first name']
		},
		last_name: {
			type: String,
			require: [true, 'please add your last name']
		},
		age: {
			type: Number,
			require: [true, 'please add your age']
		},
		blood_group: {
			type: String,
			require: [true, 'please add your blood group']
		},
		gender: {
			type: String,
			require: [true, 'please add your gender']
		},
		phone_number: {
			type: String,
			require: [true, 'please add your phone number']
		},
		password: {
			type: String,
			require: [true, 'please add your password']
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);