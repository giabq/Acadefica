// src/App.tsx
import React from 'react';
import { Button, Layout, Typography } from 'antd';
import './App.css';

const { Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#0D0D0D' }}>
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Title style={{ color: '#FFFFFF' }}>
          Landing Page Retenção Inteligente 🚀
        </Title>
        <Button type="primary" style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#1A1A1A' }}>
          Teste Ant Design (Botão Amarelo)
        </Button>
      </Content>
    </Layout>
  );
};

export default App;