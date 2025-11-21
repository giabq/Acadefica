// src/components/Header.tsx (Atualizado para usar a imagem do logo)

import React from 'react';
import { Layout, Typography, Space, Image, Button } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

// Importa a imagem do logo que você salvou em src/assets/
import AcadeficaLogo from '../assets/logo-acadefica.png'; // Caminho relativo para sua imagem
import { scrollToSection } from '../utils/navigation';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const headerStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-secondary-background)',
  padding: '0 50px',
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
};

const Header: React.FC = () => {
  const handleLogin = React.useCallback(() => {
    window.open('https://app.acadefica.com/login', '_blank', 'noopener,noreferrer');
  }, []);

  const handleScheduleDemo = React.useCallback(() => {
    scrollToSection('contact');
  }, []);

  return (
    <AntHeader style={headerStyle}>
      {/* Logotipo (ACADEFICA) */}
      <Space>
        {/* Usando o componente Image do Ant Design para exibir o logo */}
        <Image 
          src={AcadeficaLogo} 
          alt="ACADEFICA Logo" 
          preview={false} // Para não abrir a imagem em tela cheia ao clicar
          style={{ height: '60px', width: 'auto' }} // Ajuste a altura conforme necessário
        />
      </Space>

      {/* Informações de Contato */}
      <Space size="large" align="center">
        <Space size="large" align="center">
          <Space>
            <MailOutlined style={{ color: 'var(--color-primary-yellow)' }} />
            <Text style={{ color: 'var(--color-text-light)' }}>contato@acadefica.com</Text>
          </Space>
          <Space>
            <PhoneOutlined style={{ color: 'var(--color-primary-yellow)' }} />
            <Text style={{ color: 'var(--color-text-light)' }}>(11) 98765-4321</Text>
          </Space>
        </Space>
        <Space size="middle">
          <Button type="default" onClick={handleLogin} style={{ fontWeight: 600 }}>
            Entrar
          </Button>
          <Button type="primary" onClick={handleScheduleDemo} style={{ fontWeight: 600 }}>
            Agendar demonstração
          </Button>
        </Space>
      </Space>
    </AntHeader>
  );
};

export default Header;