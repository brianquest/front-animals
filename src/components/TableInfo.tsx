"use client"
import React, { useEffect, useState } from "react";
import { getSpeciesList, SpecieGetDTO } from "../app/animals/api/specie_api"
import TableActions from "./TableActions"; //agregar y modificar
import TableAdd from "@/components/TableAdd";


const TableInfo = () => {
    const [species, setSpecies] = useState<SpecieGetDTO[]>([]);// Data de las especies
    const [loading, setLoading] = useState(true); // Indicar si los datos están cargando
    const [error, Seterror] = useState<String | null>(null);

    // Obtener datos del endpoint
    const fetchSpecies = async () => {
        try {
            const response = await getSpeciesList(); // Llamo a la API
            if (response.status) {
                setSpecies(response.data); // Actualizamos el estado con las especies
            } else {
                Seterror(response.messege || "Error del backend"); // Mostramos el error
            }
        } catch (err) {
            Seterror("Error del Frontend:" + err);
        } finally {
            setLoading(false) // Indicamos que terminó la carga
        }
    };
    // Obtener datos del endpoint
    useEffect(() => {
        fetchSpecies() // Ejecutamos la función
    }, []); // El arreglo vacío asegura que solo se ejecute al montar

    if (loading) return <p className="border border-gray-300 px-4 py-2 text-center">Loading...</p>;

    return (
        <div className="overflow-x-auto">
            {/* Barra de herramientas */}
            <TableAdd onAddComplete={fetchSpecies} />
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
                    {species.map((specie, index) => (
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