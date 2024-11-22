import React from "react";

const TableComponent = ({ data, columns, onEdit, onDelete }: any) => {
  return (
    <table
      style={{
        width: "100%",
        border: "1px solid black",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          {columns.map((column: any) => (
            <th key={column.key} style={{ border: "1px solid black", padding: "8px" }}>
              {column.column}
            </th>
          ))}
          <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
      {data.map((row: any, index: number) => (
          // Usar el identificador único como `key`. Si no existe, usar `index`.
          <tr key={row.AnimalId || row.SpecieId || index}>
            {columns.map((column: any, columnIndex: number) => (
              <td key={columnIndex} style={{ border: "1px solid black", padding: "8px" }}>
                {row[column.key]}
              </td>
            ))}
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <button onClick={() => onEdit(row)}>Edit</button>
              <button onClick={() => onDelete(row)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
