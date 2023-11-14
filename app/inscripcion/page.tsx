"use client";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import Alert from "@/components/Alert/Alert";

export default function Inscripcion() {
	const router = useRouter();
    interface Competence {
        name: string;
        date: Date;
        time: string;
        disciplines: string[];
        categories: string[];
    }
    const [competences, setCompetences] = useState<Competence[]>();
    const [selectedCompetence, setSelectedCompetence] = useState<Competence>();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
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

    function calcularEdad(fechaStr: string, categoria: string) {
      const fechaNacimiento = new Date(fechaStr);
      const fechaHoy = new Date();
      var edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
    
      if (fechaHoy.getMonth() < fechaNacimiento.getMonth() || (fechaHoy.getMonth() === fechaNacimiento.getMonth() &&
          fechaHoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
    
      const categoriaEdad = parseInt(categoria.slice(1), 10);
    
      if (edad < categoriaEdad) {
        return true
      } else {
        return false
      }
    }

    const handleCompetenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedComp = competences?.find((comp) => comp.name === e.target.value);
      setSelectedCompetence(selectedComp);
      setSelectedCategories([]);
      setSelectedDisciplines([]);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const categoryName = e.target.value;
      const hasTheAge = calcularEdad(userData.birth, categoryName);
      if (e.target.checked && (hasTheAge || categoryName === "Mayor")) {
        setSelectedCategories([...selectedCategories, categoryName]);
      } else {
        setSelectedCategories(selectedCategories.filter((cat) => cat !== categoryName));
      }
    };
  
    const handleDisciplineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const disciplineName = e.target.value;
      if (e.target.checked) {
        setSelectedDisciplines([...selectedDisciplines, disciplineName]);
      } else {
        setSelectedDisciplines(selectedDisciplines.filter((disc) => disc !== disciplineName));
      }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userId = localStorage.getItem("id");
            const response = await fetch(`api/competences`);
            const json = await response.json();
            setCompetences(json);
            
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

      const competenceOptions = competences?.map((competence) => (
        <option key={competence.name} value={competence.name}>
          {competence.name}
        </option>
      ));

      const handlerInscription = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inscriptionData = {competence: selectedCompetence, athleteId: userData.identification, disciplinesOfInscription: selectedDisciplines, categoriesOfInscription: selectedCategories}
        const toEmail = userData.email;
        try {
          const response = await fetch("api/inscriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inscriptionData),
          });
          if (!response.ok) {
                setIsSuccessful(false);
                throw new Error(
                    "Error HTTP: " + response.status + response.text()
                );
          }
          const optText = `¡Su inscripción se ha realizado con éxito!

          Usted ha sido inscrito en la competencia: ${selectedCompetence?.name}, que se llevará a cabo en la fecha: ${selectedCompetence?.date} a las ${selectedCompetence?.time}. 

          Categorías: ${selectedCompetence?.categories}
          Disciplinas: ${selectedCompetence?.disciplines}
          `;
				  const subject = "Inscripción Realizada Exitosamente";
          const responseEmail = await fetch("/api/mail", {
            method: "POST",
            body: JSON.stringify({ toEmail, subject, optText }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!responseEmail.ok) {
            throw new Error(
              "Error HTTP: " + responseEmail.status + responseEmail.text()
            );
          }
          setIsSuccessful(true);
        } catch (error) {
            console.error("Error al actualizar los datos", error);
        }
      };
      const handleAlertClose = () => {
        setIsSuccessful(null);
        router.push("/menu-atleta");
      };
      return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-2">Inscripción de Atleta</h1>
          {isSuccessful != null && (
            <Alert
              message={
                isSuccessful
                  ? "Inscripción realizada con éxito!"
                  : "Error al realizar la inscripción"
              }
              onClose={handleAlertClose}
              isSuccessful={isSuccessful}
            />
          )}
          <div className="w-4/5 md:w-3/5 lg:w-2/5 rounded overflow-hidden shadow-lg bg-white p-4 m-2">
            <form>
              <div className="mb-4">
                <div className="mb-2">
                  <label htmlFor="competenceSelect" className="font-bold text-xl">
                    Competencias:
                  </label>
                  <select
                    id="competenceSelect"
                    value={selectedCompetence?.name}
                    onChange={handleCompetenceChange}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Selecciona una competencia</option>
                    {competenceOptions}
                  </select>
                </div>
              </div>
              {selectedCompetence && (
                <>
                  <div className="mb-4">
                    <div className="mb-2">
                      <label className="font-bold text-xl">
                        Categorías en las que va a participar:
                      </label>
                      <div className="flex flex-wrap">
                        {selectedCompetence.categories.map((categoria, index) => (
                          <div key={index} className="w-1/5 p-2">
                            <label className="m-2">
                              <input
                                type="checkbox"
                                name="categorias"
                                value={categoria}
                                onChange={handleCategoryChange}
                                checked={selectedCategories.includes(categoria)}
                              />
                              {categoria}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2">
                      <label className="font-bold text-xl">
                        Disciplinas en las que va a participar:
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {selectedCompetence.disciplines.map((disciplina, index) => (
                          <label key={index} className="m-2">
                            <input
                              type="checkbox"
                              name="disciplinas"
                              value={disciplina}
                              onChange={handleDisciplineChange}
                              checked={selectedDisciplines.includes(disciplina)}
                            />
                            {disciplina}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-center mb-4">
                <Button onClick={handlerInscription}>Realizar Inscripción</Button>
              </div>
            </form>
          </div>
        </div>
      </>
      );
    }