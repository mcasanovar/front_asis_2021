import React, { useState, useEffect } from 'react'
import {
    Collapse,
    Input,
    Row,
    Col,
    Select,
    Typography,
    Alert,
    Spin,
    Form,
    Button,
} from 'antd'
import {
    CheckCircleOutlined,
    WarningOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons'
import {
    EvaluationModel,
    ExamAversionModel,
    IResponseEvaluation,
} from '../../models/evaluations.models'
import { IAlertMessageContent } from '../../models/index.models'

import AlertComponent from '../../component/Alert/Alert'
import { ExamAversionInitialization } from '../../initializations/evaluation.initialization'
import { createExamAversionService } from '../../services'
import { MapAversionToCreateExam } from '../../functions/mappers'
import { SelectValue } from 'antd/lib/select'

type IAversionRiesgoExamViewProps = {
    onCloseModal: (value: string, message: string) => string | void
    evaluationSelected: EvaluationModel | undefined
}

const AversionRiesgoExamView: React.FunctionComponent<
    IAversionRiesgoExamViewProps
> = ({ onCloseModal, evaluationSelected }) => {
    const { Panel } = Collapse
    const { Title, Paragraph } = Typography
    const { Option } = Select
    const { TextArea } = Input

    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [selectionConclusion, setSelectionConclusion] = useState<string>('')
    const [newDataAversion, setNewDataAversion] = useState<ExamAversionModel>(
        ExamAversionInitialization
    )
    const [loading, setLoading] = useState<boolean>(false)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })

    const handleGenerateExam = async () => {
        const examToInsert = MapAversionToCreateExam(
            evaluationSelected,
            newDataAversion
        )
        setLoading(true)
        const aux: IResponseEvaluation = await createExamAversionService(
            examToInsert
        )
        if (aux.err === null) {
            return onCloseModal('reload', aux.msg)
        }
        setMessageAlert({ message: aux.msg, type: 'error', show: true })
        return setLoading(false)
    }

    //------RENDERS
    const renderPersonalInformation = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="Maquinaria a conducir"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    id="error"
                                    onChange={e =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            maquinaria: e.currentTarget.value,
                                        })
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }

    const renderIndicatorsAnalysis = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Análisis de indicadores</Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph style={{ fontWeight: 'bold' }}>
                                Intelectual
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="Razonamiento abstracto"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            razonamiento_abstracto: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={
                                        newDataAversion.razonamiento_abstracto
                                    }
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Percepción y concentración"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            percepcion_concentracion: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={
                                        newDataAversion.percepcion_concentracion
                                    }
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Comprensión de instrucciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            comprension_instrucciones: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={
                                        newDataAversion.comprension_instrucciones
                                    }
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Paragraph style={{ fontWeight: 'bold' }}>
                                Adecuación a las normas
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="Acato a la autoridad"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            acato_autoridad: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={newDataAversion.acato_autoridad}
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Relación con grupos de pares"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            relacion_grupo_pares: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={newDataAversion.relacion_grupo_pares}
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Comportamiento social"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            comportamiento_social: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={
                                        newDataAversion.comportamiento_social
                                    }
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Paragraph style={{ fontWeight: 'bold' }}>
                                Estabilidad emocional
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item
                                label="Locus de control/impulsividad"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            locus_control_impulsividad: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={
                                        newDataAversion.locus_control_impulsividad
                                    }
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Manejo de la frustración"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            manejo_frustracion: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={newDataAversion.manejo_frustracion}
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Empatia"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            empatia: !!e ? e.toString() : '',
                                        })
                                    }
                                    value={newDataAversion.empatia}
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Grado de ansiedad"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            grado_ansiedad: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={newDataAversion.grado_ansiedad}
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Paragraph style={{ fontWeight: 'bold' }}>
                                Actitud a la prevensión de los riesgos
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="Actitud general hacia prevención de accidentes de trabajo"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            actitud_prevencion_accidentes: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={
                                        newDataAversion.actitud_prevencion_accidentes
                                    }
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Confianza en acciones realizadas"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            confianza_acciones_realizadas: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={
                                        newDataAversion.confianza_acciones_realizadas
                                    }
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Capacidad de modificar el ambiente a favor de la seguridad"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            capacidad_modificar_ambiente_seguridad:
                                                !!e ? e.toString() : '',
                                        })
                                    }
                                    value={
                                        newDataAversion.capacidad_modificar_ambiente_seguridad
                                    }
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Paragraph style={{ fontWeight: 'bold' }}>
                                Motivación por el cargo
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="Orientación a la tarea"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            orientacion_tarea: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={newDataAversion.orientacion_tarea}
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Energia vital"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            energia_vital: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={newDataAversion.energia_vital}
                                >
                                    <Option value="Bajo">Bajo</Option>
                                    <Option value="Promedio">Promedio</Option>
                                    <Option value="Alto">Alto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }
    //--------

    useEffect(() => {
        if (newDataAversion.meses_vigencia > 0) return setDisabledConfirm(false)
        return setDisabledConfirm(true)
    }, [newDataAversion])

    const handleChangeSelectionConclusion = (value: string) => {
        setSelectionConclusion(value)
        setNewDataAversion({ ...newDataAversion, conclusion: parseInt(value) })
    }

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            {
                <Title
                    level={4}
                >{`${evaluationSelected?.nombre_servicio} - ${evaluationSelected?.codigo}`}</Title>
            }
            <Collapse accordion defaultActiveKey={['1']}>
                <Panel header="Información personal" key="1">
                    {renderPersonalInformation()}
                </Panel>
                <Panel header="Analisis indicadores" key="2">
                    {renderIndicatorsAnalysis()}
                </Panel>
            </Collapse>
            <br />
            <Form layout="vertical">
                <Title level={5}>Conclusión</Title>
                <Input.Group>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item
                                label="Indique conclusión"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        handleChangeSelectionConclusion(
                                            !!e ? e.toString() : ''
                                        )
                                    }
                                >
                                    <Option value="1">
                                        No presenta conductas de riesgo
                                    </Option>
                                    <Option value="2">
                                        Presenta bajas conductas de riesgo
                                    </Option>
                                    <Option value="3">
                                        Presenta altas conductas de riesgo
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            {selectionConclusion === '1' && (
                                <Alert
                                    message="De los resultados se desprende que el Sr. actualmente NO PRESENTA CONDUCTAS DE RIESGOS, desde el punto de vista Psicológico."
                                    type="info"
                                    showIcon
                                    icon={<CheckCircleOutlined color="black" />}
                                />
                            )}
                            {selectionConclusion === '2' && (
                                <Alert
                                    message="De los resultados se desprende que el Sr. actualmente PRESENTA BAJAS CONDUCTAS DE RIESGOS, desde el punto de vista Psicológico"
                                    type="info"
                                    showIcon
                                    icon={<WarningOutlined />}
                                />
                            )}
                            {selectionConclusion === '3' && (
                                <Alert
                                    message="De los resultados se desprende que el Sr. actualmente PRESENTA ALTAS CONDUCTAS DE RIESGOS, desde el punto de vista Psicológico"
                                    type="info"
                                    showIcon
                                    icon={<CloseCircleOutlined />}
                                />
                            )}
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col span={24}>
                            <Form.Item
                                label="Conclusion y recomendaciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TextArea
                                    rows={3}
                                    onChange={e =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            observaciones_conclusion:
                                                e.currentTarget.value,
                                        })
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item
                                label="Meses vigencia"
                                style={{ width: '100%', height: '100%' }}
                                validateStatus={
                                    newDataAversion.meses_vigencia !== 0
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    newDataAversion.meses_vigencia !== 0
                                        ? ''
                                        : 'seleccionar'
                                }
                            >
                                <Input
                                    onChange={e =>
                                        setNewDataAversion({
                                            ...newDataAversion,
                                            meses_vigencia: parseInt(
                                                e.currentTarget.value
                                            ),
                                        })
                                    }
                                    type="number"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
            <Row
                gutter={8}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}
            >
                <Col
                    span={4}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Button
                        onClick={() => onCloseModal('', '')}
                        style={{ backgroundColor: '#E10D17', color: 'white' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => handleGenerateExam()}
                        disabled={disabledConfirm}
                        style={
                            !disabledConfirm
                                ? {
                                      backgroundColor: 'green',
                                      borderColor: 'green',
                                      color: 'white',
                                  }
                                : {
                                      backgroundColor: 'grey',
                                      borderColor: 'grey',
                                      color: 'white',
                                  }
                        }
                    >
                        Generar
                    </Button>
                </Col>
            </Row>
        </Spin>
    )
}

export default AversionRiesgoExamView
