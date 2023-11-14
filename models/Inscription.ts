import { Schema, model, models } from "mongoose";

interface Inscription {
	competence: Schema.Types.ObjectId;
    athleteId: string;
	disciplinesOfInscription: string[];
 	categoriesOfInscription: string[];
}

const InscriptionSchema = new Schema<Inscription>(
	{
		competence: {
			type: Schema.Types.ObjectId,
      		ref: "Competence",
			required: true,
			trim: true,
		},
		athleteId: {
			type: String,
			required: true,
			trim: true,
		},
		disciplinesOfInscription: [
			{
			  type: String,
			  trim: true,
			},
		],
		categoriesOfInscription: [
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

export default models.Inscription || model("Inscription", InscriptionSchema);