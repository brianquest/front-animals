import axios from "axios";

const API_BASE_URL = "https://localhost:7209/api/specie";

// Define los tipos para los datos que enviarás y recibirás
export interface Specie {
  specieId: string; // Guid
  nameGroup: string;
  detail: string;
  //animals?: Animal[]; // Relación con animales
}

export interface SpecieDTO {
  nameGroup: string;
  detail: string;
}

// Función para obtener la lista de especies
export const getSpeciesList = async (): Promise<Specie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-species-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching species list:", error);
    throw error;
  }
};

// Función para agregar una nueva especie
export const addSpecie = async (specieDTO: SpecieDTO): Promise<Specie> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add-specie`, specieDTO);
    return response.data;
  } catch (error) {
    console.error("Error adding specie:", error);
    throw error;
  }
};

// Función para actualizar una especie por ID
export const updateSpecieById = async (
  specieId: string,
  specieDTO: SpecieDTO
): Promise<Specie> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-specie-by-id?specieId=${specieId}`,
      specieDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error updating specie:", error);
    throw error;
  }
};

// Función para eliminar una especie por ID
export const deleteSpecieById = async (specieId: string): Promise<Specie> => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/delete-secie-by-id?specieId=${specieId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting specie:", error);
    throw error;
  }
};
