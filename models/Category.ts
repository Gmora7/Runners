import mongoose, { Schema, models } from "mongoose";

interface Category {
	name: string;
}

const CategorySchema = new Schema<Category>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export default models.Category || mongoose.model("Category", CategorySchema);
