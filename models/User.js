import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		lastname: {
			type: String,
			required: true,
			trim: true,
		},
		rol: {
			type: Boolean,
			required: true,
		},
		identification: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: [9, "identification cannot be grater than 9 characters"],
		},
		birth: {
			type: Date,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
			maxlength: [8, "phone cannot be grater than 8 characters"],
		},
		location: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		isSuscribed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const rounds = 12;
	const salt = await bcrypt.genSalt(rounds);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
	const account = this.getUpdate();
	if (!account.password) return next();
	const rounds = 12;
	const salt = await bcrypt.genSalt(rounds);
	this.getUpdate().password = await bcrypt.hash(account.password, salt);
	next();
});

export default models.User || model("User", UserSchema);
