import React, { useEffect, useState } from "react";
import { getAnimalsList, AnimalGetDTO } from "@/app/animals/api/animals_api"; // Insumos para listar los animales
import TableActionsAnimal from "@/components/animal/TableActionsAnimal" // Insumos para agregar y modificar un animal
// import TableAddSpecie from "@/components/specie/TableAddSpecie";

const TableInfoAnimal = () => {
    const [animal, setAnimal] = useState<AnimalGetDTO[]>([]);// Data  original de especies
    const [loading, setLoading] = useState(true); // Indicar si los datos están cargando

    /**
     *     // insumos para la barra search
    const [filteredSpecies, setFilteredSpecies] = useState<SpecieGetDTO[]>([]); //lista de especies filtrada
    const [searchTerm, setSearchTerm] = useState(""); // Almacena el texto que el usuario escribe en la barra de búsqueda
     */

    // Obtener datos del endpoint
    const fetchAnimal = async () => {
        setLoading(true);
        try {
            const response = await getAnimalsList(); // Llamo a la API
            if (response.status) {
                setAnimal(response.data); // Actualizamos el estado con las especies
                // setFilteredSpecies(response.data); // llistado de las especiesd filtradas
            } else {
                console.log(response.messege || "Error del backend"); // Mostramos el error
            }
        } catch (err) {
            console.log("Error del Frontend:" + err);
        } finally {
            setLoading(false) // Indicamos que terminó la carga
        }
    }

    /**
     *     // Función para manejar el cambio en la barra de búsqueda
        const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const term = e.target.value.toLowerCase(); // Convertimos el texto de entrada a minúsculas
            setSearchTerm(term); // // Actualizamos el estado de búsqueda
    
            //filtrar registros
            const filtered = species.filter((specie) => {
                // Verificar coincidencias en los campos deseados
                const groupMatch = specie.nameGroup.toLocaleLowerCase().includes(term);
                const descriptionMatch = specie.detail.toLocaleLowerCase().includes(term);
                const animalsMatch = specie.simpleAnimalDTOs
                    .map((animal) => animal.animalName.toLowerCase())
                    .join(", ")
                    .includes(term);
                return groupMatch || descriptionMatch || animalsMatch; // Filtrar si coincide con al menos uno
    
            });
            setFilteredSpecies(filtered); // Actualizamos los registros filtrados
        };
     */

    useEffect(() => {
        fetchAnimal() // Ejecutamos la función
    }, []); // El arreglo vacío asegura que solo se ejecute al montar

    if (loading) return <p className="border border-gray-300 px-4 py-2 text-center">Loading...</p>;
    return (
        <div className="overflow-x-auto">
            {/* Barra de herramientas */}
            <div></div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            #
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Animal
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Extremidades
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Locomoción
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Especie
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {animal.map((animal, index) => (
                        <tr key={animal.animalId}
                            className="odd:bg-white even:bg-gray-50"
                        >
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{animal.animalName}</td>
                            <td className="border border-gray-300 px-4 py-2">{animal.numberLegs}</td>
                            <td className="border border-gray-300 px-4 py-2">{animal.animalLocomotion}</td>
                            <td className="border border-gray-300 px-4 py-2">{animal.nameGroup}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <TableActionsAnimal
                                    animalId={animal.animalId}
                                    initialData={{
                                        animalName: animal.animalName,
                                        numberLegs: animal.numberLegs,
                                        animalLocomotion: animal.animalLocomotion,
                                        specieId: animal.specieId
                                    }}
                                    onActionComplete={fetchAnimal}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableInfoAnimal;