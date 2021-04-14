import React, { useState } from 'react';
import { Collapse, Input, Row, Col, Select, Typography, Alert } from "antd";
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface IAversionRiesgoExamViewProps {
}

const AversionRiesgoExamView: React.FunctionComponent<IAversionRiesgoExamViewProps> = (props) => {
  const { Panel } = Collapse;
  const { Title, Paragraph } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;

  const [selectionConclusion, setSelectionConclusion] = useState<string>('');

  //------RENDERS
  const renderPersonalInformation = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={8}>
            <Input
              placeholder="Maquinaria a conducir"
            />
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderIndicatorsAnalysis = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={24}>
            <Title level={5}>Análisis de indicadores</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph>Intelectual</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Select placeholder='Razonamiento abstracto' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Percepción y concentración' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Comprensión de instrucciones' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph>Adecución a las normas</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Select placeholder='Acato a la autoridad' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Relación con grupos de pares' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Comportamiento social' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph>Estabilidad emocional</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            <Select placeholder='Locus de control/impulsividad' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Manejo de la frustración' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Empatia' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Grado de ansiedad' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph>Actitud a la prevensión de los riesgos</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Select placeholder='Actitud general hacia prevención de accidentes de trabajo' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Confianza en acciones realizadas' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Capacidad de modificar el ambiente a favor de la seguridad' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph>Motivación por el cargo</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Select placeholder='Orientación a la tarea' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Energia vital' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Bajo</Option>
              <Option value="lucy">Promedio</Option>
              <Option value="Yiminghe">Alto</Option>
            </Select>
          </Col>
        </Row>
      </Input.Group>
    );
  };
  //--------

  const handleChangeSelectionConclusion = (value: string) => {
    setSelectionConclusion(value)
  };

  return (
    <>
      <Collapse accordion defaultActiveKey={['1']}>
        <Panel header="Información personal" key="1">
          {renderPersonalInformation()}
        </Panel>
        <Panel header="Analisis indicadores" key="2">
          {renderIndicatorsAnalysis()}
        </Panel>
      </Collapse>
      <br />
      <div>
        <Title level={5}>Conclusión</Title>
        <Input.Group>
          <Row gutter={8}>
            <Col span={6}>
              <Select placeholder='Indique conclusión' style={{ width: '100%' }} onChange={handleChangeSelectionConclusion}>
                <Option value="1">No presenta conductas de riesgo</Option>
                <Option value="2">Presenta bajas conductas de riesgo</Option>
                <Option value="3">Presenta altas conductas de riesgo</Option>
              </Select>
            </Col>
            <Col span={18}>
              {selectionConclusion === '1' &&
                <Alert
                  message="De los resultados se desprende que el Sr. actualmente NO PRESENTA CONDUCTAS DE RIESGOS, desde el punto de vista Psicológico."
                  type="info"
                  showIcon
                  icon={<CheckCircleOutlined color='black' />}
                />}
              {selectionConclusion === '2' &&
                <Alert
                  message="De los resultados se desprende que el Sr. actualmente PRESENTA BAJAS CONDUCTAS DE RIESGOS, desde el punto de vista Psicológico"
                  type="info"
                  showIcon
                  icon={<WarningOutlined />}
                />}
              {selectionConclusion === '3' &&
                <Alert
                  message="De los resultados se desprende que el Sr. actualmente PRESENTA ALTAS CONDUCTAS DE RIESGOS, desde el punto de vista Psicológico"
                  type='info'
                  showIcon
                  icon={<CloseCircleOutlined />}
                />}
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={24}>
              <TextArea rows={3} placeholder='Conclusion y recomendaciones'></TextArea>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Input
                placeholder="Meses vigencia"
                type='number'
              />
            </Col>
          </Row>
        </Input.Group>
      </div>
    </>
  );
};

export default AversionRiesgoExamView;
