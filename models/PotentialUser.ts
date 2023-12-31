import { Schema, model, models } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { PotentialUser } from "../types";

const PotentialUserSchema = new Schema<PotentialUser>(
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
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			validate: {
				validator: function (v: string) {
					return /\S+@\S+\.\S+/.test(v);
				},
				message: (props) =>
					`${props.value} is not a valid email address!`,
			},
		},
		phone: {
			type: Number,
			required: true,
			unique: true,
			trim: true,
			maxlength: 8,
		},
	},
	{
		timestamps: true,
	}
);
PotentialUserSchema.plugin(uniqueValidator);

export default models.PotentialUser ||
	model("PotentialUser", PotentialUserSchema);
