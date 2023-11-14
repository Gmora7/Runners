"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import { PotentialUser } from "@/types";

export default function ListPotentialUsers() {
	const [potentialUsers, setPotentialUsers] = useState<PotentialUser[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/potentialUsers");
			const json = await response.json();
			setPotentialUsers(json);
		};
		fetchData();
	}, []);

	const filtrarPotentialUsers = () =>
		potentialUsers.filter((user) => user._id);

	const deletePotentialUser = async (user: PotentialUser) => {
		try {
			const response = await fetch("/api/potentialUsers", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user.email),
			});

			if (response.ok) {
				// Eliminación exitosa, actualiza el estado de noticias
				setPotentialUsers((prevUsers) =>
					prevUsers.filter((n) => n !== user)
				);
			} else {
				throw new Error(
					"Error HTTP: " + response.status + response.text()
				);
			}
		} catch (error) {
			console.error("Error al eliminar potential user", error);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen">
			<Header title="Usuarios Potenciales" />
			<div className="container mx-auto p-4">
				<div className="flex justify-center">
					<table className="min-w-full bg-white border rounded-lg shadow-md">
						<thead>
							<tr className="border-b">
								<th className="text-left p-3">Nombre</th>
								<th className="text-left p-3">Apellidos</th>
								<th className="text-left p-3">Celular</th>
								<th className="text-left p-3">Correo</th>
							</tr>
						</thead>
						<tbody>
							{filtrarPotentialUsers().map((user) => (
								<tr
									key={user._id}
									className={`border-b hover:bg-gray-100`}
								>
									<td className="p-3">{user.name}</td>
									<td className="p-3">{user.lastname}</td>
									<td className="p-3">{user.phone}</td>
									<td className="p-3">{user.email}</td>
									<td className="p-3">
										<button
											onClick={() =>
												deletePotentialUser(user)
											}
											className="text-red-600 hover:underline"
										>
											Eliminar Usuario Potencial
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
