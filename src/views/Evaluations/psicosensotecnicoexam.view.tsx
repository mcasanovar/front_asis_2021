import React, { useState, useEffect } from 'react'
import {
    Collapse,
    Input,
    Row,
    Col,
    Select,
    Checkbox,
    Typography,
    Popover,
    Button,
    Spin,
    Form,
} from 'antd'
import { QuestionCircleOutlined, PercentageOutlined } from '@ant-design/icons'

import {
    IAlertMessageContent,
    IExamPsicoExtras,
} from '../../models/index.models'
import { ExamPsicosensotecnicoInitialization } from '../../initializations/evaluation.initialization'

import { CheckboxValueType } from 'antd/lib/checkbox/Group'

import AlertComponent from '../../component/Alert/Alert'

import {
    EvaluationModel,
    ExamPsicosensotecnicoModel,
    IResponseEvaluation,
} from '../../models/evaluations.models'
import { DRIVER_LICENSE } from '../../constants/var'
import { MapPsicoToCreateExam } from '../../functions/mappers'
import { createExamPsicoService } from '../../services'

interface IPsicosensotecnicoExamViewProps {
    onCloseModal: (value: string, message: string) => string | void
    evaluationSelected: EvaluationModel | undefined
}

const PsicosensotecnicoExamView: React.FunctionComponent<
    IPsicosensotecnicoExamViewProps
