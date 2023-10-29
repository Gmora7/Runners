"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";

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
	const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/users");
			const json = await response.json();
			console.log(json);
			setAthletes(json);
		};
		fetchData();
	}, []);

	const filtrarAthletes = () => athletes.filter((athlete) => athlete.rol);

	const handleSelectAthlete = (athlete: Athlete) => {
		setSelectedAthlete(athlete);
	};

	const handleClearSelection = () => {
		setSelectedAthlete(null);
	};

	const handleDeleteAthlete = () => {
		if (selectedAthlete) {
			// Implement your delete logic here
			// You can make an API call to delete the selected athlete
			// After successful deletion, clear the selection
			setSelectedAthlete(null);
		}
	};

	return (
		<div className="min-h-screen">
			<Header title="Dashboard" />
			<div className="container mx-auto p-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border rounded-lg shadow-md">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3">Name</th>
									<th className="text-left p-3">Lastname</th>
									<th className="text-left p-3">
										Identification
									</th>
									<th className="text-left p-3">Phone</th>
									<th className="text-left p-3">Email</th>
								</tr>
							</thead>
							<tbody>
								{filtrarAthletes().map((athlete) => (
									<tr
										key={athlete._id}
										className={`border-b hover:bg-gray-100 ${
											selectedAthlete?._id === athlete._id
												? "bg-blue-100"
												: ""
										}`}
									>
										<td className="p-3">{athlete.name}</td>
										<td className="p-3">
											{athlete.lastname}
										</td>
										<td className="p-3">
											{athlete.identification}
										</td>
										<td className="p-3">{athlete.phone}</td>
										<td className="p-3">{athlete.email}</td>
										<td className="p-3">
											<button
												onClick={() =>
													handleSelectAthlete(athlete)
												}
												className="text-blue-600 hover:underline"
											>
												Select
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{selectedAthlete && (
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h2 className="text-lg font-semibold">
								{selectedAthlete.name}
							</h2>
							<p>ID: {selectedAthlete._id}</p>
							<p>
								Role:{" "}
								{selectedAthlete.rol
									? "Athlete"
									: "Non-Athlete"}
							</p>
							<div className="mt-4 space-x-4">
								<button
									onClick={handleClearSelection}
									className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
								>
									Clear Selection
								</button>
								<button
									onClick={handleDeleteAthlete}
									className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
								>
									Delete Athlete
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
