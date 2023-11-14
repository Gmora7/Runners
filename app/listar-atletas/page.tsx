"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Alert from "@/components/Alert/Alert";

interface Athlete {
	_id: string;
	name: string;
	lastname: string;
	phone: string;
	email: string;
	identification: string;
	rol: boolean;
}

export default function ListAthletes() {
	const [athletes, setAthletes] = useState<Athlete[]>([]);
	const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/users");
			const json = await response.json();
			setAthletes(json);
		};
		fetchData();
	}, []);

	const filterAthletes = () => athletes.filter((athlete) => athlete.rol);

	const handleDeleteUser = async (userToDelete: Athlete) => {
		const response = await fetch(
			`/api/users/${userToDelete.identification}`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) {
			setIsSuccessful(false);
			return;
		}
		setIsSuccessful(true);
		setAthletes(athletes.filter((user) => user._id !== userToDelete._id));
	};
	const onClose = () => {
		setIsSuccessful(null);
	};

	return (
		<>
			<Header title="Administración de usuarios" />
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
				{isSuccessful != null && (
					<Alert
						isSuccessful={isSuccessful}
						message={
							isSuccessful
								? "Usuario eliminado"
								: "Error al eliminar usuario"
						}
						onClose={onClose}
					/>
				)}
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border rounded-lg shadow-md">
						<thead>
							<tr className="border-b bg-blue-500 text-white">
								<th className="text-center p-3">Nombre</th>
								<th className="text-center p-3">Apellido</th>
								<th className="text-center p-3">
									Identificación
								</th>
								<th className="text-center p-3">Teléfono</th>
								<th className="text-center p-3">Correo</th>
								<th className="text-center p-3">Acción</th>
							</tr>
						</thead>
						<tbody>
							{filterAthletes().map((athlete) => (
								<tr
									key={athlete._id}
									className={`border-b hover:bg-gray-100 bg-blue-100`}
								>
									<td className="p-3">{athlete.name}</td>
									<td className="p-3">{athlete.lastname}</td>
									<td className="p-3">
										{athlete.identification}
									</td>
									<td className="p-3">{athlete.phone}</td>
									<td className="p-3">{athlete.email}</td>
									<td className="p-3">
										<button
											onClick={() =>
												handleDeleteUser(athlete)
											}
											className="text-red-600 hover:underline"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
