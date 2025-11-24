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
import NewUnit from './pages/NewUnit';
import UnitsList from './pages/UnitsList';
import UnitDetails from './pages/UnitDetails';
import UnitEdit from './pages/UnitEdit';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

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

          {/* Rota 4: Nova Unidade (Nova Rota) */}
          <Route path="/unidades/nova" element={<NewUnit />} />

          {/* Rota 5: Lista de Unidades (Nova Rota) */}
          <Route path="/unidades" element={<UnitsList />} />

          <Route path="/unidades/:id" element={<UnitDetails />} />

          {/* Rota Dinâmica para Edição da Unidade (Nova Rota) */}
          <Route path="/unidades/:id/editar" element={<UnitEdit />} />

          {/* Rotas de Páginas Legais */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* Rota de Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Rota de Recuperação de Senha */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;