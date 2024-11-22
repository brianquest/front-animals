import React, { useCallback, useState } from "react";
import { updateAnimalById, Animal } from "../app/animals/api/animals_api";


const EditModal = ({ data, onClose, onSave }: any) => {
    const [formData, setFormData] = useState(data);
    const UpdataData = useCallback(async ()=>{
        
        const response = await updateAnimalById(formData.animalId, {
            animalName: formData.animalName, 
            numberLegs: formData.numberLegs,
            animalLocomotion: formData.animalLocomotion,
            specieId: formData.specieId
        });
    },[formData]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div style={{ position: "fixed", top: "20%", left: "30%", width: "40%", background: "#fff", padding: "20px", border: "1px solid black" }}>
            <h2>Edit Item</h2>
            {Object.keys(formData).map((key) => (
                <div key={key}>
                    <label>{key}</label>
                    <input
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        style={{ margin: "5px", padding: "5px", width: "100%" }}
                    />
                </div>
            ))}
            <button onClick={() => onSave(UpdataData())}>Save</button>
            <button onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    );
};

export default EditModal;
