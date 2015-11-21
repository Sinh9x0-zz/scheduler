var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: { type: String, trim: true },
	email: { type: String, trim: true },
	password: { type: String, trim: true },
	salt: { type: String, trim: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

mongoose.model('User', UserSchema);

UserSchema.path('username').required(true, "Username is required");
UserSchema.path('email').required(true, "Email is required");
UserSchema.path('password').required(true, "Password is required");