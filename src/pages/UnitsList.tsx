// src/pages/UnitsList.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Tag, Space, Button, Dropdown,  Spin } from 'antd';
import type {TableProps, MenuProps} from 'antd';
import { 
    SearchOutlined, 
    EditOutlined, 
    BarChartOutlined, 
    EnvironmentOutlined, 
    PlusCircleOutlined,
    MoreOutlined, 
    FolderOutlined, 
    EyeOutlined 
} from '@ant-design/icons';
import AppLayout from '../layout/AppLayout';
import { useNavigate } from 'react-router-dom';

// Importamos os serviços de Alunos e Predições para cálculo local
import { getAllStudents, getStudentsPredictions } from '../services/StudentService';

const { Title, Paragraph, Text } = Typography;

// ------------------------------------
// 1. Tipagem
// ------------------------------------

interface Unit {
  id: number;
  nome: string;
  localizacao: string;
  responsavel: string;
  status: 'Ativo' | 'Em Construção' | 'Inativo';
  total_alunos: number; // Renomeado para refletir que são todos
  taxa_evasao: number; 
}

// ------------------------------------
// 2. Metadados Estáticos
// ------------------------------------
const unitMetadata: Record<string, { local: string; resp: string }> = {
    "centro": { local: "Av. Paulista, 1000 - SP", resp: "Felipe Dantas" },
    "zona sul": { local: "Rua Vergueiro, 800 - SP", resp: "Clara Mendes" },
    "zona leste": { local: "Tatuapé, SP", resp: "Roberto Alencar" },
    "zona oeste": { local: "Pinheiros, SP", resp: "Juliana Pires" },
    "zona norte": { local: "Santana, SP", resp: "Marcos Silva" },
    "alphaville": { local: "Barueri, SP", resp: "Ana Beatriz" }
};

// ------------------------------------
// 3. Componente Principal
// ------------------------------------

