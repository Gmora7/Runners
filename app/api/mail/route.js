import { NextResponse } from "next/server";
import sendMail from "@/app/services/mailService";
import User from "@/models/User";
import db from "@/utils/getConnection";

export async function POST(request) {
	try {
		const body = await request.json();
		const { toEmail, subject, optText } = body;
		db.connect();
		const user = await User.findOne({ email: toEmail });
		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}
		await sendMail(subject, toEmail, optText);
		return NextResponse.json({
			message: "Email sent successfully",
			status: 201,
		});
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}
