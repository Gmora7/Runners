"use client";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import AdministratorOption from "@/components/AdministratorOption/AdministratorOption";

export default function AthleteMenu() {
	const router = useRouter();
	const handlerMiPerfil = () => {

	};
	return (
		<div className="bg-gray-100 min-h-screen">
			<Header title="Menú de Atleta" />
			<div className="container mx-auto px-4 py-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<AdministratorOption
						title="Mi Perfil"
						description="Ver o modificar tus datos de atleta."
						buttonLabel="Mi Perfil"
						onClick={handlerMiPerfil}
					/>
				</div>
			</div>
		</div>
	);
}
