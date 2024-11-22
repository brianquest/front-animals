"use client";
import React, { useCallback, useEffect, useState } from "react";
import { getAnimalsList, Animal } from "../app/animals/api/animals_api";
import { getSpeciesList, Specie } from "../app/animals/api/specie_api";

import TableComponent from "./TableComponent";
import EditModal from "./EditModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const AnimalsComponent = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);
  const [activeTable, setActiveTable] = useState<"animals" | "species" | null>(null); // Controla la tabla visible
  const [loading, setLoading] = useState(false); // Controla el estado de carga
  const [selectedRow, setSelectedRow] = useState<any>(null); // Fila seleccionada para editar o eliminar
  const [isEditModalOpen, setEditModalOpen] = useState(false); // Controla el modal de edición
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Controla el modal de confirmación


  const handleGetListAnimals = useCallback(async () => {
    //  handleGetListSpecies();
    setLoading(true);
    try {
      const animalsData = await getAnimalsList();
      animalsData.forEach(x => {
        x.specie = species.find(s => s.specieId === x.specieId)?.nameGroup as string
      })
      //console.log(animalsData);
      setAnimals(animalsData);
      //setActiveTable("animals");
    } catch (error) {
      console.error("Error fetching animals:", error);
    } finally {
      setLoading(false);
    }
  },[species]);

  const handleGetListSpecies = async () => {
    setLoading(true);
    try {
      const speciesData = await getSpeciesList();
      setSpecies(speciesData);
      //setActiveTable("species");
    } catch (error) {
      console.error("Error fetching species:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const handleDelete = (row: any) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  useEffect(()=>{
    handleGetListSpecies();

  },[]);

  useEffect(()=>{
    if(species.length > 0)
      handleGetListAnimals();
  },[species]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "30px" }}>Animals and Species Data</h1>

      {/* Botones para las acciones */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={()=>{setActiveTable("animals")}}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get List Animals
        </button>
        <button
          onClick={()=>{setActiveTable("species")}}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28A745",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get List Species
        </button>
      </div>

      {/* Mostrar mensajes de carga */}
      {loading && <p>Loading...</p>}

      {/* Tabla de animales */}
      {activeTable === "animals" && (
        <TableComponent
          data={animals}
          columns={[
            { column : "Animal ID", key : "animalId"}, 
            { column : "Name", key : "animalName"}, 
            { column : "Number of Legs", key : "numberLegs" },
            { column : "Locomotion", key : "animalLocomotion" },
            { column : "Specie", key : "specie"}
          ]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {activeTable === "species" && (
        <TableComponent
          data={species}
          columns={[
            { column : "Specie ID", key : "specieId"},
            { column : "Name Group", key : "nameGroup"},
            { column : "Detail", key : "detail"}
          ]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modales */}
      {isEditModalOpen && (
        <EditModal
          data={selectedRow}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedData: any) => {
            console.log("Save Changes:", updatedData);
            setEditModalOpen(false);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          data={selectedRow}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            console.log("Confirm Delete:", selectedRow);
            setDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AnimalsComponent;
