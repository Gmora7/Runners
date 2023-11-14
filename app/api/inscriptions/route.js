import { NextResponse } from "next/server";
import Inscription from "@/models/Inscription";
import db from "@/utils/getConnection";

export async function POST(request) {
	try {
		const body = await request.json();
		const newInscription = new Inscription(body);
		db.connect();
		const savedInscription = await newInscription.save();
		return NextResponse.json(savedInscription, { status: 201 });
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}

export async function GET() {
	try {
		db.connect();
		const inscriptions = await Inscription.find({}); // Obtener todas las competencias
		return NextResponse.json(inscriptions, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}
