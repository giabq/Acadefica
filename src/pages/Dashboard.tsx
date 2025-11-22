// src/pages/DashboardPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos DatePicker e desestruturamos RangePicker
import { Typography, Row, Col, Card, Radio, Input, Progress, Space, Button, DatePicker } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import AppLayout from '../layout/AppLayout';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker; // Desestruturação do RangePicker

// Helper para formatar o risco
const formatRisk = (risk: 'alto' | 'medio' | 'baixo') => {
    return risk.charAt(0).toUpperCase() + risk.slice(1);
};

// Dados de exemplo para alunos
const mockStudents = [
  { id: 1, name: 'Ana Silva', risk: 'alto' as const },
  { id: 2, name: 'Carlos Santos', risk: 'medio' as const },
  { id: 3, name: 'Maria Oliveira', risk: 'baixo' as const },
  { id: 4, name: 'João Costa', risk: 'alto' as const },
  { id: 5, name: 'Pedro Alves', risk: 'medio' as const },
  { id: 6, name: 'Julia Ferraro', risk: 'baixo' as const },
  { id: 7, name: 'Lucas Souza', risk: 'alto' as const },
  { id: 8, name: 'Beatriz Lima', risk: 'medio' as const },
  { id: 9, name: 'Rafael Rocha', risk: 'baixo' as const },
];

type RiskType = typeof mockStudents[number]['risk'];

const Dashboard: React.FC = () => {
    const navigate = useNavigate()
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    color: 'var(--color-text-light)',
    border: 'none',
    borderRadius: '10px',
  };

  const filterCardStyle: React.CSSProperties = {
    ...cardStyle,
    textAlign: 'left',
  };

  const studentCardStyle = (risk: RiskType): React.CSSProperties => {
    let borderColor = '#555';
    if (risk === 'alto') borderColor = '#FF4D4F'; // Vermelho
    else if (risk === 'medio') borderColor = '#FAAD14'; // Laranja
    else if (risk === 'baixo') borderColor = '#52C41A'; // Verde

    return {
      backgroundColor: 'var(--color-secondary-background)',
      color: 'var(--color-text-light)',
      border: `1px solid ${borderColor}`,
      borderRadius: '8px',
      textAlign: 'center',
      padding: '15px 10px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
  };

  return (
    <AppLayout>
      <Title level={2} style={{ color: 'var(--color-text-light)', marginBottom: '30px' }}>
        Transformando evasão em retenção com inteligência artificial
      </Title>
      <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '40px' }}>
        Olá, Academia! Use a IA para prever e reduzir a evasão de alunos em tempo real.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {/* Coluna da Esquerda: Filtros e Visão Geral */}
        <Col xs={4} md={5}>
          {/* Card de Filtros */}
          <Card style={filterCardStyle}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              
              {/* NOVO FILTRO: Intervalo de Datas (substituindo Ano e Semestre) */}
              <Text strong style={{ color: 'var(--color-text-light)', marginBottom: '10px', display: 'block' }}>
                Período de Análise
              </Text>
              <RangePicker 
                style={{ 
                    width: '100%',
                    // Garante que o input do date picker tenha a cor do tema
                    backgroundColor: 'var(--color-secondary-background)',
                    borderColor: '#444'
                }}
                placeholder={['Início', 'Fim']}
                // Configura a cor do texto do RangePicker
                inputReadOnly={false}
              />

              {/* FILTRO ATUALIZADO: Unidade (substituindo Departamento) */}
              <Text strong style={{ color: 'var(--color-text-light)', marginBottom: '10px', display: 'block', marginTop: '20px' }}>
                Unidade
              </Text>
              <Radio.Group defaultValue="1">
                <Space direction="vertical">
                  <Radio value="1" style={{ color: 'var(--color-text-light)' }}>Unidade Centro</Radio>
                  <Radio value="2" style={{ color: 'var(--color-text-light)' }}>Unidade Zona Sul</Radio>
                  <Radio value="3" style={{ color: 'var(--color-text-light)' }}>Unidade Leste</Radio>
                </Space>
              </Radio.Group>
            </Space>
          </Card>
        </Col>

        {/* Coluna da Direita: Risco Geral e Alunos (Resto do código permanece igual) */}
        <Col xs={24} lg={16}>
          {/* Card de Risco Geral */}
          <Card style={cardStyle}>
            <Row align="middle">
              <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                <Progress
                  type="dashboard"
                  percent={75}
                  width={150}
                  strokeColor={{
                    '0%': '#FAAD14', 
                    '100%': '#FF4D4F', 
                  }}
                  format={percent => <Text style={{ color: 'var(--color-text-light)', fontSize: '24px' }}>{percent}%</Text>}
                />
              </Col>
              <Col xs={24} md={16}>
                <Title level={3} style={{ color: 'var(--color-text-light)', margin: 0 }}>
                  75% em risco de evasão
                </Title>
                <Paragraph style={{ color: 'var(--color-text-secondary)', marginTop: '10px' }}>
                  Este é o percentual geral de alunos com alto ou médio risco de evasão na sua academia neste período.
                </Paragraph>
              </Col>
            </Row>
          </Card>

          {/* Seção de Busca e Lista de Alunos */}
          <Card style={{ ...cardStyle, marginTop: '24px', padding: '20px' }}>
            <Input
              placeholder="Buscar alunos..."
              prefix={<SearchOutlined style={{ color: 'var(--color-primary-yellow)' }} />}
              style={{
                marginBottom: '20px',
                backgroundColor: '#2B2B2B',
                borderColor: '#444',
                color: 'var(--color-text-light)',
              }}
            />

            <Row gutter={[16, 16]}>
              {mockStudents.map(student => (
                <Col xs={24} sm={12} md={8} key={student.id}>
                  <Card style={studentCardStyle(student.risk)}>
                    <UserOutlined style={{ fontSize: '30px', color: 'var(--color-primary-yellow)', marginBottom: '10px' }} />
                    <Text strong style={{ color: 'var(--color-text-light)', display: 'block' }}>
                      {student.name}
                    </Text>
                    <Text style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                      Risco: {formatRisk(student.risk)} 
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
            
            <Button
              type="primary"
              size="large"
              block
              onClick={() => navigate('/alunos')}
              style={{ marginTop: '30px', backgroundColor: 'var(--color-primary-yellow)', color: 'var(--color-dark-background)', fontWeight: 'bold' }}
            >
              Ver lista completa de alunos +
            </Button>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Dashboard;