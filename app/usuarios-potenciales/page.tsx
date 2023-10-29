"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";

interface PotentialUser {
	_id: string;
	name: string;
	lastname: string;
	phone: string;
	email: string;
}

export default function ListPotentialUsers() {
	const [potentialUsers, setPotentialUsers] = useState<PotentialUser[]>([]);
	const [selectedUser, setSelectedUser] = useState<PotentialUser | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/potentialUsers");
			const json = await response.json();
			console.log(json);
			setPotentialUsers(json);
		};
		fetchData();
	}, []);

    const filtrarPotentialUsers = () => potentialUsers.filter((user) => user._id);

	const handleSelectedPotentialUser = (potentialUser: PotentialUser) => {
		setSelectedUser(potentialUser);
	};

	const handleClearSelection = () => {
		setSelectedUser(null);
	};

	const handleDeleteAthlete = () => {
		if (selectedUser) {
			// Implement your delete logic here
			// You can make an API call to delete the selected athlete
			// After successful deletion, clear the selection
			setSelectedUser(null);
		}
	};

    return (
		<div className="bg-gray-100 min-h-screen">
			<Header title="Dashboard" />
			<div className="container mx-auto p-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border rounded-lg shadow-md">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3">Name</th>
									<th className="text-left p-3">Lastname</th>
									<th className="text-left p-3">Phone</th>
									<th className="text-left p-3">Email</th>
								</tr>
							</thead>
							<tbody>
								{filtrarPotentialUsers().map((user) => (
									<tr
										key={user._id}
										className={`border-b hover:bg-gray-100 ${
											selectedUser?._id === user._id
												? "bg-blue-100"
												: ""
										}`}
									>
										<td className="p-3">{user.name}</td>
										<td className="p-3">
											{user.lastname}
										</td>
										<td className="p-3">{user.phone}</td>
										<td className="p-3">{user.email}</td>
										<td className="p-3">
											<button
												onClick={() =>
													handleSelectedPotentialUser(user)
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
				</div>
			</div>
		</div>
	);
}