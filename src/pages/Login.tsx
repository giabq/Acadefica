// src/pages/Login.tsx

import React, { useState } from 'react';
import { Layout, Typography, Form, Input, Button, message, Space } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph, Link } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    
    // Simula uma chamada de API
    setTimeout(() => {
      // Por enquanto, qualquer login funciona (sem validação real)
      console.log('Login attempt:', values.email);
      message.success('Login realizado com sucesso!');
      setLoading(false);
      // Redireciona para o dashboard
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--color-dark-background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Content style={{ padding: '40px', maxWidth: '450px', width: '100%' }}>
        <div style={{ marginBottom: '24px' }}>
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/')}
            style={{ color: 'var(--color-text-secondary)', padding: 0 }}
          >
            Voltar para página inicial
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1} style={{ color: 'var(--color-primary-yellow)', marginBottom: '8px' }}>
            ACADEFICA
          </Title>
          <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
            Entre na sua conta
          </Paragraph>
        </div>

        <Form
          name="login"
          onFinish={handleLogin}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label={<span style={{ color: 'var(--color-text-light)' }}>E-mail</span>}
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail' },
              { type: 'email', message: 'E-mail inválido' }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: 'var(--color-text-secondary)' }} />}
              placeholder="seu@email.com"
              style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'var(--color-text-light)' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: 'var(--color-text-light)' }}>Senha</span>}
            rules={[{ required: true, message: 'Por favor, insira sua senha' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'var(--color-text-secondary)' }} />}
              placeholder="••••••••"
              style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'var(--color-text-light)' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ height: '45px', fontWeight: 'bold', fontSize: '16px', marginTop: '16px' }}
            >
              Entrar
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Space direction="vertical" size="small">
              <Link href="/forgot-password" style={{ color: 'var(--color-text-secondary)' }}>
                Esqueceu sua senha?
              </Link>
              <Paragraph style={{ color: 'var(--color-text-secondary)', marginTop: '16px' }}>
                Não tem uma conta? <Link href="/" style={{ color: 'var(--color-primary-yellow)' }}>Solicite uma demonstração</Link>
              </Paragraph>
            </Space>
          </div>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
            © {new Date().getFullYear()} ACADEFICA. Todos os direitos reservados.
          </Paragraph>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
