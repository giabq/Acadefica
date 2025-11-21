// src/components/Footer.tsx

import React from 'react';
import { Layout, Typography, Row, Col, Form, Input, Button, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

const { Title, Paragraph, Link } = Typography;

const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    backgroundColor: '#1A1A1A', // Um pouco mais claro que o fundo principal
    padding: '60px 50px 20px',
    color: 'var(--color-text-light)',
  };

  const linkStyle: React.CSSProperties = {
    color: 'var(--color-text-secondary)',
    marginRight: '20px',
  };

  return (
    <Layout style={footerStyle}>
      <Row gutter={[32, 32]} justify="space-between">
        
        {/* Formulário CTA Final */}
        <Col xs={24} md={10}>
          <Title level={3} style={{ color: 'var(--color-text-light)' }}>
            Pare de Perder Alunos para Sempre.
          </Title>
          <Paragraph style={{ color: 'var(--color-text-secondary)' }}>
            Preencha e solicite o contato de um especialista agora mesmo.
          </Paragraph>
          
          <Form layout="vertical" style={{ marginTop: '20px' }}>
            <Form.Item label="Nome" style={{ color: 'var(--color-text-secondary)' }}>
              <Input placeholder="Seu nome" style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'var(--color-text-light)' }} />
            </Form.Item>
            <Form.Item label="Nome da Academia">
              <Input placeholder="Nome da academia" style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'var(--color-text-light)' }} />
            </Form.Item>
            <Form.Item label="E-mail">
              <Input type="email" placeholder="Seu melhor e-mail" style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'var(--color-text-light)' }} />
            </Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              block 
              style={{ fontWeight: 'bold', marginTop: '10px' }}
            >
              Solicitar Contato de um Especialista
            </Button>
          </Form>
        </Col>

        {/* Navegação e Social */}
        <Col xs={24} md={5}>
          <Title level={4} style={{ color: 'var(--color-text-light)' }}>
            Navegação
          </Title>
          <Space direction="vertical">
            <Link href="#hero" style={linkStyle}>Início</Link>
            <Link href="#features" style={linkStyle}>Como Funciona</Link>
            <Link href="#pricing" style={linkStyle}>Planos e Preços</Link>
            <Link href="#testimonials" style={linkStyle}>Resultados</Link>
          </Space>
        </Col>

        {/* Links Legais e Contato */}
        <Col xs={24} md={9}>
            <Title level={4} style={{ color: 'var(--color-text-light)' }}>
                Informações
            </Title>
            <Space direction="vertical" style={{ marginBottom: '20px' }}>
                <Link href="/privacy" style={linkStyle}>Política de Privacidade</Link>
                <Link href="/terms" style={linkStyle}>Termos de Uso</Link>
                <Link href="mailto:contato@suaempresa.com" style={linkStyle}>contato@suaempresa.com</Link>
            </Space>

            <Title level={4} style={{ color: 'var(--color-text-light)', marginTop: '20px' }}>
                Conecte-se
            </Title>
            <Space size="large">
                <GithubOutlined style={{ fontSize: '24px', color: 'var(--color-primary-yellow)' }} />
                <LinkedinOutlined style={{ fontSize: '24px', color: 'var(--color-primary-yellow)' }} />
                <InstagramOutlined style={{ fontSize: '24px', color: 'var(--color-primary-yellow)' }} />
            </Space>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <Paragraph style={linkStyle}>
          © {new Date().getFullYear()} ACADEFICA. Todos os direitos reservados.
        </Paragraph>
      </div>
    </Layout>
  );
};

export default Footer;