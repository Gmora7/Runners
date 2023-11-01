"use client";
import { useRef } from "react";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { UseAuth } from "@/app/AuthContext";
import Link from "next/link";

export default function Login() {
	const router = useRouter();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { setIsLoggedIn, setUserRole } = UseAuth();

	const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const account = {
			email,
			password,
		};
		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(account),
			});
			if (!response.ok) {
				throw new Error(
					"Error HTTP: " + response.status + response.text()
				);
			}
			const data = await response.json();
			const token = data.token;
			const rol = data.rol;
			localStorage.setItem("token", token);
			const expirationTime =
				new Date().getTime() + 90 * 24 * 60 * 60 * 1000; // 3 MESES
			localStorage.setItem("expirationTime", expirationTime.toString());
			localStorage.setItem("id", data.identification);
			// console.log(rol);
			setIsLoggedIn(true);
			if (rol === false) {
				localStorage.setItem("userRole", "admin");
				setUserRole("admin");
				router.push("/menu-administrador");
			} else {
				localStorage.setItem("userRole", "user");
				setUserRole("user");
				router.push("/menu-atleta");
			}
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="relative flex flex-col rounded-xl bg-blue-50 bg-clip-border text-gray-800 shadow-md p-4 border border-blue-200">
				<h4 className="text-2xl font-semibold text-blue-900 antialiased">
					Inicio de sesión
				</h4>
				<p className="mt-2 text-base font-normal text-gray-700">
					Ingrese sus datos a continuación.
				</p>
				<form className="mt-6">
					<div className="mb-4">
						<label
							className="text-gray-600 text-sm font-semibold mb-1"
							htmlFor="email"
						>
							Correo
						</label>
						<input
							className="w-full h-10 px-3 py-2 rounded-md border border-blue-200 bg-gray-50 focus:border-pink-500 focus:bg-white"
							type="email"
							id="email"
							placeholder="Correo"
							ref={emailRef}
						/>
					</div>
					<div className="mb-4">
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
						/>
					</div>
					<Button type="submit" onClick={handlerSubmit}>
						Iniciar sesión
					</Button>
					<p className="mt-4 text-center text-base font-normal text-gray-700">
						<Link
							className="text-green-500 hover:text-blue-700"
							href="/signUp"
						>
							Crear nueva cuenta
						</Link>
					</p>
					<p className="mt-4 text-center text-base font-normal text-gray-700">
						¿Olvidó su contraseña?{" "}
						<Link
							className="text-green-500 hover:text-blue-700"
							href="/olvido-password"
						>
							Click aquí
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
