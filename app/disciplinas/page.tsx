"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";

interface IDiscipline {
	title: string;
	description: string;
	_id: number;
	categories: string[];
}

enum eCategory {
	U13 = "U13",
	U15 = "U15",
	U18 = "U18",
	U20 = "U20",
	U23 = "U23",
	Mayor = "Mayor",
}

const Disciplines = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("U13");
	const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/disciplines");
				const json = await response.json();
				setDisciplines(json);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);
	const filteredDisciplines =
		selectedCategory === "General"
			? disciplines
			: disciplines.filter((disc) =>
					disc.categories.includes(selectedCategory)
			  );

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category);
	};

	return (
		<div className="min-h-screen">
			<Header title="Disciplinas" />
			<div className="flex justify-center flex-wrap w-full p-8">
				{Object.values(eCategory).map((category) => (
					<button
						key={category}
						onClick={() => handleCategoryClick(category)}
						className={`mx-2 my-1 px-4 py-2 rounded-full ${
							selectedCategory === category
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-700"
						}`}
					>
						{category}
					</button>
				))}
			</div>
			<table className="table-auto mx-auto my-8 rounded-lg overflow-hidden shadow-lg">
				<thead className="bg-gray-200">
					<tr>
						<th className="px-4 py-2 text-left">Categoría</th>
						<th className="px-4 py-2 text-left">Descripción</th>
					</tr>
				</thead>
				<tbody>
					{filteredDisciplines.map((discipline) => (
						<tr key={discipline._id} className="bg-white">
							<td className="border px-4 py-2">
								{discipline.title}
							</td>
							<td className="border px-4 py-2">
								{discipline.description}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Disciplines;
