// src/App.tsx (Atualizado)

import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import themeConfig from './theme/themeConfig';

// Importa o novo componente Header
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ backgroundColor: themeConfig.token?.colorBgBase, minHeight: '100vh' }}>
        
        {/* INCLUINDO O HEADER AQUI */}
        <Header />

        <Content>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
        </Content>

        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default App;