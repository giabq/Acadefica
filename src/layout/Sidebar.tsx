// src/layout/Sidebar.tsx

import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd'; // Removida a importação de Image
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    UserOutlined, 
    DashboardOutlined, 
    SettingOutlined, 
    MenuFoldOutlined, 
    MenuUnfoldOutlined 
} from '@ant-design/icons';
// Removida a importação de AcadeficaLogo

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  siderWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse, siderWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    if (location.pathname.startsWith('/alunos')) return 'alunos';
    if (location.pathname.startsWith('/dashboard')) return 'dashboard';
    return 'dashboard'; 
  };

  const handleMenuClick = (e: any) => {
    const key = e.key;
    if (key === 'dashboard') {
      navigate('/dashboard');
    } else if (key === 'alunos') {
      navigate('/alunos');
    } else if (key === 'logout') {
        alert('Fazendo logout...');
        navigate('/');
    }
  };
  
  const handleToggle = () => {
    onCollapse(!collapsed);
  };

  return (
    <Sider
      collapsible 
      collapsed={collapsed} 
      onCollapse={onCollapse} 
      width={siderWidth} 
      collapsedWidth={80} 
      trigger={null} 
      
      style={{
        background: 'var(--color-secondary-background)',
        borderRight: '1px solid #333',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        transition: 'all 0.2s',
      }}
    >
      
      {/* 1. SEÇÃO DO HAMBÚRGUER (AGORA NO TOPO DA SIDEBAR) */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: collapsed ? 'center' : 'flex-end', 
          alignItems: 'center', 
          height: '80px', // Altura do Header
          padding: collapsed ? '0' : '0 24px',
          borderBottom: '1px solid #333',
          marginBottom: '20px',
        }}
      >
        {/* ÍCONE DE TOGGLE */}
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleToggle}
            style={{ 
                color: 'var(--color-primary-yellow)',
                fontSize: '18px',
            }}
        />
      </div>

      {/* 2. Menu de Navegação */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]} 
        onClick={handleMenuClick}
        style={{ 
            background: 'var(--color-secondary-background)', 
            borderRight: 'none',
            padding: collapsed ? '0' : '0 12px'
        }}
        // ... (Itens do Menu permanecem os mesmos) ...
        items={[
          {
            key: 'dashboard',
            icon: <DashboardOutlined style={{ color: 'var(--color-primary-yellow)' }} />,
            label: (
                <Text style={{ 
                    color: getSelectedKey() === 'dashboard' ? '#505050' : 'var(--color-text-light)', 
                    fontWeight: getSelectedKey() === 'dashboard' ? 'bold' : 'normal'
                }}>
                    Dashboard
                </Text>
            ),
            style: { 
                backgroundColor: getSelectedKey() === 'dashboard' ? 'var(--color-primary-yellow)' : 'transparent',
            },
          },
          {
            key: 'alunos',
            icon: <UserOutlined style={{ color: 'var(--color-primary-yellow)' }} />,
            label: (
                <Text style={{ 
                    color: getSelectedKey() === 'alunos' ? '#505050' : 'var(--color-text-light)', 
                    fontWeight: getSelectedKey() === 'alunos' ? 'bold' : 'normal'
                }}>
                    Alunos
                </Text>
            ),
            style: { 
                backgroundColor: getSelectedKey() === 'alunos' ? 'var(--color-primary-yellow)' : 'transparent',
            },
          },
          {
            key: 'settings',
            icon: <SettingOutlined style={{ color: 'var(--color-primary-yellow)' }} />,
            label: <Text style={{ color: 'var(--color-text-light)' }}>Configurações</Text>,
          },
      
        ]}
      />
    </Sider>
  );
};

export default Sidebar;