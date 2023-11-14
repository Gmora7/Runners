"use client";
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
	const handlerAddNews = () => {
		router.push("/agregar-noticia");
	};
	const handlerDeleteNew = () => {
		router.push("/eliminar-noticia");
	};
	const handlerPotentialUsers = () => {
		router.push("/usuarios-potenciales");
	};
	const handlerPerformance = () => {
		router.push("/administrar-tiempos");
	};
	const handlerDashboard = () => {
		window.open(
			"https://app.powerbi.com/reportEmbed?reportId=72a67810-3d29-4a2a-b324-54588bbad4d9&autoAuth=true&ctid=bfcf1d9d-93ea-43b1-b902-1daa68a64248",
			"_blank"
		);
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
						title="Listar/Eliminar Atletas"
						description="Ve los atletas registrados en el sistema o remueve alguno."
						buttonLabel="Listar/Eliminar"
						onClick={handlerListAthletes}
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
					<AdministratorOption
						title="Usuarios potenciales"
						description="Personas interesadas en unirse al equipo."
						buttonLabel="Ver Usuarios Potenciales"
						onClick={handlerPotentialUsers}
					/>
					<AdministratorOption
						title="Administrar Tiempos de Atletas"
						description="Modifica los tiempos registradas por los atletas."
						buttonLabel="Administrar Tiempos"
						onClick={handlerPerformance}
					/>
					<AdministratorOption
						title="Dashboard de evaluaciones"
						description="Ve las opiniones sobre los entrenadores."
						buttonLabel="Ver"
						onClick={handlerDashboard}
					/>
				</div>
			</div>
		</div>
	);
}
