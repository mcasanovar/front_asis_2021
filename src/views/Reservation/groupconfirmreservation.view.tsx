import React, { useState, useEffect } from 'react'
import {
    Input,
    Row,
    Col,
    Select,
    DatePicker,
    Table,
    TimePicker,
    Form,
    Spin,
    Button,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import AlertComponent from '../../component/Alert/Alert'

import {
    IDataReservationConfirmation,
    IResponseReservation,
    ReservationModel,
} from '../../models/reservation.models'
import { IDataReservationInitialization } from '../../initializations/reservation.initialization'
import { IAlertMessageContent } from '../../models/index.models'
import {
    confirmGroupReservationsService,
    getGroupReservationsService,
} from '../../services/reservation.services'
import moment from 'moment'
import { FORMAT_DATE, SUCURSAL } from '../../constants/var'
import { GiModel, IResponseGI } from '../../models/gi.models'
import { getWorkersGIService } from '../../services'
import { SelectValue } from 'antd/lib/select'
import { MapGroupReservationsToConfirm } from '../../functions/mappers'

interface IGroupConfirmReservationViewProps {
    onCloseModal: (value: string, message: string) => string | void
}

const GroupConfirmReservationView: React.FunctionComponent<
    IGroupConfirmReservationViewProps
> = ({ onCloseModal }) => {
    const { Option } = Select
    const { TextArea, Search } = Input
    const { Column } = Table

    const [dataConfirmation, setDataConfirmation] =
        useState<IDataReservationConfirmation>(IDataReservationInitialization)
    const [selectedReservation, setSelectedReservation] = useState<React.Key[]>(
        []
    )
    const [reservations, setReservations] = useState<ReservationModel[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [workers, setWorkers] = useState<GiModel[]>([])
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedReservation(selectedRowKeys)
        },
    }

    const handleGroupConfirmReservations = async () => {
        setLoading(true)
        let formData = new FormData()
        const dataMapped = MapGroupReservationsToConfirm(
            dataConfirmation,
            selectedReservation
        )
        formData.append('data', JSON.stringify(dataMapped))
        const aux: IResponseReservation = await confirmGroupReservationsService(
            formData
        )
        if (!aux.err) {
            return onCloseModal('reload', aux.msg)
        }
        setMessageAlert({ message: aux.msg, type: 'error', show: true })
        console.log(aux.err)
        setLoading(false)
    }

    async function getReservationsToConfirm() {
        const aux: IResponseReservation = await getGroupReservationsService()
        if (aux.err === null) {
            setReservations(aux.res)
            return
        }
        setMessageAlert({ message: aux.err, type: 'error', show: true })
        console.log(aux.err)
    }

    async function getWorkers() {
        const aux: IResponseGI = await getWorkersGIService()
        if (!aux.err) {
            console.log(aux)
            setWorkers(aux.res)
            return
        }
        setWorkers([])
    }

    console.log(dataConfirmation)

    //---------------------------------------------------------RENDERS
    const renderInformation = () => {
        return (
            <Form layout="vertical">
                <Input.Group>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item
                                label="Fecha inicio reserva"
                                validateStatus={
                                    dataConfirmation.fecha_reserva !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    dataConfirmation.fecha_reserva !== ''
                                        ? ''
                                        : 'Seleccione fecha'
                                }
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format={FORMAT_DATE}
                                    onChange={e =>
                                        setDataConfirmation({
                                            ...dataConfirmation,
                                            fecha_reserva:
                                                e?.format(FORMAT_DATE) || '',
                                        })
                                    }
                                    value={
                                        !!dataConfirmation.fecha_reserva
                                            ? moment(
                                                  dataConfirmation.fecha_reserva,
                                                  FORMAT_DATE
                                              )
                                            : undefined
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Hora inicio reserva"
                                validateStatus={
                                    dataConfirmation.hora_reserva !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    dataConfirmation.hora_reserva !== ''
                                        ? ''
                                        : 'Seleccione hora'
                                }
                            >
                                <TimePicker
                                    style={{ width: '100%' }}
                                    format="HH:mm"
                                    onChange={e =>
                                        setDataConfirmation({
                                            ...dataConfirmation,
                                            hora_reserva:
                                                e?.format('HH:mm') || '',
                                        })
                                    }
                                    defaultValue={moment(new Date(), 'HH:mm')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Fecha fin reserva"
                                validateStatus={
                                    dataConfirmation.fecha_reserva_fin !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    dataConfirmation.fecha_reserva_fin !== ''
                                        ? ''
                                        : 'Seleccione fecha'
                                }
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format={FORMAT_DATE}
                                    onChange={e =>
                                        setDataConfirmation({
                                            ...dataConfirmation,
                                            fecha_reserva_fin:
                                                e?.format(FORMAT_DATE) || '',
                                        })
                                    }
                                    value={
                                        !!dataConfirmation.fecha_reserva_fin
                                            ? moment(
                                                  dataConfirmation.fecha_reserva_fin,
                                                  FORMAT_DATE
                                              )
                                            : undefined
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Hora fin reserva"
                                validateStatus={
                                    dataConfirmation.hora_reserva_fin !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    dataConfirmation.hora_reserva_fin !== ''
                                        ? ''
                                        : 'Seleccione hora'
                                }
                            >
                                <TimePicker
                                    style={{ width: '100%' }}
                                    format="HH:mm"
                                    onChange={e =>
                                        setDataConfirmation({
                                            ...dataConfirmation,
                                            hora_reserva_fin:
                                                e?.format('HH:mm') || '',
                                        })
                                    }
                                    defaultValue={moment(new Date(), 'HH:mm')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                validateStatus={
                                    dataConfirmation.id_GI_personalAsignado !==
                                    ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    dataConfirmation.id_GI_personalAsignado !==
                                    ''
                                        ? ''
                                        : 'Debe seleccionar un profesional asignado'
                                }
                                label="Profesional asignado"
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setDataConfirmation({
                                            ...dataConfirmation,
                                            id_GI_personalAsignado:
                                                e.toString(),
                                        })
                                    }
                                    id="error"
                                    value={
                                        dataConfirmation.id_GI_personalAsignado
                                    }
                                >
                                    {workers.length &&
                                        workers.map((worker, index) => (
                                            <Option
                                                key={index}
                                                value={worker._id}
                                            >
                                                {worker.razon_social}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Sucursal"
                                validateStatus={
                                    dataConfirmation.sucursal !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    dataConfirmation.sucursal !== ''
                                        ? ''
                                        : 'Seleccione hora'
                                }
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setDataConfirmation({
                                            ...dataConfirmation,
                                            sucursal: e.toString(),
                                        })
                                    }
                                    value={dataConfirmation.sucursal}
                                >
                                    {SUCURSAL.map((sucursal, index) => (
                                        <Option key={index} value={sucursal}>
                                            {sucursal}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="¿Requiere evaluación?"
                                validateStatus={
                                    dataConfirmation.reqEvaluacion !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    dataConfirmation.reqEvaluacion !== ''
                                        ? ''
                                        : 'Seleccione hora'
                                }
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setDataConfirmation({
                                            ...dataConfirmation,
                                            reqEvaluacion: e.toString(),
                                        })
                                    }
                                >
                                    <Option value="Si">Si</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Observaciones">
                                <TextArea
                                    rows={3}
                                    onChange={e =>
                                        setDataConfirmation({
                                            ...dataConfirmation,
                                            observacion: e.currentTarget.value,
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

    const renderListReservations = () => {
        return (
            <Table
                style={{ width: '100%' }}
                showHeader={true}
                dataSource={reservations || []}
                // columns={columns}
                loading={loading}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                rowKey={record => record._id}
                pagination={{ position: ['bottomCenter'] }}
            >
                <Column
                    className="column-money"
                    title="Código"
                    dataIndex="codigo"
                    key="codigo"
                />
                <Column
                    className="column-money"
                    title="Estado"
                    dataIndex="estado"
                    key="estado"
                />

                <Column
                    className="column-money"
                    title="Fecha Reserva"
                    dataIndex="fecha_reserva"
                    key="fecha_reserva"
                />
                <Column
                    className="column-money"
                    title="Fecha Reserva Fin"
                    dataIndex="fecha_reserva_fin"
                    key="fecha_reserva_fin"
                />

                <Column
                    className="column-money"
                    title="Rut (CP)"
                    dataIndex="rut_cp"
                    key="rut_cp"
                />
                <Column
                    className="column-money"
                    title="Cliente Principal (CP)"
                    dataIndex="razon_social_cp"
                    key="razon_social_cp"
                />
                <Column
                    className="column-money"
                    title="Rut (CS)"
                    dataIndex="rut_cs"
                    key="rut_cs"
                />
                <Column
                    className="column-money"
                    title="Cliente Secundario (CS)"
                    dataIndex="razon_social_cs"
                    key="razon_social_cs"
                />
                <Column
                    className="column-money"
                    title="Nombre Servicio"
                    dataIndex="nombre_servicio"
                    key="nombre_servicio"
                />
            </Table>
        )
    }

    //--------------------------------------------------USEEFECT
    useEffect(() => {
        setLoading(true)
        getReservationsToConfirm()
        getWorkers()
        setDataConfirmation({
            ...dataConfirmation,
            fecha_reserva: moment().format(FORMAT_DATE),
            hora_reserva: moment().format('HH:mm'),
            fecha_reserva_fin: moment().format(FORMAT_DATE),
            hora_reserva_fin: moment().format('HH:mm'),
        })
        setLoading(false)
    }, [])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2500)
        }
    }, [messageAlert])

    useEffect(() => {
        if (
            !dataConfirmation.fecha_reserva ||
            !dataConfirmation.hora_reserva ||
            !dataConfirmation.fecha_reserva_fin ||
            !dataConfirmation.hora_reserva_fin ||
            !dataConfirmation.id_GI_personalAsignado ||
            !dataConfirmation.sucursal ||
            !dataConfirmation.reqEvaluacion ||
            !selectedReservation.length
        ) {
            setDisabledConfirm(true)
            return
        }
        return setDisabledConfirm(false)
    }, [dataConfirmation, selectedReservation])

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            <Row>
                <Col span={24}>{renderInformation()}</Col>
            </Row>
            <br />
            <Row>
                <Col
                    span={24}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '100%',
                        paddingLeft: '1rem',
                    }}
                >
                    {renderListReservations()}
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
                    span={3}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Button
                        onClick={() => onCloseModal('', '')}
                        style={{ backgroundColor: '#E10D17', color: 'white' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => handleGroupConfirmReservations()}
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
                        Confirmar
                    </Button>
                </Col>
            </Row>
        </Spin>
    )
}

export default GroupConfirmReservationView
