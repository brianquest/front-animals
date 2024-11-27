"use client"
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { getSpeciesList, SpecieGetDTO } from "../app/animals/api/specie_api"
import TableActions from "./TableActions"; //agregar y modificar
import TableAdd from "@/components/TableAdd";



const TableInfo = () => {
    const [species, setSpecies] = useState<SpecieGetDTO[]>([]);// Data  original de especies
    const [loading, setLoading] = useState(true); // Indicar si los datos están cargando

    // insumos para la barra search
    const [filteredSpecies, setFilteredSpecies] = useState<SpecieGetDTO[]>([]); //lista de especies filtrada
    const [searchTerm, setSearchTerm] = useState("");

    // Obtener datos del endpoint
    const fetchSpecies = async () => {
        setLoading(true);
        try {
            const response = await getSpeciesList(); // Llamo a la API
            if (response.status) {
                setSpecies(response.data); // Actualizamos el estado con las especies
                setFilteredSpecies(response.data);
            } else {
                console.log(response.messege || "Error del backend"); // Mostramos el error
            }
        } catch (err) {
            console.log("Error del Frontend:" + err);
        } finally {
            setLoading(false) // Indicamos que terminó la carga
        }
    };

    // Función para manejar el cambio en la barra de búsqueda
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        //filtrar registros
        const filtered = species.filter((specie) => {
            // Verificar coincidencias en los campos deseados
            const groupMatch = specie.nameGroup.toLocaleLowerCase().includes(term);
            const descriptionMatch = specie.detail.toLocaleLowerCase().includes(term);
            const animalsMatch = specie.simpleAnimalDTOs
                .map((animal) => animal.animalName.toLowerCase())
                .join(", ")
                .includes(term);
            return groupMatch || descriptionMatch || animalsMatch;

        });
        setFilteredSpecies(filtered);
    };

    // Obtener datos del endpoint
    useEffect(() => {
        fetchSpecies() // Ejecutamos la función
    }, []); // El arreglo vacío asegura que solo se ejecute al montar

    if (loading) return <p className="border border-gray-300 px-4 py-2 text-center">Loading...</p>;

    return (
        <div className="overflow-x-auto">
            {/* Barra de herramientas */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por grupo, descripción o animales..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2 w-2/3"
                />
                <TableAdd onAddComplete={fetchSpecies} />
            </div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Grupo</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Animales</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSpecies.map((specie, index) => (
                        <tr key={specie.specieId} className="odd:bg-white even:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{specie.nameGroup}</td>
                            <td className="border border-gray-300 px-4 py-2">{specie.detail}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {specie.simpleAnimalDTOs.length != 0
                                    ? specie.simpleAnimalDTOs.map((simpleAnimalDTOs) =>
                                        simpleAnimalDTOs.animalName).join(", ")
                                    : "Sin animales"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <TableActions
                                    specieId={specie.specieId}
                                    initialData={{ nameGroup: specie.nameGroup, detail: specie.detail }}
                                    onActionComplete={fetchSpecies} //// Recarga los datos al completar el modal (editar o eliminar)
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableInfo;