import React from "react";

const ConfirmDeleteModal = ({ data, onClose, onConfirm }: any) => {
  return (
    <div style={{ position: "fixed", top: "20%", left: "30%", width: "40%", background: "#fff", padding: "20px", border: "1px solid black" }}>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this item?</p>
      <p><strong>{JSON.stringify(data)}</strong></p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onClose} style={{ marginLeft: "10px" }}>No</button>
    </div>
  );
};

export default ConfirmDeleteModal;
