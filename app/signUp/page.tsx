"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { SetStateAction, useState } from "react";

export default function Signup() {
	const router = useRouter();
	const [rol, setRol] = useState("atleta");
	const [userData, setUserData] = useState({
		name: "",
		lastname: "",
		rol: true,
		identification: "",
		birth: "",
		phone: "",
		location: "",
		email: "",
		password: "",
	});

	const handlerCedula = (event: { target: { value: any } }) => {
		const value = event.target.value;
		const numericValue = value.replace(/[^0-9]/g, "");
		if (numericValue.length <= 9) {
			setUserData({ ...userData, identification: numericValue });
		}
	};

	const handlerCelular = (event: { target: { value: any } }) => {
		const value = event.target.value;
		const numericValue = value.replace(/[^0-9]/g, "");
		if (numericValue.length < 9) {
			setUserData({ ...userData, phone: numericValue });
		}
	};

	const handlerRol = (e: { target: { value: SetStateAction<string> } }) => {
		setRol(e.target.value);
		if (e.target.value === "atleta") {
			setUserData({ ...userData, rol: true });
		} else {
			setUserData({ ...userData, rol: false });
		}
	};

	const handlerSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error(
					"Error HTTP: " + response.status + response.text()
				);
			}
			router.push("/login");
		} catch (error) {
			console.error("Error al registrar el usuario", error);
		}
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-3xl font-bold mb-2 mt-4">Registrarse</h1>
				<div className="rounded overflow-hidden shadow-lg bg-white p-4 m-2">
					<form onSubmit={handlerSubmit}>
						<div className="mb-4">
							<div className="mb-2">
								<label
									htmlFor="name"
									className="font-bold text-xl"
								>
									Nombre:
								</label>
								<input
									type="text"
									id="name"
									value={userData.name}
									onChange={(e) =>
										setUserData({
											...userData,
											name: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Nombre"
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="lastname"
									className="font-bold text-xl"
								>
									Apellidos:
								</label>
								<input
									type="text"
									id="lastname"
									value={userData.lastname}
									onChange={(e) =>
										setUserData({
											...userData,
											lastname: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Apellidos"
								/>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									id="athlete"
									name="rol"
									value="atleta"
									checked={rol === "atleta"}
									onChange={handlerRol}
								/>
								<label
									htmlFor="athlete"
									className="font-bold text-xl ml-2 mr-2"
								>
									Atleta
								</label>
								<input
									type="radio"
									id="trainer"
									name="rol"
									value="entrenador"
									checked={rol === "entrenador"}
									onChange={handlerRol}
								/>
								<label
									htmlFor="trainer"
									className="font-bold text-xl ml-2"
								>
									Entrenador
								</label>
							</div>
							<div className="mb-2">
								<label
									htmlFor="identification"
									className="font-bold text-xl"
								>
									Cédula:
								</label>
								<input
									type="number"
									id="identification"
									inputMode="numeric"
									value={userData.identification}
									onChange={handlerCedula}
									className="w-full border rounded p-2"
									placeholder="Cédula"
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="birthday"
									className="font-bold text-xl"
								>
									Fecha de Nacimiento:
								</label>
								<input
									type="date"
									id="birthday"
									value={userData.birth}
									onChange={(e) =>
										setUserData({
											...userData,
											birth: e.target.value,
										})
									}
									className="w-full border rounded p-2"
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="phone"
									className="font-bold text-xl"
								>
									Celular:
								</label>
								<input
									type="number"
									id="phone"
									inputMode="numeric"
									value={userData.phone}
									onChange={handlerCelular}
									className="w-full border rounded p-2"
									placeholder="Celular"
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="location"
									className="font-bold text-xl"
								>
									Dirección:
								</label>
								<input
									type="text"
									id="location"
									value={userData.location}
									onChange={(e) =>
										setUserData({
											...userData,
											location: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Dirección"
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="email"
									className="font-bold text-xl"
								>
									Correo:
								</label>
								<input
									type="email"
									id="email"
									value={userData.email}
									onChange={(e) =>
										setUserData({
											...userData,
											email: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Correo electrónico"
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="font-bold text-xl"
								>
									Contraseña:
								</label>
								<input
									type="password"
									id="password"
									value={userData.password}
									onChange={(e) =>
										setUserData({
											...userData,
											password: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Contraseña"
								/>
							</div>
							<div>
								<label
									htmlFor="confirmPassword"
									className="font-bold text-xl"
								>
									Confirmar Contraseña:
								</label>
								<input
									type="password"
									id="confirmPassword"
									value={userData.password}
									onChange={(e) =>
										setUserData({
											...userData,
											password: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Confirmar Contraseña"
								/>
							</div>
						</div>
						<div className="flex justify-center mb-4">
							<Button type="submit">Registrarse</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
