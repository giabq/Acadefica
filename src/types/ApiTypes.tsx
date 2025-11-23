// src/types/ApiTypes.ts

// Representa o objeto exato que vem do array /get-students
export interface StudentBackendData {
    aluno_id: number;
    Nome: string;
    Objetivo: string;
    Idade: number;
    TempoComoAluno: number;
    // Campos de métricas
    CheckinsSemana_1: number;
    CheckinsSemana_2: number;
    // ... (outros checkins se necessário, ou usamos index signature)
    TempoTreino_M1: number;
    TempoTreino_M2: number;
    TempoTreino_M3: number;
    AulasGrupo_M1: number;
    AulasGrupo_M2: number;
    AulasGrupo_M3: number;
    DiasAtrasoPagamento_M1: number;
    DiasAtrasoPagamento_M2: number;
    DiasAtrasoPagamento_M3: number;
    VariacaoPeso_2m: number;
    VariacaoGordura_2m: number;
    VariacaoCarga_2m: number;
    Status: string; // Ex: "Ativo", "Cancelou"
    unidade: string; // Ex: "centro", "zona sul"
    // Permite acessar outras propriedades dinamicamente se necessário
    [key: string]: any; 
}

export interface PredictionData {
    aluno_id: number;
    Nome: string;
    Objetivo: string;
    unidade: string;
    // A chave da predição é dinâmica (ex: "Regressão Logística_Prediction")
    // Vamos tratar isso no frontend
    [key: string]: any; 
}