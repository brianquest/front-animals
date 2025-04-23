import React, { useEffect, useState } from "react";
import { getAnimalsList, AnimalGetDTO } from "@/app/animals/api/animals_api"; // Insumos para listar los animales
import TableActionsAnimal from "@/components/animal/TableActionsAnimal" // Insumos para agregar y modificar un animal
import TableAddAnimal from "./TableAddAnimal";
// import TableAddSpecie from "@/components/specie/TableAddSpecie";

const TableInfoAnimal = () => {
    const [animal, setAnimal] = useState<AnimalGetDTO[]>([]);// Data  original de especies
    const [loading, setLoading] = useState(true); // Indicar si los datos están cargando

    // insumos para la barra search
    const [filteredAnimal, setFilteredAnimal] = useState<AnimalGetDTO[]>([]); //lista de animales filtrados
    const [searchTerm, setSearchTerm] = useState(""); // Almacena el texto que el usuario escribe en la barra de búsqueda

    // Obtener datos del endpoint
    const fetchAnimal = async () => {
        setLoading(true);
        try {
            const response = await getAnimalsList(); // Llamo a la API
            if (response.status) {
                setAnimal(response.data); // Actualizamos el estado con los animales
                setFilteredAnimal(response.data); // listado de los animales filtrados
            } else {
                console.log(response.messege || "Error del backend"); // Mostramos el error
            }
        } catch (err) {
            console.log("Error del Frontend:" + err);
        } finally {
            setLoading(false) // Indicamos que terminó la carga
        }
    }

    // Función para manejar el cambio en la barra de búsqueda
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase(); // Convertimos el texto de entrada a minúsculas
        setSearchTerm(term); // // Actualizamos el estado de búsqueda
        //filtrar registros
        const filtered = animal.filter((animal) => {
            // Verificar coincidencias en los campos deseados
            const animalMatch = animal.animalName.toLocaleLowerCase().includes(term);
            const legsMatch = String(animal.numberLegs).toLocaleLowerCase().includes(term);
            const locomotionMatch = animal.animalLocomotion.toLocaleLowerCase().includes(term);
            const specieMatch = animal.nameGroup
                .toLocaleLowerCase().includes(term);
            return animalMatch || legsMatch || locomotionMatch || specieMatch //// Filtrar si coincide con al menos uno
        })

        setFilteredAnimal(filtered); // Actualizamos los registros filtrados
    }

    useEffect(() => {
        fetchAnimal() // Ejecutamos la función
    }, []); // El arreglo vacío asegura que solo se ejecute al montar

    if (loading) return <p className="border border-gray-300 px-4 py-2 text-center">Loading...</p>;
    return (
        <div className="overflow-x-auto">
            {/* Barra de herramientas */}
            <div className="flex justify-between items-center py-2 px-2" >
                <input
                    type="text"
                    placeholder="Buscar por grupo, descripción o animales..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300  p-2 w-3/4" style={{ color: 'black' }}
                />
                <div className="flex-1 flex justify-center">
                <TableAddAnimal onAddComplete={fetchAnimal} />
                </div>
            </div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100 "style={{ color: 'black' }}>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left ">
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
                    {filteredAnimal.map((animal, index) => (
                        <tr key={animal.animalId}
                            className="odd:bg-white even:bg-gray-50"
                        >
                            <td className="border border-gray-300 px-4 py-2" style={{ color: 'black' }}>{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2"style={{ color: 'black' }}>{animal.animalName}</td>
                            <td className="border border-gray-300 px-4 py-2"style={{ color: 'black' }}>{animal.numberLegs}</td>
                            <td className="border border-gray-300 px-4 py-2"style={{ color: 'black' }}>{animal.animalLocomotion}</td>
                            <td className="border border-gray-300 px-4 py-2"style={{ color: 'black' }}>{animal.nameGroup}</td>
                            <td className="border border-gray-300 py-2 w-48"style={{ color: 'black' }}>
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