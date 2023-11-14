import { NextResponse } from "next/server";
import Competence from "@/models/Competence";
import db from "@/utils/getConnection";

export async function POST(request) {
	try {
		const body = await request.json();
		const newCompetence = new Competence(body);
		db.connect();
		const savedCompetence = await newCompetence.save();
		return NextResponse.json(savedCompetence, { status: 201 });
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}

export async function GET() {
	try {
		db.connect();
		const competences = await Competence.find({}); // Obtener todas las competencias
		return NextResponse.json(competences);
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}
