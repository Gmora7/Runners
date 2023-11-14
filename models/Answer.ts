import { Schema, model, models } from "mongoose";
import { Answer } from "@/types";

const answerSchema = new Schema<Answer>(
	{
		contact: {
			type: Schema.Types.ObjectId,
			ref: "Contact",
			required: true,
		},
		rating: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default models.Answer || model("Answer", answerSchema);
