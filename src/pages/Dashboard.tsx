// src/pages/DashboardPage.tsx

import React, { useState, useEffect, useRef } from 'react'; // Adicionado useRef
import { Typography, Row, Col, Card, Select, Radio, Input, Progress, Space, Button, Spin, Empty, Tooltip, Modal, Table } from 'antd'; // Adicionado Modal e Table
import { SearchOutlined, UserOutlined, UploadOutlined, InfoCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import AppLayout from '../layout/AppLayout';
import { useNavigate } from 'react-router-dom';

// Importamos os serviços
import { getStudentsPredictions, getAllStudents } from '../services/StudentService';
import type { PredictionData, StudentBackendData } from '../types/ApiTypes';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// ------------------------------------
// 1. Tipagem Local
// ------------------------------------
interface StudentDash {
  id: number;
  name: string;
  risk: 'Alto Risco' | 'Baixo Risco';
  unidade: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // --- Estados ---
  const [allStudents, setAllStudents] = useState<StudentDash[]>([]); 
  const [filteredStudents, setFilteredStudents] = useState<StudentDash[]>([]); 
  const [units, setUnits] = useState<string[]>([]); 
  const [selectedUnit, setSelectedUnit] = useState<string>('todas'); 
  const [loading, setLoading] = useState(true);
  const [riskPercentage, setRiskPercentage] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Estado do Modal e Ref do Input de Arquivo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Carregamento de Dados ---
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [predictionsData, studentsData] = await Promise.all([
                getStudentsPredictions(),
                getAllStudents()
            ]);

            const studentsMap = new Map<number, string>();
            studentsData.forEach((s: StudentBackendData) => {
                studentsMap.set(s.aluno_id, s.Nome);
            });

            const processedData: StudentDash[] = predictionsData.map((p: PredictionData) => {
                const studentName = studentsMap.get(p.aluno_id) || `Aluno ${p.aluno_id}`;
                const predValue = p.predicao !== undefined ? p.predicao : p["Regressão Logística_Prediction"];
                const riskStatus = predValue === 1 ? 'Alto Risco' : 'Baixo Risco';

                return {
                    id: p.aluno_id,
                    name: studentName,
                    risk: riskStatus,
                    unidade: p.unidade ? p.unidade.toLowerCase() : 'sem unidade'
                };
            });
            
            setAllStudents(processedData);
            setFilteredStudents(processedData); 
            
            const uniqueUnits = Array.from(new Set(processedData.map(s => s.unidade))).sort();
            setUnits(uniqueUnits);

            calculateMetrics(processedData);

        } catch (error) {
            console.error("Erro ao carregar dashboard:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  // --- Métricas e Filtros ---
  const calculateMetrics = (data: StudentDash[]): void => {
      if (data.length === 0) {
          setRiskPercentage(0);
          return;
      }
      const highRiskCount = data.filter(s => s.risk === 'Alto Risco').length;
      const percentage = Math.round((highRiskCount / data.length) * 100);
      setRiskPercentage(percentage);
  };

  const handleUnitChange = (e: any) => {
      const unit = e.target.value;
      setSelectedUnit(unit);
      applyFilters(unit, searchText);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setSearchText(text);
      applyFilters(selectedUnit, text);
  };

  const applyFilters = (unit: string, text: string) => {
      let result = allStudents;
      if (unit !== 'todas') result = result.filter(s => s.unidade === unit);
      if (text) {
          const lowerText = text.toLowerCase();
          result = result.filter(s => s.name.toLowerCase().includes(lowerText));
      }
      setFilteredStudents(result);
      calculateMetrics(result); 
  };

  // --- Lógica de Upload (Modal e Input) ---
  
  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCancelModal = () => {
      setIsModalOpen(false);
  };

  const handleImportClick = () => {
      // Dispara o clique no input file escondido
      if (fileInputRef.current) {
          fileInputRef.current.click();
      }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          // AQUI VIRIA A LÓGICA DE ENVIO PARA O BACKEND
          console.log("Arquivo selecionado:", file.name);
          
          // Fecha o modal e limpa o input para permitir selecionar o mesmo arquivo novamente se falhar
          setIsModalOpen(false);
          event.target.value = ''; 
      }
  };

  // --- Estilos ---
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    color: 'var(--color-text-light)',
    border: 'none',
    borderRadius: '10px',
  };

  const filterCardStyle: React.CSSProperties = { ...cardStyle, padding: '20px', textAlign: 'left', height: '100%' };

  const studentCardStyle = (risk: string): React.CSSProperties => {
    const borderColor = risk === 'Alto Risco' ? '#FF4D4F' : '#52C41A'; 
    return {
      backgroundColor: 'var(--color-secondary-background)',
      color: 'var(--color-text-light)',
      border: `1px solid ${borderColor}`,
      borderRadius: '8px',
      textAlign: 'center',
      padding: '15px 10px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.2s',
      cursor: 'default'
    };
  };

  const csvHeaderString = "aluno_id,Nome,Objetivo,Idade,TempoComoAluno,CheckinsSemana_1,CheckinsSemana_2,CheckinsSemana_3,CheckinsSemana_4,CheckinsSemana_5,CheckinsSemana_6,CheckinsSemana_7,CheckinsSemana_8,CheckinsSemana_9,CheckinsSemana_10,CheckinsSemana_11,CheckinsSemana_12,TempoTreino_M1,TempoTreino_M2,TempoTreino_M3,AulasGrupo_M1,AulasGrupo_M2,AulasGrupo_M3,DiasAtrasoPagamento_M1,DiasAtrasoPagamento_M2,DiasAtrasoPagamento_M3,VariacaoPeso_2m,VariacaoGordura_2m,VariacaoCarga_2m,unidade";

  // Colunas visuais para a tabela de exemplo (Simplificada para caber, mas fiel ao início)
  const exampleColumns = [
      { title: 'aluno_id', dataIndex: 'id', key: 'id', width: 80 },
      { title: 'Nome', dataIndex: 'nome', key: 'nome' },
      { title: 'Objetivo', dataIndex: 'objetivo', key: 'objetivo' },
      { title: 'Idade', dataIndex: 'idade', key: 'idade' },
      { title: 'Checkins...', dataIndex: 'checkins', key: 'checkins' },
      { title: 'Métricas...', dataIndex: 'metricas', key: 'metricas' },
      { title: 'unidade', dataIndex: 'unidade', key: 'unidade' },
  ];
  
  const exampleData = [
      { key: '1', id: '1', nome: 'Ana Silva', objetivo: 'hipertrofia', idade: 28, checkins: '3,4,4...', metricas: '...', unidade: 'centro' },
      { key: '2', id: '2', nome: 'Bruno Souza', objetivo: 'emagrecimento', idade: 35, checkins: '4,4,3...', metricas: '...', unidade: 'zona sul' }
  ];

  if (loading) {
      return (
          <AppLayout>
              <div style={{ textAlign: 'center', padding: '100px' }}>
                  <Spin size="large" />
                  <Text style={{ display: 'block', marginTop: 20, color: '#fff' }}>Cruzando dados de alunos e IA...</Text>
              </div>
          </AppLayout>
      );
  }

  return (
    <AppLayout>
      {/* HEADER DA PÁGINA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', padding: '0 10px' }}>
          <div>
            <Title level={2} style={{ color: 'var(--color-text-light)', marginBottom: '5px' }}>
                Visão Geral de Retenção
            </Title>
            <Paragraph style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                Acompanhe o risco de evasão calculado pela IA.
            </Paragraph>
          </div>

          <Tooltip title="Adicionar CSV com informações dos alunos">
            <Button 
                type="primary" 
                icon={<UploadOutlined />} 
                size="large"
                onClick={handleOpenModal} // Abre o Modal
                style={{ 
                    backgroundColor: 'var(--color-primary-yellow)', 
                    color: '#505050', 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                Adicionar Lista de Alunos
            </Button>
          </Tooltip>
      </div>

      {/* --- MODAL DE IMPORTAÇÃO --- */}
      <Modal 
        title={<span style={{ fontSize: '20px' }}>Importar Lista de Alunos</span>}
        open={isModalOpen} 
        onCancel={handleCancelModal}
        centered
        width={800} // Aumentei a largura para caber melhor a explicação
        footer={[
            <Button key="back" onClick={handleCancelModal} style={{ fontWeight: 'bold' }}>
              Cancelar
            </Button>,
            <Button 
                key="submit" 
                type="primary" 
                onClick={handleImportClick} 
                style={{ backgroundColor: 'var(--color-primary-yellow)', color: '#505050', fontWeight: 'bold' }}
            >
              Importar CSV
            </Button>,
        ]}
      >
          <div style={{ marginTop: '15px' }}>
              <Paragraph>
                  Para que a Inteligência Artificial processe corretamente o risco de evasão, o seu arquivo <strong>.csv</strong> deve conter estritamente as seguintes colunas, <strong>nesta ordem exata</strong>:
              </Paragraph>
              
              {/* Caixa de Código com o Cabeçalho */}
              <div style={{ 
                  backgroundColor: '#f5f5f5', 
                  padding: '15px', 
                  borderRadius: '6px', 
                  border: '1px solid #d9d9d9',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#ff4d4f', // Vermelho para destacar a importância
                  overflowX: 'auto',
                  marginBottom: '20px',
                  whiteSpace: 'nowrap'
              }}>
                  {csvHeaderString}
              </div>

              <Paragraph style={{ marginBottom: '5px', fontSize: '12px', color: '#888' }}>
                  Prévia da estrutura de dados:
              </Paragraph>
              <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
                <Table 
                    dataSource={exampleData} 
                    columns={exampleColumns} 
                    pagination={false} 
                    size="small" 
                />
              </div>

              <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '6px', borderLeft: '4px solid var(--color-primary-yellow)' }}>
                  <Space align="start">
                      <FileTextOutlined style={{ fontSize: '20px', color: '#555', marginTop: '4px' }} />
                      <div style={{ fontSize: '13px', color: '#555' }}>
                          <Text style={{color: "red"}}strong>Importante:</Text>
                          <ul style={{ margin: '5px 0 0 15px', padding: 0 }}>
                              <li>As colunas de <strong>CheckinsSemana</strong> vão de 1 a 12.</li>
                              <li>As colunas <strong>unidade</strong> e <strong>Objetivo</strong> devem estar escrita em minúsculas.</li>
                          </ul>
                      </div>
                  </Space>
              </div>
          </div>
      </Modal>

      {/* INPUT HIDDEN PARA O ARQUIVO */}
      <input 
          type="file" 
          ref={fileInputRef}
          style={{ display: 'none' }} 
          accept=".csv"
          onChange={handleFileChange}
      />

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <Row gutter={[24, 24]}>
        {/* Coluna da Esquerda: Filtros */}
        <Col xs={24} lg={8}>
          <Card style={filterCardStyle}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              
              <div>
                <Text strong style={{ color: 'var(--color-text-light)', marginBottom: '10px', display: 'block', fontSize: '16px' }}>
                    Filtrar por Unidade
                </Text>
                <Radio.Group onChange={handleUnitChange} value={selectedUnit}>
                    <Space direction="vertical">
                        <Radio value="todas" style={{ color: 'var(--color-text-light)' }}>
                            Todas as Unidades
                        </Radio>
                        {units.map(u => (
                            <Radio key={u} value={u} style={{ color: 'var(--color-text-light)' }}>
                                {u.charAt(0).toUpperCase() + u.slice(1)} 
                            </Radio>
                        ))}
                    </Space>
                </Radio.Group>
              </div>

              <div>
                <Text strong style={{ color: 'var(--color-text-light)', marginBottom: '10px', display: 'block', marginTop: '20px' }}>
                    Período de Análise
                </Text>
                <Select defaultValue="atual" style={{ width: '100%' }} dropdownStyle={{ backgroundColor: '#2b2b2b' }}>
                    <Option value="atual">Mês Atual (Predição)</Option>
                    <Option value="anterior">Mês Anterior</Option>
                </Select>
              </div>

            </Space>
          </Card>
        </Col>

        {/* Coluna da Direita: Risco Geral e Alunos */}
        <Col xs={24} lg={16}>
          <Card style={cardStyle}>
            <Row align="middle" gutter={[16, 16]}>
              <Col xs={24} md={10} style={{ textAlign: 'center' }}>
                <Progress
                  type="dashboard"
                  percent={riskPercentage}
                  width={160}
                  strokeColor={{
                    '0%': '#52C41A',   
                    '100%': '#FF4D4F', 
                  }}
                  format={percent => (
                      <div style={{ color: 'var(--color-text-light)' }}>
                          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{percent}%</div>
                          <div style={{ fontSize: '12px', color: '#aaa' }}>Alto Risco</div>
                      </div>
                  )}
                />
              </Col>
              <Col xs={24} md={14}>
                <Title level={3} style={{ color: 'var(--color-text-light)', margin: 0 }}>
                  {riskPercentage}% da base em risco
                </Title>
                <Paragraph style={{ color: 'var(--color-text-secondary)', marginTop: '10px' }}>
                  Considerando <strong>{selectedUnit === 'todas' ? 'todas as unidades' : `a unidade ${selectedUnit}`}</strong>.
                  <br/>
                  <span style={{ color: '#FF4D4F', fontWeight: 'bold' }}>
                    {filteredStudents.filter(s => s.risk === 'Alto Risco').length} alunos 
                  </span> precisam de atenção imediata.
                </Paragraph>
              </Col>
            </Row>
          </Card>

          <Card style={{ ...cardStyle, marginTop: '24px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Input
                placeholder="Buscar aluno por nome..."
                prefix={<SearchOutlined style={{ color: 'var(--color-primary-yellow)' }} />}
                onChange={handleSearch}
                value={searchText}
                style={{
                    backgroundColor: '#2B2B2B',
                    borderColor: '#444',
                    color: 'var(--color-text-light)',
                    flex: 1,
                    marginRight: '10px'
                }}
                />
                <Tooltip title="Estes são os alunos com maior probabilidade de evasão segundo a IA">
                    <InfoCircleOutlined style={{ color: 'var(--color-text-secondary)', fontSize: '18px' }} />
                </Tooltip>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden', paddingRight: '5px' }}>
                {filteredStudents.length > 0 ? (
                    <Row gutter={[16, 16]}>
                    {filteredStudents
                        .sort((a ) => (a.risk === 'Alto Risco' ? -1 : 1))
                        .slice(0, 9)
                        .map(student => (
                        <Col xs={24} sm={12} md={8} key={student.id}>
                        <Card style={studentCardStyle(student.risk)} hoverable>
                            <UserOutlined style={{ fontSize: '30px', color: 'var(--color-primary-yellow)', marginBottom: '10px' }} />
                            <Text strong style={{ color: 'var(--color-text-light)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                            {student.name}
                            </Text>
                            <Text style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                            {student.risk}
                            </Text>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                ) : (
                    <Empty description={<span style={{ color: '#aaa' }}>Nenhum aluno encontrado.</span>} />
                )}
            </div>
            
            <Button
              type="primary"
              size="large"
              block
              onClick={() => navigate('/alunos')}
              style={{ marginTop: '30px', fontWeight: 'bold', color: '#505050' }}
            >
              Ver lista completa ({filteredStudents.length}) +
            </Button>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Dashboard;