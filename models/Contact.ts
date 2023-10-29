import { Schema, model, models } from "mongoose";

interface Contact {
	name: string;
	phone: string;
	responsability: string;
}

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
		responsability: {
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
