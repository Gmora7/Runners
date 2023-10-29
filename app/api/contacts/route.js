import { NextResponse } from "next/server";
import Contact from "@/models/Contact";
import db from "@/utils/getConnection";

export const GET = async () => {
	try {
		db.connect();
		const contacts = await Contact.find();
		return NextResponse.json(contacts, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};

export async function POST(request) {
	try {
		const body = await request.json();
		const newContact = new Contact(body);
		db.connect();
		const savedContact = await newContact.save();
		return NextResponse.json(savedContact);
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}
