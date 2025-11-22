// src/pages/StudentsListPage.tsx

import React from 'react';
import { Typography, Table, Input, Tag, Space, Button} from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined, SafetyCertificateOutlined, AlertOutlined, InfoCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import AppLayout from '../layout/AppLayout';

const { Title, Paragraph, Text } = Typography;

// ------------------------------------
// 1. Tipagem e Dados Mock (Baseados no CSV)
// ------------------------------------

// Definição da interface baseada nos dados processados do CSV
interface Student {
  matricula: number; // aluno_id
  nome: string;
  objetivo: string; // objetivo
  tempo_meses: number; // tempo_como_aluno
  frequencia: number; // frequencia_media
  status: 'Alto Risco' | 'Baixo Risco' | 'Risco Médio' ; // status_risco
  Status: string; // Status original (Ativo/Alto Risco)
  VariacaoCarga_2m: number;
  DiasAtrasoPagamento_M3: number;
}

// DADOS MOCKADOS: Substituídos pela exportação do CSV
const mockStudents: Student[] = [
  { "matricula": 1, "nome": "Ana Silva", "objetivo": "hipertrofia", "tempo_meses": 10, "frequencia": 3.6, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 4.4, "DiasAtrasoPagamento_M3": -1 },
  { "matricula": 2, "nome": "Bruno Souza", "objetivo": "emagrecimento", "tempo_meses": 6, "frequencia": 2.4, "status": "Alto Risco", "Status": "Alto Risco", "VariacaoCarga_2m": 1.0, "DiasAtrasoPagamento_M3": 6 },
  { "matricula": 3, "nome": "Carla Gomes", "objetivo": "saude", "tempo_meses": 8, "frequencia": 2.1, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 2.1, "DiasAtrasoPagamento_M3": 1 },
  { "matricula": 4, "nome": "Diego Santos", "objetivo": "condicionamento", "tempo_meses": 12, "frequencia": 3.0, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 3.4, "DiasAtrasoPagamento_M3": 2 },
  { "matricula": 5, "nome": "Eduarda Lima", "objetivo": "bem-estar", "tempo_meses": 5, "frequencia": 1.4, "status": "Alto Risco", "Status": "Alto Risco", "VariacaoCarga_2m": 1.0, "DiasAtrasoPagamento_M3": 5 },
  { "matricula": 6, "nome": "Felipe Mendes", "objetivo": "hipertrofia", "tempo_meses": 15, "frequencia": 4.1, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 5.9, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 7, "nome": "Gabriela Rocha", "objetivo": "emagrecimento", "tempo_meses": 4, "frequencia": 2.8, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 1.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 8, "nome": "Henrique Alves", "objetivo": "saude", "tempo_meses": 9, "frequencia": 3.5, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 2.8, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 9, "nome": "Isabela Costa", "objetivo": "condicionamento", "tempo_meses": 11, "frequencia": 3.2, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 3.1, "DiasAtrasoPagamento_M3": 1 },
  { "matricula": 10, "nome": "Julio Pereira", "objetivo": "bem-estar", "tempo_meses": 7, "frequencia": 1.8, "status": "Alto Risco", "Status": "Alto Risco", "VariacaoCarga_2m": 0.5, "DiasAtrasoPagamento_M3": 7 },
  { "matricula": 11, "nome": "Laura Martins", "objetivo": "hipertrofia", "tempo_meses": 14, "frequencia": 4.5, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 6.8, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 12, "nome": "Marcelo Neves", "objetivo": "emagrecimento", "tempo_meses": 3, "frequencia": 2.1, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 1.0, "DiasAtrasoPagamento_M3": 3 },
  { "matricula": 13, "nome": "Natalia Dias", "objetivo": "saude", "tempo_meses": 16, "frequencia": 3.8, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 3.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 14, "nome": "Otavio Rocha", "objetivo": "condicionamento", "tempo_meses": 2, "frequencia": 1.5, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 0.8, "DiasAtrasoPagamento_M3": 2 },
  { "matricula": 15, "nome": "Patricia Lima", "objetivo": "bem-estar", "tempo_meses": 18, "frequencia": 4.2, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 5.1, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 16, "nome": "Quiteria Souza", "objetivo": "hipertrofia", "tempo_meses": 6, "frequencia": 2.9, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 2.2, "DiasAtrasoPagamento_M3": 1 },
  { "matricula": 17, "nome": "Ricardo Barbosa", "objetivo": "emagrecimento", "tempo_meses": 13, "frequencia": 3.7, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 4.0, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 18, "nome": "Silvia Gomes", "objetivo": "saude", "tempo_meses": 1, "frequencia": 1.2, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 0.5, "DiasAtrasoPagamento_M3": 4 },
  { "matricula": 19, "nome": "Thiago Martins", "objetivo": "condicionamento", "tempo_meses": 17, "frequencia": 4.0, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 4.8, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 20, "nome": "Ursula Alves", "objetivo": "bem-estar", "tempo_meses": 20, "frequencia": 4.6, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 7.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 21, "nome": "Victor Lima", "objetivo": "hipertrofia", "tempo_meses": 8, "frequencia": 2.3, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 1.8, "DiasAtrasoPagamento_M3": 1 },
  { "matricula": 22, "nome": "Wallace Costa", "objetivo": "emagrecimento", "tempo_meses": 11, "frequencia": 3.1, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 2.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 23, "nome": "Xenia Rocha", "objetivo": "saude", "tempo_meses": 4, "frequencia": 1.9, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 1.1, "DiasAtrasoPagamento_M3": 3 },
  { "matricula": 24, "nome": "Yago Pereira", "objetivo": "condicionamento", "tempo_meses": 15, "frequencia": 3.9, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 4.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 25, "nome": "Zelia Gomes", "objetivo": "bem-estar", "tempo_meses": 2, "frequencia": 1.6, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 0.7, "DiasAtrasoPagamento_M3": 2 },
  { "matricula": 26, "nome": "André Luiz", "objetivo": "hipertrofia", "tempo_meses": 10, "frequencia": 3.4, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 3.2, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 27, "nome": "Bárbara Silva", "objetivo": "emagrecimento", "tempo_meses": 5, "frequencia": 2.2, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 1.3, "DiasAtrasoPagamento_M3": 1 },
  { "matricula": 28, "nome": "Cássio Dantas", "objetivo": "saude", "tempo_meses": 14, "frequencia": 3.6, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 4.1, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 29, "nome": "Denise Rocha", "objetivo": "condicionamento", "tempo_meses": 3, "frequencia": 1.7, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 0.9, "DiasAtrasoPagamento_M3": 4 },
  { "matricula": 30, "nome": "Eduardo Pires", "objetivo": "bem-estar", "tempo_meses": 18, "frequencia": 4.3, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 6.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 31, "nome": "Fernanda Sá", "objetivo": "hipertrofia", "tempo_meses": 7, "frequencia": 2.6, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 2.0, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 32, "nome": "Gustavo Melo", "objetivo": "emagrecimento", "tempo_meses": 12, "frequencia": 3.0, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 2.8, "DiasAtrasoPagamento_M3": 2 },
  { "matricula": 33, "nome": "Heloisa Nunes", "objetivo": "saude", "tempo_meses": 4, "frequencia": 1.5, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 0.6, "DiasAtrasoPagamento_M3": 5 },
  { "matricula": 34, "nome": "Igor Ferreira", "objetivo": "condicionamento", "tempo_meses": 15, "frequencia": 4.1, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 5.0, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 35, "nome": "Jéssica Ramos", "objetivo": "bem-estar", "tempo_meses": 6, "frequencia": 2.4, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 1.4, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 36, "nome": "Kleber Santos", "objetivo": "hipertrofia", "tempo_meses": 13, "frequencia": 3.5, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 3.9, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 37, "nome": "Larissa Morais", "objetivo": "emagrecimento", "tempo_meses": 1, "frequencia": 0.8, "status": "Alto Risco", "Status": "Alto Risco", "VariacaoCarga_2m": 0.1, "DiasAtrasoPagamento_M3": 6 },
  { "matricula": 38, "nome": "Marcos Ribeiro", "objetivo": "saude", "tempo_meses": 9, "frequencia": 3.2, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 2.5, "DiasAtrasoPagamento_M3": 1 },
  { "matricula": 39, "nome": "Nadia Almeida", "objetivo": "condicionamento", "tempo_meses": 16, "frequencia": 4.5, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 6.2, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 40, "nome": "Osmar Filho", "objetivo": "bem-estar", "tempo_meses": 11, "frequencia": 2.8, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 1.9, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 41, "nome": "Priscila Novaes", "objetivo": "hipertrofia", "tempo_meses": 4, "frequencia": 1.9, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 1.2, "DiasAtrasoPagamento_M3": 2 },
  { "matricula": 42, "nome": "Quirino Teles", "objetivo": "emagrecimento", "tempo_meses": 14, "frequencia": 3.6, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 4.3, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 43, "nome": "Renata Viana", "objetivo": "saude", "tempo_meses": 7, "frequencia": 2.5, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 2.0, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 44, "nome": "Sérgio Dutra", "objetivo": "condicionamento", "tempo_meses": 2, "frequencia": 1.4, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 0.7, "DiasAtrasoPagamento_M3": 3 },
  { "matricula": 45, "nome": "Tatiana Cunha", "objetivo": "bem-estar", "tempo_meses": 18, "frequencia": 4.2, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 5.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 46, "nome": "Ubirajara Neto", "objetivo": "hipertrofia", "tempo_meses": 6, "frequencia": 2.7, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 2.1, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 47, "nome": "Vanessa Bueno", "objetivo": "emagrecimento", "tempo_meses": 13, "frequencia": 3.5, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 3.8, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 48, "nome": "Wagner Castro", "objetivo": "saude", "tempo_meses": 1, "frequencia": 0.5, "status": "Alto Risco", "Status": "Alto Risco", "VariacaoCarga_2m": 0.0, "DiasAtrasoPagamento_M3": 5 },
  { "matricula": 49, "nome": "Yara Martins", "objetivo": "condicionamento", "tempo_meses": 17, "frequencia": 4.1, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 5.2, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 50, "nome": "Zeca Lourenço", "objetivo": "bem-estar", "tempo_meses": 20, "frequencia": 4.5, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 6.8, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 51, "nome": "Alice Lima", "objetivo": "hipertrofia", "tempo_meses": 8, "frequencia": 3.0, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 2.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 52, "nome": "Beto Costa", "objetivo": "emagrecimento", "tempo_meses": 11, "frequencia": 2.8, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 1.7, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 53, "nome": "Cintia Melo", "objetivo": "saude", "tempo_meses": 4, "frequencia": 1.8, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 1.0, "DiasAtrasoPagamento_M3": 2 },
  { "matricula": 54, "nome": "Davi Ramos", "objetivo": "condicionamento", "tempo_meses": 15, "frequencia": 3.7, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 4.1, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 55, "nome": "Elaine Pires", "objetivo": "bem-estar", "tempo_meses": 2, "frequencia": 1.3, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 0.5, "DiasAtrasoPagamento_M3": 3 },
  { "matricula": 56, "nome": "Fábio Souza", "objetivo": "hipertrofia", "tempo_meses": 10, "frequencia": 3.2, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 3.0, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 57, "nome": "Gisele Lima", "objetivo": "emagrecimento", "tempo_meses": 5, "frequencia": 2.1, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 1.2, "DiasAtrasoPagamento_M3": 1 },
  { "matricula": 58, "nome": "Hugo Rocha", "objetivo": "saude", "tempo_meses": 14, "frequencia": 3.4, "status": "Risco Médio", "Status": "Ativo", "VariacaoCarga_2m": 3.5, "DiasAtrasoPagamento_M3": 0 },
  { "matricula": 59, "nome": "Ivan Martins", "objetivo": "condicionamento", "tempo_meses": 3, "frequencia": 1.6, "status": "Alto Risco", "Status": "Ativo", "VariacaoCarga_2m": 0.8, "DiasAtrasoPagamento_M3": 2 },
  { "matricula": 60, "nome": "Janaína Alves", "objetivo": "bem-estar", "tempo_meses": 18, "frequencia": 4.0, "status": "Baixo Risco", "Status": "Ativo", "VariacaoCarga_2m": 5.0, "DiasAtrasoPagamento_M3": 0 }
];



// ------------------------------------
// 2. Definição das Colunas (Atualizadas)
// ------------------------------------

// ------------------------------------
// 2. Definição das Colunas (CORRIGIDA)
// ------------------------------------

// Use ColumnsType para tipagem correta do Ant Design
const columns: TableProps<Student>['columns'] = [
  {
    title: 'Matrícula',
    dataIndex: 'matricula',
    key: 'matricula',
    // Correção: Garante que a ordenação e renderização funcionem
    sorter: (a, b) => a.matricula - b.matricula,
    render: (text: number) => <Text style={{ color: 'var(--color-text-light)' }}>{`ACD${text.toString().padStart(4, '0')}`}</Text>,
  },
  {
    title: 'Nome Completo',
    dataIndex: 'nome',
    key: 'nome',
    sorter: (a, b) => a.nome.localeCompare(b.nome),
    render: (text: string) => <Text strong style={{ color: 'var(--color-text-light)' }}>{text}</Text>,
  },
  {
    title: 'Objetivo',
    dataIndex: 'objetivo',
    key: 'objetivo',
    filters: [
        { text: 'hipertrofia', value: 'hipertrofia' },
        { text: 'emagrecimento', value: 'emagrecimento' },
        { text: 'saude', value: 'saude' },
    ],
    // Correção: onFilter recebe o valor do filtro e o record (objeto Student)
    onFilter: (value, record) => record.objetivo.startsWith(value as string),
    render: (text: string) => <Text style={{ color: 'var(--color-text-secondary)' }}>{text.charAt(0).toUpperCase() + text.slice(1)}</Text>,
  },
  {
    title: 'Tempo na Academia',
    dataIndex: 'tempo_meses',
    key: 'tempo_meses',
    sorter: (a, b) => a.tempo_meses - b.tempo_meses,
    render: (meses: number) => (
        <Space size={4}>
            <CalendarOutlined style={{ color: 'var(--color-primary-yellow)' }} />
            <Text style={{ color: 'var(--color-text-secondary)' }}>{`${meses} meses`}</Text>
        </Space>
    ),
  },
  {
    title: 'Frequência Média',
    dataIndex: 'frequencia',
    key: 'frequencia',
    sorter: (a, b) => a.frequencia - b.frequencia,
    render: (frequencia: number) => {
      let color = '#52C41A'; 
      if (frequencia < 2.5) color = '#FF4D4F'; 
      else if (frequencia < 3.5) color = '#FAAD14'; 
      
      return (
        <Tag color={color} style={{ minWidth: '80px', textAlign: 'center' }}>
          {frequencia}x/semana
        </Tag>
      );
    },
  },
  {
    title: 'Status de Risco',
    dataIndex: 'status',
    key: 'status',
    filters: [
        { text: 'Alto Risco', value: 'Alto Risco' },
        { text: 'Baixo Risco', value: 'Baixo Risco' },
        { text: 'Risco Médio', value: 'Risco Médio' },
          ],
    // Correção: Usa a função startsWith para a filtragem
    onFilter: (value, record) => record.status.startsWith(value as string),
    render: (status: string) => {
      const colorMap = {
        'Alto Risco': 'red',
        'Risco Médio': 'orange',
        'Baixo Risco': 'green',
      };
      const iconMap = {
        'Alto Risco': <AlertOutlined />,
        'Risco Médio': <InfoCircleOutlined />,
        'Baixo Risco': <SafetyCertificateOutlined />,
      };

      return (
        <Tag color={colorMap[status as keyof typeof colorMap]} style={{ minWidth: '110px', textAlign: 'center', fontWeight: 'bold' }}>
          <Space size={4}>
            {iconMap[status as keyof typeof iconMap]}
            {status}
          </Space>
        </Tag>
      );
    },
  },
  {
    title: 'Ações',
    key: 'actions',
    // Não precisa de dataIndex
    render: () => (
      <Button 
        size="small"
        style={{ color: 'var(--color-primary-yellow)', borderColor: 'var(--color-primary-yellow)', backgroundColor: 'transparent' }}
      >
        Detalhes
      </Button>
    ),
  },
];

