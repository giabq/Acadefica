import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Card, Select, Radio, Input, Progress, Space, Button, Spin, Empty, Tooltip, Modal, Table, message, Statistic } from 'antd';
import { 
    SearchOutlined, UserOutlined, UploadOutlined, InfoCircleOutlined, 
    FileTextOutlined, TeamOutlined, TrophyOutlined, ClockCircleOutlined, 
    ThunderboltOutlined, RiseOutlined, FireOutlined 
} from '@ant-design/icons';
import AppLayout from '../layout/AppLayout';
import { useNavigate } from 'react-router-dom';

// Importamos todos os serviços
import { 
    getStudentsPredictions, getAllStudents, uploadStudentsCsv,
    getNumberOfStudents, getObjectiveMode, getAverageAge, getAverageTimeAsStudent,
    getAverageCheckins, getAverageWeightVariation, getAverageBodyFatVariation, getAverageLoadVariation,
    getStudentsCountPerUnit
} from '../services/StudentService';
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

interface DashboardStats {
    totalStudents: number;
    objectiveMode: string;
    avgAge: number;
    avgTime: number;
    avgCheckins: number;
    avgWeightVar: number;
    avgFatVar: number;
    avgLoadVar: number;
    unitsDistribution: Record<string, number>;
}

// ------------------------------------
// 2. Componente Principal
// ------------------------------------
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // --- Estados de Dados ---
  const [allStudents, setAllStudents] = useState<StudentDash[]>([]); 
  const [filteredStudents, setFilteredStudents] = useState<StudentDash[]>([]); 
  const [stats, setStats] = useState<DashboardStats>({
      totalStudents: 0, objectiveMode: '-', avgAge: 0, avgTime: 0,
      avgCheckins: 0, avgWeightVar: 0, avgFatVar: 0, avgLoadVar: 0, unitsDistribution: {}
  });
  
  // --- Estados de UI ---
  const [units, setUnits] = useState<string[]>([]); 
  const [selectedUnit, setSelectedUnit] = useState<string>('todas'); 
  const [loading, setLoading] = useState(true);
  const [riskPercentage, setRiskPercentage] = useState(0);
  const [searchText, setSearchText] = useState('');
  
  // --- Estados de Upload ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Função Principal de Carregamento ---
  const loadDashboardData = async () => {
    setLoading(true);
    try {
        // 1. Dados de Alunos e IA
        const [predictionsData, studentsData] = await Promise.all([
            getStudentsPredictions(),
            getAllStudents()
        ]);

        // 2. Dados Estatísticos (Novas APIs)
        // Usamos Promise.all para carregar tudo em paralelo
        const [
            total, objective, age, time, checkins, weight, fat, load, unitsDist
        ] = await Promise.all([
            getNumberOfStudents(),
            getObjectiveMode(),
            getAverageAge(),
            getAverageTimeAsStudent(),
            getAverageCheckins(0), // 0 = Média Geral
            getAverageWeightVariation(),
            getAverageBodyFatVariation(),
            getAverageLoadVariation(),
            getStudentsCountPerUnit()
        ]);

        // Atualiza o estado de estatísticas
        setStats({
            totalStudents: total,
            objectiveMode: objective,
            avgAge: Number(age.toFixed(1)),
            avgTime: Number(time.toFixed(1)),
            avgCheckins: Number(checkins.toFixed(1)),
            avgWeightVar: Number(weight.toFixed(2)),
            avgFatVar: Number(fat.toFixed(2)),
            avgLoadVar: Number(load.toFixed(2)),
            unitsDistribution: unitsDist
        });

        // 3. Processamento da Lista de Alunos (Merge)
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
        message.error("Erro ao carregar dados do servidor. Verifique se o backend está rodando.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // --- Lógica Auxiliar e Handlers ---
  
  const calculateMetrics = (data: StudentDash[]): void => {
      if (data.length === 0) { setRiskPercentage(0); return; }
      const highRiskCount = data.filter(s => s.risk === 'Alto Risco').length;
      setRiskPercentage(Math.round((highRiskCount / data.length) * 100));
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

  // Upload Handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCancelModal = () => setIsModalOpen(false);
  const handleImportClick = () => fileInputRef.current?.click();
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          if (!file.name.endsWith('.csv')) {
              message.error('Arquivo inválido. Selecione um .csv'); return;
          }
          setUploading(true);
          // Fecha o modal imediatamente para mostrar o loading fullscreen
          setIsModalOpen(false);
          
          try {
              await uploadStudentsCsv(file);
              message.success('Dados importados e IA atualizada!');
              loadDashboardData(); 
          } catch (error) {
              message.error('Erro ao processar arquivo.');
          } finally {
              setUploading(false);
              event.target.value = ''; 
          }
      }
  };

  // --- Estilos ---
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary-background)',
    color: 'var(--color-text-light)',
    border: 'none',
    borderRadius: '10px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const filterCardStyle: React.CSSProperties = { 
      ...cardStyle, 
      padding: '20px', 
      textAlign: 'left', 
      height: '100%', 
      justifyContent: 'flex-start' 
  };

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

  const statValueStyle: React.CSSProperties = { color: 'var(--color-text-light)', fontSize: '24px', fontWeight: 'bold' };
  const statLabelStyle: React.CSSProperties = { color: 'var(--color-text-secondary)', fontSize: '14px' };

  // --- Dados para o Modal de Exemplo ---
  const csvHeaderString = "aluno_id,Nome,Objetivo,Idade,TempoComoAluno,CheckinsSemana_1,CheckinsSemana_2,CheckinsSemana_3,CheckinsSemana_4,CheckinsSemana_5,CheckinsSemana_6,CheckinsSemana_7,CheckinsSemana_8,CheckinsSemana_9,CheckinsSemana_10,CheckinsSemana_11,CheckinsSemana_12,TempoTreino_M1,TempoTreino_M2,TempoTreino_M3,AulasGrupo_M1,AulasGrupo_M2,AulasGrupo_M3,DiasAtrasoPagamento_M1,DiasAtrasoPagamento_M2,DiasAtrasoPagamento_M3,VariacaoPeso_2m,VariacaoGordura_2m,VariacaoCarga_2m,Status,unidade";

  const exampleColumns = [
      { title: 'aluno_id', dataIndex: 'id', key: 'id', width: 80 },
      { title: 'Nome', dataIndex: 'nome', key: 'nome' },
      { title: 'Objetivo', dataIndex: 'objetivo', key: 'objetivo' },
      { title: 'Idade', dataIndex: 'idade', key: 'idade' },
      { title: 'Checkins...', dataIndex: 'checkins', key: 'checkins' },
      { title: 'unidade', dataIndex: 'unidade', key: 'unidade' },
  ];
  
  const exampleData = [
      { key: '1', id: '101', nome: 'João Silva', objetivo: 'hipertrofia', idade: 25, checkins: '4,5,4...', unidade: 'centro' },
      { key: '2', id: '102', nome: 'Maria Oliveira', objetivo: 'emagrecimento', idade: 32, checkins: '2,1,1...', unidade: 'zona sul' }
  ];

  // --- Renderização ---
  if (loading && !uploading) { 
      return (
          <AppLayout>
              <div style={{ textAlign: 'center', padding: '100px' }}>
                  <Spin size="large" />
                  <Text style={{ display: 'block', marginTop: 20, color: '#fff' }}>Carregando inteligência de dados...</Text>
              </div>
          </AppLayout>
      );
  }

  return (
    <AppLayout>
      <Spin spinning={uploading} fullscreen tip="Processando dados com IA..." size="large" />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <Title level={2} style={{ color: 'var(--color-text-light)', margin: 0 }}>Dashboard Geral</Title>
            <Text type="secondary">Métricas em tempo real da sua academia.</Text>
          </div>
          <Tooltip title="Importar nova base de dados CSV">
            <Button 
                type="primary" icon={<UploadOutlined />} size="large" onClick={handleOpenModal}
                style={{ backgroundColor: 'var(--color-primary-yellow)', color: '#505050', fontWeight: 'bold' }}
            >
                Adicionar Dados
            </Button>
          </Tooltip>
      </div>

      {/* SEÇÃO 1: KPIs Principais */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={12} md={6}>
              <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
                  <Statistic 
                    title={<span style={statLabelStyle}>Total de Alunos</span>}
                    value={stats.totalStudents} 
                    valueStyle={statValueStyle}
                    prefix={<TeamOutlined style={{ color: 'var(--color-primary-yellow)', marginRight: 10 }} />}
                  />
              </Card>
          </Col>
          <Col xs={12} md={6}>
              <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
                  <Statistic 
                    title={<span style={statLabelStyle}>Objetivo + Comum</span>}
                    value={stats.objectiveMode} 
                    valueStyle={{ ...statValueStyle, fontSize: '18px' }} // Fonte menor para texto
                    prefix={<TrophyOutlined style={{ color: 'var(--color-primary-yellow)', marginRight: 10 }} />}
                  />
              </Card>
          </Col>
          <Col xs={12} md={6}>
              <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
                  <Statistic 
                    title={<span style={statLabelStyle}>Idade Média</span>}
                    value={stats.avgAge} 
                    precision={1}
                    suffix="anos"
                    valueStyle={statValueStyle}
                    prefix={<UserOutlined style={{ color: 'var(--color-primary-yellow)', marginRight: 10 }} />}
                  />
              </Card>
          </Col>
          <Col xs={12} md={6}>
              <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
                  <Statistic 
                    title={<span style={statLabelStyle}>Tempo Médio</span>}
                    value={stats.avgTime} 
                    precision={1}
                    suffix="meses"
                    valueStyle={statValueStyle}
                    prefix={<ClockCircleOutlined style={{ color: 'var(--color-primary-yellow)', marginRight: 10 }} />}
                  />
              </Card>
          </Col>
      </Row>

      {/* SEÇÃO 2: Performance e Física */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} md={6}>
              <Card style={cardStyle}>
                  <Statistic 
                    title={<span style={statLabelStyle}>Check-ins Médios (Semana)</span>}
                    value={stats.avgCheckins} 
                    precision={1}
                    valueStyle={{ color: stats.avgCheckins > 2.5 ? '#52C41A' : '#FF4D4F' }}
                    prefix={<ThunderboltOutlined />}
                  />
              </Card>
          </Col>
          <Col xs={24} md={6}>
              <Card style={cardStyle}>
                  <Statistic 
                    title={<span style={statLabelStyle}>Var. de Carga Média</span>}
                    value={stats.avgLoadVar} 
                    precision={2}
                    valueStyle={{ color: '#52C41A' }} 
                    prefix={<RiseOutlined />}
                    suffix="%"
                  />
              </Card>
          </Col>
          <Col xs={24} md={6}>
              <Card style={cardStyle}>
                  <Statistic 
                    title={<span style={statLabelStyle}>Var. de Peso Média</span>}
                    value={stats.avgWeightVar} 
                    precision={2}
                    valueStyle={{ color: 'var(--color-text-light)' }} 
                    suffix="kg"
                  />
              </Card>
          </Col>
          <Col xs={24} md={6}>
              <Card style={cardStyle}>
                  <Statistic 
                    title={<span style={statLabelStyle}>Var. Gordura Média</span>}
                    value={stats.avgFatVar} 
                    precision={2}
                    valueStyle={{ color: stats.avgFatVar < 0 ? '#52C41A' : '#FAAD14' }} 
                    prefix={<FireOutlined />}
                    suffix="%"
                  />
              </Card>
          </Col>
      </Row>

      {/* SEÇÃO 3: Risco e Filtros (Layout Original Melhorado) */}
      <Row gutter={[24, 24]}>
        
        {/* Filtros e Distribuição por Unidade */}
        <Col xs={24} lg={8}>
          <Card style={filterCardStyle}>
            <Title level={4} style={{ color: 'var(--color-text-light)' }}>Filtros & Unidades</Title>
            
            <Text style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '10px' }}>
                Selecione para filtrar a lista e o risco:
            </Text>
            
            <Radio.Group onChange={handleUnitChange} value={selectedUnit} style={{ width: '100%', marginBottom: '20px' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Radio value="todas" style={{ color: 'var(--color-text-light)' }}>Todas as Unidades</Radio>
                    {units.map(u => (
                        <div key={u} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Radio value={u} style={{ color: 'var(--color-text-light)' }}>
                                {u.charAt(0).toUpperCase() + u.slice(1)}
                            </Radio>
                            {/* Mostra a contagem real vinda da API */}
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                {stats.unitsDistribution[u] || 0} alunos
                            </Text>
                        </div>
                    ))}
                </Space>
            </Radio.Group>
          </Card>
        </Col>

        {/* Risco de Evasão e Lista */}
        <Col xs={24} lg={16}>
          {/* Card Risco */}
          <Card style={{ ...cardStyle, marginBottom: '24px' }}>
            <Row align="middle" gutter={[16, 16]}>
              <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                <Progress
                  type="dashboard"
                  percent={riskPercentage}
                  width={140}
                  strokeColor={{ '0%': '#52C41A', '100%': '#FF4D4F' }}
                  format={percent => (
                      <div style={{ color: 'var(--color-text-light)' }}>
                          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{percent}%</div>
                          <div style={{ fontSize: '12px', color: '#aaa' }}>Alto Risco</div>
                      </div>
                  )}
                />
              </Col>
              <Col xs={24} md={16}>
                <Title level={3} style={{ color: 'var(--color-text-light)', margin: 0 }}>
                  Previsão de Evasão (IA)
                </Title>
                <Paragraph style={{ color: 'var(--color-text-secondary)', marginTop: '10px' }}>
                  Filtrando: <strong>{selectedUnit === 'todas' ? 'Todas as Unidades' : selectedUnit}</strong>
                  <br/>
                  Identificamos <span style={{ color: '#FF4D4F', fontWeight: 'bold' }}>
                    {filteredStudents.filter(s => s.risk === 'Alto Risco').length} alunos 
                  </span> com alta probabilidade de cancelamento.
                </Paragraph>
              </Col>
            </Row>
          </Card>

          {/* Lista Rápida */}
          <Card style={{ ...cardStyle, justifyContent: 'flex-start', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <Input
                    placeholder="Buscar aluno por nome..."
                    prefix={<SearchOutlined style={{ color: 'var(--color-primary-yellow)' }} />}
                    onChange={handleSearch}
                    value={searchText}
                    style={{ backgroundColor: '#2B2B2B', borderColor: '#444', color: 'white', maxWidth: '300px' }}
                />
                <Button type="link" onClick={() => navigate('/alunos')} style={{ color: 'var(--color-primary-yellow)' }}>
                    Ver Todos
                </Button>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {filteredStudents.length > 0 ? (
                    <Row gutter={[10, 10]}>
                    {filteredStudents
                        .sort((a, b) => (a.risk === 'Alto Risco' ? -1 : 1))
                        .slice(0, 6) // Mostra só 6 para não poluir
                        .map(student => (
                        <Col xs={24} sm={12} md={8} key={student.id}>
                            <Card 
                                size="small"
                                style={{ 
                                    backgroundColor: '#222', 
                                    border: `1px solid ${student.risk === 'Alto Risco' ? '#FF4D4F' : '#52C41A'}`,
                                    textAlign: 'center'
                                }}
                            >
                                <Text strong style={{ color: '#fff', display: 'block' }}>{student.name}</Text>
                                <Text style={{ color: '#aaa', fontSize: '11px' }}>{student.risk}</Text>
                            </Card>
                        </Col>
                    ))}
                    </Row>
                ) : <Empty description={<span style={{ color: '#aaa' }}>Sem resultados</span>} />}
            </div>
          </Card>
        </Col>
      </Row>

      {/* MODAL DE IMPORTAÇÃO */}
      <Modal 
        title={<span style={{ fontSize: '20px' }}>Importar Lista de Alunos</span>}
        open={isModalOpen} 
        onCancel={handleCancelModal}
        centered
        width={800} 
        footer={[
            <Button key="back" onClick={handleCancelModal} disabled={uploading} style={{ fontWeight: 'bold' }}>
              Cancelar
            </Button>,
            <Button 
                key="submit" 
                type="primary" 
                onClick={handleImportClick} 
                disabled={uploading}
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
              
              <div style={{ 
                  backgroundColor: '#f5f5f5', 
                  padding: '15px', 
                  borderRadius: '6px', 
                  border: '1px solid #d9d9d9',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#ff4d4f', 
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
                          <Text style={{color: "red"}} strong>Importante:</Text>
                          <ul style={{ margin: '5px 0 0 15px', padding: 0 }}>
                              <li>As colunas de <strong>CheckinsSemana</strong> vão de 1 a 12.</li>
                              <li>As colunas <strong>unidade</strong> e <strong>Objetivo</strong> devem estar escritas em minúsculas.</li>
                          </ul>
                      </div>
                  </Space>
              </div>
          </div>
      </Modal>

      <input 
          type="file" 
          ref={fileInputRef}
          style={{ display: 'none' }} 
          accept=".csv"
          onChange={handleFileChange}
      />
    </AppLayout>
  );
};

export default Dashboard;