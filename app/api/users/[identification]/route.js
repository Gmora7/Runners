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

export const PATCH = async (request, { params }) => {
	try {
		db.connect();
		const { isSuscribed } = await request.json();
		const { identification } = params;
		const updatedUser = await User.findOneAndUpdate(
			{ identification: identification },
			{ isSuscribed: isSuscribed },
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

export const PUT = async (request) => {
	try {
		db.connect();
		const { identification, name, lastname, phone, location, email } =
			await request.json();
		const updatedUser = await User.findOneAndUpdate(
			{ identification: identification },
			{
				name: name,
				lastname: lastname,
				phone: phone,
				location: location,
				email: email,
			},
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

export const DELETE = async (request, { params }) => {
	try {
		db.connect();
		const { identification } = params;
		const deletedUser = await User.findOneAndDelete({
			identification: identification,
		});
		if (!deletedUser) {
			return NextResponse.json("Usuario no encontrado", { status: 404 });
		}
		return NextResponse.json(deletedUser, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 400 });
	}
};
