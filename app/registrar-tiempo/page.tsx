"use client";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "@/components/Alert/Alert";
import styles from "./Tiempos.module.css";

export default function RegistrarTiempo() {
	const router = useRouter();
	interface Category {
		name: string;
	}
	interface Discipline {
		title: string;
		description: string;
		categories: Category[];
		hasTime: Boolean;
	}
	const [categories, setCategories] = useState<Category[]>();
	const [selectedCategory, setSelectedCategory] = useState<Category>();
	const [disciplines, setDisciplines] = useState<Discipline[]>();
	const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>();
	const [tiempoAtleta, setTiempoAtleta] = useState("");
	const [unidad, setUnidad] = useState("Segundos");
	const [userData, setUserData] = useState({
		name: "",
		lastname: "",
		identification: "",
		birth: "",
		phone: "",
		location: "",
		email: "",
	});
	const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategory = categories?.find(
			(comp) => comp.name === e.target.value
		);
		setSelectedCategory(selectedCategory);
		setSelectedDiscipline(undefined);
	};

	const handleDisciplineChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedDiscipline = disciplines?.find(
			(comp) => comp.title === e.target.value
		);
		setSelectedDiscipline(selectedDiscipline);
	};

	const handleTiempoAtletaChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const inputValue = e.target.value;
		if (/^\d+(\.\d{0,2})?$/.test(inputValue)) {
			setTiempoAtleta(inputValue);
		}
	};
	const handleDistanciaAtletaChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const inputValue = e.target.value;
		if (/^\d+(\.\d{0,2})?$/.test(inputValue)) {
			setUnidad("Metros");
			setTiempoAtleta(inputValue);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userId = localStorage.getItem("id");
				const response = await fetch(`api/categories`);
				const json = await response.json();
				setCategories(json);

				const disciplines = await fetch(`api/disciplines`);
				const jsonDisciplines = await disciplines.json();
				setDisciplines(jsonDisciplines);

				const getAtleta = await fetch(`api/users/${userId}`);
				if (!getAtleta.ok) {
					throw new Error(`Error HTTP: ${getAtleta.status}`);
				}
				const userData = await getAtleta.json();
				setUserData(userData);
			} catch (error) {
				console.error("Error al obtener datos de usuario:", error);
			}
		};
		fetchData();
	}, []);

	const categoryOptions = categories?.map((category) => (
		<option key={category.name} value={category.name}>
			{category.name}
		</option>
	));

	const disciplineOptions = disciplines?.map((discipline) => (
		<option key={discipline.title} value={discipline.title}>
			{discipline.title}
		</option>
	));
	const handlerRegistro = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const userId = localStorage.getItem("id");
		const performanceData = {
			category: selectedCategory,
			discipline: selectedDiscipline,
			athleteId: userData,
			record: tiempoAtleta,
			unit: unidad,
		};
		try {
			const response = await fetch("api/performance", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(performanceData),
			});
			if (!response.ok) {
				setIsSuccessful(false);
				throw new Error(
					"Error HTTP: " + response.status + response.text()
				);
			}
			setIsSuccessful(true);
		} catch (error) {
			console.error("Error al registrar el tiempo", error);
		}
	};
	const handleAlertClose = () => {
		setIsSuccessful(null);
		router.push("/menu-atleta");
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-3xl font-bold mb-2">Registro de Tiempos</h1>
				{isSuccessful != null && (
					<Alert
						message={
							isSuccessful
								? "Tiempo fue registrado con éxito!"
								: "Error al registrar el tiempo"
						}
						onClose={handleAlertClose}
						isSuccessful={isSuccessful}
					/>
				)}
				<div className="w-4/5 md:w-3/5 lg:w-2/5 rounded overflow-hidden shadow-lg bg-white p-4 m-2">
					<form>
						<div className="mb-4">
							<div className="mb-2">
								<label
									htmlFor="categorySelect"
									className="font-bold text-xl"
								>
									Categoría:
								</label>
								<select
									id="categorySelect"
									value={selectedCategory?.name}
									onChange={handleCategoryChange}
									className="w-full border rounded p-2"
								>
									<option value="">
										Selecciona una Categoría
									</option>
									{categoryOptions}
								</select>
							</div>
						</div>
						{selectedCategory && (
							<>
								<div className="mb-4">
									<div className="mb-2">
										<label
											htmlFor="disciplineSelect"
											className="font-bold text-xl"
										>
											Disciplina:
										</label>
										<select
											id="disciplineSelect"
											value={selectedDiscipline?.title}
											onChange={handleDisciplineChange}
											className="w-full border rounded p-2"
										>
											<option value="">
												Selecciona una Disciplina
											</option>
											{disciplineOptions}
										</select>
									</div>
								</div>
								{selectedDiscipline &&
									selectedDiscipline.hasTime && (
										<>
											<div className="mb-4">
												<div
													className={
														styles.instructions
													}
												>
													<label
														htmlFor="tiempoAtleta"
														className="font-bold text-xl"
													>
														Tiempo del Atleta:
													</label>
													<ul>
														<li>
															Digite el valor en
															formato XX.YY.
														</li>
														<li>
															XX viene siendo la
															cantidad de minutos
															o segundos, según
															corresponda.
														</li>
														<li>
															YY viene siendo la
															cantidad de segundos
															o milisegundos,
															según corresponda.
														</li>
														<li>
															Seleccione la opción
															de abajo eligiendo
															si desea que XX sean
															minutos o segundos.
														</li>
													</ul>
													<input
														type="number"
														id="tiempoAtleta"
														value={tiempoAtleta}
														onChange={
															handleTiempoAtletaChange
														}
														step="0.01" // Para permitir dos decimales
														min="0" // Valor mínimo (ajusta según tus necesidades)
														className="w-full border rounded p-2"
													/>
													<select
														className="mt-2"
														value={unidad}
														onChange={(e) =>
															setUnidad(
																e.target.value
															)
														}
													>
														<option value="Segundos">
															Segundos
														</option>
														<option value="Minutos">
															Minutos
														</option>
													</select>
												</div>
											</div>
										</>
									)}
								{selectedDiscipline &&
									!selectedDiscipline.hasTime && (
										<>
											<div className="mb-4">
												<div
													className={
														styles.instructions
													}
												>
													<label
														htmlFor="distanciaAtleta"
														className="font-bold text-xl"
													>
														Distancia del Atleta:
													</label>
													<ul>
														<li>
															Digite el valor en
															formato XX.YY.
														</li>
														<li>
															XX viene siendo la
															cantidad de metros.
														</li>
														<li>
															YY viene siendo la
															cantidad de
															centimetros.
														</li>
														<li>
															Nota: En caso de no
															necesitar
															centímetros, no es
															necesario utilizar
															&quot;.&quot;.
														</li>
													</ul>
													<input
														type="number"
														id="distanciaAtleta"
														value={tiempoAtleta}
														onChange={
															handleDistanciaAtletaChange
														}
														step="0.01" // Para permitir dos decimales
														min="0" // Valor mínimo (ajusta según tus necesidades)
														className="w-full border rounded p-2"
													/>
												</div>
											</div>
										</>
									)}
							</>
						)}
						<div className="flex justify-center mb-4">
							<Button onClick={handlerRegistro}>
								Registrar Tiempo
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
