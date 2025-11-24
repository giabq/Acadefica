// src/pages/ForgotPassword.tsx

import React, { useState } from 'react';
import { Layout, Typography, Form, Input, Button, message, Space } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    
    // Simula envio de email
    setTimeout(() => {
      console.log('Password reset requested for:', values.email);
      message.success('E-mail de recuperação enviado com sucesso!');
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--color-dark-background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Content style={{ padding: '40px', maxWidth: '450px', width: '100%' }}>
        <div style={{ marginBottom: '24px' }}>
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/login')}
            style={{ color: 'var(--color-text-secondary)', padding: 0 }}
          >
            Voltar para login
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1} style={{ color: 'var(--color-primary-yellow)', marginBottom: '8px' }}>
            Recuperar Senha
          </Title>
          <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
            {sent 
              ? 'Verifique seu e-mail para redefinir sua senha' 
              : 'Insira seu e-mail para receber instruções de recuperação'}
          </Paragraph>
        </div>

        {!sent ? (
          <Form
            name="forgot-password"
            onFinish={handleSubmit}
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
                prefix={<MailOutlined style={{ color: 'var(--color-text-secondary)' }} />}
                placeholder="seu@email.com"
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
                Enviar Link de Recuperação
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Paragraph style={{ color: 'var(--color-text-secondary)' }}>
                Enviamos um link de recuperação para seu e-mail. 
                Verifique sua caixa de entrada e spam.
              </Paragraph>
              <Button
                type="primary"
                onClick={() => navigate('/login')}
                style={{ height: '45px', fontWeight: 'bold', fontSize: '16px' }}
              >
                Voltar para Login
              </Button>
            </Space>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
            © {new Date().getFullYear()} ACADEFICA. Todos os direitos reservados.
          </Paragraph>
        </div>
      </Content>
    </Layout>
  );
};

export default ForgotPassword;
