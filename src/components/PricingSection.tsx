// src/components/PricingSection.tsx

import React from 'react';
import { Layout, Typography, Row, Col, Card, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { scrollToSection } from '../utils/navigation';

const { Title, Paragraph } = Typography;

const PricingSection: React.FC = () => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#1A1A1A',
    color: 'var(--color-text-light)',
    border: '1px solid #333',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const ctaButton: React.CSSProperties = {
    marginTop: '20px',
    fontWeight: 'bold',
  };

  const handleSelectPlan = (planName: string) => {
    scrollToSection('contact');
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('acadefica_selected_plan', planName);
    }
  };

  return (
    <Layout id="pricing" style={{ padding: '50px', backgroundColor: 'var(--color-dark-background)' }}>
      
      <Title level={2} style={{ color: 'var(--color-text-light)', textAlign: 'center', marginBottom: '10px' }}>
        Planos e Preços
      </Title>

      {/* Nota de Implementação em destaque amarelo */}
      <Paragraph 
        style={{ 
          color: 'var(--color-dark-background)', 
          backgroundColor: 'var(--color-primary-yellow)', 
          textAlign: 'center', 
          padding: '8px 16px', 
          margin: '20px auto',
          borderRadius: '5px',
          width: 'fit-content',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        *Taxa de implementação única no primeiro contrato
      </Paragraph>

      <Row gutter={[32, 32]} justify="center">
        {/* Plano Pequeno Porte */}
        <Col xs={24} md={8} lg={6}>
          <Card title={<Title level={3} style={{ color: 'var(--color-primary-yellow)', margin: 0 }}>Pequeno Porte</Title>} style={cardStyle}>
            <div style={{ flexGrow: 1 }}>
                <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    Até 500 alunos
                </Paragraph>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '10px 0 5px' }}>Uso Único: R$ 2,00/aluno</Title>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '5px 0' }}>Semestral: R$ 1,70/aluno/mês</Title>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '5px 0 20px' }}>Anual: R$ 1,50/aluno/mês</Title>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> 100% LGPD</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Análise preditiva</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Dashboard básico</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Alertas automáticos</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Suporte email</Paragraph>
            </div>
            <Button
              type="primary"
              size="large"
              block
              style={{ ...ctaButton, color: '#505050' }}
              onClick={() => handleSelectPlan('Pequeno Porte')}
            >
              Contratar
            </Button>
          </Card>
        </Col>

        {/* Plano Médio Porte (Mais Popular) */}
        <Col xs={24} md={8} lg={6}>
          <Card 
            title={
              <div>
                <Title level={3} style={{ color: 'var(--color-primary-yellow)', margin: 0 }}>Médio Porte</Title>
                <Paragraph style={{ color: 'var(--color-primary-yellow)', fontSize: '12px', margin: '5px 0 0', fontWeight: 'bold' }}>🔥 MAIS POPULAR</Paragraph>
              </div>
            } 
            style={{ ...cardStyle, border: '2px solid var(--color-primary-yellow)' }}
          >
             <div style={{ flexGrow: 1 }}>
                <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    501 a 2.000 alunos
                </Paragraph>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '10px 0 5px' }}>Uso Único: R$ 1,80/aluno</Title>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '5px 0' }}>Semestral: R$ 1,50/aluno/mês</Title>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '5px 0 20px' }}>Anual: R$ 1,30/aluno/mês</Title>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> 100% LGPD</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Tudo do Pequeno</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Dashboard avançado</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Relatórios detalhados</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Suporte prioritário</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Integrações</Paragraph>
            </div>
            <Button
              type="primary"
              size="large"
              block
              style={{ ...ctaButton, color: '#505050' }}
              onClick={() => handleSelectPlan('Médio Porte')}
            >
              Contratar
            </Button>
          </Card>
        </Col>

        {/* Plano Grande Porte */}
        <Col xs={24} md={8} lg={6}>
          <Card title={<Title level={3} style={{ color: 'var(--color-primary-yellow)', margin: 0 }}>Grande Porte</Title>} style={cardStyle}>
            <div style={{ flexGrow: 1 }}>
                <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    Mais de 2.000 alunos
                </Paragraph>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '10px 0 5px' }}>Uso Único: R$ 1,50/aluno</Title>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '5px 0' }}>Semestral: R$ 1,30/aluno/mês</Title>
                <Title level={4} style={{ color: 'var(--color-text-light)', margin: '5px 0 20px' }}>Anual: R$ 1,00/aluno/mês</Title>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> 100% LGPD</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Tudo do Médio</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Análises ilimitadas</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Consultoria inclusa</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Suporte 24/7</Paragraph>
                <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> API completa</Paragraph>
            </div>
            <Button
              type="primary"
              size="large"
              block
              style={{ ...ctaButton, color: '#505050' }}
              onClick={() => handleSelectPlan('Grande Porte')}
            >
              Contratar
            </Button>
          </Card>
        </Col>
      </Row>
      
    </Layout>
  );
};

export default PricingSection;