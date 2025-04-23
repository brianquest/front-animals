import React, { useState, useEffect } from "react";
import { AnimalNewDTO, addAnimal } from "@/app/animals/api/animals_api";
import { getSpecieShortList, SimpleSpecieDTO } from "@/app/animals/api/specie_api"

interface TableAddAnimalProps {
    onAddComplete: () => void
}

const TableAddAnimal: React.FC<TableAddAnimalProps> = ({ onAddComplete }) => {
    const [isAddModalopen, setAddModalOpen] = useState(false)
    const [formData, setFormData] = useState<AnimalNewDTO>({
        // Estado inicial para los datos del formulario
        animalName: "",
        animalLocomotion: "",
        numberLegs: 0,
        specieId: ""
    })

    const [animalList, setAnimalList] = useState<SimpleSpecieDTO[]>([]); // lista de animales desponibles

    // Obtenemos la lista de especie disponibles
    const fetchSpeciesList = async () => {
        try {
            const response = await getSpecieShortList() // Llamo a la API
            if (response.status) {
                setAnimalList(response.data); // Cargo las especies a la lista
            }
        } catch (error) {
            console.error("Error al obtener la lista de especies:", error);
        }
    }

    // Cargar lista de especies al abrir el modal
    useEffect(() => {
        // cuando el modal de editar este abierrto
        if (isAddModalopen) {
            //carga la lista de la API
            fetchSpeciesList();
        }
    }, [isAddModalopen])//cada vez que cambie el estado del modal de editar

    const handleAdd = async () => {
        try {
            await addAnimal(formData); // Llama a la API para crear un nuevo animal
            setAddModalOpen(false); // Cierra el modal
            onAddComplete(); // Notifica al componente padre que se ha agregado una nueva especie
        } catch (error) {
            console.error("Error al agregar la especie:", error);
            alert("Hubo un error al agregar la especie.");
        } finally {
            handleClose();
        }
    }

    const handleClose = () => {
        setAddModalOpen(false)
        setFormData({
            animalName: "",
            animalLocomotion: "",
            numberLegs: 0,
            specieId: ""
        }); //limpio campos
    }


    return (
        <div>
            {/* Botón para abrir el modal de agregar */}
            <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => { setAddModalOpen(true) }}
            >
                Agregar
            </button>

            {isAddModalopen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ color: 'black' }}>
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4" >
                            Agregar Animal {formData.animalName}
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
                                    value={formData.specieId || ""} // Por defecto vacío
                                    onChange={(e) =>
                                        setFormData({ ...formData, specieId: e.target.value })}
                                >
                                    {/* Opción por defecto vacía */}
                                    <option value={""} disabled>
                                        Seleccione una especie
                                    </option>
                                    {/* Lista de opciones de especies */}
                                    {animalList
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
                                        className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
                                          !formData.specieId && "opacity-50 cursor-not-allowed"
                                        }`}
                                        onClick={handleAdd}
                                        disabled={!formData.specieId} // Deshabilitar si no se selecciona una especie
                                >
                                    Guardar
                                </button>
                                <button type="button"
                                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={handleClose}
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
export default TableAddAnimal