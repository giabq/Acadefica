// src/services/StudentService.ts

import api from './api';
import type { StudentBackendData, PredictionData } from '../types/ApiTypes';

// 1. Pegar nome da Academia
export const getGymName = async (): Promise<string> => {
    const response = await api.get<string>('/get-gym-name');
    return response.data;
};

// 2. Pegar todos os alunos
export const getAllStudents = async (): Promise<StudentBackendData[]> => {
    const response = await api.get<StudentBackendData[]>('/get-students');
    return response.data;
};

// 3. Pegar alunos por unidade
export const getStudentsByUnit = async (unit: string): Promise<StudentBackendData[]> => {
    const response = await api.get<StudentBackendData[]>('/get-students-by-unit', {
        params: { unit } // O axios converte isso para ?unit=centro
    });
    return response.data;
};

// 4. Pegar info de um aluno específico
export const getStudentInfo = async (id: number): Promise<StudentBackendData> => {
    const response = await api.get<StudentBackendData>('/get-student-info', {
        params: { id }
    });
    return response.data;
};
// 5. Pegar predições (Lista) - REMOVIDO O PARAMETRO
export const getStudentsPredictions = async (): Promise<PredictionData[]> => {
   

    // Opcionalmente, você pode manter o timeout na leitura também, por segurança
    const response = await api.get<PredictionData[]>('/get-students-predictions', { 
        timeout: 90000 
    });
    
    return response.data;
};

// 6. Pegar predição única - REMOVIDO O PARAMETRO
export const getStudentPrediction = async (id: number): Promise<PredictionData> => {
    const response = await api.get<PredictionData>('/get-student-prediction', {
        params: { id }
    });
    return response.data;
};

// 7. Pegar porcentagem de evasão - REMOVIDO O PARAMETRO
export const getEvasionPercentage = async (): Promise<number> => {
    const response = await api.get<number>('/get-student-evasion-percentage');
    return response.data; 
};

// src/services/StudentService.ts

// ... (outros imports e funções)

// 8. Pegar porcentagem de evasão POR UNIDADE
export const getEvasionPercentageByUnit = async (unit: string): Promise<number> => {
    try {
        const response = await api.get<number>('/get-student-evasion-percentage-by-unit', {
            params: { unit }
        });
        return response.data; 
    } catch (error) {
        console.error(`Erro ao buscar evasão para ${unit}:`, error);
        return 0; // Retorna 0 em caso de erro para não quebrar a tela
    }
};