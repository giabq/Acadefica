// src/layout/AppLayout.tsx

import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from '../components/Header'; // Importa o Header

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const COLLAPSED_WIDTH = 80;
const EXPANDED_WIDTH = 250;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const siderWidth = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--color-dark-background)' }}>
      
      <Sidebar 
        collapsed={collapsed} 
        onCollapse={setCollapsed} 
        siderWidth={siderWidth}
      />
      
      <Layout 
        style={{ 
          marginLeft: siderWidth, 
          backgroundColor: 'var(--color-dark-background)',
          transition: 'margin-left 0.2s',
        }}
      >
        {/* Passa a prop isInternalPage=true para ativar o layout de dashboard */}
        <Header isInternalPage={true} /> 

        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;