// src/pages/UnitsList.tsx (UnitsListPage.tsx)

import React from 'react';
import { Typography, Table, Input, Tag, Space, Button, Dropdown,  } from 'antd';
import type { TableProps, MenuProps} from 'antd';
import { 
    SearchOutlined, 
    EditOutlined, 
    BarChartOutlined, 
    EnvironmentOutlined, 
    PlusCircleOutlined,
    MoreOutlined, 
    FolderOutlined, // Usado para Arquivar/Reativar
    EyeOutlined 
} from '@ant-design/icons';
import AppLayout from '../layout/AppLayout';
import { useNavigate } from 'react-router-dom'; // NECESSÁRIO para o hook

const { Title, Paragraph, Text } = Typography;

// ------------------------------------
// 1. Tipagem e Dados Mock
// ------------------------------------

interface Unit {
  id: number;
  nome: string;
  localizacao: string;
  responsavel: string;
  status: 'Ativo' | 'Em Construção' | 'Inativo';
  alunos_ativos: number;
  taxa_retencao_3m: number; 
}

const mockUnits: Unit[] = [
  { id: 101, nome: 'Unidade Centro', localizacao: 'São Paulo/SP', responsavel: 'Felipe Dantas', status: 'Ativo', alunos_ativos: 450, taxa_retencao_3m: 92.5 },
  { id: 102, nome: 'Unidade Zona Sul', localizacao: 'Rio de Janeiro/RJ', responsavel: 'Clara Mendes', status: 'Ativo', alunos_ativos: 620, taxa_retencao_3m: 88.0 },
  { id: 103, nome: 'Franquia Leste', localizacao: 'Belo Horizonte/MG', responsavel: 'Roberto Alencar', status: 'Em Construção', alunos_ativos: 0, taxa_retencao_3m: 0 },
  { id: 104, nome: 'Unidade Oeste', localizacao: 'São Paulo/SP', responsavel: 'Juliana Pires', status: 'Inativo', alunos_ativos: 120, taxa_retencao_3m: 75.3 },
  { id: 105, nome: 'Unidade Alphaville', localizacao: 'Barueri/SP', responsavel: 'Marcos Silva', status: 'Ativo', alunos_ativos: 380, taxa_retencao_3m: 95.1 },
];

// ------------------------------------
// 2. Componente Principal
// ------------------------------------

const UnitsList: React.FC = () => {
  // Inicialização do hook de navegação (CORREÇÃO DO ERRO)
  const navigate = useNavigate(); 

  // Função para criar o menu dropdown com todas as ações
  const getUnitActions = (unit: Unit): MenuProps['items'] => [
      {
        key: 'edit',
        label: 'Editar Unidade',
        icon: <EditOutlined />,
        onClick: () => {
          // AÇÃO DE NAVEGAÇÃO CORRETA: Redireciona para a rota dinâmica de EDIÇÃO
          navigate(`/unidades/${unit.id}/editar`); 
        },
      },
      {
        key: 'view',
        label: 'Ver Mais Detalhes',
        icon: <EyeOutlined />,
        onClick: () => {
          // Navegação para a rota dinâmica de detalhes
          navigate(`/unidades/${unit.id}`); 
        },
      },
      {
        key: 'archive',
        label: unit.status !== 'Inativo' ? 'Arquivar Unidade' : 'Reativar Unidade',
        icon: <FolderOutlined />, 
        danger: true, 
        onClick: () => {
          alert(`Ação de Arquivar/Reativar para: ${unit.nome}`);
        },
      },
  ];

  // Definição das Colunas (agora dentro do componente para usar o getUnitActions)
  const columns: TableProps<Unit>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      render: (text: number) => <Text style={{ color: 'var(--color-text-light)' }}>{text}</Text>,
    },
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
      title: 'Alunos Ativos',
      dataIndex: 'alunos_ativos',
      key: 'alunos_ativos',
      sorter: (a, b) => a.alunos_ativos - b.alunos_ativos,
      render: (alunos: number) => <Text style={{ color: 'var(--color-text-light)' }}>{alunos}</Text>,
    },
    {
      title: 'Taxa Retenção (3m)',
      dataIndex: 'taxa_retencao_3m',
      key: 'taxa_retencao_3m',
      sorter: (a, b) => a.taxa_retencao_3m - b.taxa_retencao_3m,
      render: (taxa: number) => {
          let color = taxa > 90 ? 'green' : (taxa > 80 ? 'orange' : 'red');
          return (
              <Tag color={color} icon={<BarChartOutlined />}>
                  {taxa}%
              </Tag>
          );
      },
    },
    {
      title: 'Status Operacional',
      dataIndex: 'status',
      key: 'status',
      filters: [
          { text: 'Ativo', value: 'Ativo' },
          { text: 'Em Construção', value: 'Em Construção' },
          { text: 'Inativo', value: 'Inativo' },
      ],
      onFilter: (value, record) => record.status.startsWith(value as string),
      render: (status: string) => {
        const colorMap = {
          'Ativo': 'green',
          'Em Construção': 'blue',
          'Inativo': 'red',
        };
        return (
          <Tag color={colorMap[status as keyof typeof colorMap]} style={{ minWidth: '110px', textAlign: 'center' }}>
            {status}
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
            // Garante que o dropdown combine com o tema escuro
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
          Acompanhe o desempenho e status de todas as suas unidades.
        </Paragraph>
        
        {/* Barra de Busca e Ações */}
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
              onClick={() => navigate('/unidades/nova')} // Agora com a navegação correta
              style={{ backgroundColor: 'var(--color-primary-yellow)', color: '#505050', fontWeight: 'bold' }}
          >
              Nova Unidade
          </Button>
        </div>

        {/* Tabela de Unidades */}
        <Table
          dataSource={mockUnits}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
          style={tableStyle}
          scroll={{ x: 'max-content' }}
          className="ant-table-dark-theme" 
        />
      </div>
    </AppLayout>
  );
};

export default UnitsList;