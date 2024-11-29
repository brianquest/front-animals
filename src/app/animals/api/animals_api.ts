import axios from "axios";

const API_BASE_URL = "http://localhost:7209/api/animal"

export interface AnimalGetDTO {
  animalId: string,
  animalName: string,
  numberLegs: number,
  animalLocomotion: string,
  specieId: string,
  nameGroup: string
}

export interface AnimalNewDTO {
  animalName: string;
  numberLegs: number;
  animalLocomotion: string;
  specieId: string;
}

export interface SimpleAnimalDTO {
  animalId: string,
  animalName: string
}

export interface ApiResponse<T> {
  status: boolean,
  messege: string,
  data: T // Aquí T puede ser cualquier tipo de dato
}

// Función para obtener la lista de animales
export const getAnimalsList = async (): Promise<ApiResponse<AnimalGetDTO[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-animals-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching animal list:", error);
    throw error;
  }
}

// Función para actualizar un animal por ID
export const updateAnimalById = async(animalId: string, updatedData: AnimalNewDTO): Promise<ApiResponse<AnimalNewDTO>> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updat-animal-by-id/${animalId}`,updatedData)
    return response.data
  } catch (error) {
    console.error("Error al actualizar el animal", error)
    throw error
  }
}

/**
// Función para agregar un nuevo animal
export const addAnimal = async (animalDTO: AnimalDTO): Promise<Animal> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add-animal`, animalDTO);
    return response.data;
  } catch (error) {
    console.error("Error adding animal:", error);
    throw error;
  }
};

// Función para actualizar un animal por ID
export const updateAnimalById = async (
  animalId: string,
  animalDTO: AnimalDTO
): Promise<Animal> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/updat-animal-by-id?specieId=${animalId}`,
      animalDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error updating animal:", error);
    throw error;
  }
};

// Función para eliminar un animal por ID
export const deleteAnimalById = async (animalId: string): Promise<Animal> => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/delet-animal-by-id?animalId=${animalId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting animal:", error);
    throw error;
  }
};

*/
