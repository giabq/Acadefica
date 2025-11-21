// src/components/HeroSection.tsx

import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
    return (
        <Layout
            style={{
                padding: '50px',
                textAlign: 'left',
                // O fundo da seção Hero pode ser um pouco diferente ou ter a imagem, mas mantemos o padrão escuro
                backgroundColor: 'var(--color-dark-background)',
                color: 'var(--color-text-light)'
            }}
        >

            {/* Ajuste o style para replicar o design: 
        - Título grande (H1)
        - Subtítulo menor
        - Botão Amarelo de Ação
      */}
            <Space direction="vertical" size="large" style={{ width: '100%', margin: '0 auto' }}>

                <Title level={1} style={{ color: 'var(--color-text-light)', fontSize: '55px', lineHeight: '1.1', margin: 0 }}>
                    <span style={{ color: 'var(--color-primary-yellow)' }}>Acadefica: </span>O jeito inteligente de manter seus alunos.
                </Title>

                <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '18px' }}>
                    A única plataforma que usa Machine Learning para prever quais alunos vão desistir, permitindo que sua equipe aja antes que seja tarde.
                </Paragraph>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        type="primary"
                        size="large"
                        style={{ height: '50px', fontWeight: 'bold', color:'#505050'}}
                    >
                        AGENDE UMA DEMONSTRAÇÃO GRATUITA
                    </Button>
                </div>
            </Space>

        </Layout>
    );
};

export default HeroSection;