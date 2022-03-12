import React, { useState, useEffect } from 'react'
import {
    Input,
    Row,
    Col,
    Spin,
    Typography,
    Form,
    Button,
    Table,
    Tag,
} from 'antd'
import { IAlertMessageContent } from '../../models/index.models'
import { getOneEvaluationService } from '../../services'

import AlertComponent from '../../component/Alert/Alert'
import {
    EvaluationModel,
    IResponseEvaluation,
} from '../../models/evaluations.models'
import { EvaluationInitialization } from '../../initializations/evaluation.initialization'

interface IDetailsEvaluationViewProps {
    onCloseModal: (value: string, message: string) => string | void
    _id?: string
}

const DetailsEvaluationView: React.FunctionComponent<
    IDetailsEvaluationViewProps
> = ({ onCloseModal, _id = '' }) => {
    const { Title } = Typography
    const { Column } = Table

    const [loading, setLoading] = useState<boolean>(true)
    const [newEvaluationData, setNewEvaluationData] = useState<EvaluationModel>(
        EvaluationInitialization
    )
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })

    useEffect(() => {
        async function getOneEvaluation() {
            const aux: IResponseEvaluation = await getOneEvaluationService(_id)
            if (aux.err !== null) {
                setMessageAlert({ message: aux.err, type: 'error', show: true })
                return
            }

            if (aux.err === 98) {
                setMessageAlert({ message: aux.msg, type: 'error', show: true })
                return
            }

            const evaluation: EvaluationModel = aux.res
            setNewEvaluationData(evaluation)
        }

        getOneEvaluation()
    }, [])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 3000)
        }
    }, [messageAlert])

    useEffect(() => {
        if (newEvaluationData._id !== '') return setLoading(false)
    }, [newEvaluationData._id])

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
                >{`Evaluación ${newEvaluationData.codigo}`}</Title>
            }
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Código evaluación">
                                <Input
                                    readOnly
                                    value={newEvaluationData.codigo}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Estado proceso">
                                <Input
                                    readOnly
                                    value={newEvaluationData.estado}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Estado archivo">
                                <Input
                                    readOnly
                                    value={newEvaluationData.estado_archivo}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Fecha inicio evaluación">
                                <Input
                                    readOnly
                                    value={`${newEvaluationData.fecha_evaluacion} ${newEvaluationData.hora_inicio_evaluacion}`}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Fecha término evaluación">
                                <Input
                                    readOnly
                                    value={`${newEvaluationData.fecha_evaluacion_fin} ${newEvaluationData.hora_termino_evaluacion}`}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Rut CP">
                                <Input
                                    readOnly
                                    value={newEvaluationData.rut_cp}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="Razon social CP">
                                <Input
                                    readOnly
                                    value={newEvaluationData.razon_social_cp}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Rut CS">
                                <Input
                                    readOnly
                                    value={newEvaluationData.rut_cs}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="Razon social CS">
                                <Input
                                    readOnly
                                    value={newEvaluationData.razon_social_cs}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Form.Item label="Nombre servicio">
                                <Input
                                    readOnly
                                    value={newEvaluationData.nombre_servicio}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={24}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                width: '100%',
                            }}
                        >
                            <Table
                                style={{ width: '100%' }}
                                showHeader={true}
                                dataSource={newEvaluationData.observaciones}
                                pagination={false}
                            >
                                <Column
                                    width="20%"
                                    className="column-money"
                                    title="Fecha"
                                    dataIndex="fecha"
                                    key="fecha"
                                />
                                <Column
                                    width="60%"
                                    className="column-money"
                                    title="Observación"
                                    dataIndex="obs"
                                    key="obs"
                                />
                                <Column
                                    width="20%"
                                    title="Estado archivo"
                                    dataIndex="estado_archivo"
                                    key="estado_archivo"
                                    className="column-money"
                                    render={(_, record: any) => {
                                        let color = 'grey'
                                        if (record.estado === 'Cargado') {
                                            color = '#2db7f5'
                                        }
                                        if (record.estado === 'Aprobado') {
                                            color = '#4CAF50'
                                        }
                                        if (record.estado === 'Rechazado') {
                                            color = '#E41B0E'
                                        }
                                        return (
                                            <>
                                                <Tag color={color}>
                                                    {record.estado}
                                                </Tag>
                                            </>
                                        )
                                    }}
                                />
                            </Table>
                        </Col>
                    </Row>
                    <br />
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
                            span={2}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                onClick={() => onCloseModal('', '')}
                                style={{
                                    backgroundColor: '#1073B5',
                                    color: 'white',
                                    width: '100%',
                                }}
                            >
                                OK
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        </Spin>
    )
}

export default DetailsEvaluationView
