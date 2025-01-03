import axios from "axios";

import { SimpleAnimalDTO } from "./animals_api" //Exporto DTO del lado de animal

const API_BASE_URL = "http://localhost:7209/api/specie";

// Define los tipos para los datos que enviarás y recibirás
export interface SpecieGetDTO {
  specieId: string, // Guid
  nameGroup: string,
  detail: string,
  simpleAnimalDTOs: SimpleAnimalDTO[] // Relación con animales
}

export interface SpecieNewDTO {
  nameGroup: string,
  detail: string
}

export interface SimpleSpecieDTO {
  specieId: string, // Guid
  nameGroup: string,
}


export interface ApiResponse<T> {
  status: boolean,
  messege: string,
  data: T // Aquí T puede ser cualquier tipo de dato
}

// Función para obtener la lista de especies
export const getSpeciesList = async (): Promise<ApiResponse<SpecieGetDTO[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-species-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching species list:", error);
    throw error;
  }
};

// Función para actualizar una especie por ID
export const updateSpecieById = async (specieId: string, updatedData: SpecieNewDTO): Promise<ApiResponse<SpecieGetDTO>> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-specie-by-id/${specieId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la especie:", error);
    throw error;
  }
}

// Función para eliminar una especie por ID
export const deleteSpecieById = async (specieId: string): Promise<ApiResponse<SpecieNewDTO>> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete-secie-by-id/${specieId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la especie:", error);
    throw error;
  }
}

// Función para agregar una nueva especie
export const addSpecie = async (newSpecie: SpecieNewDTO): Promise<ApiResponse<SimpleAnimalDTO>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add-specie`, newSpecie);
    return response.data;
  } catch (error) {
    console.log("Error al agregar especie:", error);
    throw error;
  }
}
// funcion para mostrar lista de nombres de especie
export const getSpecieShortList = async (): Promise<ApiResponse<SimpleSpecieDTO[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-species-short-list`);
    return response.data;
  } catch (error) {
    console.log("Error al agregar especie:", error);
    throw error;
  }
}
