import { Schema, model, models } from "mongoose";

interface News {
	src: string;
	category: string;
	title: string;
	body: string;
	date: string;
}

const NewsSchema = new Schema<News>(
	{
		src: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		body: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export default models.News || model("News", NewsSchema);
