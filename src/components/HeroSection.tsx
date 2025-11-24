// src/components/HeroSection.tsx

import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { scrollToSection } from '../utils/navigation';
import HeroBanner from '../assets/banner-herosection.png';

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
    return (
        <Layout
            id="hero"
            style={{
                padding: '70px 40px',
                textAlign: 'left',
                backgroundColor: 'var(--color-dark-background)',
                color: 'var(--color-text-light)',
                minHeight: 'calc(80vh)',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: `linear-gradient(120deg, rgba(13, 13, 13, 0.92), rgba(13, 13, 13, 0.7)), url(${HeroBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
                <div
                    style={{
                        width: '100%',
                        margin: '0 auto',
                        maxWidth: '1100px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '40px',
                        alignItems: 'center'
                    }}
                >
                    {/* Conteúdo principal */}
                    <Space direction="vertical" size="large" style={{ maxWidth: '540px' }} align="start">

                        <Title level={1} style={{ color: 'var(--color-text-light)', fontSize: '50px', lineHeight: '1.05', margin: 0 }}>
                            <span style={{ color: 'var(--color-primary-yellow)' }}>Acadefica:</span> O jeito inteligente de manter seus alunos.
                        </Title>

                        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '18px', marginBottom: 0 }}>
                            Machine Learning que prevê o risco de evasão com semanas de antecedência e dispara planos de ação para o seu time comercial agir rápido.
                        </Paragraph>

                        <Space size="middle">
                            <Button
                                type="primary"
                                size="large"
                                style={{ height: '50px', fontWeight: 'bold', color: '#505050' }}
                                onClick={() => scrollToSection('contact')}
                            >
                                Agendar demonstração
                            </Button>
                            <Button
                                type="default"
                                size="large"
                                style={{ height: '50px', fontWeight: 'bold' }}
                                onClick={() => scrollToSection('pricing')}
                            >
                                Ver planos
                            </Button>
                        </Space>
                    </Space>

                    {/* Cartão com métricas */}
                    <div
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05))',
                            border: '1px solid rgba(255,215,0,0.4)',
                            borderRadius: '16px',
                            padding: '28px',
                            display: 'grid',
                            gap: '20px'
                        }}
                    >
                        <div>
                            <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 4 }}>Taxa de retenção média</Paragraph>
                            <Title level={2} style={{ color: 'var(--color-primary-yellow)', margin: 0 }}>+28%</Title>
                            <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 0, fontSize: '14px' }}>
                                Baseado em academias que usam insights do Score de Risco nos primeiros 90 dias.
                            </Paragraph>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
                            <div>
                                <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 4 }}>Alertas proativos</Paragraph>
                                <Title level={4} style={{ color: 'var(--color-text-light)', margin: 0 }}>+150/mês</Title>
                            </div>
                            <div>
                                <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: 4 }}>Churn evitado</Paragraph>
                                <Title level={4} style={{ color: 'var(--color-text-light)', margin: 0 }}>-32%</Title>
                            </div>
                        </div>
                    </div>
                </div>
        </Layout>
    );
};

export default HeroSection;