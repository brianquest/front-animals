import React from "react";
//import AnimalsComponent from "../components/animals";
import TableInfoSpecie from "../components/specie/TableInfoSpecie"; // contenido de las tablas de la BD(getList)
import TableInfo from "@/components/animal/TableInfoAnimal";


export default function Home() {

  return (
    <div>
      <TableInfoSpecie />
      <TableInfo />
    </div>
  );
}