// ... (Restante do componente StudentsListPage)
// ------------------------------------
// 3. Componente Principal
// ------------------------------------

const StudentsList: React.FC = () => {
  const tableStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        <Title level={2} style={{ color: 'var(--color-text-light)', marginBottom: '5px' }}>
          Lista Completa de Alunos
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
          Visualize o risco de evasão e a performance de retenção por unidade.
        </Paragraph>
        
        {/* Barra de Busca e Filtros */}
        <div style={{ marginBottom: '30px' }}>
          <Input
            placeholder="Buscar aluno por nome, matrícula ou objetivo..."
            prefix={<SearchOutlined style={{ color: 'var(--color-primary-yellow)' }} />}
            style={{
              maxWidth: '400px',
              backgroundColor: 'var(--color-secondary-background)',
              borderColor: '#444',
              color: 'var(--color-text-light)',
            }}
          />
        </div>

        {/* Tabela de Alunos */}
        <Table
          dataSource={mockStudents}
          columns={columns}
          rowKey="matricula"
          pagination={{ pageSize: 10, position: ['bottomCenter'], style: { backgroundColor: 'var(--color-secondary-background)' } }}
          style={tableStyle}
          scroll={{ x: 'max-content' }}
          className="ant-table-dark-theme" 
        />
      </div>
    </AppLayout>
  );
};

export default StudentsList;