import { NextResponse } from "next/server";
import User from "@/models/User";
import db from "@/utils/getConnection";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request) {
	try {
		const body = await request.json();
		const { email, password } = body;
		db.connect();
		const user = await User.findOne({ email });
		const isMatch = await user.matchPassword(password);
		if (!user || !isMatch) {
			return NextResponse.json("Usuario no encontrado", { status: 404 });
		}
		const token = jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + 60 * 60,
				email: email,
			},
			"secret"
		);
		const serialized = serialize("myToken", token, {
			httpOnly: true,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 30,
			path: "/",
		});
		return NextResponse.json(
			{ message: "Inicio de sesión exitoso", token, rol: user.rol, identification: user.identification },
			{ status: 200, headers: { "Set-Cookie": serialized } }
		);
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
}
