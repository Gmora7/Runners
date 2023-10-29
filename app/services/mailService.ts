import nodemailer from "nodemailer";

export default async function sendMail(
	subject: string,
	toEmail: string,
	otpText: string
) {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.NODEMAILER_EMAIL,
				pass: process.env.NODEMAILER_PW,
			},
		});
		const mailOptions = {
			from: process.env.NODEMAILER_EMAIL,
			to: toEmail,
			subject: subject,
			text: otpText,
		};
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				throw new Error(error.message);
			} else {
				console.log("Email Sent");
				return true;
			}
		});
	} catch (error) {
		console.log(error);
	}
}
