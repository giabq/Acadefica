// src/components/FeaturesSection.tsx

import React from 'react';
import { Layout, Typography, Row, Col, Card } from 'antd';
import { RobotOutlined, BarChartOutlined, RocketOutlined, DollarOutlined, LineChartOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FeaturesSection: React.FC = () => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    color: 'var(--color-text-light)',
    border: 'none',
    textAlign: 'center',
    height: '100%',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '40px',
    color: 'var(--color-primary-yellow)',
    marginBottom: '15px',
  };

  return (
    <Layout id="features" style={{ padding: '70px 0 90px', backgroundColor: 'var(--color-secondary-background)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 30px' }}>
        {/* SEÇÃO 1: PROBLEMA E SOLUÇÃO (3 PASSOS) */}
        <Title level={2} style={{ color: 'var(--color-text-light)', textAlign: 'center', marginBottom: '12px' }}>
          Deixe de Reagir. Comece a Prever.
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', textAlign: 'center', maxWidth: '660px', margin: '0 auto 36px' }}>
          Entenda o nosso motor de Machine Learning em 3 etapas simples.
        </Paragraph>
        <Row gutter={[32, 32]} justify="center">
          {/* Card 1: Coleta de Dados */}
          <Col xs={24} md={12} lg={8}>
            <Card style={cardStyle}>
              <RobotOutlined style={iconStyle} />
              <Title level={4} style={{ color: 'var(--color-text-light)',  margin: 10 }}>Coleta de Dados</Title>
              <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                Coletamos dados de check-in, frequência, interação com aulas, pagamentos e mais.
              </Paragraph>
            </Card>
          </Col>

          {/* Card 2: Score de Risco */}
          <Col xs={24} md={12} lg={8}>
            <Card style={cardStyle}>
              <BarChartOutlined style={iconStyle} />
              <Title level={4} style={{ color: 'var(--color-text-light)',  margin: 10 }}>Score de Risco</Title>
              <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                Nosso algoritmo atribui uma pontuação de 0 a 100 para cada aluno, indicando a probabilidade de evasão.
              </Paragraph>
            </Card>
          </Col>

          {/* Card 3: Estratégias Personalizadas */}
          <Col xs={24} md={12} lg={8}>
            <Card style={cardStyle}>
              <RocketOutlined style={iconStyle} />
              <Title level={4} style={{ color: 'var(--color-text-light)', margin: 10 }}>Estratégias Personalizadas</Title>
              <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                Seu time recebe alertas e sugestões de ações específicas para cada grupo de risco.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* SEÇÃO 2: BENEFÍCIOS */}
        <Title level={2} style={{ color: 'var(--color-text-light)', textAlign: 'center', marginBottom: '16px', marginTop: '60px' }}>
          Resultados Que Você Pode Ver na Mensalidade
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px', fontSize: '16px' }}>
          Academias que usam Acadefica aumentam receita e reduzem custos comprovadamente.
        </Paragraph>

        <Row gutter={[32, 32]} justify="center" style={{ alignItems: 'stretch' }}>
          {/* Benefício 1: Retenção */}
          <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
            <Card 
              style={{ 
                textAlign: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: '100%'
              }}
              bodyStyle={{ padding: '32px 24px' }}
            >
              <LineChartOutlined style={{ fontSize: '48px', color: '#22C55E', marginBottom: '16px' }} />
              <Title level={2} style={{ color: '#22C55E', margin: '0 0 8px', fontSize: '48px', fontWeight: 'bold' }}>+28%</Title>
              <Title level={4} style={{ color: 'var(--color-text-light)', margin: '0 0 8px' }}>Aumento de Retenção</Title>
              <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 0, fontSize: '14px' }}>
                Seus alunos ficam mais tempo. Mais receita recorrente.
              </Paragraph>
            </Card>
          </Col>
          
          {/* Benefício 2: Custos */}
          <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
            <Card 
              style={{ 
                textAlign: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: '100%'
              }}
              bodyStyle={{ padding: '32px 24px' }}
            >
              <DollarOutlined style={{ fontSize: '48px', color: '#3B82F6', marginBottom: '16px' }} />
              <Title level={2} style={{ color: '#3B82F6', margin: '0 0 8px', fontSize: '48px', fontWeight: 'bold' }}>-45%</Title>
              <Title level={4} style={{ color: 'var(--color-text-light)', margin: '0 0 8px' }}>Redução de CAC</Title>
              <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 0, fontSize: '14px' }}>
                Menos gastos com aquisição. Foque em quem já está dentro.
              </Paragraph>
            </Card>
          </Col>

          {/* Benefício 3: Relatórios */}
          <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
            <Card 
              style={{ 
                textAlign: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: '100%'
              }}
              bodyStyle={{ padding: '32px 24px' }}
            >
              <BarChartOutlined style={{ fontSize: '48px', color: '#A855F7', marginBottom: '16px' }} />
              <Title level={2} style={{ color: '#A855F7', margin: '0 0 8px', fontSize: '48px', fontWeight: 'bold' }}>100%</Title>
              <Title level={4} style={{ color: 'var(--color-text-light)', margin: '0 0 8px' }}>Visibilidade Total</Title>
              <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 0, fontSize: '14px' }}>
                Dashboards intuitivos. Decisões baseadas em dados reais.
              </Paragraph>
            </Card>
          </Col>

          {/* Benefício 4: Integração */}
          <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
            <Card 
              style={{ 
                textAlign: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: '100%'
              }}
              bodyStyle={{ padding: '32px 24px' }}
            >
              <SettingOutlined style={{ fontSize: '48px', color: '#FFD700', marginBottom: '16px' }} />
              <Title level={2} style={{ color: '#FFD700', margin: '0 0 8px', fontSize: '48px', fontWeight: 'bold' }}>24h</Title>
              <Title level={4} style={{ color: 'var(--color-text-light)', margin: '0 0 8px' }}>Setup Rápido</Title>
              <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 0, fontSize: '14px' }}>
                Integração com seus sistemas em menos de 1 dia.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default FeaturesSection;