import api from './api';
import type { StudentBackendData, PredictionData } from '../types/ApiTypes';

// --- Funções Existentes ---

export const getGymName = async (): Promise<string> => {
    const response = await api.get<string>('/get-gym-name');
    return response.data;
};

export const getAllStudents = async (): Promise<StudentBackendData[]> => {
    const response = await api.get<StudentBackendData[]>('/get-students');
    return response.data;
};

export const getStudentsPredictions = async (): Promise<PredictionData[]> => {
    const response = await api.get<PredictionData[]>('/get-students-predictions', { timeout: 90000 });
    return response.data;
};

export const uploadStudentsCsv = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file); 
    try {
        const response = await api.post('/upload-csv', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer upload do CSV:", error);
        throw error;
    }
};

// --- NOVAS FUNÇÕES DE ESTATÍSTICAS ---

export const getNumberOfStudents = async (): Promise<number> => {
    const response = await api.get<number>('/get-statistics/number-of-students');
    return response.data;
};

export const getObjectiveMode = async (): Promise<string> => {
    const response = await api.get<string>('/get-statistics/objective-mode');
    // Remove aspas se vierem na string bruta
    return String(response.data).replace(/"/g, '');
};

export const getStudentsCountPerUnit = async (): Promise<Record<string, number>> => {
    const response = await api.get<Record<string, number>>('/get-statistics/number-of-students-per-unit');
    return response.data;
};

export const getAverageAge = async (): Promise<number> => {
    const response = await api.get<number>('/get-statistics/average-age');
    return response.data;
};

export const getAverageTimeAsStudent = async (): Promise<number> => {
    const response = await api.get<number>('/get-statistics/average-time-as-student');
    return response.data;
};

// Se week=0 retorna média geral, senão média da semana específica
export const getAverageCheckins = async (week: number = 0): Promise<number> => {
    const response = await api.get<number>('/get-statistics/average-checkins', {
        params: { week }
    });
    return response.data;
};

export const getAverageWeightVariation = async (): Promise<number> => {
    const response = await api.get<number>('/get-statistics/average-weight-variation');
    return response.data;
};

export const getAverageBodyFatVariation = async (): Promise<number> => {
    const response = await api.get<number>('/get-statistics/average-body-fat-variation');
    return response.data;
};

export const getAverageLoadVariation = async (): Promise<number> => {
    const response = await api.get<number>('/get-statistics/average-load-variation');
    return response.data;
};