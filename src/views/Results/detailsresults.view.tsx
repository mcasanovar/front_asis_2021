import React, { useState, useEffect } from 'react'
import {
    Input,
    Row,
    Col,
    Tag,
    Typography,
    Table,
    Form,
    Spin,
    Button,
} from 'antd'

import {
    IResponseResults,
    IResultObservations,
    ResultModel,
} from '../../models/results.model'
import { ResultsInitalization } from '../../initializations/results.initialization'
import { IAlertMessageContent } from '../../models/index.models'
import { getOneResultService } from '../../services'

import AlertComponent from '../../component/Alert/Alert'

interface IDetailsResultViewProps {
    onCloseModal: (value: string, message: string) => string | void
    _id?: string
}

const DetailsResultView: React.FunctionComponent<IDetailsResultViewProps> = ({
    onCloseModal,
    _id = '',
}) => {
    const { Paragraph } = Typography
    const { Title } = Typography
    const { Column } = Table

    const [loading, setLoading] = useState<boolean>(true)
    const [newDataResult, setNewDataResult] =
        useState<ResultModel>(ResultsInitalization)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [observations, setobservations] = useState<IResultObservations[]>()

    useEffect(() => {
        async function getOneResult() {
            const aux: IResponseResults = await getOneResultService(_id)
            console.log('result', aux)
            if (aux.err !== null) {
                setMessageAlert({ message: aux.err, type: 'error', show: true })
                return
            }

            if (aux.err === 98) {
                setMessageAlert({ message: aux.msg, type: 'error', show: true })
                return
            }

            const result: ResultModel = aux.res
            const auxObservations = result.observaciones
            setobservations(auxObservations)
            setNewDataResult({
                ...result,
                observaciones: [],
            })
        }

        getOneResult()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (newDataResult._id !== '') return setLoading(false)
    }, [newDataResult._id])

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            {<Title level={4}>{`Resultado ${newDataResult.codigo}`}</Title>}
            <Input.Group>
                <Form layout="vertical">
                    <Row>
                        <Col span={12}>
                            <Input.Group>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Form.Item label="Estado archivo">
                                            <Input
                                                readOnly
                                                value={
                                                    newDataResult.estado_archivo
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Estado resultado">
                                            <Input
                                                readOnly
                                                value={newDataResult.estado}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={8}>
                                        <Form.Item label="Vigencia examen">
                                            <Input
                                                readOnly
                                                value={
                                                    newDataResult.vigencia_examen
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Fecha resultado">
                                            <Input
                                                readOnly
                                                value={
                                                    newDataResult.fecha_resultado
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Hora resultado">
                                            <Input
                                                readOnly
                                                value={
                                                    newDataResult.hora_resultado
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Paragraph>Condicionantes</Paragraph>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        {newDataResult.observaciones.length >
                                            0 &&
                                            newDataResult.observaciones.map(
                                                (obs, index) => (
                                                    <Tag key={index}>{obs}</Tag>
                                                )
                                            )}
                                    </Col>
                                </Row>
                            </Input.Group>
                        </Col>
                    </Row>
                    {!!observations && (
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
                                    dataSource={observations}
                                    pagination={false}
                                >
                                    <Column
                                        width="20%"
                                        className="column-money"
                                        title="Fecha"
                                        dataIndex="fecha"
                                        key="key"
                                    />
                                    <Column
                                        width="60%"
                                        className="column-money"
                                        title="Observación"
                                        dataIndex="obs"
                                        key="key"
                                    />
                                    <Column
                                        width="20%"
                                        title="Estado archivo"
                                        dataIndex="estado"
                                        key="key"
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
                    )}
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

export default DetailsResultView
