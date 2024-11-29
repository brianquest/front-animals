import React, { useEffect, useState } from "react";
import { getSpecieShortList, SimpleSpecieDTO } from "@/app/animals/api/specie_api"
import { AnimalNewDTO, updateAnimalById } from "@/app/animals/api/animals_api";


interface TableActionsAnimalProps {
    animalId: string, //  ID de el animal (para identificarla en las acciones)
    initialData: AnimalNewDTO, // // Datos iniciales para edición
    onActionComplete: () => void //Callback para renderizar TableInfo 

}

const TableActionsAnimal: React.FC<TableActionsAnimalProps> = ({ animalId, initialData, onActionComplete }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false) // Estado del modal

    const [formData, setFormData] = useState<AnimalNewDTO>(initialData); // Datos del formulario de edición
    const [specieList, setSpecieList] = useState<SimpleSpecieDTO[]>([]); // lista de epseice desponible
    const [currentSpecieName, setCurrentSpecieName] = useState<string>(""); // escpecie altual que tiene el animal


    const fetchSpeciesList = async () => {
        try {
            const response = await getSpecieShortList() // Llamo a la API
            if (response.status) {
                setSpecieList(response.data); // Cargo las especies a la lista
                // Buscar y establecer el nombre de la especie actual
                const currentSpecie = response.data.find((specie) =>
                    specie.specieId === initialData.specieId)?.nameGroup
                setCurrentSpecieName(currentSpecie ? currentSpecie : "Especie no encontrada");
            }
        } catch (error) {
            console.error("Error al obtener la lista de especies:", error);
        }
    }

    // Cargar lista de especies al abrir el modal
    useEffect(() => {
        // cuando el modal de editar este abierrto
        if (isEditModalOpen) {
            //carga la lista de la API
            fetchSpeciesList();
        }
    }, [isEditModalOpen])//cada vez que cambie el estado del modal de editar


    // Función para guardar cambios
    const handleEdit = async () => {
        console.log(animalId)
        console.log(formData)
        try {
            const response = await updateAnimalById(animalId, formData);
            if (response.status) {
                setEditModalOpen(false); // Cierra el modal
                onActionComplete(); // Refresca la tabla
            } else {
                alert(`Error al actualizar el animal: ${response.messege}`);
            }
        } catch (error) {
            console.error("Error al actualizar el animal:", error);
        }
    };

    return (
        <div className="flex justify-around">
            {/* Botón para abrir el modal de edición */}
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => { setEditModalOpen(true) }}
            >
                Editar
            </button>

            {/* Modal de edición */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4">
                            Editar Animal {formData.animalName}
                        </h3>
                        <form>
                            <label className="block mb-2">
                                Animal:
                                <input type="text"
                                    className="border p-2 w-full"
                                    value={formData.animalName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, animalName: e.target.value })}
                                />
                            </label>
                            <label className="block mb-2">
                                Extremidades:
                                <input type="number"
                                    min={0}
                                    className="border p-2 w-full"
                                    value={formData.numberLegs || 0}
                                    onChange={(e) =>
                                        setFormData({ ...formData, numberLegs: parseInt(e.target.value) })}
                                />
                            </label>
                            <label className="block">
                                Locomoción:
                                <input className="border p-2 w-full"
                                    type="text"
                                    value={formData.animalLocomotion}
                                    onChange={(e) =>
                                        setFormData({ ...formData, animalLocomotion: e.target.value })}
                                />
                            </label>
                            <label className="block mb-2">
                                Especie:
                                <select className="border p-2 w-full"
                                    value={formData.specieId}
                                    onChange={(e) =>
                                        setFormData({ ...formData, specieId: e.target.value })}
                                >
                                    {/* Especie actual */}
                                    <option value={initialData.specieId}>
                                        {currentSpecieName} (Actual)
                                    </option>
                                    {/* Lista de opciones de especies */}
                                    {/* Filtra la lista de especies (speciesList) para excluir la especie actual */}
                                    {specieList
                                        .filter((specie) => specie.specieId != initialData.specieId)
                                        .map((specie) => (
                                            <option
                                                key={specie.specieId}
                                                value={specie.specieId}
                                            >
                                                {specie.nameGroup}
                                            </option>
                                        ))}
                                </select>
                            </label>
                            <div className="flex justify-center mt-4">
                                <button type="button"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    onClick={handleEdit}
                                >
                                    Guardar
                                </button>
                                <button type="button"
                                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={() => setEditModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TableActionsAnimal;