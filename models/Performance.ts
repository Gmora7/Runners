import { Schema, model, models } from "mongoose";

interface Performance {
	category: Schema.Types.ObjectId;
    discipline: Schema.Types.ObjectId;
	athleteId: Schema.Types.ObjectId;
 	record: String;
	unit: String;
}

const PerformanceSchema = new Schema<Performance>(
	{
		category: {
			type: Schema.Types.ObjectId,
      		ref: "Category",
			required: true,
			trim: true,
		},
        discipline: {
			type: Schema.Types.ObjectId,
      		ref: "Discipline",
			required: true,
			trim: true,
		},
		athleteId: {
			type: Schema.Types.ObjectId,
      		ref: "User",
			required: true,
			trim: true,
		},
		record: {
			type: String,
            required: true,
			trim: true,
		},
		unit: {
			type: String,
			required: true,
			trim: true,
		}
	},
	{
		timestamps: true,
	}
);

export default models.Performance || model("Performance", PerformanceSchema);
