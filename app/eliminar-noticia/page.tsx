"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";

interface Noticia {
	_id: string;
	title: string;
	date: string;
}

export default function EliminarAtleta() {
	const [noticias, setNoticias] = useState<Noticia[]>([]);
	const [selectedNoticias, setSelectedNoticias] = useState<Noticia | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/news");
			const json = await response.json();
			console.log(json);
			setNoticias(json);
		};
		fetchData();
	}, []);

    const filtrarNoticias = () => noticias.filter((user) => user._id);

	const deleteNoticia = async (noticia: Noticia) => {
        try {
          const response = await fetch('/api/news', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(noticia),
          });
          console.log("pasa el response...");
    
          if (response.ok) {
            // Eliminación exitosa, actualiza el estado de noticias
            setNoticias((prevNoticias) =>
              prevNoticias.filter((n) => n.title !== noticia.title)
            );
          } else {
            throw new Error(
                "Error HTTP: " + response.status + response.text()
            );
          }
        } catch (error) {
            console.error("Error al eliminar la noticia...", error);
        }
      };


    return (
		<div className="bg-gray-100 min-h-screen">
			<Header title="Eliminar Noticia" />
			<div className="container mx-auto p-4">
				<div className="flex justify-center">
						<table className="min-w-full bg-white border rounded-lg shadow-md">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3">Título de la Noticia</th>
									<th className="text-left p-3">Fecha</th>
									<th className="text-left p-3"></th>
								</tr>
							</thead>
							<tbody>
								{filtrarNoticias().map((noticia) => (
									<tr
										key={noticia._id}
										className={`border-b hover:bg-gray-100 ${
											selectedNoticias?._id === noticia._id
												? "bg-blue-100"
												: ""
										}`}
									>
										<td className="p-3">{noticia.title}</td>
										<td className="p-3">
											{noticia.date}
										</td>
										<td className="p-3">
											<button
												onClick={() =>
													deleteNoticia(noticia)
												}
												className="text-red-600 hover:underline"
											>
												Eliminar
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