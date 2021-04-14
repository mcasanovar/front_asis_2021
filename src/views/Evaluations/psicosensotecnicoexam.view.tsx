import React, { useState } from 'react';
import { Collapse, Input, Row, Col, Select, Checkbox, Typography, Popover, Button } from "antd";
import { QuestionCircleOutlined, PercentageOutlined } from "@ant-design/icons";

import { IExamPsicoExtras } from '../../models/index.models';

import TextArea from 'antd/lib/input/TextArea';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface IPsicosensotecnicoExamViewProps {
}

const PsicosensotecnicoExamView: React.FunctionComponent<IPsicosensotecnicoExamViewProps> = (props) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { Title, Paragraph } = Typography;

  const [ExamExtra, setExamExtra] = useState<IExamPsicoExtras[]>([]);

  const options: IExamPsicoExtras[] = [
    { label: 'Anticipación', value: 'anticipacion', key: '4' },
    { label: 'Somnolencia', value: 'somnolencia', key: '5' },
    { label: 'Psicológico', value: 'psicologico', key: '6' },
    { label: 'Monotonia', value: 'Monotonia', key: '7' },
    { label: 'Reacciones multiples', value: 'reactiones-multiple', key: '8' },
    { label: 'Ley tránsito', value: 'ley-transito', key: '9' }
  ];

  //----------REMDERS
  const renderInformation = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={24}>
            <Title level={5}>Información personal</Title>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Select placeholder='Licencia a acreditar clase' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Resultado' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Input
              placeholder="Restricciones"
            />
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderPsicotecnico = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={24}>
            <Title level={5}>Exámenes psicoténicos</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Miden competencias de coordinación psicomotriz, capacidad de
            reaccionar frente a un estímulo y coordinar movimientos bilaterales.</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
            <Select
              placeholder='Tiempo reacción'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - Desempeño en tiempo/reacción, dentro de parámetros ADECUADOS.</p>
              <p><b>No Aprobado</b>- Desempeño en tiempo/reacción, fuera de parámetros aceptables para la conducción de vehículos motorizados. Alterado.</p>
            </div>} title="Tiempo de reacción">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
            <Input
              style={{ width: '25%', height: '100%' }}
              placeholder="Prom."
              type='number'
            />
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
            <Select
              placeholder='Cordinación bimanual'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Popover placement="top" content={<div>
              <p><b>Aprobado</b> - ADECUADA habilidad motora y coordinación de movimientos..</p>
              <p><b>No Aprobado</b>- Desempeño fuera de parámetros aceptados, que indican alteración en la coordinación motriz.</p>
            </div>} title="Cordinación bimanual">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
            <Input
              style={{ width: '25%', height: '100%' }}
              placeholder="Prom."
              type='number'
            />
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
            <Select
              placeholder='Presición y coordinación visomotriz'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Popover placement="topRight" content={<div>
              <p><b>Aprobado</b> - ADECUADO NIVEL de atención y concentración. Precisión y rapidez.</p>
              <p><b>No Aprobado</b>- Desempeño fuera de parámetros aceptados, que indican alteración en la precisión y rapidez de movimientos, mostrando una posible alteración en su nivel de atención y concentración.</p>
            </div>} title="Presición y coordinación visomotriz">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
            <Input
              style={{ width: '25%', height: '100%' }}
              placeholder="Prom."
              type='number'
            />
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderSensometrico = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={24}>
            <Title level={5}>Exámenes sensométricos</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Indican las condiciones sensoriales y perceptuales, en el área visual y auditiva Evaluación sensoperceptiva.</Paragraph>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Agudeza visual.</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Monocular derecha'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="jack">Aprobado con obs.</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - El examinado, presenta una ADECUADA agudeza visual para su ojo derecho.</p>
              <p><b>Aprobado con observación</b> - El examinado, presenta una LEVE DISMNINUCIÓN de la agudeza visual para su ojo derecho, no obstante, se ajusta a los parámetros de aprobación. Se sugiere consultar un especialista oftalmólogo.</p>
              <p><b>No Aprobado</b>-  El examinado, presenta una SIGNIFICATIVA DISMINUCIÓN de la agudeza visual para su ojo derecho, por lo que NO se ajusta a los parámetros de aprobación. Debe consultar oftalmólogo.</p>
            </div>} title="Monocular derecha">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Monocular izquierda'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="jack">Aprobado con obs.</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="top" content={<div>
              <p><b>Aprobado</b> - El examinado, presenta una ADECUADA agudeza visual para su ojo izquierdo.</p>
              <p><b>Aprobado con observación</b> - El examinado, presenta una LEVE DISMNINUCIÓN de la agudeza visual para su ojo izquierdo, no obstante, se ajusta a los parámetros de aprobación. Se sugiere consultar un especialista oftalmólogo.</p>
              <p><b>No Aprobado</b>-  El examinado, presenta una SIGNIFICATIVA DISMINUCIÓN de la agudeza visual en su ojo izquierdo, por lo que NO se ajusta a los parámetros de aprobación. Debe consultar oftalmólogo.</p>
            </div>} title="Monocular izquierda">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Vision binocular'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="jack">Aprobado con obs.</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topRight" content={<div>
              <p><b>Aprobado</b> - El examinado, presenta una ADECUADA agudeza visual para ambos ojos.</p>
              <p><b>Aprobado con observación</b> - El examinado, presenta una LEVE DISMNINUCIÓN de la agudeza visual binocular, no obstante, se ajusta a los parámetros de aprobación. Se sugiere consultar un especialista oftalmólogo.</p>
              <p><b>No Aprobado</b>-  El examinado, presenta una SIGNIFICATIVA DISMINUCIÓN de la agudeza visual binocular, por lo que NO se ajusta a los parámetros de aprobación. Debe consultar oftalmólogo.</p>
            </div>} title="Vision binocular">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Perimetria'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - Adecuada amplitud de campo visual.</p>
              <p><b>No Aprobado</b>-  Baja amplitud de campo visual. Se recomienda consultar oftalmólogo.</p>
            </div>} title="Perimetria">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Profundidad'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="top" content={<div>
              <p><b>Aprobado</b> - Adecuada visión de profundidad y apreciación de las distancias.</p>
              <p><b>No Aprobado</b>- Alteración en la capacidad de ver en profunidad y de apreciera distancias.</p>
            </div>} title="Profundidad">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Discriminación colores'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topRight" content={<div>
              <p><b>Aprobado</b> - Adecuada percepción de colores EN VISIÓN CROMÁTICA.</p>
              <p><b>No Aprobado</b>-  Alteración en visión cromática.</p>
            </div>} title="Discriminación colores">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Visión nocturna'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - Posee una respuesta normal a la disminución de los umbrales luminosos.</p>
              <p><b>No Aprobado</b>-  Respuesta alterada frente a la disminución de umbrales luminosos.</p>
            </div>} title="Visión nocturna">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Phoria vertical'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="top" content={<div>
              <p><b>Aprobado</b> - Posee normal respuesta muscular vertical.</p>
              <p><b>No Aprobado</b>- Se observan alteraciones en la respuesta muscular vertical.</p>
            </div>} title="Phoria vertical">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Phoria horizontal'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topRight" content={<div>
              <p><b>Aprobado</b> - Muestra normal respuesta muscular horizontal.</p>
              <p><b>No Aprobado</b>- Se observa alteración en la respuesta muscular horizontal.</p>
            </div>} title="Phoria horizontal">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Recuperación encandilamiento'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - Muestra normal recuperación al deslumbramiento.</p>
              <p><b>No Aprobado</b>- Se observa alteración en la respuesta al deslumbramiento.</p>
            </div>} title="Recuperación encandilamiento">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Audiometria'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="jack">Aprobado con obs.</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="top" content={<div>
              <p><b>Aprobado</b> - Pendiente.</p>
              <p><b>Aprobado con observación</b> - Pendiente.</p>
              <p><b>No Aprobado</b>- Pendiente.</p>
            </div>} title="Audiometria">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderAnticipationExam = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={24}>
            <Title level={5}>Test de velocidad de anticipación</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Esta prueba mide la impulsividad del individuo,
              la capacidad para estimar la velocidad y movimiento de objetos en el espacio.</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
            <Select
              placeholder='Velocidad anticipación'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - El individuo percibe de manera ADECUADA la velocidad y estimación del movimiento que se requiere, sin mostrar conductas ansiosas e impulsivas.</p>
              <p><b>No Aprobado</b>- El individuo percibe de manera ALTERADA la velocidad y estimación del movimiento que se requiere, pudiendo esto indicar la presencia de conductas ansiosas e impulsivas.</p>
            </div>} title="TieVelocidad anticipación">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
            <Input
              style={{ width: '25%', height: '100%' }}
              placeholder="Prom."
              type='number'
            />
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderSomnolenceExam = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={24}>
            <Title level={5}>Examen de somnolencia</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Evalúa la presencia de síntomas de alteraciones del sueño.</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Select placeholder='Probabilidad somnolencia' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Si</Option>
              <Option value="lucy">No</Option>
            </Select>
          </Col>
          <Col span={3}>
            <Input
              placeholder="Punto"
              type='number'
            />
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Test EPWORTH'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - El evaluado APRUEBA EL TEST DE SOMNOLENCIA, autoreportando NO presentar conductas que indiquen fatiga y somnolencia.</p>
              <p><b>No Aprobado</b>- El evaluado REPRUEBA EL TEST DE SOMNOLENCIA, autoreportando presentar conductas que indican fatiga y somnolencia.</p>
            </div>} title="TieTest EPWORTH">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderPsicologyExam = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={24}>
            <Title level={5}>Test psicológico</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Se evalúa la capacidad que tiene el conductor para responder a un estímulo como resultado del proceso de aprendizaje. Sentido de realidad y orientación tiempo-espacio.
            Esta evaluación indica la presencia de competencias, características de personalidad y comportamiento necesario para la conducción de vehículos motorizados.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <TextArea rows={5} placeholder='Observaciones' />
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderMonotonyTolerenceExam = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={24}>
            <Title level={5}>Test tolerancia monotonía</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Prueba que mide la tolerancia frente a tareas monótonas a una velocidad determinada.</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Tolerancia'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - El individuo tolera de manera ADECUADA la monotonía, sin mostrar conductas de cansancio y fatiga por repetición.</p>
              <p><b>No Aprobado</b>- El individuo presenta baja tolerancia a la monotonía, mostrando conductas de cansancio y fatiga por repetición.</p>
            </div>} title="Tolerancia">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={4}>
            <Input
              placeholder="Aciertos"
              type='number'
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Errores"
              type='number'
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Promedio reacción"
              type='number'
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Promedio aciertos"
              type='number'
            />
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderMultiplyReactions = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={24}>
            <Title level={5}>Test reacciones multiples</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Evalúa tiempo de reacción del paciente, la discriminación auditiva, reacciones simples, reacciones de elección,
            etc. Consiste en una serie de situaciones estimulares que a la vez, requieren respuesta múltiple por parte del evaluado.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Reacciones multiples'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - El evaluado presenta una ADECUADA capacidad para responder a múltiples exigencias de manera simultánea y en un tiempo definido.</p>
              <p><b>No Aprobado</b>- El evaluado presenta dificultas en la capacidad para responder a múltiples exigencias de manera simultánea y en un tiempo definido.</p>
            </div>} title="Reacciones multiples">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderTrafficLawKnowledge = () => {
    return (
      <Input.Group>
        <Row>
          <Col span={24}>
            <Title level={5}>Test Conocimiento Ley Tránsito Nacional</Title>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Paragraph >Evalúa las competencias y conocimientos legales, reclamentarios, señalética vial, mecánica básica y conducta vial, del evaluado.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%' }}>
            <Select
              placeholder='Exámenes teóricos tránsito'
              style={{ width: '100%' }} onChange={() => { }}
            >
              <Option value="jack">Aprobado</Option>
              <Option value="lucy">No Aprobado</Option>
            </Select>
            <Popover placement="topLeft" content={<div>
              <p><b>Aprobado</b> - El evaluado presenta una ADECUADA capacidad para responder a múltiples exigencias de manera simultánea y en un tiempo definido.</p>
              <p><b>No Aprobado</b>- El evaluado presenta dificultas en la capacidad para responder a múltiples exigencias de manera simultánea y en un tiempo definido.</p>
            </div>} title="Exámenes teóricos tránsito">
              <Button style={{ width: '15%', color: '#1073B5' }} icon={<QuestionCircleOutlined color='#1073B5' />} />
            </Popover>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Paragraph>Ingreso de resultados</Paragraph>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            <Input
              placeholder="Conocimientos legales"
              type='number'
              suffix={<PercentageOutlined />}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Conocimientos reglamentarios"
              type='number'
              suffix={<PercentageOutlined />}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Conocimientos de mecánica"
              type='number'
              suffix={<PercentageOutlined />}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Conocimiento señales viales"
              type='number'
              suffix={<PercentageOutlined />}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Conducta vial"
              type='number'
              suffix={<PercentageOutlined />}
            />
          </Col>
        </Row>
      </Input.Group>
    );
  };
  //---------

  const handleShowExtraExam = (value: string) => {
    switch (value) {
      case 'anticipacion':
        return renderAnticipationExam();
      case 'somnolencia':
        return renderSomnolenceExam();
      case 'psicologico':
        return renderPsicologyExam();
      case 'Monotonia':
        return renderMonotonyTolerenceExam();
      case 'reactiones-multiple':
        return renderMultiplyReactions();
      case 'ley-transito':
        return renderTrafficLawKnowledge();
      default:
        return null;
    }
  };

  const handleChangeExamExtra = (checkedExam: CheckboxValueType[] = []) => {
    const exams = options.reduce((acc: IExamPsicoExtras[], current: IExamPsicoExtras) => {
      const aux = checkedExam.includes(current.value);
      if (aux) {
        acc.push({
          ...current
        });
      }
      return acc
    }, []);

    setExamExtra(exams);
  };

  return (
    <>
      <Checkbox.Group
        style={{ paddingBottom: '1rem' }}
        options={options} onChange={handleChangeExamExtra}
      />
      <Collapse accordion defaultActiveKey={['1']}>
        <Panel header="Información" key="1">
          {renderInformation()}
        </Panel>
        <Panel header="Psicotécnico" key="2">
          {renderPsicotecnico()}
        </Panel>
        <Panel header="Sensometría" key="3">
          {renderSensometrico()}
        </Panel>
        {ExamExtra.length > 0 && ExamExtra.map((exam: IExamPsicoExtras) => {
          return (
            <Panel header={exam.label} key={exam.key}>
              {handleShowExtraExam(exam.value)}
            </Panel>
          )
        })}
      </Collapse>
      <br />
      <div>
        <Title level={5}>Evaluación y conclusiones</Title>
        <Input.Group>
          <Row gutter={8}>
            <Col span={6}>
              <Select placeholder='Examenes psicotécnicos' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Aprobado</Option>
                <Option value="lucy">Aprobado con obs.</Option>
                <Option value="Yiminghe">No Aprobado</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder='Examenes psicotécnicos' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Aprobado</Option>
                <Option value="lucy">Aprobado con obs.</Option>
                <Option value="Yiminghe">No Aprobado</Option>
              </Select>
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

export default PsicosensotecnicoExamView;
