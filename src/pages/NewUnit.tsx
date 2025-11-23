// src/pages/NewUnitPage.tsx (Código Corrigido)

import React from 'react';
import {  Typography, Form, Input, Card, Row, Col, Button, Select } from 'antd';
import AppLayout from '../layout/AppLayout';
import { SaveOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined, FileExcelOutlined} from '@ant-design/icons';

// CORREÇÃO 1: Desestruturar corretamente Text e Option
const { Title, Paragraph, Text } = Typography; // <-- AGORA COM TEXT
const { Option } = Select; // <-- AGORA COM OPTION

const NewUnit: React.FC = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log('Dados da Nova Unidade:', values);
    alert('Nova Unidade cadastrada com sucesso! (Mock)');
    // Aqui você enviaria os dados para a API
  };

  const handleBatchImport = () => {
    alert(`Iniciando importação em lote ...`);
    // Aqui você abriria um modal ou navegaria para uma tela de upload
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    color: 'var(--color-text-light)',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 0',
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#2B2B2B',
    borderColor: '#444',
    color: 'var(--color-text-light)',
  };

  return (
    <AppLayout>
      <Title level={2} style={{ color: 'var(--color-text-light)', marginBottom: '5px' }}>
        Cadastro de Nova Unidade
      </Title>
      <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
        Insira os dados da nova filial ou franquia que será gerenciada pela ACADEFICA.
      </Paragraph>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish}
        initialValues={{ status: 'Ativo' }}
      >
        <Card style={cardStyle}>
            <Row gutter={32}>
                {/* Informações Básicas */}
                <Col span={12}>
                    <Title level={4} style={{ color: 'var(--color-primary-yellow)' }}>Dados da Unidade</Title>
                    <Form.Item
                        label={<Text style={{ color: 'var(--color-text-light)' }}>Nome da Unidade</Text>}
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, insira o nome da unidade.' }]}
                    >
                        <Input placeholder="Ex: Unidade Centro ou Franquia Zona Sul" style={inputStyle} prefix={<EnvironmentOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                        label={<Text style={{ color: 'var(--color-text-light)' }}>Status Operacional</Text>}
                        name="status"
                        rules={[{ required: true, message: 'Selecione o status.' }]}
                    >
                        {/* Agora o Select e Option funcionam corretamente */}
                        <Select dropdownStyle={{ backgroundColor: '#2B2B2B' }}>
                            <Option value="Ativo">Ativo</Option>
                            <Option value="Inativo">Inativo</Option>
                            <Option value="Em Construção">Em Construção</Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        label={<Text style={{ color: 'var(--color-text-light)' }}>Capacidade Máxima de Alunos</Text>}
                        name="capacidade"
                        rules={[{ required: true, message: 'Informe a capacidade.' }]}
                    >
                        <Input type="number" placeholder="Ex: 500" style={inputStyle} />
                    </Form.Item>
                </Col>

                {/* Informações de Contato e Endereço */}
                <Col span={12}>
                    <Title level={4} style={{ color: 'var(--color-primary-yellow)' }}>Contato e Endereço</Title>
                    
                    <Form.Item
                        label={<Text style={{ color: 'var(--color-text-light)' }}>Telefone Principal</Text>}
                        name="telefone"
                        rules={[{ required: true, message: 'Insira o telefone.' }]}
                    >
                        <Input placeholder="(XX) XXXX-XXXX" style={inputStyle} prefix={<PhoneOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                        label={<Text style={{ color: 'var(--color-text-light)' }}>E-mail Administrativo</Text>}
                        name="email"
                        rules={[{ type: 'email', message: 'E-mail inválido.' }, { required: true, message: 'Insira o e-mail.' }]}
                    >
                        <Input placeholder="contato@unidade.com.br" style={inputStyle} prefix={<MailOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                        label={<Text style={{ color: 'var(--color-text-light)' }}>Endereço Completo</Text>}
                        name="endereco"
                        rules={[{ required: true, message: 'Insira o endereço.' }]}
                    >
                        <Input.TextArea rows={2} placeholder="Rua, Número, Bairro, Cidade" style={inputStyle} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item style={{ marginTop: '30px', textAlign: 'right'}}>
              <Button 
                    type="primary" 
                    icon={<FileExcelOutlined />}
                    onClick={handleBatchImport}
                    style={{ backgroundColor: 'var(--color-primary-yellow)', color: '#505050', fontWeight: 'bold', marginRight: 10 }}
                >
                    Adicionar Alunos em Batch
                </Button>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SaveOutlined />}
                    style={{ backgroundColor: 'var(--color-primary-yellow)', color: '#505050', fontWeight: 'bold' }}
                >
                    Salvar Unidade
                </Button>
            </Form.Item>
        </Card>
      </Form>
    </AppLayout>
  );
};

export default NewUnit;