import { NextResponse } from "next/server";
import Question from "@/models/Question";
import db from "@/utils/getConnection";

export const GET = async () => {
	try {
		db.connect();
		const questions = await Question.find();
		return NextResponse.json(questions, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};

export const POST = async (request) => {
	try {
		db.connect();
		const body = await request.json();
		const newQuestion = new Question(body);
		const savedQuestion = await newQuestion.save();
		return NextResponse.json(savedQuestion, { status: 201 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};
