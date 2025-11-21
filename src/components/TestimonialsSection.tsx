// src/components/TestimonialsSection.tsx

import React from 'react';
import { Layout, Typography, Row, Col, Card } from 'antd';
import  QuotesIcon  from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const TestimonialsSection: React.FC = () => {
  const testimonialCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    borderLeft: '4px solid var(--color-primary-yellow)',
    height: '100%',
  };

  return (
    <Layout style={{ padding: '50px', backgroundColor: 'var(--color-dark-background)' }}>
      <Title level={2} style={{ color: 'var(--color-text-light)', textAlign: 'center', marginBottom: '50px' }}>
        Quem Confia no Poder da Previsão
      </Title>

      <Row gutter={[32, 32]} justify="center">
        {/* Depoimento 1 */}
        <Col xs={24} md={12}>
          <Card style={testimonialCardStyle}>
            <QuotesIcon style={{ fontSize: '24px', color: 'var(--color-primary-yellow)' }} />
            <Paragraph style={{ color: 'var(--color-text-light)', fontStyle: 'italic', marginTop: '15px' }}>
              "Nossa retenção aumentou em 30% logo no primeiro trimestre! Foi um ROI imediato."
            </Paragraph>
            <Paragraph style={{ color: 'var(--color-primary-yellow)', fontWeight: 'bold', margin: 0 }}>
              Ana Santos
            </Paragraph>
            <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '12px', margin: 0 }}>
              Proprietária, Academia Corpo & Mente
            </Paragraph>
          </Card>
        </Col>

        {/* Depoimento 2 */}
        <Col xs={24} md={12}>
          <Card style={testimonialCardStyle}>
            <QuotesIcon style={{ fontSize: '24px', color: 'var(--color-primary-yellow)' }} />
            <Paragraph style={{ color: 'var(--color-text-light)', fontStyle: 'italic', marginTop: '15px' }}>
              "A plataforma é intuitiva, e agora sabemos exatamente em quem focar nosso esforço de relacionamento."
            </Paragraph>
            <Paragraph style={{ color: 'var(--color-primary-yellow)', fontWeight: 'bold', margin: 0 }}>
              João Pereira
            </Paragraph>
            <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '12px', margin: 0 }}>
              Gerente, Inti Fitness Club Pro
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default TestimonialsSection;