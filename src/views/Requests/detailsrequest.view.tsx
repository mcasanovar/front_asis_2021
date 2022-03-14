import React, { useState, useEffect } from 'react'
import {
    Collapse,
    Input,
    Row,
    Col,
    Select,
    Spin,
    Typography,
    Form,
    Button,
} from 'antd'
import { IAlertMessageContent } from '../../models/index.models'

import {
    getGIByRutService,
    getOneRequestService,
    getWorkersGIService,
} from '../../services/index'

import AlertComponent from '../../component/Alert/Alert'

import { RequestModel } from '../../models/request.models'
import { RequestInitialization } from '../../initializations/request.initialization'
import { MilesFormat } from '../../libs/formattedPesos'
import { CalculateIVA } from '../../libs/calculateIVA'

import { GiModel, IResponseGI } from '../../models/gi.models'

type ICreateRequestViewProps = {
    onCloseModal: (value: string, message: string) => string | void
    _id?: string
}

const CreateRequestView: React.FunctionComponent<ICreateRequestViewProps> = ({
    onCloseModal,
    _id = '',
}) => {
    const { Panel } = Collapse
    const { TextArea } = Input
    const { Title } = Typography

    const [loading, setLoading] = useState<boolean>(false)
    const [newRequestData, setNewRequestData] = useState<RequestModel>(
        RequestInitialization
    )
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [workers, setWorkers] = useState<GiModel[]>([])
    const [primaryClient, setPrimaryClient] = useState<GiModel>()
    const [secondaryClient, setSecondaryClient] = useState<GiModel>()
    const [workerSelected, setWorkerSelected] = useState<GiModel>()
    const [loadingWorkers, setloadingWorkers] = useState<boolean>(true)

    async function getGIByRut(rut: string, typeRequest: number) {
        setLoading(true)
        const aux: IResponseGI = await getGIByRutService(rut, typeRequest)
        if (aux.err !== null) {
            setMessageAlert({
                message: 'No se ha encontrado ningun GI con el rut ingresado',
                type: 'error',
                show: true,
            })
            setLoading(false)
            return
        }
        if (!aux.res) {
            setMessageAlert({
                message: 'Formato de rut no válido (Ej: 9876543-2)',
                type: 'error',
                show: true,
            })
            setLoading(false)
            return
        }

        typeRequest === 1 && setPrimaryClient(aux.res)
        typeRequest === 2 && setSecondaryClient(aux.res)

        setLoading(false)
    }

    async function getWorkers() {
        const aux: IResponseGI = await getWorkersGIService()
        aux.err === null && setWorkers(aux.res || [])
    }

    async function getOneRequest() {
        const aux: IResponseGI = await getOneRequestService(_id)
        if (aux.err !== null) {
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            return
        }
        const request: RequestModel = aux.res
        setNewRequestData(request)
    }

    //----------------------------------------USEEFECT
    useEffect(() => {
        setLoading(true)
        getWorkers()
        getOneRequest()
    }, [])

    useEffect(() => {
        if (!!workers && !!workers.length && !!newRequestData._id) {
            const auxWorker = workers.find(
                element => element._id === newRequestData.id_GI_PersonalAsignado
            )
            setWorkerSelected(auxWorker)
            setloadingWorkers(false)
            setLoading(false)
        }
    }, [workers, newRequestData._id])

    useEffect(() => {
        if (newRequestData._id !== '') {
            getGIByRut(newRequestData.rut_CP, 1)
            getGIByRut(newRequestData.rut_cs, 2)
        }
    }, [newRequestData._id])

    useEffect(() => {
        const aux = CalculateIVA(
            newRequestData.monto_neto,
            newRequestData.porcentaje_impuesto
        )
        const total = newRequestData.monto_neto + aux + newRequestData.exento
        setNewRequestData({
            ...newRequestData,
            valor_impuesto: aux,
            monto_total: total,
        })
        // eslint-disable-next-line
    }, [
        newRequestData.monto_neto,
        newRequestData.porcentaje_impuesto,
        newRequestData.exento,
    ])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 3000)
        }
    }, [messageAlert])

    console.log(newRequestData)

    //---RENDERS
    const renderServiceInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Fecha solicitud">
                                <Input
                                    readOnly
                                    value={newRequestData.fecha_solicitud}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="Mes solicitud">
                                <Input
                                    readOnly
                                    value={newRequestData.mes_solicitud}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="Año solicitud">
                                <Input
                                    readOnly
                                    value={newRequestData.anio_solicitud}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Categoria 1">
                                <Input
                                    readOnly
                                    value={newRequestData.categoria1}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Categoria 2">
                                <Input
                                    readOnly
                                    value={newRequestData.categoria2}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Categoria 3">
                                <Input
                                    readOnly
                                    value={newRequestData.categoria3}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={9}>
                            <Form.Item label="Nombre servicio">
                                <Input
                                    readOnly
                                    value={newRequestData.nombre_servicio}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Tipo servicio">
                                <Input
                                    readOnly
                                    value={newRequestData.tipo_servicio}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Lugar servicio">
                                <Input
                                    readOnly
                                    value={newRequestData.lugar_servicio}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Sucursal">
                                <Input
                                    readOnly
                                    value={newRequestData.sucursal}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={5}>
                            <Form.Item label="Monto neto">
                                <Input
                                    readOnly
                                    value={`$${MilesFormat(
                                        newRequestData.monto_neto
                                    )}.-`}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Porcentaje impuesto">
                                <Input
                                    readOnly
                                    value={`${MilesFormat(
                                        newRequestData.porcentaje_impuesto
                                    )}%`}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Valor mpuesto">
                                <Input
                                    readOnly
                                    value={`$${MilesFormat(
                                        newRequestData.valor_impuesto
                                    )}.-`}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Exento">
                                <Input
                                    readOnly
                                    value={`$${MilesFormat(
                                        newRequestData.exento
                                    )}.-`}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Monto total">
                                <Input
                                    readOnly
                                    value={`$${MilesFormat(
                                        newRequestData.monto_total
                                    )}.-`}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Descripción del servicio">
                                <TextArea
                                    rows={2}
                                    readOnly
                                    value={newRequestData.descripcion_servicio}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    const renderClientInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item label="Nombre receptor">
                                <Input
                                    readOnly
                                    value={newRequestData.nombre_receptor}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Spin spinning={loadingWorkers}>
                                <Form.Item label="Profesional asignado">
                                    <Input
                                        readOnly
                                        value={workerSelected?.razon_social}
                                    />
                                </Form.Item>
                            </Spin>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <h2>Cliente principal</h2>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col span={4}>
                            <Form.Item label="Rut">
                                <Input readOnly value={newRequestData.rut_CP} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Razon social">
                                <Input
                                    readOnly
                                    value={newRequestData.razon_social_CP}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Nombre fantasia / Pseudónimo">
                                <Input
                                    readOnly
                                    value={primaryClient?.nombre_fantasia}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Contrato">
                                <Input
                                    readOnly
                                    value={
                                        newRequestData.nro_contrato_seleccionado_cp
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Seleccione faena">
                                <Input
                                    readOnly
                                    value={newRequestData.faena_seleccionada_cp}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <h2>Cliente Secundario</h2>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col span={4}>
                            <Form.Item label="Rut">
                                <Input readOnly value={newRequestData.rut_cs} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Razon social">
                                <Input
                                    readOnly
                                    value={newRequestData.razon_social_cs}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Nombre fantasia / Pseudónimo">
                                <Input
                                    readOnly
                                    value={secondaryClient?.nombre_fantasia}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Licencia de conducir">
                                <Input
                                    readOnly
                                    value={secondaryClient?.licencia_conduccion}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Clase licencia conducir">
                                <Select
                                    mode="multiple"
                                    disabled
                                    value={secondaryClient?.clase_licencia}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ley aplicable">
                                <Input
                                    readOnly
                                    value={secondaryClient?.ley_aplicable}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    const renderPreliminaryInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Fecha inicio reserva preliminar">
                                <Input
                                    readOnly
                                    value={
                                        newRequestData.fecha_servicio_solicitado
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Hora inicio reserva preliminar">
                                <Input
                                    readOnly
                                    value={
                                        newRequestData.hora_servicio_solicitado
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Fecha término reserva preliminar">
                                <Input
                                    readOnly
                                    value={
                                        newRequestData.fecha_servicio_solicitado_termino
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Hora término reserva preliminar">
                                <Input
                                    readOnly
                                    value={
                                        newRequestData.hora_servicio_solicitado_termino
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item label="Jornada">
                                <Input
                                    readOnly
                                    value={newRequestData.jornada}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Observacion solicitud">
                                <TextArea
                                    rows={3}
                                    value={
                                        newRequestData.observacion_solicitud ||
                                        ''
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            {<Title level={4}>{`Solicitud ${newRequestData.codigo}`}</Title>}
            <Collapse accordion defaultActiveKey={['1']}>
                <Panel header="Datos del servicio" key="1">
                    {renderServiceInformation()}
                </Panel>
                <Panel header="Datos del cliente" key="2">
                    {renderClientInformation()}
                </Panel>
                <Panel header="Datos Preliminares" key="3">
                    {renderPreliminaryInformation()}
                </Panel>
            </Collapse>
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
                    style={{ display: 'flex', justifyContent: 'space-between' }}
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
        </Spin>
    )
}

export default CreateRequestView
