"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Alert from "@/components/Alert/Alert";
import { News } from "@/types";

export default function DeleteNews() {
	const [news, setNews] = useState<News[]>([]);
	const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/news");
			const json = await response.json();
			setNews(json);
		};
		fetchData();
	}, []);

	const handleDeleteNews = async (newsToDelete: News) => {
		const response = await fetch(`/api/news/${newsToDelete._id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			setIsSuccessful(false);
			return;
		}
		setIsSuccessful(true);
		setNews(news.filter((news) => news._id !== newsToDelete._id));
	};
	const onClose = () => {
		setIsSuccessful(null);
	};

	return (
		<>
			<Header title="Elimar noticia" />
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
				{isSuccessful != null && (
					<Alert
						isSuccessful={isSuccessful}
						message={
							isSuccessful
								? "Noticia eliminada"
								: "Error al eliminar noticia"
						}
						onClose={onClose}
					/>
				)}
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border rounded-lg shadow-md">
						<thead>
							<tr className="border-b bg-blue-500 text-white">
								<th className="text-center p-3">Título</th>
								<th className="text-center p-3">Categoría</th>
								<th className="text-center p-3">Cuerpo</th>
								<th className="text-center p-3">Fecha</th>
								<th className="text-center p-3">Acción</th>
							</tr>
						</thead>
						<tbody>
							{news.map((pNews) => (
								<tr
									key={pNews._id}
									className={`border-b hover:bg-gray-100 bg-blue-100`}
								>
									<td className="p-3">{pNews.title}</td>
									<td className="p-3">{pNews.category}</td>
									<td className="p-3">{pNews.body}</td>
									<td className="p-3">{pNews.date}</td>
									<td className="p-3">
										<button
											onClick={() =>
												handleDeleteNews(pNews)
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
