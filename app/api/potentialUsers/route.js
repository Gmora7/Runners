import { NextResponse } from "next/server";
import PotentialUsers from "@/models/PotentialUsers";
import db from "@/utils/getConnection";

export const GET = async () => {
	try {
		db.connect();
		const user = await PotentialUsers.find();
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(error.message, { status: 500 });
	}
};


export async function POST(request) {
	try {
		const body = await request.json();
		const newPotentialUser = new PotentialUsers(body);
		db.connect();
		const savedPotentialUser = await newPotentialUser.save();
		return NextResponse.json(savedPotentialUser);
	} catch (error) {
		// console.log(error.errors.phone.message);
		return NextResponse.json(error.message, {
			status: 400,
		});
	}
}
