import React, { useState } from "react";
import { deleteSpecieById, updateSpecieById, SimpleSpecieDTO } from "../../app/animals/api/specie_api"

interface TableActionsSpecieProps {
    specieId: string; //  ID de la especie (para identificarla en las acciones)
    initialData: SimpleSpecieDTO; // Datos iniciales para edición
    onActionComplete: () => void; //Callback para renderizar TableInfo 
}

const TableActionsSpecie: React.FC<TableActionsSpecieProps> = ({ specieId, initialData, onActionComplete }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false); // Modal de edicion
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Modal de eliminacion
    const [formData, setFormData] = useState<SimpleSpecieDTO>(initialData); // Datos del formulario de edición

    // Manejo del modal de edición
    const handleEdit = async () => {
        try {
            await updateSpecieById(specieId, formData);
            //alert("Especie actualizada con éxito");
            setEditModalOpen(false); // Cierra el modal
            onActionComplete(); // Notificar que la acción está completa
        } catch (error) {
            console.error("Error al editar la especie:", error);
            alert("Hubo un error al actualizar la especie.");
        }
    }

    // Manejo del modal de eliminación
    const handleDelete = async () => {
        try {
            await deleteSpecieById(specieId);
            //alert("Especie eliminada con éxito");
            setDeleteModalOpen(false);
            onActionComplete(); // Notificar que la acción está completa
        } catch (error) {
            console.error("Error al eliminar la especie:", error);
            alert("Hubo un error al eliminar la especie.");
        }
    };

    return (
        <div>
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
                        <h3 className="text-lg font-bold mb-4">Editar Especie {formData.nameGroup}</h3>
                        <form>
                            <label className="block mb-2">
                                Grupo:
                                <input
                                    type="text"
                                    className="border p-2 w-full"
                                    value={formData.nameGroup}
                                    onChange={(e) => setFormData({ ...formData, nameGroup: e.target.value })}
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
                                onClick={handleEdit}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={() => setEditModalOpen(false)}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>

                </div>
            )}

            {/* Botón para abrir el modal de edición */}
            <button
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => { setDeleteModalOpen(true) }}
            >
                Eliminar
            </button>

            {/* Modal de edición */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Confirmar Eliminación</h3>
                        <p>¿Estás seguro de que deseas eliminar esta especie?</p>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                        <button
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TableActionsSpecie;