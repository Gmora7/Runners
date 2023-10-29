"use client";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import AdministratorOption from "@/components/AdministratorOption/AdministratorOption";

export default function AdminMenu() {
	const router = useRouter();
	const handlerAddCompetence = () => {
		router.push("/agregar-competencia");
	};
	const handlerListAthletes = () => {
		router.push("/listar-atletas");
	};
	const handlerListPotentialUsers = () => {
		router.push("/usuarios-potenciales");
	};
	const handlerAddNews = () => {
		router.push("/agregar-noticia");
	};
	const handlerDeleteNew = () => {
		router.push("/eliminar-noticia");
	};
	return (
		<div className="bg-gray-100 min-h-screen">
			<Header title="Menú administrador" />
			<div className="container mx-auto px-4 py-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<AdministratorOption
						title="Agregar Competencia"
						description="Agrega una nueva competencia al sistema."
						buttonLabel="Agregar Competencia"
						onClick={handlerAddCompetence}
					/>
					<AdministratorOption
						title="Listar Atletas"
						description="Lista a todos los atletas del equipo."
						buttonLabel="Listar Atletas"
						onClick={handlerListAthletes}
					/>
					<AdministratorOption
						title="Listar Usuarios Potenciales"
						description="Lista a todos los usuarios potenciales del equipo."
						buttonLabel="Listar Usuarios Potenciales"
						onClick={handlerListPotentialUsers}
					/>
					<AdministratorOption
						title="Agregar Noticia"
						description="Agregar una noticia para la comunidad."
						buttonLabel="Agregar Noticia"
						onClick={handlerAddNews}
					/>
					<AdministratorOption
						title="Eliminar Noticia"
						description="Eliminar una noticia para la comunidad."
						buttonLabel="Eliminar Noticia"
						onClick={handlerDeleteNew}
					/>
				</div>
			</div>
		</div>
	);
}
