// src/App.tsx (VERSÃO FINAL CONSOLIDADA)

import React from 'react';
import { ConfigProvider, Layout } from 'antd';
// Importamos o Router e as ferramentas de rotas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import themeConfig from './theme/themeConfig';

// Importa os componentes da Landing Page
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

// Importa as páginas internas (Protegidas pelo DashboardLayout)
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/StudentsList'; 

const { Content } = Layout;

// Componente Wrapper para a Landing Page (Acessível pela rota "/")
const LandingPage: React.FC = () => (
  // Nota: A rota "/" tem o Layout completo da Landing Page
  <Layout style={{ backgroundColor: themeConfig.token?.colorBgBase, minHeight: '100vh' }}>
    <Header />
    <Content>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
    </Content>
    <Footer />
    {/* Geralmente, o CookieConsent Banner fica aqui ou no App.tsx */}
  </Layout>
);

const App: React.FC = () => {
  return (
    <ConfigProvider theme={themeConfig}>
      {/* O BrowserRouter permite a navegação via URL */}
      <Router>
        <Routes>
          
          {/* Rota 1: Landing Page (URL: /) */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rota 2: Dashboard (URL: /dashboard) */}
          {/* Estas páginas usam o AppLayout interno (com Sidebar) */}
          <Route path="/dashboard" element={<Dashboard />} /> 

          {/* Rota 3: Lista de Alunos (URL: /alunos) */}
          <Route path="/alunos" element={<StudentsList />} /> 

        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;