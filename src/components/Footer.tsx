// src/components/Footer.tsx

import React from 'react';
import { Layout, Typography, Row, Col, Form, Input, Button, Space, message, Select, Checkbox } from 'antd';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined, LockOutlined } from '@ant-design/icons';

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

  const [form] = Form.useForm();

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const storedPlan = window.sessionStorage.getItem('acadefica_selected_plan');
    if (storedPlan) {
      form.setFieldsValue({ plano: storedPlan });
    }
  }, [form]);

  const handleSubmit = () => {
    message.success('Recebemos seu interesse! Em breve um especialista retornará.');
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('acadefica_selected_plan');
    }
    form.resetFields();
  };

  return (
    <Layout id="contact" style={footerStyle}>
      <Row gutter={[32, 32]} justify="space-between">
        
        {/* Formulário CTA Final */}
        <Col xs={24} md={10}>
          <Title level={3} style={{ color: 'var(--color-text-light)' }}>
            Pare de Perder Alunos para Sempre.
          </Title>
          <Paragraph style={{ color: 'var(--color-text-secondary)' }}>
            Preencha e solicite o contato de um especialista agora mesmo.
          </Paragraph>
          
          <Form layout="vertical" style={{ marginTop: '20px' }} form={form} onFinish={handleSubmit}>
            <Form.Item 
              name="nome" 
              label={<span style={{ color: 'var(--color-text-light)' }}>Nome</span>} 
              rules={[{ required: true, message: 'Informe seu nome' }]}
            >
              <Input placeholder="Seu nome" style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'var(--color-text-light)' }} />
            </Form.Item>
            <Form.Item 
              name="academia" 
              label={<span style={{ color: 'var(--color-text-light)' }}>Nome da Academia</span>} 
              rules={[{ required: true, message: 'Informe o nome da academia' }]}
            >
              <Input placeholder="Nome da academia" style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'var(--color-text-light)' }} />
            </Form.Item>
            <Form.Item 
              name="email" 
              label={<span style={{ color: 'var(--color-text-light)' }}>E-mail</span>} 
              rules={[{ required: true, type: 'email', message: 'Digite um e-mail válido' }]}
            >
              <Input type="email" placeholder="Seu melhor e-mail" style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'var(--color-text-light)' }} />
            </Form.Item>
            <Form.Item 
              name="plano" 
              label={<span style={{ color: 'var(--color-text-light)' }}>Plano de Interesse</span>} 
              rules={[{ required: true, message: 'Selecione um plano' }]}
            >
              <Select 
                placeholder="Selecione o porte da sua instituição"
                style={{ width: '100%' }}
                popupClassName="select-dropdown-dark"
              >
                <Select.Option value="Pequeno Porte">Pequeno Porte</Select.Option>
                <Select.Option value="Médio Porte">Médio Porte</Select.Option>
                <Select.Option value="Grande Porte">Grande Porte</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item 
              name="lgpd" 
              valuePropName="checked" 
              rules={[{ 
                validator: (_, value) => 
                  value ? Promise.resolve() : Promise.reject(new Error('Você deve concordar com o processamento de dados'))
              }]}
            >
              <Checkbox style={{ color: 'var(--color-text-secondary)' }}>
                Concordo com o processamento dos dados conforme a LGPD
              </Checkbox>
            </Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              block 
              style={{ fontWeight: 'bold', marginTop: '10px', color: '#505050' }}
            >
              Solicitar Contato de um Especialista
            </Button>
            <div style={{ 
              marginTop: '12px', 
              textAlign: 'center', 
              color: 'var(--color-text-secondary)', 
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <LockOutlined style={{ color: 'var(--color-primary-yellow)' }} />
              Seus dados estão protegidos e em conformidade com a LGPD.
            </div>
          </Form>
        </Col>

        {/* Navegação e Social */}
        <Col xs={24} md={5}>
          <Title level={4} style={{ color: 'var(--color-text-light)', marginBottom: '16px' }}>
            Navegação
          </Title>
          <Space direction="vertical" size="small">
            <Link href="#hero" style={linkStyle}>Início</Link>
            <Link href="#features" style={linkStyle}>Como Funciona</Link>
            <Link href="#pricing" style={linkStyle}>Planos e Preços</Link>
            <Link href="#testimonials" style={linkStyle}>Resultados</Link>
          </Space>
        </Col>

        {/* Links Legais e Contato */}
        <Col xs={24} md={9}>
            <Title level={4} style={{ color: 'var(--color-text-light)', marginBottom: '16px' }}>
                Informações
            </Title>
            <Space direction="vertical" size="small" style={{ marginBottom: '24px' }}>
                <Link href="/privacy" style={linkStyle}>Política de Privacidade</Link>
                <Link href="/terms" style={linkStyle}>Termos de Uso</Link>
                <Link href="mailto:contato@acadefica.com" style={linkStyle}>contato@acadefica.com</Link>
            </Space>

            <Title level={4} style={{ color: 'var(--color-text-light)', marginBottom: '16px' }}>
                Conecte-se
            </Title>
            <Space size="large">
                <a href="https://github.com/acadefica" target="_blank" rel="noopener noreferrer">
                  <GithubOutlined style={{ fontSize: '24px', color: 'var(--color-primary-yellow)', cursor: 'pointer' }} />
                </a>
                <a href="https://linkedin.com/company/acadefica" target="_blank" rel="noopener noreferrer">
                  <LinkedinOutlined style={{ fontSize: '24px', color: 'var(--color-primary-yellow)', cursor: 'pointer' }} />
                </a>
                <a href="https://instagram.com/acadefica" target="_blank" rel="noopener noreferrer">
                  <InstagramOutlined style={{ fontSize: '24px', color: 'var(--color-primary-yellow)', cursor: 'pointer' }} />
                </a>
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