"use client";
import { useState } from "react";
import Button from "@/components/Button/Button";
import Alert from "@/components/Alert/Alert";
import { User } from "@/types";

export default function AddNews() {
	const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);
	const [news, setNews] = useState({
		src: "",
		category: "",
		title: "",
		body: "",
		date: new Date().toISOString().split("T")[0],
	});

	const handlerSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/news", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(news),
			});

			if (!response.ok) {
				setIsSuccessful(false);
				return;
			}

			const newNews = await response.json();
			const { title, body } = newNews;

			const usersResponse = await fetch("/api/users");
			if (!usersResponse.ok) {
				setIsSuccessful(false);
				return;
			}

			const users: User[] = await usersResponse.json();
			const usersToNotify = users.filter((user) => user.isSuscribed);

			await Promise.all(
				usersToNotify.map(async (user) => {
					const toEmail = user.email;
					const optText = `${body}`;
					const subject = `Nueva noticia: ${title}`;

					const mailResponse = await fetch("/api/mail", {
						method: "POST",
						body: JSON.stringify({ toEmail, subject, optText }),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (!mailResponse.ok) {
						setIsSuccessful(false);
						return;
					}
				})
			);
			setIsSuccessful(true);
		} catch (error) {
			console.error("Error al agregar la noticia...", error);
		}
	};

	const handleAlertClose = () => {
		setIsSuccessful(null);
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-3xl font-bold mb-2">Agregar Noticia</h1>
				{isSuccessful != null && (
					<Alert
						message={
							isSuccessful
								? "Noticia fue agregada correctamente!"
								: "Error al agregar la noticia."
						}
						onClose={handleAlertClose}
						isSuccessful={isSuccessful}
					/>
				)}
				<div className="w-4/5 md:w-3/5 lg:w-2/5 rounded overflow-hidden shadow-lg bg-white p-4 m-2">
					<form onSubmit={handlerSubmit}>
						<div className="mb-4">
							<div className="mb-2">
								<label
									htmlFor="title"
									className="font-bold text-xl"
								>
									Título:
								</label>
								<input
									type="text"
									id="title"
									value={news.title}
									onChange={(e) =>
										setNews({
											...news,
											title: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Título"
								/>
							</div>
						</div>
						<div className="mb-4">
							<div className="mb-2">
								<label
									htmlFor="category"
									className="font-bold text-xl"
								>
									Categoría:
								</label>
								<input
									type="text"
									id="category"
									value={news.category}
									onChange={(e) =>
										setNews({
											...news,
											category: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Categoría"
								/>
							</div>
						</div>
						<div className="mb-4">
							<div className="mb-2">
								<label
									htmlFor="imagen"
									className="font-bold text-xl"
								>
									Imagen:
								</label>
								<input
									type="text"
									id="imagen"
									value={news.src}
									onChange={(e) =>
										setNews({
											...news,
											src: e.target.value,
										})
									}
									className="w-full border rounded p-2"
									placeholder="Imagen"
								/>
								<p className="text-sm text-gray-500">
									Agrega la URL de la imagen aquí.
								</p>
							</div>
						</div>
						<div className="mb-4">
							<div className="mb-2">
								<label
									htmlFor="body"
									className="font-bold text-xl"
								>
									Cuerpo de la Noticia:
								</label>
								<textarea
									id="body"
									value={news.body}
									onChange={(e) =>
										setNews({
											...news,
											body: e.target.value,
										})
									}
									className="w-full border rounded p-2 h-40"
									placeholder="Cuerpo"
								/>
							</div>
						</div>
						<div className="flex justify-center mb-4">
							<Button type="submit">Agregar Noticia</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
