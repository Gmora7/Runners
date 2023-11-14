import { NextResponse } from "next/server";
import User from "@/models/User";
import db from "@/utils/getConnection";

export const GET = async () => {
	try {
		db.connect();
		const user = await User.find();
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};

export async function POST(request) {
	try {
		const body = await request.json();
		db.connect();
		const newUser = new User(body);
		const savedUser = await newUser.save();
		return NextResponse.json(savedUser, { status: 201 });
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}
