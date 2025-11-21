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
        Escolha o Plano Ideal para o Tamanho da Sua Academia
      </Title>

      {/* Nota de Implementação em destaque amarelo */}
      <Paragraph 
        style={{ 
          color: 'var(--color-dark-background)', 
          backgroundColor: 'var(--color-primary-yellow)', 
          textAlign: 'center', 
          padding: '10px', 
          margin: '30px auto',
          borderRadius: '5px',
          width: 'fit-content',
          fontWeight: 'bold'
        }}
      >
        *Cobrança única de Taxa de Implementação no primeiro contrato. Sem surpresas!
      </Paragraph>

      <Row gutter={[32, 32]} justify="center">
        {/* Plano Start */}
        <Col xs={24} md={8} lg={6}>
          <Card title={<Title level={3} style={{ color: 'var(--color-primary-yellow)', margin: 0 }}>Plano Start</Title>} style={cardStyle}>
            <div style={{ flexGrow: 1 }}>
                <Paragraph style={{ color: 'var(--color-text-secondary)' }}>
                    **Porte:** Pequeno (Até X Alunos)
                </Paragraph>
                <Title level={3} style={{ color: 'var(--color-text-light)' }}>[Valor]</Title>
                <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                    Modalidade Anual
                </Paragraph>
                <Paragraph><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Score de Risco Essencial</Paragraph>
                <Paragraph><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> 1 Usuário</Paragraph>
            </div>
            <Button
              type="primary"
              size="large"
              block
              style={ctaButton}
              onClick={() => handleSelectPlan('Plano Start')}
            >
              Contratar
            </Button>
          </Card>
        </Col>

        {/* Plano Pro (Destaque se necessário) */}
        <Col xs={24} md={8} lg={6}>
          <Card title={<Title level={3} style={{ color: 'var(--color-primary-yellow)', margin: 0 }}>Plano Pro</Title>} style={cardStyle}>
             <div style={{ flexGrow: 1 }}>
                <Paragraph style={{ color: 'var(--color-text-secondary)' }}>
                    **Porte:** Médio (Até Y Alunos)
                </Paragraph>
                <Title level={3} style={{ color: 'var(--color-text-light)' }}>[Valor]</Title>
                 <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                    Semestral ou Anual
                </Paragraph>
                <Paragraph><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Score Avançado</Paragraph>
                <Paragraph><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Relatórios Personalizados</Paragraph>
                <Paragraph><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> 5 Usuários</Paragraph>
            </div>
            <Button
              type="primary"
              size="large"
              block
              style={ctaButton}
              onClick={() => handleSelectPlan('Plano Pro')}
            >
              Contratar
            </Button>
          </Card>
        </Col>

        {/* Plano Enterprise */}
        <Col xs={24} md={8} lg={6}>
          <Card title={<Title level={3} style={{ color: 'var(--color-primary-yellow)', margin: 0 }}>Plano Enterprise</Title>} style={cardStyle}>
            <div style={{ flexGrow: 1 }}>
                <Paragraph style={{ color: 'var(--color-text-secondary)' }}>
                    **Porte:** Grande (+ de Z Alunos)
                </Paragraph>
                <Title level={3} style={{ color: 'var(--color-primary-yellow)' }}>Cotação Personalizada</Title>
                <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                    Anual ou Uso Único
                </Paragraph>
                <Paragraph><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Suporte Dedicado 24h</Paragraph>
                <Paragraph><CheckOutlined style={{ color: 'var(--color-primary-yellow)' }} /> Usuários Ilimitados</Paragraph>
            </div>
            <Button
              size="large"
              block
              style={{ ...ctaButton, backgroundColor: '#333', borderColor: '#333', color: 'var(--color-primary-yellow)' }}
              onClick={() => handleSelectPlan('Plano Enterprise')}
            >
              Solicitar Cotação
            </Button>
          </Card>
        </Col>
      </Row>
      
    </Layout>
  );
};

export default PricingSection;