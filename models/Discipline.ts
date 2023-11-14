import mongoose, { Schema, models } from "mongoose";

interface Discipline {
	title: string;
	description: string;
	categories: mongoose.Types.ObjectId[];
	hasTime: boolean;
}

const DisciplineSchema = new Schema<Discipline>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: "Category",
				required: true,
			},
		],
		hasTime: {
			type: Boolean,
			default: true,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);
export default models.Discipline ||
	mongoose.model("Discipline", DisciplineSchema);
