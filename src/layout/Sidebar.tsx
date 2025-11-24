// src/layout/Sidebar.tsx

import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    UserOutlined, 
    DashboardOutlined, 
    SettingOutlined, 
    LogoutOutlined,
    MenuFoldOutlined, 
    MenuUnfoldOutlined,
    BuildOutlined
} from '@ant-design/icons';
// A importação de AcadeficaLogo foi removida conforme sua instrução.

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
    if (location.pathname.startsWith('/unidades')) return 'unidades';
    if (location.pathname.startsWith('/dashboard')) return 'dashboard';
    if (location.pathname.startsWith('/unidades/nova')) return 'add-unit'; // Novo mapeamento de rota
    return 'dashboard'; 
  };

  const handleMenuClick = (e: any) => {
    const key = e.key;
    if (key === 'dashboard') {
      navigate('/dashboard');
    } else if (key === 'unidades') { // Nova lógica para a lista
      navigate('/unidades');
    } else if (key === 'alunos') {
      navigate('/alunos');
    } else if (key === 'add-unit') { // Chave para o novo item de menu
      navigate('/unidades/nova');
    } else if (key === 'logout') {
        navigate('/');
    }
  };
  
  const handleToggle = () => {
    onCollapse(!collapsed);
  };
  
  const selectedKey = getSelectedKey(); // Pega a chave selecionada

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
      
      {/* 1. SEÇÃO DO TOGGLE DE COLLAPSE (HAMBÚRGUER) */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: collapsed ? 'center' : 'flex-end', 
          alignItems: 'center', 
          height: '80px', 
          padding: collapsed ? '0' : '0 24px',
          borderBottom: '1px solid #333',
          marginBottom: '20px',
        }}
      >
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleToggle}
            style={{ 
                color: 'var(--color-primary-yellow)',
                fontSize: '18px',
                marginLeft: collapsed ? '0' : 'auto' 
            }}
        />
      </div>

      
      {/* 2. Menu de Navegação */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]} 
        onClick={handleMenuClick}
        style={{ 
            background: 'var(--color-secondary-background)', 
            borderRight: 'none',
            padding: collapsed ? '0' : '0 12px' 
        }}
        
        items={[
          {
            key: 'dashboard',
            icon: <DashboardOutlined style={{ color: 'var(--color-primary-yellow)' }} />,
            label: (
                <Text style={{ 
                    color: selectedKey === 'dashboard' ? '#505050' : 'var(--color-text-light)', 
                    fontWeight: selectedKey === 'dashboard' ? 'bold' : 'normal'
                }}>
                    Dashboard
                </Text>
            ),
            style: { 
                backgroundColor: selectedKey === 'dashboard' ? 'var(--color-primary-yellow)' : 'transparent',
            },
          },
          {
            key: 'unidades', 
            icon: <BuildOutlined style={{ color: 'var(--color-primary-yellow)' }} />,
            label: (
                <Text style={{ 
                    color: selectedKey === 'unidades' ? '#505050' : 'var(--color-text-light)', 
                    fontWeight: selectedKey === 'unidades' ? 'bold' : 'normal'
                }}>
                    Unidades
                </Text>
            ),
            style: { 
                backgroundColor: selectedKey === 'unidades' ? 'var(--color-primary-yellow)' : 'transparent',
                // Adicione uma margem inferior para separar do botão de adicionar
            },
          },
          {
            key: 'alunos',
            icon: <UserOutlined style={{ color: 'var(--color-primary-yellow)' }} />,
            label: (
                <Text style={{ 
                    color: selectedKey === 'alunos' ? '#505050' : 'var(--color-text-light)', 
                    fontWeight: selectedKey === 'alunos' ? 'bold' : 'normal'
                }}>
                    Alunos
                </Text>
            ),
            style: { 
                backgroundColor: selectedKey === 'alunos' ? 'var(--color-primary-yellow)' : 'transparent',
            },
          },
          {
            key: 'settings',
            icon: <SettingOutlined style={{ color: 'var(--color-primary-yellow)' }} />,
            label: <Text style={{ color: 'var(--color-text-light)' }}>Configurações</Text>,
          },
          {
            key: 'logout',
            icon: <LogoutOutlined style={{ color: 'var(--color-primary-yellow)' }} />,
            label: <Text style={{ color: 'var(--color-text-light)' }}>Sair</Text>,
            style: { 
                marginTop: 'auto',
            }
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;