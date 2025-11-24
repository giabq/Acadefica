// src/pages/TermsOfService.tsx

import React from 'react';
import { Layout, Typography } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const TermsOfService: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--color-dark-background)' }}>
      <Header />
      <Content style={{ padding: '80px 50px', maxWidth: '900px', margin: '0 auto' }}>
        <Title level={1} style={{ color: 'var(--color-text-light)', marginBottom: '32px' }}>
          Termos de Uso
        </Title>
        
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px', marginBottom: '24px' }}>
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          1. Aceitação dos Termos
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Ao acessar e utilizar a plataforma Acadefica, você concorda em cumprir e estar vinculado a estes 
          Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nossos serviços.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          2. Descrição dos Serviços
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          A Acadefica oferece uma plataforma de análise preditiva de evasão de alunos utilizando Machine Learning. 
          Nossos serviços incluem dashboard de análise, alertas automáticos, relatórios e ferramentas de gestão 
          para academias e instituições de ensino.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          3. Cadastro e Conta de Usuário
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Para utilizar determinadas funcionalidades da plataforma, você precisará criar uma conta. Você é 
          responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades 
          que ocorram em sua conta.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          4. Planos e Pagamentos
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Os planos de serviço estão disponíveis conforme descrito em nossa página de preços. Os valores 
          podem variar de acordo com o porte da instituição e modalidade de contratação (uso único, semestral 
          ou anual). Uma taxa de implementação única é cobrada no primeiro contrato.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          5. Uso Aceitável
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Você concorda em não:
        </Paragraph>
        <ul style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          <li>Usar a plataforma para fins ilegais ou não autorizados</li>
          <li>Tentar acessar áreas restritas do sistema sem autorização</li>
          <li>Interferir no funcionamento adequado da plataforma</li>
          <li>Compartilhar suas credenciais de acesso com terceiros</li>
          <li>Copiar, modificar ou distribuir conteúdo da plataforma sem autorização</li>
        </ul>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          6. Propriedade Intelectual
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Todos os direitos de propriedade intelectual relacionados à plataforma Acadefica, incluindo mas não 
          se limitando a software, design, algoritmos e conteúdo, pertencem exclusivamente à Acadefica ou seus 
          licenciadores.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          7. Limitação de Responsabilidade
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          A Acadefica não se responsabiliza por decisões tomadas com base nas análises fornecidas pela plataforma. 
          Os resultados preditivos são baseados em algoritmos de Machine Learning e devem ser utilizados como 
          ferramentas de apoio à decisão.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          8. Rescisão
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Podemos suspender ou encerrar seu acesso à plataforma a qualquer momento, sem aviso prévio, por 
          violação destes Termos de Uso ou por qualquer outro motivo que consideremos apropriado.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          9. Modificações dos Termos
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Reservamos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em 
          vigor imediatamente após sua publicação na plataforma. O uso continuado dos serviços após as modificações 
          constitui aceitação dos novos termos.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          10. Lei Aplicável
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa 
          decorrente destes termos será submetida ao foro da comarca de [Cidade], com exclusão de qualquer outro.
        </Paragraph>

        <Title level={2} style={{ color: 'var(--color-text-light)', marginTop: '32px' }}>
          11. Contato
        </Title>
        <Paragraph style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Para questões sobre estes Termos de Uso, entre em contato conosco através do e-mail: 
          <a href="mailto:contato@acadefica.com" style={{ color: 'var(--color-primary-yellow)' }}> contato@acadefica.com</a>
        </Paragraph>
      </Content>
      <Footer />
    </Layout>
  );
};

export default TermsOfService;