> = ({ onCloseModal, evaluationSelected }) => {
    const { TextArea } = Input
    const { Panel } = Collapse
    const { Option } = Select
    const { Title, Paragraph } = Typography

    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [newExamData, setNewExamData] = useState<ExamPsicosensotecnicoModel>(
        ExamPsicosensotecnicoInitialization
    )
    const [ExamExtra, setExamExtra] = useState<IExamPsicoExtras[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })

    const options: IExamPsicoExtras[] = [
        {
            label: 'Anticipación',
            value: 'anticipacion',
            key: '4',
            name_exam: 'is_anticipacion',
        },
        {
            label: 'Somnolencia',
            value: 'somnolencia',
            key: '5',
            name_exam: 'is_somnolencia',
        },
        {
            label: 'Psicológico',
            value: 'psicologico',
            key: '6',
            name_exam: 'is_psicologico',
        },
        {
            label: 'Monotonia',
            value: 'Monotonia',
            key: '7',
            name_exam: 'is_monotonia',
        },
        {
            label: 'Reacciones multiples',
            value: 'reactiones-multiple',
            key: '8',
            name_exam: 'is_reacciones_multiples',
        },
        {
            label: 'Ley tránsito',
            value: 'ley-transito',
            key: '9',
            name_exam: 'is_ley_transito',
        },
    ]

    //----------RENDERS
    const renderInformation = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={24}>
                            <Title level={5} style={{ textAlign: 'center' }}>
                                Información personal
                            </Title>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                validateStatus={
                                    newExamData.licencia_a_acreditar.length > 0
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    newExamData.licencia_a_acreditar.length > 0
                                        ? ''
                                        : 'seleccionar'
                                }
                                label="Licencia a acredita clase"
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={(e: any) =>
                                        setNewExamData({
                                            ...newExamData,
                                            licencia_a_acreditar: e,
                                        })
                                    }
                                    mode="multiple"
                                    value={newExamData.licencia_a_acreditar}
                                    id="error"
                                >
                                    {DRIVER_LICENSE.map((license, index) => (
                                        <Option key={index} value={license}>
                                            {license}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                validateStatus={
                                    newExamData.resultado !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    newExamData.resultado !== ''
                                        ? ''
                                        : 'seleccionar'
                                }
                                label="Resultado"
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            resultado: e.toString(),
                                        })
                                    }
                                    value={newExamData.resultado}
                                    id="error_2"
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="Aprobado con Obs">
                                        Aprobado con Obs
                                    </Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Restricciones">
                                <Input
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            restricciones:
                                                e.currentTarget.value,
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

    const renderPsicotecnico = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row gutter={8}>
                        <Col span={24}>
                            <Title level={5}>Exámenes psicoténicos</Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph>
                                Miden competencias de coordinación psicomotriz,
                                capacidad de reaccionar frente a un estímulo y
                                coordinar movimientos bilaterales.
                            </Paragraph>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '60%',
                            }}
                        >
                            <Form.Item
                                label="Tiempo reacción"
                                style={{ width: '60%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            tiempo_reaccion: e.toString(),
                                        })
                                    }
                                    value={newExamData.tiempo_reaccion}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Desempeño en
                                                tiempo/reacción, dentro de
                                                parámetros ADECUADOS.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Desempeño en
                                                tiempo/reacción, fuera de
                                                parámetros aceptables para la
                                                conducción de vehículos
                                                motorizados. Alterado.
                                            </p>
                                        </div>
                                    }
                                    title="Tiempo de reacción"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                            <Form.Item
                                label="Prom."
                                style={{ width: '25%', height: '100%' }}
                            >
                                <Input
                                    style={{ width: '100%', height: '100%' }}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            promedio_tiempo_reaccion: parseInt(
                                                e.currentTarget.value
                                            ),
                                        })
                                    }
                                    type="number"
                                />
                            </Form.Item>
                        </Col>

                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '60%',
                            }}
                        >
                            <Form.Item
                                label="Cordinación bimanual"
                                style={{ width: '60%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            coordinacion_bimanual: e.toString(),
                                        })
                                    }
                                    value={newExamData.coordinacion_bimanual}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="top"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - ADECUADA
                                                habilidad motora y coordinación
                                                de movimientos..
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Desempeño
                                                fuera de parámetros aceptados,
                                                que indican alteración en la
                                                coordinación motriz.
                                            </p>
                                        </div>
                                    }
                                    title="Cordinación bimanual"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>

                            <Form.Item
                                label="Prom."
                                style={{ width: '25%', height: '100%' }}
                            >
                                <Input
                                    style={{ width: '100%', height: '100%' }}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            promedio_coordinacion_bimanual:
                                                parseInt(e.currentTarget.value),
                                        })
                                    }
                                    type="number"
                                />
                            </Form.Item>
                        </Col>

                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '60%',
                            }}
                        >
                            <Form.Item
                                label="Presición y coordinación visomotriz"
                                style={{ width: '60%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            precision_coordinacion_visomotriz:
                                                e.toString(),
                                        })
                                    }
                                    value={
                                        newExamData.precision_coordinacion_visomotriz
                                    }
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topRight"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - ADECUADO NIVEL
                                                de atención y concentración.
                                                Precisión y rapidez.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Desempeño
                                                fuera de parámetros aceptados,
                                                que indican alteración en la
                                                precisión y rapidez de
                                                movimientos, mostrando una
                                                posible alteración en su nivel
                                                de atención y concentración.
                                            </p>
                                        </div>
                                    }
                                    title="Presición y coordinación visomotriz"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                            <Form.Item
                                label="Prom."
                                style={{ width: '25%', height: '100%' }}
                            >
                                <Input
                                    style={{ width: '100%', height: '100%' }}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            promedio_precision_coordinacion_vis:
                                                parseInt(e.currentTarget.value),
                                        })
                                    }
                                    type="number"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Observaciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    maxLength={45}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            obs_examen_psicotecnico:
                                                e.currentTarget.value,
                                        })
                                    }
                                    value={newExamData.obs_examen_psicotecnico}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }

    const renderSensometrico = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row gutter={8}>
                        <Col span={24}>
                            <Title level={5}>Exámenes sensométricos</Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph>
                                Indican las condiciones sensoriales y
                                perceptuales, en el área visual y auditiva
                                Evaluación sensoperceptiva.
                            </Paragraph>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph style={{ fontWeight: 'bold' }}>
                                Agudeza visual.
                            </Paragraph>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Monocular derecha"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            monocular_derecha: e.toString(),
                                        })
                                    }
                                    value={newExamData.monocular_derecha}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="Aprobado con obs">
                                        Aprobado con obs
                                    </Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - El examinado,
                                                presenta una ADECUADA agudeza
                                                visual para su ojo derecho.
                                            </p>
                                            <p>
                                                <b>Aprobado con observación</b>{' '}
                                                - El examinado, presenta una
                                                LEVE DISMNINUCIÓN de la agudeza
                                                visual para su ojo derecho, no
                                                obstante, se ajusta a los
                                                parámetros de aprobación. Se
                                                sugiere consultar un
                                                especialista oftalmólogo.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- El
                                                examinado, presenta una
                                                SIGNIFICATIVA DISMINUCIÓN de la
                                                agudeza visual para su ojo
                                                derecho, por lo que NO se ajusta
                                                a los parámetros de aprobación.
                                                Debe consultar oftalmólogo.
                                            </p>
                                        </div>
                                    }
                                    title="Monocular derecha"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>

                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Monocular izquierda"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            monocular_izquierda: e.toString(),
                                        })
                                    }
                                    value={newExamData.monocular_izquierda}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="Aprobado con obs">
                                        Aprobado con obs
                                    </Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="top"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - El examinado,
                                                presenta una ADECUADA agudeza
                                                visual para su ojo izquierdo.
                                            </p>
                                            <p>
                                                <b>Aprobado con observación</b>{' '}
                                                - El examinado, presenta una
                                                LEVE DISMNINUCIÓN de la agudeza
                                                visual para su ojo izquierdo, no
                                                obstante, se ajusta a los
                                                parámetros de aprobación. Se
                                                sugiere consultar un
                                                especialista oftalmólogo.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- El
                                                examinado, presenta una
                                                SIGNIFICATIVA DISMINUCIÓN de la
                                                agudeza visual en su ojo
                                                izquierdo, por lo que NO se
                                                ajusta a los parámetros de
                                                aprobación. Debe consultar
                                                oftalmólogo.
                                            </p>
                                        </div>
                                    }
                                    title="Monocular izquierda"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>

                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Vision binocular"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            vision_binocular: e.toString(),
                                        })
                                    }
                                    value={newExamData.vision_binocular}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="Aprobado con obs">
                                        Aprobado con obs
                                    </Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Prom."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topRight"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - El examinado,
                                                presenta una ADECUADA agudeza
                                                visual para ambos ojos.
                                            </p>
                                            <p>
                                                <b>Aprobado con observación</b>{' '}
                                                - El examinado, presenta una
                                                LEVE DISMNINUCIÓN de la agudeza
                                                visual binocular, no obstante,
                                                se ajusta a los parámetros de
                                                aprobación. Se sugiere consultar
                                                un especialista oftalmólogo.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- El
                                                examinado, presenta una
                                                SIGNIFICATIVA DISMINUCIÓN de la
                                                agudeza visual binocular, por lo
                                                que NO se ajusta a los
                                                parámetros de aprobación. Debe
                                                consultar oftalmólogo.
                                            </p>
                                        </div>
                                    }
                                    title="Vision binocular"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Perimetria"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            perimetria: e.toString(),
                                        })
                                    }
                                    value={newExamData.perimetria}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Adecuada
                                                amplitud de campo visual.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Baja
                                                amplitud de campo visual. Se
                                                recomienda consultar
                                                oftalmólogo.
                                            </p>
                                        </div>
                                    }
                                    title="Perimetria"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>

                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Profundidad"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            profundidad: e.toString(),
                                        })
                                    }
                                    value={newExamData.profundidad}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="top"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Adecuada
                                                visión de profundidad y
                                                apreciación de las distancias.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Alteración
                                                en la capacidad de ver en
                                                profunidad y de apreciera
                                                distancias.
                                            </p>
                                        </div>
                                    }
                                    title="Profundidad"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>

                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Discriminación colores"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            discriminacion_colores:
                                                e.toString(),
                                        })
                                    }
                                    value={newExamData.discriminacion_colores}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topRight"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Adecuada
                                                percepción de colores EN VISIÓN
                                                CROMÁTICA.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Alteración
                                                en visión cromática.
                                            </p>
                                        </div>
                                    }
                                    title="Discriminación colores"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Visión nocturna"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            vision_nocturna: e.toString(),
                                        })
                                    }
                                    value={newExamData.vision_nocturna}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Posee una
                                                respuesta normal a la
                                                disminución de los umbrales
                                                luminosos.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Respuesta
                                                alterada frente a la disminución
                                                de umbrales luminosos.
                                            </p>
                                        </div>
                                    }
                                    title="Visión nocturna"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>

                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Phoria vertical"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            phoria_vertical: e.toString(),
                                        })
                                    }
                                    value={newExamData.phoria_vertical}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="top"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Posee normal
                                                respuesta muscular vertical.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Se observan
                                                alteraciones en la respuesta
                                                muscular vertical.
                                            </p>
                                        </div>
                                    }
                                    title="Phoria vertical"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>

                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Phoria horizontal"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            phoria_horizontal: e.toString(),
                                        })
                                    }
                                    value={newExamData.phoria_horizontal}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topRight"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Muestra normal
                                                respuesta muscular horizontal.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Se observa
                                                alteración en la respuesta
                                                muscular horizontal.
                                            </p>
                                        </div>
                                    }
                                    title="Phoria horizontal"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Recuperación encandilamiento"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            recuperacion_encandilamiento:
                                                e.toString(),
                                        })
                                    }
                                    value={
                                        newExamData.recuperacion_encandilamiento
                                    }
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Muestra normal
                                                recuperación al deslumbramiento.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Se observa
                                                alteración en la respuesta al
                                                deslumbramiento.
                                            </p>
                                        </div>
                                    }
                                    title="Recuperación encandilamiento"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Audiometria"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            audiometria: e.toString(),
                                        })
                                    }
                                    value={newExamData.audiometria}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="Aprobado con obs">
                                        Aprobado con obs
                                    </Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="top"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - Pendiente.
                                            </p>
                                            <p>
                                                <b>Aprobado con observación</b>{' '}
                                                - Pendiente.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- Pendiente.
                                            </p>
                                        </div>
                                    }
                                    title="Audiometria"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Observaciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    maxLength={48}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            obs_examen_sensometrico:
                                                e.currentTarget.value,
                                        })
                                    }
                                    value={newExamData.obs_examen_sensometrico}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }

    const renderAnticipationExam = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>
                                Test de velocidad de anticipación
                            </Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph>
                                Esta prueba mide la impulsividad del individuo,
                                la capacidad para estimar la velocidad y
                                movimiento de objetos en el espacio.
                            </Paragraph>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '60%',
                            }}
                        >
                            <Form.Item
                                label="Velocidad anticipación"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            test_velocidad_anticipacion:
                                                e.toString(),
                                        })
                                    }
                                    value={
                                        newExamData.test_velocidad_anticipacion
                                    }
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Observaciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TextArea
                                    rows={2}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            obs_test_velocidad_anticipacion:
                                                e.currentTarget.value,
                                        })
                                    }
                                    value={
                                        newExamData.obs_test_velocidad_anticipacion
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }

    const renderSomnolenceExam = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Examen de somnolencia</Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph>
                                Evalúa la presencia de síntomas de alteraciones
                                del sueño.
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="Probabilidad somnolencia"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            probabilidad_somnolencia:
                                                e.toString(),
                                        })
                                    }
                                    value={newExamData.probabilidad_somnolencia}
                                >
                                    <Option value="Si">Si</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                label="Punto"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            punto: parseInt(
                                                e.currentTarget.value
                                            ),
                                        })
                                    }
                                    type="number"
                                />
                            </Form.Item>
                        </Col>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                                height: '100%',
                            }}
                        >
                            <Form.Item
                                label="Test EPWORTH"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            test_epworth: e.toString(),
                                        })
                                    }
                                    value={newExamData.test_epworth}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - El evaluado
                                                APRUEBA EL TEST DE SOMNOLENCIA,
                                                autoreportando NO presentar
                                                conductas que indiquen fatiga y
                                                somnolencia.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- El evaluado
                                                REPRUEBA EL TEST DE SOMNOLENCIA,
                                                autoreportando presentar
                                                conductas que indican fatiga y
                                                somnolencia.
                                            </p>
                                        </div>
                                    }
                                    title="TieTest EPWORTH"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Observaciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TextArea
                                    rows={2}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            obs_evaluacion_somnolencia:
                                                e.currentTarget.value,
                                        })
                                    }
                                    value={
                                        newExamData.obs_evaluacion_somnolencia
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }

    const renderPsicologyExam = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Test psicológico</Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph>
                                Se evalúa la capacidad que tiene el conductor
                                para responder a un estímulo como resultado del
                                proceso de aprendizaje. Sentido de realidad y
                                orientación tiempo-espacio. Esta evaluación
                                indica la presencia de competencias,
                                características de personalidad y comportamiento
                                necesario para la conducción de vehículos
                                motorizados.
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={10}>
                            <Form.Item
                                label="Observación"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    maxLength={30}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            obs_evaluacion_psicologica:
                                                e.currentTarget.value,
                                        })
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <Form.Item
                                label="Perfil Psicológico"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TextArea
                                    rows={5}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            observacion_psicologica:
                                                e.currentTarget.value,
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

    const renderMonotonyTolerenceExam = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Test tolerancia monotonía</Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph>
                                Prueba que mide la tolerancia frente a tareas
                                monótonas a una velocidad determinada.
                            </Paragraph>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Tolerancia"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            test_tolerancia_monotonia:
                                                e.toString(),
                                        })
                                    }
                                    value={
                                        newExamData.test_tolerancia_monotonia
                                    }
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - El individuo
                                                tolera de manera ADECUADA la
                                                monotonía, sin mostrar conductas
                                                de cansancio y fatiga por
                                                repetición.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- El individuo
                                                presenta baja tolerancia a la
                                                monotonía, mostrando conductas
                                                de cansancio y fatiga por
                                                repetición.
                                            </p>
                                        </div>
                                    }
                                    title="Tolerancia"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                        <Col
                            span={2}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Form.Item
                                label="Aciertos"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            test_aciertos_tolerancia: parseInt(
                                                e.currentTarget.value
                                            ),
                                        })
                                    }
                                    type="number"
                                />
                            </Form.Item>
                        </Col>
                        <Col
                            span={2}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Form.Item
                                label="Errores"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            test_errores_tolerancia: parseInt(
                                                e.currentTarget.value
                                            ),
                                        })
                                    }
                                    type="number"
                                />
                            </Form.Item>
                        </Col>
                        <Col
                            span={4}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Form.Item
                                label="Promedio reaccion"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            promedio_reaccion_monotonia:
                                                parseFloat(
                                                    e.currentTarget.value
                                                ),
                                        })
                                    }
                                    type="decimal"
                                    suffix="Segundos"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Observaciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TextArea
                                    rows={2}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            obs_test_tolerancia_monotonia:
                                                e.currentTarget.value,
                                        })
                                    }
                                    value={
                                        newExamData.obs_test_tolerancia_monotonia
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }

    const renderMultiplyReactions = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Test reacciones multiples</Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph>
                                Evalúa tiempo de reacción del paciente, la
                                discriminación auditiva, reacciones simples,
                                reacciones de elección, etc. Consiste en una
                                serie de situaciones estimulares que a la vez,
                                requieren respuesta múltiple por parte del
                                evaluado.
                            </Paragraph>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Reacciones multiples"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            test_reacciones_multiples:
                                                e.toString(),
                                        })
                                    }
                                    value={
                                        newExamData.test_reacciones_multiples
                                    }
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - El evaluado
                                                presenta una ADECUADA capacidad
                                                para responder a múltiples
                                                exigencias de manera simultánea
                                                y en un tiempo definido.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- El evaluado
                                                presenta dificultas en la
                                                capacidad para responder a
                                                múltiples exigencias de manera
                                                simultánea y en un tiempo
                                                definido.
                                            </p>
                                        </div>
                                    }
                                    title="Reacciones multiples"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Observaciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TextArea
                                    rows={2}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            obs_test_reacciones_multiples:
                                                e.currentTarget.value,
                                        })
                                    }
                                    value={
                                        newExamData.obs_test_reacciones_multiples
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }

    const renderTrafficLawKnowledge = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>
                                Test Conocimiento Ley Tránsito Nacional
                            </Title>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Paragraph>
                                Evalúa las competencias y conocimientos legales,
                                reclamentarios, señalética vial, mecánica básica
                                y conducta vial, del evaluado.
                            </Paragraph>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col
                            span={8}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                            }}
                        >
                            <Form.Item
                                label="Exámenes teóricos tránsito"
                                style={{ width: '85%', height: '100%' }}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            test_estado_ley_transito:
                                                e.toString(),
                                        })
                                    }
                                    value={newExamData.test_estado_ley_transito}
                                >
                                    <Option value="Aprobado">Aprobado</Option>
                                    <Option value="No Aprobado">
                                        No Aprobado
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Prom."
                                style={{ width: '15%', height: '100%' }}
                            >
                                <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <p>
                                                <b>Aprobado</b> - El evaluado
                                                presenta una ADECUADA capacidad
                                                para responder a múltiples
                                                exigencias de manera simultánea
                                                y en un tiempo definido.
                                            </p>
                                            <p>
                                                <b>No Aprobado</b>- El evaluado
                                                presenta dificultas en la
                                                capacidad para responder a
                                                múltiples exigencias de manera
                                                simultánea y en un tiempo
                                                definido.
                                            </p>
                                        </div>
                                    }
                                    title="Exámenes teóricos tránsito"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            color: '#1073B5',
                                        }}
                                        icon={
                                            <QuestionCircleOutlined color="#1073B5" />
                                        }
                                    />
                                </Popover>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={4}>
                            <Form.Item
                                label="Conocimientos legales"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    min={0}
                                    max={100}
                                    type="number"
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            porcentaje_legales: parseFloat(
                                                e.currentTarget.value
                                            ),
                                        })
                                    }
                                    suffix={<PercentageOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Conocimientos reglamentarios"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    min={0}
                                    max={100}
                                    type="number"
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            porcentaje_reglamentarios:
                                                parseFloat(
                                                    e.currentTarget.value
                                                ),
                                        })
                                    }
                                    suffix={<PercentageOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Conocimientos de mecánica"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    min={0}
                                    max={100}
                                    type="number"
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            porcentaje_mecanica: parseFloat(
                                                e.currentTarget.value
                                            ),
                                        })
                                    }
                                    suffix={<PercentageOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Conocimientos señales viales"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    min={0}
                                    max={100}
                                    type="number"
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            porcentaje_señales_viales:
                                                parseFloat(
                                                    e.currentTarget.value
                                                ),
                                        })
                                    }
                                    suffix={<PercentageOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Conducta vial"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Input
                                    min={0}
                                    max={100}
                                    type="number"
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            porcentaje_conducta_vial:
                                                parseFloat(
                                                    e.currentTarget.value
                                                ),
                                        })
                                    }
                                    suffix={<PercentageOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Observaciones"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TextArea
                                    rows={2}
                                    onChange={e =>
                                        setNewExamData({
                                            ...newExamData,
                                            obs_evaluacion_transito_nacional:
                                                e.currentTarget.value,
                                        })
                                    }
                                    value={
                                        newExamData.obs_evaluacion_transito_nacional
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        )
    }
    //---------

    const handleShowExtraExam = (value: string) => {
        switch (value) {
            case 'anticipacion':
                return renderAnticipationExam()
            case 'somnolencia':
                return renderSomnolenceExam()
            case 'psicologico':
                return renderPsicologyExam()
            case 'Monotonia':
                return renderMonotonyTolerenceExam()
            case 'reactiones-multiple':
                return renderMultiplyReactions()
            case 'ley-transito':
                return renderTrafficLawKnowledge()
            default:
                return null
        }
    }

    const handleChangeExamExtra = (checkedExam: CheckboxValueType[] = []) => {
        const exams = options.reduce(
            (acc: IExamPsicoExtras[], current: IExamPsicoExtras) => {
                const aux = checkedExam.includes(current.value)
                if (aux) {
                    acc.push({
                        ...current,
                    })
                }
                return acc
            },
            []
        )

        setExamExtra(exams)
    }

    const handleGenerateExam = async () => {
        const examToInsert = MapPsicoToCreateExam(
            evaluationSelected,
            newExamData,
            ExamExtra
        )
        setLoading(true)
        const aux: IResponseEvaluation = await createExamPsicoService(
            examToInsert
        )
        if (aux.err === null) {
            return onCloseModal('reload', aux.msg)
        }
        setMessageAlert({ message: aux.msg, type: 'error', show: true })
        return setLoading(false)
    }

    //---------------------------------------USEEFECT
    useEffect(() => {
        if (
            newExamData.licencia_a_acreditar.length > 0 &&
            newExamData.resultado !== '' &&
            newExamData.examen_psicotecnico !== '' &&
            newExamData.examen_sensometrico !== '' &&
            newExamData.conclusion_recomendacion !== '' &&
            newExamData.meses_vigencia !== 0
        ) {
            setDisabledConfirm(false)
        }
    }, [newExamData])

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
            <br />
            <Checkbox.Group
                style={{ paddingBottom: '1rem' }}
                options={options}
                onChange={handleChangeExamExtra}
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
                {ExamExtra.length > 0 &&
                    ExamExtra.map((exam: IExamPsicoExtras) => {
                        return (
                            <Panel header={exam.label} key={exam.key}>
                                {handleShowExtraExam(exam.value)}
                            </Panel>
                        )
                    })}
            </Collapse>
            <br />
            <>
                <Title level={5}>Evaluación y conclusiones</Title>
                <br />
                <Form layout="vertical">
                    <Input.Group>
                        <Row gutter={8}>
                            <Col span={4}>
                                <Form.Item
                                    label="Examenes psicotécnicos"
                                    validateStatus={
                                        newExamData.examen_psicotecnico !== ''
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        newExamData.examen_psicotecnico !== ''
                                            ? ''
                                            : 'seleccionar'
                                    }
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        onSelect={e =>
                                            setNewExamData({
                                                ...newExamData,
                                                examen_psicotecnico:
                                                    e.toString(),
                                            })
                                        }
                                        value={newExamData.examen_psicotecnico}
                                        id="error_3"
                                    >
                                        <Option value="Aprobado">
                                            Aprobado
                                        </Option>
                                        <Option value="Aprobado con obs">
                                            Aprobado con obs
                                        </Option>
                                        <Option value="No Aprobado">
                                            No Aprobado
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    label="Examenes sensométricos"
                                    validateStatus={
                                        newExamData.examen_sensometrico !== ''
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        newExamData.examen_sensometrico !== ''
                                            ? ''
                                            : 'seleccionar'
                                    }
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        onSelect={e =>
                                            setNewExamData({
                                                ...newExamData,
                                                examen_sensometrico:
                                                    e.toString(),
                                            })
                                        }
                                        value={newExamData.examen_sensometrico}
                                        id="error_4"
                                    >
                                        <Option value="Aprobado">
                                            Aprobado
                                        </Option>
                                        <Option value="Aprobado con obs">
                                            Aprobado con obs
                                        </Option>
                                        <Option value="No Aprobado">
                                            No Aprobado
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            {ExamExtra.some(exam => exam.key === '4') && (
                                <Col span={4}>
                                    <Form.Item
                                        label="Anticipación"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <Select
                                            style={{ width: '100%' }}
                                            onSelect={e =>
                                                setNewExamData({
                                                    ...newExamData,
                                                    test_velocidad_anticipacion:
                                                        e.toString(),
                                                })
                                            }
                                            value={
                                                newExamData.test_velocidad_anticipacion
                                            }
                                        >
                                            <Option value="Aprobado">
                                                Aprobado
                                            </Option>
                                            <Option value="Aprobado con obs">
                                                Aprobado con obs
                                            </Option>
                                            <Option value="No Aprobado">
                                                No Aprobado
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}
                            {ExamExtra.some(exam => exam.key === '5') && (
                                <Col span={4}>
                                    <Form.Item
                                        label="Somnolencia"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <Select
                                            style={{ width: '100%' }}
                                            onSelect={e =>
                                                setNewExamData({
                                                    ...newExamData,
                                                    evaluacion_somnolencia:
                                                        e.toString(),
                                                })
                                            }
                                            value={
                                                newExamData.evaluacion_somnolencia
                                            }
                                        >
                                            <Option value="Aprobado">
                                                Aprobado
                                            </Option>
                                            <Option value="Aprobado con obs">
                                                Aprobado con obs
                                            </Option>
                                            <Option value="No Aprobado">
                                                No Aprobado
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}
                            {ExamExtra.some(exam => exam.key === '6') && (
                                <Col span={4}>
                                    <Form.Item
                                        label="Psicológico"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <Select
                                            style={{ width: '100%' }}
                                            onSelect={e =>
                                                setNewExamData({
                                                    ...newExamData,
                                                    evaluacion_psicologica:
                                                        e.toString(),
                                                })
                                            }
                                            value={
                                                newExamData.evaluacion_psicologica
                                            }
                                        >
                                            <Option value="Aprobado">
                                                Aprobado
                                            </Option>
                                            <Option value="Aprobado con obs">
                                                Aprobado con obs
                                            </Option>
                                            <Option value="No Aprobado">
                                                No Aprobado
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}
                            {ExamExtra.some(exam => exam.key === '7') && (
                                <Col span={4}>
                                    <Form.Item
                                        label="Monotonia"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <Select
                                            style={{ width: '100%' }}
                                            onSelect={e =>
                                                setNewExamData({
                                                    ...newExamData,
                                                    test_tolerancia_monotonia:
                                                        e.toString(),
                                                })
                                            }
                                            value={
                                                newExamData.test_tolerancia_monotonia
                                            }
                                        >
                                            <Option value="Aprobado">
                                                Aprobado
                                            </Option>
                                            <Option value="Aprobado con obs">
                                                Aprobado con obs
                                            </Option>
                                            <Option value="No Aprobado">
                                                No Aprobado
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                        {ExamExtra.some(
                            exam => exam.key === '8' || exam.key === '9'
                        ) && (
                            <Row gutter={8}>
                                {ExamExtra.some(exam => exam.key === '8') && (
                                    <Col span={4}>
                                        <Form.Item
                                            label="Reacciones multiples"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                onSelect={e =>
                                                    setNewExamData({
                                                        ...newExamData,
                                                        test_reacciones_multiples:
                                                            e.toString(),
                                                    })
                                                }
                                                value={
                                                    newExamData.test_reacciones_multiples
                                                }
                                            >
                                                <Option value="Aprobado">
                                                    Aprobado
                                                </Option>
                                                <Option value="Aprobado con obs">
                                                    Aprobado con obs
                                                </Option>
                                                <Option value="No Aprobado">
                                                    No Aprobado
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                )}
                                {ExamExtra.some(exam => exam.key === '9') && (
                                    <Col span={4}>
                                        <Form.Item
                                            label="Ley de tránsito"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                onSelect={e =>
                                                    setNewExamData({
                                                        ...newExamData,
                                                        evaluacion_transito_nacional:
                                                            e.toString(),
                                                    })
                                                }
                                                value={
                                                    newExamData.evaluacion_transito_nacional
                                                }
                                            >
                                                <Option value="Aprobado">
                                                    Aprobado
                                                </Option>
                                                <Option value="Aprobado con obs">
                                                    Aprobado con obs
                                                </Option>
                                                <Option value="No Aprobado">
                                                    No Aprobado
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                )}
                            </Row>
                        )}
                        <Row gutter={8}>
                            <Col span={24}>
                                <Form.Item
                                    label="Conclusion y recomendaciones"
                                    validateStatus={
                                        newExamData.conclusion_recomendacion !==
                                        ''
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        newExamData.conclusion_recomendacion !==
                                        ''
                                            ? ''
                                            : 'escribir conclusión'
                                    }
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <TextArea
                                        rows={3}
                                        maxLength={300}
                                        onChange={e =>
                                            setNewExamData({
                                                ...newExamData,
                                                conclusion_recomendacion:
                                                    e.currentTarget.value,
                                            })
                                        }
                                        id="error_5"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Item
                                    label="Meses vigencia"
                                    validateStatus={
                                        newExamData.meses_vigencia !== 0
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        newExamData.meses_vigencia !== 0
                                            ? ''
                                            : 'seleccionar'
                                    }
                                    style={{ width: '60%', height: '100%' }}
                                >
                                    <Input
                                        onChange={e =>
                                            setNewExamData({
                                                ...newExamData,
                                                meses_vigencia: parseInt(
                                                    e.currentTarget.value
                                                ),
                                            })
                                        }
                                        type="number"
                                        id="error_6"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Input.Group>
                </Form>
            </>
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

export default PsicosensotecnicoExamView
