import { NextResponse } from "next/server";
import Answer from "@/models/Answer";
import Contact from "@/models/Contact";
import db from "@/utils/getConnection";

export const POST = async (request) => {
	try {
		db.connect();
		const { contactID, rating } = await request.json();
		const contact = await Contact.findById(contactID);
		if (!contact) {
			return NextResponse.json("El contacto no existe", { status: 404 });
		}
		if (rating < 0 || rating > 5) {
			return NextResponse.json("Puntaje inválido.", {
				status: 400,
			});
		}
		const newAnswer = new Answer({ contact: contactID, rating: rating });
		const savedAnswer = await newAnswer.save();
		return NextResponse.json(savedAnswer, { status: 201 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};
