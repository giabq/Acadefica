// src/pages/UnitEditPage.tsx

import React, { useEffect, useState } from 'react';
import { Typography, Form, Input, Card, Row, Col, Button, Select, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { SaveOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

interface UnitFormValues {
  nome: string;
  status: 'Ativo' | 'Inativo' | 'Em Construção';
  capacidade: number;
  telefone: string;
  email: string;
  endereco: string;
}

// Mock de dados para uma unidade para simular a busca
const mockFetchUnitData = (id: string): Promise<UnitFormValues> => {
    // Simula o tempo de carregamento da API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                nome: `Unidade Teste ${id}`,
                status: 'Ativo',
                capacidade: 550,
                telefone: '(11) 5555-1234',
                email: `contato-${id}@unidade.com`,
                endereco: 'Rua das Flores, 123, Centro, SP',
            });
        }, 500);
    });
};


const UnitEdit: React.FC = () => {
  // Capturar o ID da URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
    const [unitData, setUnitData] = useState<UnitFormValues | null>(null);

  // Efeito para carregar os dados ao montar
    useEffect(() => {
        if (!id) {
            return;
        }

        let isMounted = true;
        mockFetchUnitData(id).then((data) => {
            if (!isMounted) {
                return;
            }
            setUnitData(data);
            form.setFieldsValue(data);
        });

        return () => {
            isMounted = false;
        };
    }, [id, form]);


    const handleFinish = (values: UnitFormValues) => {
    console.log(`Atualizando Unidade ${id}:`, values);
    alert(`Unidade ${id} atualizada com sucesso! (Mock)`);
    // Aqui você enviaria os dados para a API (PUT/PATCH)
    navigate(`/unidades/${id}`); // Volta para a página de detalhes
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

    if (id && !unitData) {
    return (
        <AppLayout>
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <Title level={3} style={{ color: 'var(--color-text-light)', marginTop: '20px' }}>Carregando dados da Unidade {id}...</Title>
            </div>
        </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Title level={2} style={{ color: 'var(--color-text-light)', marginBottom: '5px' }}>
        Editar Unidade {id}
      </Title>
      <Paragraph style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
        Ajuste os dados operacionais e de contato da unidade.
      </Paragraph>
      
      <Button 
          type="default" 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)} // Voltar à página anterior
          style={{ marginBottom: '20px', color: 'var(--color-text-light)', borderColor: 'var(--color-text-secondary)' }}
      >
          Voltar
      </Button>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish}
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
                        <Input placeholder="Ex: Unidade Centro" style={inputStyle} prefix={<EnvironmentOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                        label={<Text style={{ color: 'var(--color-text-light)' }}>Status Operacional</Text>}
                        name="status"
                        rules={[{ required: true, message: 'Selecione o status.' }]}
                    >
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

            <Form.Item style={{ marginTop: '30px', textAlign: 'right' }}>
                <Button 
                    type="default"
                    onClick={() => navigate(-1)} 
                    style={{ marginRight: '10px', fontWeight: 'bold' }}
                >
                    Cancelar
                </Button>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SaveOutlined />}
                    style={{ backgroundColor: 'var(--color-primary-yellow)', color: '#505050', fontWeight: 'bold' }}
                >
                    Salvar Alterações
                </Button>
            </Form.Item>
        </Card>
      </Form>
    </AppLayout>
  );
};

export default UnitEdit;