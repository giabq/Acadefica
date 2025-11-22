// src/components/Header.tsx

import React from 'react';
import { Layout, Typography, Space, Image, Button } from 'antd';
import { MailOutlined, PhoneOutlined, LogoutOutlined } from '@ant-design/icons';
import AcadeficaLogo from '../assets/logo-acadefica.png'; 
import {  useNavigate } from 'react-router-dom'; // Importado para navegação

const { Header: AntHeader } = Layout;
const { Text } = Typography;

// Definição da interface de Props
interface HeaderProps {
    isInternalPage?: boolean;
}

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

const Header: React.FC<HeaderProps> = ({ isInternalPage = false }) => {
  const navigate = useNavigate();

  // --- Funções de Ação (Mockadas) ---
  const handleLogout = React.useCallback(() => {
    alert('Deslogando o usuário...');
    navigate('/'); // Redireciona para a Landing Page após sair
  }, [navigate]);
  
  const handleLogin = React.useCallback(() => {
    window.open('https://app.acadefica.com/login', '_blank', 'noopener,noreferrer');
  }, []);

  const handleScheduleDemo = React.useCallback(() => {
    // Simula scroll para a seção de contato na Landing Page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('Seção de contato não encontrada (mock scroll).');
    }
  }, []);

  // --- Renderização Condicional ---
  
  // Conteúdo para a Landing Page (Ações de Venda)
  const renderExternalContent = () => (
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
        <Button 
            type="primary" 
            onClick={handleScheduleDemo} 
            style={{ fontWeight: 600, backgroundColor: 'var(--color-primary-yellow)', color: '#505050' }}
        >
          Agendar demonstração
        </Button>
      </Space>
    </Space>
  );

  // Conteúdo para a Área Interna (Usuário Logado)
  const renderInternalContent = () => (
    <Space size="large" align="center">
        <Text style={{ color: 'var(--color-text-light)', fontWeight: 600 }}>
            Olá, Academia Exemplo
        </Text>
        <Button 
            type="default" 
            onClick={handleLogout} 
            icon={<LogoutOutlined />} 
            
            // ADICIONAR CLASSE E REMOVER VARIÁVEIS CSS DE ESTILO INLINE
            className="logout-btn" 
            style={{ 
                fontWeight: 400,
                fontSize: 14,
                // Mantemos apenas os estilos que não causam erro de tipagem, mas o CSS fará o resto
                color: 'var(--color-primary-yellow)', 
                borderColor: 'var(--color-primary-yellow)',
            }}
        >
            Sair
        </Button>
    </Space>
  );

  return (
    <AntHeader style={headerStyle}>
      {/* Logotipo (ACADEFICA) - Permanece o mesmo em ambos os contextos */}
      <Space style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Image 
          src={AcadeficaLogo} 
          alt="ACADEFICA Logo" 
          preview={false} 
          style={{ height: '40px', width: 'auto' }} 
        />
      </Space>

      {isInternalPage ? renderInternalContent() : renderExternalContent()}
    </AntHeader>
  );
};

export default Header;