"use client";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import AdministratorOption from "@/components/AdministratorOption/AdministratorOption";
import { useEffect, useState } from "react";

export default function MiPerfil() {
	const router = useRouter();

    const [userData, setUserData] = useState({
		name: "",
		lastname: "",
		identification: "",
		birth: "",
		phone: "",
		location: "",
		email: "",
	});
      // Función para actualizar los datos del usuario
    const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                const response = await fetch(`api/users/${userData.identification}`, {
                    method: "PUT",
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
                const data = await response.json();
            } catch (error) {
                console.error("Error al actualizar los datos", error);
            }
    };

    const handlerCelular = (event: { target: { value: any } }) => {
		const value = event.target.value;
		const numericValue = value.replace(/[^0-9]/g, "");
		if (numericValue.length < 9) {
			setUserData({ ...userData, phone: numericValue });
		}
	};

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userId = localStorage.getItem("id");
            const response = await fetch(`api/users/${userId}`);
            
            if (!response.ok) {
              throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const userData = await response.json();
            setUserData(userData);
          } catch (error) {
            console.error("Error al obtener datos de usuario:", error);
          }
        };
        fetchUserData();
      }, []);

      function formatFechaISO8601ToDMY(dateString: string) {
        const date = new Date(dateString);
        const dia = date.getDate() + 1;
        const mes = date.getMonth() + 1;
        const anno = date.getFullYear();
      
        const diaStr = dia.toString().padStart(2, '0');
        const mesStr = mes.toString().padStart(2, '0');
        const fechaFormateada = `${diaStr}/${mesStr}/${anno}`;
      
        return fechaFormateada;
      }
	return (
        <div className="bg-gray-100 min-h-screen">
          <Header title="Mi Perfil" />
    
          <div className="p-4">
            <div className="bg-white p-4 rounded shadow-md">
              <h1 className="text-2xl font-semibold mb-4">Información Personal</h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-xl">Nombre:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={userData.name}
                    className="w-full border rounded p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="font-bold text-xl">Apellidos:</label>
                  <input
                    type="text"
                    name="lastname"
                    defaultValue={userData.lastname}
                    className="w-full border rounded p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="font-bold text-xl">Identificación:</label>
                  <input
                    type="text"
                    name="identification"
                    defaultValue={userData.identification}
                    className="w-full border rounded p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="font-bold text-xl">Fecha de Nacimiento:</label>
                  <input
                    type="text"
                    name="birth"
                    defaultValue={formatFechaISO8601ToDMY(userData.birth)}
                    className="w-full border rounded p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="font-bold text-xl">Teléfono:</label>
                  <input
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handlerCelular}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-xl">Ubicación:</label>
                  <input
                    type="text"
                    name="location"
                    value={userData.location}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            location: e.target.value,
                        })
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-5">
                  <label className="font-bold text-xl">Correo Electrónico:</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            email: e.target.value,
                        })
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
              <Button onClick={handleUpdateUser}>Guardar Cambios</Button>
            </div>
          </div>
        </div>
      );
}
