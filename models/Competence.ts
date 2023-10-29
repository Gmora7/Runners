import { Schema, model, models } from "mongoose";

interface Competence {
	name: string;
	date: Date;
	time: string;
	disciplines: string[];
 	categories: string[];
}

const CompetenceSchema = new Schema<Competence>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		time: {
			type: String,
			required: true,
			trim: true,
		},
		disciplines: [
			{
			  type: String,
			  trim: true,
			},
		],
		categories: [
			{
			  type: String,
			  trim: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

export default models.Competence || model("Competence", CompetenceSchema);
