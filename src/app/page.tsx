'use client'
import React, { useState } from "react";
//import AnimalsComponent from "../components/animals";
import TableInfoSpecie from "../components/specie/TableInfoSpecie"; // contenido de las tablas de la DB specie
import TableInfoAnimal from "@/components/animal/TableInfoAnimal"; //contenido de las tablas de la DB animal


export default function Home() {
  const [activeTable, setActiveTable] = useState<"specie" | "animal">("animal");

  return (
    <div className="w-full h-full">
      {/* Encabezado con botones de navegación */}
      <div className="flex items-center justify-around  border-x-2 bg-gray-100 ">
        <button
          className={`py-2 px-2 text-sm font-semibold rounded-md w-2/4 focus:outline-none ${
            activeTable === "specie"
              ? "bg-white border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-black"}`}
          onClick={() => setActiveTable("specie")}
        >
          Tabla Especie
        </button>
        <button
          className={`px-2 py-2 text-sm font-semibold rounded-md w-2/4 focus:outline-none ${
            activeTable === "animal"
              ? "bg-white border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setActiveTable("animal")}
        >
          Tabla Animal
        </button>
      </div>
      <div
      >
        {activeTable === "specie" ?
          (<TableInfoSpecie />) : (<TableInfoAnimal />)}
      </div>
    </div>
  );
}
