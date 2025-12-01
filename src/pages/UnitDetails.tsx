// src/pages/UnitDetailsPage.tsx

import React, { useRef, useState } from 'react'; // Adicionado useRef e useState
import { Typography, Card, Row, Col, Button, Descriptions, Space, message } from 'antd'; // Adicionado message
import { useParams, useNavigate } from 'react-router-dom';
import {  ArrowLeftOutlined, MailOutlined, PhoneOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import AppLayout from '../layout/AppLayout';

// Importação do serviço de upload
import { uploadStudentsCsv } from '../services/StudentService';

const { Title, Paragraph, Text } = Typography;

// Mock de dados (Mantido igual)
const mockUnitData = (id: string) => ({
  nome: `Unidade Centro (ID: ${id})`,
  localizacao: 'Avenida Paulista, 1000 - São Paulo/SP',
  responsavel: 'Felipe Dantas',
  telefone: '(11) 98765-1234',
  email: 'felipe.dantas@acadefica.com',
  alunos_ativos: 450,
  capacidade: 500,
  taxa_retencao_3m: 92.5,
  status: 'Ativo',
  data_cadastro: '15/01/2024',
});

const UnitDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Ref para o input de arquivo oculto
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Estado para controlar o loading do botão
  const [uploading, setUploading] = useState(false);

  const unit = mockUnitData(id || 'N/A');

 

  // 2. Função chamada quando o usuário seleciona o arquivo
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validação simples de extensão
    if (!file.name.endsWith('.csv')) {
        message.error('Por favor, selecione um arquivo .csv válido.');
        return;
    }

    setUploading(true); // Ativa o spinner no botão

    try {
        await uploadStudentsCsv(file);
        message.success(`Arquivo "${file.name}" enviado com sucesso!`);
        // Opcional: Recarregar dados da página se necessário
    } catch (error) {
        message.error('Falha ao enviar o arquivo. Verifique o formato e tente novamente.');
    } finally {
        setUploading(false); // Desativa o spinner
        // Limpa o input para permitir selecionar o mesmo arquivo novamente se falhar
        event.target.value = ''; 
    }
  };
  
  const handleEdit = () => {
      alert(`Navegar para a página de edição da ${unit.nome} (Mock)`);
  }

  // Estilos
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    color: 'var(--color-text-light)',
    border: 'none',
    borderRadius: '10px',
  };

  const descriptionsStyle: React.CSSProperties = {
    color: 'var(--color-text-light)',
    backgroundColor: 'var(--color-secondary-background)',
    border: 'none',
  };

  const itemLabelStyle: React.CSSProperties = {
    color: 'var(--color-text-secondary)',
    fontWeight: 'normal',
    width: '180px',
  };

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        
        {/* Input Oculto para Upload */}
        <input 
            type="file" 
            ref={fileInputRef}
            style={{ display: 'none' }} 
            accept=".csv"
            onChange={handleFileChange}
        />

        {/* Topo e Título */}
        <Space size="large" style={{ marginBottom: '20px', width: '100%', justifyContent: 'space-between' }}>
            <Title level={2} style={{ color: 'var(--color-text-light)', margin: 0 }}>
              Detalhes da Unidade: {unit.nome}
            </Title>
            
            {/* Botões de Ação */}
            <Space>
                <Button 
                    type="default" 
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/unidades')}
                    style={{ color: 'var(--color-text-light)', borderColor: 'var(--color-text-secondary)' }}
                >
                    Voltar
                </Button>

                <Button 
                    type="default" 
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                    style={{ color: 'var(--color-primary-yellow)', borderColor: 'var(--color-primary-yellow)' }}
                >
                    Editar
                </Button>
            </Space>
        </Space>
        
        <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
          Informações completas e métricas de desempenho. ID Interno: {id}
        </Paragraph>

        <Row gutter={[24, 24]}>
            {/* Coluna 1: Informações Detalhadas */}
            <Col xs={24} lg={12}>
                <Card title={<Text strong style={{ color: 'var(--color-primary-yellow)' }}>Dados Operacionais</Text>} style={cardStyle}>
                    <Descriptions 
                        bordered 
                        column={1} 
                        size="small"
                        style={descriptionsStyle}
                        contentStyle={{ color: 'var(--color-text-light)' }}
                        labelStyle={itemLabelStyle}
                    >
                        <Descriptions.Item label="Nome Completo">{unit.nome}</Descriptions.Item>
                        <Descriptions.Item label="Localização">{unit.localizacao}</Descriptions.Item>
                        <Descriptions.Item label="Responsável" >
                            <Space size={4}>
                                <UserOutlined style={{ color: 'var(--color-text-secondary)' }}/>
                                {unit.responsavel}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Telefone" >
                            <Space size={4}>
                                <PhoneOutlined style={{ color: 'var(--color-text-secondary)' }}/>
                                {unit.telefone}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="E-mail Administrativo" >
                            <Space size={4}>
                                <MailOutlined style={{ color: 'var(--color-text-secondary)' }}/>
                                {unit.email}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Status Operacional">
                            <Text strong style={{ color: unit.status === 'Ativo' ? '#52C41A' : '#FF4D4F' }}>
                                {unit.status}
                            </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Data de Cadastro">{unit.data_cadastro}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Col>

            {/* Coluna 2: Métricas Chave */}
            <Col xs={24} lg={12}>
                <Card title={<Text strong style={{ color: 'var(--color-primary-yellow)' }}>Métricas e Capacidade</Text>} style={cardStyle}>
                    <Descriptions 
                        bordered 
                        column={1} 
                        size="small"
                        style={descriptionsStyle}
                        contentStyle={{ color: 'var(--color-text-light)' }}
                        labelStyle={itemLabelStyle}
                    >
                        <Descriptions.Item label="Alunos Ativos">{unit.alunos_ativos}</Descriptions.Item>
                        <Descriptions.Item label="Capacidade Máxima">{unit.capacidade}</Descriptions.Item>
                        <Descriptions.Item label="Vagas Restantes">{unit.capacidade - unit.alunos_ativos}</Descriptions.Item>
                        <Descriptions.Item label="Taxa de Retenção (3m)">
                            <Text strong style={{ color: unit.taxa_retencao_3m > 90 ? '#52C41A' : '#FAAD14' }}>
                                {unit.taxa_retencao_3m}%
                            </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Risco Médio da Base">75% (Mock)</Descriptions.Item>
                        <Descriptions.Item label="Performance Atual">Acima da Média</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Col>
        </Row>
      </div>
    </AppLayout>
  );
};

export default UnitDetails;