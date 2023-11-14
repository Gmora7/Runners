import { Schema, model, models } from "mongoose";
import { Question } from "@/types";

const questionSchema = new Schema<Question>(
	{
		question: { type: String, required: true },
		answers: [
			{ type: Schema.Types.ObjectId, ref: "Answer", required: true },
		],
	},
	{ timestamps: true }
);

export default models.Question || model("Question", questionSchema);
