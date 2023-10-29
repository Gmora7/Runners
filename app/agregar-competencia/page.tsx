"use client";
import Button from "@/components/Button/Button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AgregarCompetencia() {
	const nameRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const timeRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const itemsPerPage = 5;
	interface Discipline {
		_id: number,
		title: string,
		description: string,
	}
	interface Categorie {
		_id: number,
		name: string
	}
	const [disciplinas, setDisciplinas] = useState<Discipline[]>([]);
	const [categorias, setCategorias] = useState<Categorie[]>([]);
	const [seleccionCategorias, setSeleccionCategorias] = useState<Categorie[]>([]);
	const [seleccionDisciplinas, setSeleccionDisciplinas] = useState<Discipline[]>([]);

	const convertirAString = (categorias: Categorie[], disciplinas: Discipline[]) => {
		const categoriasString = categorias.map((categoria) => `${categoria.name}`);
		const disciplinasString = disciplinas.map((disciplina) => `${disciplina.title} ${disciplina.description}`);
		
		return { categoriasString, disciplinasString };
	  };

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const name = nameRef.current?.value;
		const date = dateRef.current?.value;
		const time = timeRef.current?.value;
		const { categoriasString, disciplinasString } = convertirAString(seleccionCategorias, seleccionDisciplinas);
		//console.log("disciplinas: ", disciplinasString);
		//console.log("categorias: ", categoriasString);
		const userData = { name, date, time, disciplines: disciplinasString, categories: categoriasString};
		try {
			const response = await fetch("/api/competences", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error(
					"Error HTTP: " + response.status + response.text()
				);
			}
			router.push("/menu-administrador");
		} catch (error) {
			console.error("Error al registrar la competencia", error);
		}
	};

	const handleSeleccionCategoria = (categoria: Categorie) => {
		setSeleccionCategorias((prevSeleccion) => {
		  // Clona el array de selección anterior
		  const nuevoSeleccion = [...prevSeleccion];
	  
		  // Verifica si la categoría ya está en el array
		  const categoriaIndex = nuevoSeleccion.findIndex((c) => c._id === categoria._id);
	  
		  if (categoriaIndex === -1) {
			// Si la categoría no está en el array, la agrega
			nuevoSeleccion.push(categoria);
		  } else {
			// Si la categoría ya está en el array, la quita
			nuevoSeleccion.splice(categoriaIndex, 1);
		  }
	  
		  return nuevoSeleccion;
		});
	  };
	  
	  const handleSeleccionDisciplina = (disciplina: Discipline) => {
		setSeleccionDisciplinas((prevSeleccion) => {
		  // Clona el array de selección anterior
		  const nuevoSeleccion = [...prevSeleccion];
		  // Verifica si la disciplina ya está en el array
		  const disciplinaIndex = nuevoSeleccion.findIndex((d) => d._id === disciplina._id);
	  
		  if (disciplinaIndex === -1) {
			// Si la disciplina no está en el array, la agrega
			nuevoSeleccion.push(disciplina);
		  } else {
			// Si la disciplina ya está en el array, la quita
			nuevoSeleccion.splice(disciplinaIndex, 1);
		  }
	  
		  return nuevoSeleccion;
		});
	  };

	useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`api/disciplines`);
            
            if (!response.ok) {
              throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const disciplinasRes = await response.json();
            //console.log(disciplinasRes);
            setDisciplinas(disciplinasRes);

			const responseCategories = await fetch(`api/categories`);
            
            if (!responseCategories.ok) {
              throw new Error(`Error HTTP: ${responseCategories.status}`);
            }
            
            const categoriesRes = await responseCategories.json();
            //console.log(categoriesRes);
            setCategorias(categoriesRes);

          } catch (error) {
            console.error("Error al obtener disciplinas / competencias:", error);
          }
        };
        fetchData();
      }, []);

	return (
		<>
			<div className="flex flex-col items-center justify-center min-screen">
				<h1 className="text-3xl font-bold mb-2 mt-4">
					Agregar Competencia
				</h1>
				<div className="rounded overflow-hidden shadow-lg bg-white p-4 m-2">
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<div className="mb-2">
								<label
									htmlFor="name"
									className="font-bold text-xl"
								>
									Nombre de la Competencia:
								</label>
								<input
									type="text"
									id="name"
									className="w-full border rounded p-2"
									placeholder="Nombre"
									ref={nameRef}
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="date"
									className="font-bold text-xl"
								>
									date de la Competencia:
								</label>
								<input
									type="date"
									id="date"
									className="w-full border rounded p-2"
									placeholder="date"
									ref={dateRef}
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="time"
									className="font-bold text-xl"
								>
									time de la Competencia:
								</label>
								<input
									type="time"
									id="time"
									className="w-full border rounded p-2"
									placeholder="time"
									ref={timeRef}
								/>
							</div>
						</div>
						<div className="mb-4">
						<label className="font-bold text-xl">Categorías Participantes:</label>
						<div className="flex flex-wrap">
							{categorias.map((categoria, index) => (
							<div key={index} className="w-1/5 p-2">
								<label className="m-2">
								<input
									type="checkbox"
									name="categorias"
									value={categoria.name}
									onChange={() => handleSeleccionCategoria(categoria)}
								/>
								{categoria.name}
								</label>
							</div>
							))}
						</div>
						</div>
						<div className="mb-4">
						<label className="font-bold text-xl">Disciplinas Participantes:</label>
						<div className="flex flex-wrap">
							{disciplinas.map((disciplina, index) => (
							<div key={index} className="w-1/5 p-2">
								<label className="m-2">
								<input
									type="checkbox"
									name="disciplinas"
									value={disciplina.title}
									onChange={() => handleSeleccionDisciplina(disciplina)}
								/>
								{disciplina.title + " " + disciplina.description}
								</label>
							</div>
							))}
						</div>
						</div>
						<div className="flex justify-center mb-4">
						<Button type="submit">Agregar</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
