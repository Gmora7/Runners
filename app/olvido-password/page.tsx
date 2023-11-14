"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import Button from "@/components/Button/Button";
import Alert from "@/components/Alert/Alert";
import { SubmitResponse } from "@/types";

interface UserInfo {
	email: string;
	verificationCode: number;
}

export default function ForgotPassword() {
	const [submitResponse, setSubmitResponse] = useState<SubmitResponse | null>(
		null
	);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmedPasswordRef = useRef<HTMLInputElement>(null);

	const handleAlertClose = () => {
		setSubmitResponse(null);
	};

	const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const toEmail = inputRef.current?.value;
		if (toEmail) {
			try {
				const verificationCode =
					Math.floor(Math.random() * 90000) + 10000;
				const optText = `Your verification code is: ${verificationCode}`;
				const subject = "Change password";
				const response = await fetch("/api/mail", {
					method: "POST",
					body: JSON.stringify({ toEmail, subject, optText }),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error(
						"Error HTTP: " + response.status + response.text()
					);
				}
				setUserInfo({ email: toEmail, verificationCode });
			} catch (error) {
				setSubmitResponse({
					isSuccessful: false,
					message: "El correo no existe",
				});
			}
		}
	};

	const handlerSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const password = passwordRef.current?.value;
		const confirmedPassword = confirmedPasswordRef.current?.value;
		const input = inputRef.current?.value;
		if (password && confirmedPassword && input && userInfo) {
			const inputCode = parseInt(input);
			const { email, verificationCode } = userInfo;
			if (password === confirmedPassword) {
				try {
					const response = await fetch(`/api/users/email/${email}`, {
						method: "PATCH",
						body: JSON.stringify({
							password,
							inputCode,
							verificationCode,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					const status = response.status;
					if (status === 401) {
						setSubmitResponse({
							isSuccessful: false,
							message: "No tiene permitido realizar esta acción.",
						});
					} else if (response.ok) {
						setSubmitResponse({
							isSuccessful: true,
							message: "Contraseña cambiada con éxito.",
						});
					} else {
						throw new Error("Error HTTP: " + status);
					}
				} catch (error) {
					console.error(`HTTP Error ${error}`);
				}
			} else {
				setSubmitResponse({
					isSuccessful: false,
					message: "Las contraseñas no coinciden.",
				});
			}
		} else {
			setSubmitResponse({
				isSuccessful: false,
				message: "Debe completar todos los campos.",
			});
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="relative flex flex-col rounded-xl bg-blue-50 bg-clip-border text-gray-800 shadow-md p-4 border border-blue-200">
				{submitResponse != null && (
					<Alert
						message={submitResponse.message}
						onClose={handleAlertClose}
						isSuccessful={submitResponse.isSuccessful}
					/>
				)}
				<h4 className="text-2xl font-semibold text-blue-900 antialiased">
					Recuperar contraseña
				</h4>
				<p className="mt-2 text-base font-normal text-gray-700">
					{userInfo
						? "Ingrese el código enviado."
						: "Ingrese el correo asociado a la cuenta."}
				</p>
				<form className="mt-6">
					<div className="mb-4">
						<label
							className="text-gray-600 text-sm font-semibold mb-1"
							htmlFor={userInfo ? "number" : "email"}
						>
							{userInfo ? "Código" : "Correo"}
						</label>
						<input
							className="w-full h-10 px-3 py-2 rounded-md border border-blue-200 bg-gray-50 focus:border-pink-500 focus:bg-white"
							type={userInfo ? "number" : "email"}
							id={userInfo ? "number" : "email"}
							placeholder={userInfo ? "Código" : "Correo"}
							ref={inputRef}
							required
						/>
						{userInfo && (
							<>
								<label
									className="text-gray-600 text-sm font-semibold mb-1"
									htmlFor="password"
								>
									Contraseña
								</label>
								<input
									className="w-full h-10 px-3 py-2 rounded-md border border-blue-200 bg-gray-50 focus:border-pink-500 focus:bg-white"
									type="password"
									id="password"
									placeholder="Contraseña"
									ref={passwordRef}
									required
								/>
								<label
									className="text-gray-600 text-sm font-semibold mb-1"
									htmlFor="confirmedPassword"
								>
									Confirmar contraseña
								</label>
								<input
									className="w-full h-10 px-3 py-2 rounded-md border border-blue-200 bg-gray-50 focus:border-pink-500 focus:bg-white"
									type="password"
									id="confirmedPassword"
									placeholder="Confirmar contraseña"
									ref={confirmedPasswordRef}
									required
								/>
							</>
						)}
					</div>
					<Button onClick={userInfo ? handlerSubmit2 : handlerSubmit}>
						{userInfo ? "Cambiar contraseña" : "Enviar código"}
					</Button>
					<p className="mt-4 text-center text-base font-normal text-gray-700">
						<Link
							className="text-green-500 hover:text-blue-700"
							href="/signup"
						>
							Crear nueva cuenta
						</Link>
					</p>
					<p className="mt-4 text-center text-base font-normal text-gray-700">
						<Link
							className="text-green-500 hover:text-blue-700"
							href="/login"
						>
							Volver al iniciar sesión
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
