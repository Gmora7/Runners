import { Schema, model, models } from "mongoose";
import { Contact } from "../types";

const ContactSchema = new Schema<Contact>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: [9, "identification cannot be grater than 9 characters"],
		},
		occupation: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export default models.Contact || model("Contact", ContactSchema);
