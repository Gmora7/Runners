import { NextResponse } from "next/server";
import Question from "@/models/Question";
import Answer from "@/models/Answer"; // Import the Answer model
import db from "@/utils/getConnection";

export const PATCH = async (request, { params }) => {
	try {
		db.connect();
		const { answerId } = await request.json();
		const { _id } = params;
		const answer = await Answer.findById(answerId);
		if (!answer) {
			return NextResponse.json("La respuesta de la pregunta no existe.", {
				status: 404,
			});
		}
		const updatedQuestion = await Question.findOneAndUpdate(
			{ _id: _id },
			{ $push: { answers: answerId } },
			{ new: true }
		);
		if (!updatedQuestion) {
			return NextResponse.json(
				"La pregunta no existe, no pudo ser actualizada.",
				{ status: 404 }
			);
		}
		return NextResponse.json(updatedQuestion, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 400 });
	}
};
