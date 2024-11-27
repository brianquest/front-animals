import React, { useState } from "react";
import { SimpleSpecieDTO, addSpecie } from "@/app/animals/api/specie_api";

interface TableAddPros {
    onAddComplete: () => void;
    
}

const TableAdd: React.FC<TableAddPros> = ({ onAddComplete }) => {

    const [isAddModalopen, setAddModalOpen] = useState(false); // Estado para manejar la visibilidad del modal
    const [formData, setFormData] = useState<SimpleSpecieDTO>({ nameGroup: "", detail: "" }) // Estado para los datos del formulario

    const handleAdd = async () => {
        try {
            await addSpecie(formData); // Llama a la API para crear una nueva especie
            setAddModalOpen(false); // Cierra el modal
            onAddComplete(); // Notifica al componente padre que se ha agregado una nueva especie
        } catch (error) {
            console.error("Error al agregar la especie:", error);
            alert("Hubo un error al agregar la especie.");
        } finally{
            handleClose();
        }
    }

    const handleClose = ()=>{
        setAddModalOpen(false)
        setFormData({nameGroup:"", detail:""}); //limpio campos
    }
    
    return (
        <div>
            {/* Botón para abrir el modal de agregar */}
            <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
                onClick={() => { setAddModalOpen(true) }}
            >
                Agregar
            </button>

            {isAddModalopen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" >
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Agregar Especie</h3>
                        <form>
                            <label className="block mb-2">
                                Grupo:
                                <input type="text"
                                    className="border p-2 w-full"
                                    value={formData.nameGroup}
                                    onChange={(e) => { setFormData({ ...formData, nameGroup: e.target.value }) }}
                                />
                            </label>
                            <label className="block mb-2">
                                Descripción:
                                <textarea
                                    className="border p-2 w-full"
                                    value={formData.detail}
                                    onChange={(e) =>
                                        setFormData({ ...formData, detail: e.target.value })}
                                ></textarea>
                            </label>
                            <button
                                type="button"
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={handleAdd}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={handleClose}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>

                </div>
            )
            }
        </div >
    );
};

export default TableAdd;