const UnitsList: React.FC = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessData = async () => {
        setLoading(true);
        try {
            const [allStudents, allPredictions] = await Promise.all([
                getAllStudents(),
                getStudentsPredictions()
            ]);
            
            const predictionMap = new Map<number, number>();
            allPredictions.forEach((p: any) => {
                const val = p.predicao !== undefined ? p.predicao : p["Regressão Logística_Prediction"];
                predictionMap.set(p.aluno_id, val);
            });

            const unitsStats: Record<string, { total: number; highRisk: number }> = {};

            allStudents.forEach(student => {
                const unitName = student.unidade ? student.unidade.toLowerCase().trim() : 'desconhecida';
                
                if (!unitsStats[unitName]) {
                    unitsStats[unitName] = { total: 0, highRisk: 0 };
                }

                unitsStats[unitName].total += 1;

                const pred = predictionMap.get(student.aluno_id);
                if (pred === 1) {
                    unitsStats[unitName].highRisk += 1;
                }
            });

            const processedUnits = Object.keys(unitsStats).map((name, index) => {
                const stats = unitsStats[name];
                const meta = unitMetadata[name] || { local: "Localização não cadastrada", resp: "N/A" };
                const riskRate = (stats.highRisk / stats.total) * 100;
                

                // --- CORREÇÃO AQUI ---
                // Forçamos a tipagem para garantir que bate com a Interface Unit
                const statusCalculado: 'Ativo' | 'Em Construção' | 'Inativo' = stats.total > 0 ? 'Ativo' : 'Inativo';

                return {
                    id: index + 1,
                    nome: name.charAt(0).toUpperCase() + name.slice(1),
                    localizacao: meta.local,
                    responsavel: meta.resp,
                    status: statusCalculado, // Usamos a variável tipada
                    total_alunos: stats.total,
                    taxa_evasao: Number(riskRate.toFixed(1))
                };
            });

            setUnits(processedUnits);

        } catch (error) {
            console.error("Erro ao processar unidades:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchAndProcessData();
  }, []);

  const getUnitActions = (unit: Unit): MenuProps['items'] => [
      {
        key: 'edit',
        label: 'Editar Unidade',
        icon: <EditOutlined />,
        onClick: () => {
          alert(`Abrir edição: ${unit.nome}`);
        },
      },
      {
        key: 'view',
        label: 'Ver Mais Detalhes',
        icon: <EyeOutlined />,
        onClick: () => navigate(`/unidades/${unit.id}`), 
      },
      {
        key: 'archive',
        label: 'Arquivar Unidade',
        icon: <FolderOutlined />, 
        danger: true, 
        onClick: () => alert(`Arquivar: ${unit.nome}`),
      },
  ];

  const columns: TableProps<Unit>['columns'] = [
    {
      title: 'Nome da Unidade',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      render: (text: string) => <Text strong style={{ color: 'var(--color-primary-yellow)' }}>{text}</Text>,
    },
    {
      title: 'Localização',
      dataIndex: 'localizacao',
      key: 'localizacao',
      render: (text: string) => (
          <Space size={4}>
              <EnvironmentOutlined style={{ color: 'var(--color-text-secondary)' }} />
              <Text style={{ color: 'var(--color-text-secondary)' }}>{text}</Text>
          </Space>
      ),
    },
    {
      title: 'Responsável',
      dataIndex: 'responsavel',
      key: 'responsavel',
      render: (text: string) => <Text style={{ color: 'var(--color-text-light)' }}>{text}</Text>,
    },
    {
      title: 'Total de Alunos', // Renomeado para refletir que não são só ativos
      dataIndex: 'total_alunos',
      key: 'total_alunos',
      sorter: (a, b) => a.total_alunos - b.total_alunos,
      render: (alunos: number) => <Text style={{ color: 'var(--color-text-light)' }}>{alunos}</Text>,
    },
    {
      title: 'Probabilidade evasão',
      dataIndex: 'taxa_evasao',
      key: 'taxa_evasao',
      sorter: (a, b) => a.taxa_evasao - b.taxa_evasao ,
      render: (taxa: number) => {
          let color = taxa > 70 ? '#FF4D4F' : (taxa >= 50 ? '#FAAD14' : '#52C41A');
          
          return (
              <Tag color={color} style={{ fontWeight: 'bold', fontSize: '14px', padding: '4px 8px' }}>
                  <BarChartOutlined style={{ marginRight: '5px' }} />
                  {taxa}%
              </Tag>
          );
      },
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 80, 
      render: (_, record) => (
        <Dropdown 
            menu={{ items: getUnitActions(record) }} 
            trigger={['click']}
            placement="bottomRight"
            dropdownRender={(menu) => (
              <div style={{ backgroundColor: '#1A1A1A', borderRadius: '4px', border: '1px solid #333' }}>
                {menu}
              </div>
            )}
        >
            <Button 
                icon={<MoreOutlined />} 
                size="small"
                type="text"
                style={{ color: 'var(--color-primary-yellow)' }}
            />
        </Dropdown>
      ),
    },
  ];

  const tableStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        <Title level={2} style={{ color: 'var(--color-text-light)', marginBottom: '5px' }}>
          Visão Geral das Unidades
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
          Acompanhe o desempenho e status de todas as suas unidades (Baseado em IA).
        </Paragraph>
        
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Input
            placeholder="Buscar unidade por nome ou localização..."
            prefix={<SearchOutlined style={{ color: 'var(--color-primary-yellow)' }} />}
            style={{
              maxWidth: '400px',
              backgroundColor: 'var(--color-secondary-background)',
              borderColor: '#444',
              color: 'var(--color-text-light)',
            }}
          />
          <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => navigate('/unidades/nova')}
              style={{ backgroundColor: 'var(--color-primary-yellow)', color: '#505050', fontWeight: 'bold' }}
          >
              Nova Unidade
          </Button>
        </div>

        {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <Text style={{ display: 'block', marginTop: '10px', color: 'var(--color-text-secondary)' }}>
                    Calculando métricas de retenção...
                </Text>
            </div>
        ) : (
            <Table
              dataSource={units}
              columns={columns}
              rowKey="id"
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

export default UnitsList;