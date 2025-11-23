// src/pages/StudentsListPage.tsx

import React, { useEffect, useState } from 'react';
import { Typography, Table, Input, Tag, Space, Spin } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined, SafetyCertificateOutlined, AlertOutlined, InfoCircleOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import AppLayout from '../layout/AppLayout';

// Importamos os serviços
import { getAllStudents, getStudentsPredictions } from '../services/StudentService';

const { Title, Paragraph, Text } = Typography;

// ------------------------------------
// 1. Interface de Visualização
// ------------------------------------
interface Student {
  matricula: number;
  nome: string;
  objetivo: string;
  tempo_meses: number;
  frequencia: number;
  unidade: string;
  status: 'Alto Risco' | 'Baixo Risco'; // Tipagem estrita
  VariacaoCarga_2m: number;
  DiasAtrasoPagamento_M3: number;
}

// ------------------------------------
// 2. Componente Principal
// ------------------------------------

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // --- Lógica de Carregamento e Fusão dos Dados ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 1. Buscamos Alunos e Previsões em paralelo
        const [rawStudents, rawPredictions] = await Promise.all([
            getAllStudents(),
            getStudentsPredictions()
        ]);

        // 2. Criar um mapa das previsões
        const predictionMap = new Map<number, number>();
        rawPredictions.forEach((p: any) => {
            // AQUI: O log mostra que a chave é "predicao"
            predictionMap.set(p.aluno_id, p.predicao); 
        });

        // 3. Mapear e Cruzar os Dados
        const activeStudents = rawStudents

        const tableData: Student[] = activeStudents.map(student => {
            // Calcular frequência média
            const checkinKeys = Object.keys(student).filter(key => key.startsWith('CheckinsSemana_'));
            const totalCheckins = checkinKeys.reduce((sum, key) => sum + (student[key] as number), 0);
            const averageFrequency = checkinKeys.length > 0 ? totalCheckins / checkinKeys.length : 0;

            // Pegamos a previsão do modelo
            const prediction = predictionMap.get(student.aluno_id);
            console.log(`Aluno ID: ${student.aluno_id}, Predição: ${prediction}`);
            
            // --- CORREÇÃO DO ERRO AQUI ---
            // Tipagem explícita para garantir que é 'Alto Risco' | 'Baixo Risco'
            let riskStatus: 'Alto Risco' | 'Baixo Risco' = 'Baixo Risco';
            
            if (prediction === 1) {
                riskStatus = 'Alto Risco';
            }

            return {
                matricula: student.aluno_id,
                nome: student.Nome,
                objetivo: student.Objetivo,
                tempo_meses: student.TempoComoAluno,
                frequencia: Number(averageFrequency.toFixed(1)),
                unidade: student.unidade,
                status: riskStatus, 
                VariacaoCarga_2m: student.VariacaoCarga_2m,
                DiasAtrasoPagamento_M3: student.DiasAtrasoPagamento_M3
            };
        });

        setStudents(tableData);

      } catch (error) {
        console.error("Erro ao carregar dados integrados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const tableStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  // Definição das Colunas
  const columns: TableProps<Student>['columns'] = [
    {
      title: 'Matrícula',
      dataIndex: 'matricula',
      key: 'matricula',
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
      title: 'Unidade',
      dataIndex: 'unidade',
      key: 'unidade',
      filters: [
        { text: 'Centro', value: 'centro' },
        { text: 'Zona Sul', value: 'zona sul' },
        { text: 'Zona Leste', value: 'zona leste' },
        { text: 'Zona Oeste', value: 'zona oeste' },
        { text: 'Zona Norte', value: 'zona norte' },
        { text: 'Alphaville', value: 'alphaville' },
      ],
      onFilter: (value, record) => record.unidade === value,
      render: (text: string) => (
        <Space size={4}>
            <EnvironmentOutlined style={{ color: 'var(--color-text-secondary)' }} />
            <Text style={{ color: 'var(--color-text-secondary)' }}>
                {text ? text.charAt(0).toUpperCase() + text.slice(1) : 'N/A'}
            </Text>
        </Space>
      ),
    },
    {
      title: 'Objetivo',
      dataIndex: 'objetivo',
      key: 'objetivo',
      filters: [
          { text: 'Hipertrofia', value: 'hipertrofia' },
          { text: 'Emagrecimento', value: 'emagrecimento' },
          { text: 'Saúde', value: 'saude' },
          { text: 'Condicionamento', value: 'condicionamento' },
          { text: 'Bem-estar', value: 'bem-estar' },
      ],
      onFilter: (value, record) => record.objetivo === value,
      render: (text: string) => <Text style={{ color: 'var(--color-text-secondary)' }}>{text.charAt(0).toUpperCase() + text.slice(1)}</Text>,
    },
    {
      title: 'Dias Atraso Pagamento', // Título Atualizado
      dataIndex: 'DiasAtrasoPagamento_M3', // Campo Atualizado
      key: 'DiasAtrasoPagamento_M3',
      sorter: (a, b) => a.DiasAtrasoPagamento_M3 - b.DiasAtrasoPagamento_M3,
      render: (dias: number) => {
          // Lógica Visual: Vermelho se tiver atraso, Cinza se estiver em dia
          let color = 'var(--color-text-secondary)';
          let icon = <CalendarOutlined style={{ color: 'var(--color-primary-yellow)' }} />;
          
          if (dias > 0) {
              color = '#FF4D4F'; // Vermelho para atraso
              icon = <AlertOutlined style={{ color: '#FF4D4F' }} />;
          }

          return (
            <Space size={4}>
                {icon}
                <Text style={{ color: color,  }}>
                    {dias > 0 ? `${dias} dias` : 'Em dia'}
                </Text>
            </Space>
        );
      },
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
            {frequencia}x/sem
          </Tag>
        );
      },
    },
    {
      title: 'Predição de Evasão',
      dataIndex: 'status',
      key: 'status',
      filters: [
          { text: 'Alto Risco', value: 'Alto Risco' },
          { text: 'Baixo Risco', value: 'Baixo Risco' },
      ],
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
      render: (status: string) => {
        const colorMap = {
          'Alto Risco': 'red',
          'Baixo Risco': 'green',
        };
        const iconMap = {
          'Alto Risco': <AlertOutlined />,
          'Baixo Risco': <SafetyCertificateOutlined />,
        };

        const color = colorMap[status as keyof typeof colorMap] || 'default';
        const icon = iconMap[status as keyof typeof iconMap] || <InfoCircleOutlined />;

        return (
          <Tag color={color} style={{ minWidth: '110px', textAlign: 'center', fontWeight: 'bold' }}>
            <Space size={4}>
              {icon}
              {status}
            </Space>
          </Tag>
        );
      },
    },
    // {
    //   title: 'Ações',
    //   key: 'actions',
    //   render: () => (
    //     <Button 
    //       size="small"
    //       style={{ color: 'var(--color-primary-yellow)', borderColor: 'var(--color-primary-yellow)', backgroundColor: 'transparent' }}
    //     >
    //       Detalhes
    //     </Button>
    //   ),
    // },
  ];

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        <Title level={2} style={{ color: 'var(--color-text-light)', marginBottom: '5px' }}>
          Lista Completa de Alunos
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
          Risco calculado via Machine Learning (Modelo: Regressão Logística).
        </Paragraph>
        
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

        {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <Text style={{ display: 'block', marginTop: '10px', color: 'var(--color-text-secondary)' }}>
                    Consultando modelo de Inteligência Artificial...
                </Text>
            </div>
        ) : (
            <Table
              dataSource={students}
              columns={columns}
              rowKey="matricula"
              pagination={{ pageSize: 10, position: ['bottomCenter'], style: { backgroundColor: 'var(--color-secondary-background)' } }}
              style={tableStyle}
              scroll={{ x: 'max-content' }}
              className="ant-table-dark-theme" 
            />
        )}
      </div>
    </AppLayout>
  );
};

export default StudentsList;