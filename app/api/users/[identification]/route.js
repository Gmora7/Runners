import { NextResponse } from "next/server";
import User from "@/models/User";
import db from "@/utils/getConnection";

export const GET = async (request, { params }) => {
	try {
		db.connect();
		const { identification } = params;
		const user = await User.findOne({ identification: identification });
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};

export const PUT = async (request) => {
	try {
		db.connect();
		const { identification, ...userData } = await request.json();
		const updatedUser = await User.findOneAndUpdate(
			{ identification: identification },
			userData,
			{ new: true }
		);
		if (!updatedUser) {
			return NextResponse.json("Usuario no encontrado", { status: 404 });
		}

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 400 });
	}
};
