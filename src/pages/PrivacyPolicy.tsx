// src/pages/PrivacyPolicy.tsx

import React from 'react';
import { Layout, Typography } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--color-dark-background)' }}>
      <Header />
      <Content style={{ padding: '80px 50px', maxWidth: '900px', margin: '0 auto' }}>
        <Title level={1} style={{ color: 'var(--color-text-light)', marginBottom: '32px' }}>
          Política de Privacidade
        </Title>
        
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px', marginBottom: '24px' }}>
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          1. Informações que Coletamos
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          A Acadefica coleta informações fornecidas diretamente por você, como nome, e-mail, nome da academia 
          e porte da instituição quando você preenche nosso formulário de contato. Também coletamos dados de 
          uso da plataforma para melhorar nossos serviços.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          2. Como Usamos Suas Informações
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Utilizamos suas informações para:
        </Paragraph>
        <ul style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          <li>Entrar em contato com você sobre nossos serviços</li>
          <li>Personalizar sua experiência na plataforma</li>
          <li>Melhorar nossos produtos e serviços</li>
          <li>Cumprir obrigações legais</li>
        </ul>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          3. Compartilhamento de Dados
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de 
          marketing. Podemos compartilhar dados apenas quando necessário para prestação de serviços ou 
          cumprimento de obrigações legais.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          4. Conformidade com a LGPD
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          A Acadefica está em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). 
          Você tem direito a acessar, corrigir, excluir ou portar seus dados pessoais a qualquer momento.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          5. Segurança dos Dados
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados 
          contra acesso não autorizado, perda, destruição ou alteração.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          6. Seus Direitos
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Você possui os seguintes direitos em relação aos seus dados pessoais:
        </Paragraph>
        <ul style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          <li>Confirmação da existência de tratamento</li>
          <li>Acesso aos dados</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados</li>
          <li>Anonimização, bloqueio ou eliminação de dados</li>
          <li>Portabilidade dos dados</li>
          <li>Revogação do consentimento</li>
        </ul>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          7. Contato
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em 
          contato conosco através do e-mail: <a href="mailto:contato@acadefica.com" style={{ color: 'var(--color-primary-yellow)' }}>contato@acadefica.com</a>
        </Paragraph>
      </Content>
      <Footer />
    </Layout>
  );
};

export default PrivacyPolicy;
