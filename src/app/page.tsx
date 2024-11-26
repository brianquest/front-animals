import React from "react";
//import AnimalsComponent from "../components/animals";
import TableInfo from "../components/TableInfo"; // contenido de las tablas de la BD(getList)
import TableActions from "@/components/TableActions"; // modificar y eliminar contendio de las tablas
export default function Home() {

  return (
    <div>
      <TableInfo />
    </div>
  );
}
