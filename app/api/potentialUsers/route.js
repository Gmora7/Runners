import { NextResponse } from "next/server";
import PotentialUser from "@/models/PotentialUser";
import db from "@/utils/getConnection";

export const GET = async () => {
	try {
		db.connect();
		const user = await PotentialUser.find();
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};

export async function POST(request) {
	try {
		const body = await request.json();
		const newPotentialUser = new PotentialUser(body);
		db.connect();
		const savedPotentialUser = await newPotentialUser.save();
		return NextResponse.json(savedPotentialUser, { status: 201 });
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}

export async function DELETE(request) {
	try {
		db.connect();
		const email = request.json();
		const deletedUser = await PotentialUser.findOneAndRemove(email);
		if (!deletedUser) {
			return NextResponse.json("Noticia no encontrada", { status: 404 });
		}

		return NextResponse.json(deletedUser, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
}
