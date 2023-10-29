import { NextResponse } from "next/server";
import User from "@/models/User";
import db from "@/utils/getConnection";

export async function PATCH(request, { params }) {
	try {
		const { email } = params;
		const {
			password,
			inputCode = Math.floor(Math.random() * 90000) + 10000,
			verificationCode = Math.floor(Math.random() * 90000) + 10000,
		} = await request.json();
		db.connect();
		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ password },
			{ new: true }
		);
		if (!updatedUser) {
			return NextResponse.json("Usuario no encontrado", {
				status: 404,
			});
		}
		if (verificationCode === inputCode) {
			return NextResponse.json(updatedUser, { status: 200 });
		}
		return NextResponse.json(
			"No tiene permitido realizar esta operación.",
			{
				status: 401,
			}
		);
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}
