// src/components/Header.tsx

import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Image, Button } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import AcadeficaLogo from '../assets/logo-acadefica.png'; 
import { useNavigate } from 'react-router-dom';

// Importamos o serviço para buscar o nome real
import { getGymName } from '../services/StudentService'; 

const { Header: AntHeader } = Layout;
const { Text } = Typography;

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
  // Estado para guardar o nome da academia
  const [gymName, setGymName] = useState<string>('Academia'); 

  // Efeito para buscar o nome da academia se for página interna
  useEffect(() => {
    if (isInternalPage) {
        const fetchName = async () => {
            try {
                const name = await getGymName();
                // Remove as aspas extras caso venham na string do JSON
                setGymName(name.replace(/"/g, '')); 
            } catch (error) {
                console.error("Erro ao carregar nome da academia:", error);
                setGymName("Academia Exemplo"); // Fallback em caso de erro
            }
        };
        fetchName();
    }
  }, [isInternalPage]);
  
  const handleLogin = React.useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleScheduleDemo = React.useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Se não achar a seção (ex: em outra rota), vai para home
        navigate('/');
    }
  }, [navigate]);

  // --- Renderização Condicional ---
  
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

  const renderInternalContent = () => (
    <Space size="large" align="center">
        {/* Exibe o nome vindo do backend */}
        <Text style={{ color: 'var(--color-text-light)', fontWeight: 600, fontSize: '16px' }}>
            Olá, <span style={{ color: 'var(--color-primary-yellow)' }}>{gymName}</span>
        </Text>
    </Space>
  );

  return (
    <AntHeader style={headerStyle}>
      <Space style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Image 
          src={AcadeficaLogo} 
          alt="ACADEFICA Logo" 
          preview={false} 
          style={{ height: '70px', width: 'auto' }} 
        />
      </Space>

      {isInternalPage ? renderInternalContent() : renderExternalContent()}
    </AntHeader>
  );
};

export default Header;