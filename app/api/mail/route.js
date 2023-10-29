import { NextResponse } from "next/server";
import sendMail from "@/app/services/mailService";
import User from "@/models/User";
import db from "@/utils/getConnection";

export async function POST(request) {
	try {
		const body = await request.json();
		const { toEmail } = body;
		db.connect();
		const user = await User.findOne({ email: toEmail });
		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}
		const verificationCode = Math.floor(Math.random() * 90000) + 10000;
		const optText = `Your verification code is: ${verificationCode}`;
		const subject = "Change password";
		await sendMail(subject, toEmail, optText);
		return NextResponse.json({
			message: "Email sent successfully",
			verificationCode,
			status: 200,
		});
	} catch (error) {
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}
