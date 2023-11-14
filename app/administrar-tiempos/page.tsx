"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Modal from 'react-modal';
import Alert from "@/components/Alert/Alert";
Modal.setAppElement('*');
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

interface Category {
    name: string;
};
interface Discipline {
    title: string;
    description: string;
    categories: Category[];
    hasTime: Boolean;
}
interface User {
    name: String;
    lastname: String;
    identification: String;
    birth: String;
    phone: String;
    location: String;
    email: String;
}

interface Performance {
    _id: string;
    category: Category;
    discipline: Discipline;
    athleteId: User;
    record: String;
    unit: String;
}

export default function ListTiempos() {
    const router = useRouter();
    const [tiempos, setTiempos] = useState<Performance[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPerformance, setSelectedPerformance] = useState<Performance>();
    const [nuevoTiempo, setNuevoTiempo] = useState("");
    const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);
    const [filterBy, setFilterBy] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);

    const handleNuevoTiempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (/^\d+(\.\d{0,2})?$/.test(inputValue)) {
          setNuevoTiempo(inputValue);
        }
      };

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/performance");
			const json = await response.json();
			setTiempos(json);

            const responseCategories = await fetch("/api/categories")
            const jsonCategories = await responseCategories.json();
            setCategories(jsonCategories);

            const responseDisciplines = await fetch("/api/disciplines")
            const jsonDisciplines = await responseDisciplines.json();
            setDisciplines(jsonDisciplines);
		};
		fetchData();
	}, []);

    const handleUpdatePerformance = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await fetch(`api/performance`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({category: selectedPerformance?.category,
                discipline: selectedPerformance?.discipline,
                athleteId: selectedPerformance?.athleteId,
                record: nuevoTiempo,
                unit: selectedPerformance?.unit
                }),
            });
            if (!response.ok) {
                setIsSuccessful(false);
                  throw new Error(
                      "Error HTTP: " + response.status + response.text()
                );
            }
            closeModal();
            setIsSuccessful(true);
        } catch (error) {
            console.error("Error al actualizar los datos", error);
        }
    };


    const openModal = (performance: Performance) => {
        setNuevoTiempo(performance.record.toString());
        setIsModalOpen(true);
        setSelectedPerformance(performance);
      };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPerformance(undefined);
      };

	const filtrarPerformance = () =>
		tiempos.filter((tiempo) => tiempo._id);

    const handleAlertClose = () => {
        setIsSuccessful(null);
        router.push("/menu-administrador");
    };

    const handleFilterByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(e.target.value);
        setSelectedFilter("");
    };
    const handleSelectedFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(e.target.value);
    };

    const filtrarPerformanceByFilters = () => {
        if (filterBy === 'discipline') {
          return tiempos.filter((user) => user.discipline.title === selectedFilter);
        } else if (filterBy === 'category') {
          return tiempos.filter((user) => user.category.name === selectedFilter);
        }
        return tiempos;
    };
    const obtenerOpcionesDeDisciplinas = () => {
        return disciplines.map((discipline) => (
            <option key={discipline.title} value={discipline.title}>
              {discipline.title}
            </option>
          ));
    }
    const obtenerOpcionesDeCategorias = () => {
        return categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ));
    }

	return (
		<div className="bg-gray-100 min-h-screen">
			<Header title="Administrar Tiempos de Atletas" />
			<div className="container mx-auto p-4">
                {isSuccessful != null && (
                    <Alert
                        message={
                            isSuccessful
                            ? "Tiempo modificado exitosamente"
                            : "Error al actualizar sus datos"
                        }
                        onClose={handleAlertClose}
                        isSuccessful={isSuccessful}
                    />
                )}
				<div className="flex justify-end">
                    <label htmlFor="filter" className="mr-1">Filtrar por:</label>
                    <select value={filterBy} onChange={handleFilterByChange} style={{ background: 'transparent', border: '1px solid #ccc' }}>
                        <option value="discipline">Disciplina</option>
                        <option value="category">Categoría</option>
                    </select>
                    {filterBy && (
                        <select value={selectedFilter} onChange={handleSelectedFilter} style={{ background: 'transparent', border: '1px solid #ccc' }}>
                        <option value="">Seleccionar</option>
                        {filterBy === 'discipline'
                            ? obtenerOpcionesDeDisciplinas()
                            : obtenerOpcionesDeCategorias()}
                        </select>
                    )}
                </div>
                </div>
                    <div className="flex justify-center"></div>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Digite el Nuevo Tiempo del Atleta"
                        style={{
                            overlay: {
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                              width: '50%', 
                              maxHeight: '20%',
                              margin: 'auto',
                              padding: '20px', 
                              border: '1px solid #ccc', 
                            },
                          }}
                    >
                        {selectedPerformance && (
                        <div>
                            <h2>Modificar Tiempo del Atleta</h2>
                            <input
                              type="number"
                              id="distanciaAtleta"
                              value={nuevoTiempo}
                              onChange={handleNuevoTiempoChange}
                              step="0.01"
                              min="0"     
                              className="w-full border rounded p-2"
                            />
                            <Button onClick={handleUpdatePerformance}>Guardar</Button>
                        </div>
                        )}
                    </Modal>
					<table className="min-w-full bg-white border rounded-lg shadow-md">
						<thead>
							<tr className="border-b">
								<th className="text-left p-3">Nombre</th>
								<th className="text-left p-3">Apellidos</th>
								<th className="text-left p-3">Disciplina</th>
								<th className="text-left p-3">Categoría</th>
                                <th className="text-left p-3">Tiempo/Distancia</th>							
                            </tr>
						</thead>
						<tbody>
							{(filterBy && selectedFilter ? filtrarPerformanceByFilters() : filtrarPerformance()).map((user) => (
								<tr
									key={user._id}
									className={`border-b hover:bg-gray-100`}
								>
									<td className="p-3">{user.athleteId.name}</td>
									<td className="p-3">{user.athleteId.lastname}</td>
									<td className="p-3">{user.discipline.title}</td>
									<td className="p-3">{user.category.name}</td>
                                    <td className="p-3" style={{ whiteSpace: 'nowrap' }}>
                                        <span>{user.record}</span>
                                        <span> {user.unit}</span>
                                    </td>
									<td className="p-3">
										<button
											onClick={() =>
												openModal(
													user
												)
											}
											className="text-blue-600 hover:underline"
										>Modificar Tiempo</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
	);
}