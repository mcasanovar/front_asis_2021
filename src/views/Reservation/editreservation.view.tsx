import React, { useState, useEffect } from 'react'
import {
    Input,
    Row,
    Col,
    Select,
    Button,
    Spin,
    Typography,
    Form,
    DatePicker,
    TimePicker,
} from 'antd'

import {
    IResponseReservation,
    ReservationModel,
} from '../../models/reservation.models'
import { getWorkersGIService } from '../../services'
import { GiModel, IResponseGI } from '../../models/gi.models'
import {
    editReservationService,
    getOneReservationService,
} from '../../services/reservation.services'
import { IAlertMessageContent } from '../../models/index.models'
import { ReservationInitialization } from '../../initializations/reservation.initialization'

import AlertComponent from '../../component/Alert/Alert'
import { SelectValue } from 'antd/lib/select'
import { FORMAT_DATE } from '../../constants/var'
import moment, { Moment } from 'moment'
import { MapReservation } from '../../functions/mappers'

interface IEditReservationViewProps {
    onCloseModal: (value: string, message: string) => string | void
    _id?: string
}

const EditReservationView: React.FunctionComponent<
    IEditReservationViewProps
> = ({ onCloseModal, _id = '' }) => {
    const { Option } = Select
    const { Title } = Typography
    const { TextArea } = Input

    const [loading, setLoading] = useState<boolean>(false)
    const [workers, setWorkers] = useState<GiModel[]>([])
    const [newReservationData, setNewReservationData] =
        useState<ReservationModel>(ReservationInitialization)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [assignProfessional, setAssignProfessional] = useState<GiModel>()
    const [reservationObs, setReservationObs] = useState<string>('')

    const handleSaveRequest = async () => {
        setLoading(true)
        let formData = new FormData()
        const requestToInsert = MapReservation(
            newReservationData,
            reservationObs,
            assignProfessional?._id || ''
        )
        formData.append('data', JSON.stringify(requestToInsert))
        const result: IResponseReservation = await editReservationService(
            newReservationData._id,
            formData
        )
        if (result.err === null) {
            onCloseModal('reload', result.msg)
        } else {
            return setMessageAlert({
                message: result.err,
                type: 'error',
                show: true,
            })
        }
    }

    //----------------------------------------USEEFECT
    useEffect(() => {
        setLoading(true)

        async function getWorkers() {
            const aux: IResponseGI = await getWorkersGIService()
            aux.err === null && setWorkers(aux.res || [])
        }

        async function getOneReservations() {
            const aux: IResponseGI = await getOneReservationService(_id)
            if (aux.err !== null) {
                setMessageAlert({ message: aux.err, type: 'error', show: true })
                return
            }
            const reservation: ReservationModel = aux.res
            setNewReservationData(reservation)
        }

        getWorkers()
        getOneReservations()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (newReservationData._id !== '' && workers.length > 0) {
            const aux = workers.find(
                worker =>
                    worker._id === newReservationData.id_GI_personalAsignado
            )
            if (aux) {
                setAssignProfessional(aux)
            }
            setLoading(false)
        }
        //eslint-disable-next-line
    }, [newReservationData._id, workers])

    console.log('detalle', newReservationData)

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            {<Title level={4}>{`Reserva ${newReservationData.codigo}`}</Title>}
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item label="Código reserva">
                                <Input
                                    readOnly
                                    value={newReservationData.codigo}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                validateStatus={
                                    newReservationData.id_GI_personalAsignado !==
                                    ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    newReservationData.id_GI_personalAsignado !==
                                    ''
                                        ? ''
                                        : 'Debe seleccionar un profesional asignado'
                                }
                                label="Profesional asignado"
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewReservationData({
                                            ...newReservationData,
                                            id_GI_personalAsignado:
                                                e.toString(),
                                        })
                                    }
                                    id="error"
                                    value={
                                        newReservationData.id_GI_personalAsignado
                                    }
                                >
                                    {workers.length > 0 &&
                                        workers.map((worker, index) => (
                                            <Option
                                                key={index}
                                                value={worker._id}
                                            >{`${worker.rut} - ${worker.razon_social}`}</Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Fecha inicio">
                                <DatePicker
                                    format={FORMAT_DATE}
                                    style={{ width: '100%' }}
                                    onSelect={(e: Moment) =>
                                        setNewReservationData({
                                            ...newReservationData,
                                            fecha_reserva:
                                                e.format(FORMAT_DATE),
                                        })
                                    }
                                    value={
                                        newReservationData.fecha_reserva !== ''
                                            ? moment(
                                                  newReservationData.fecha_reserva,
                                                  FORMAT_DATE
                                              )
                                            : undefined
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Hora inicio">
                                {newReservationData.hora_reserva !== '' && (
                                    <TimePicker
                                        style={{ width: '100%' }}
                                        format="HH:mm"
                                        clearIcon={false}
                                        defaultValue={moment(
                                            newReservationData.hora_reserva,
                                            'HH:mm'
                                        )}
                                        onChange={e =>
                                            setNewReservationData({
                                                ...newReservationData,
                                                hora_reserva:
                                                    e?.format('HH:mm') || '',
                                            })
                                        }
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Fecha término">
                                <DatePicker
                                    format={FORMAT_DATE}
                                    style={{ width: '100%' }}
                                    onSelect={(e: Moment) =>
                                        setNewReservationData({
                                            ...newReservationData,
                                            fecha_reserva_fin:
                                                e.format(FORMAT_DATE),
                                        })
                                    }
                                    value={
                                        newReservationData.fecha_reserva_fin !==
                                        ''
                                            ? moment(
                                                  newReservationData.fecha_reserva_fin,
                                                  FORMAT_DATE
                                              )
                                            : undefined
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Hora término">
                                {newReservationData.hora_reserva_fin !== '' && (
                                    <TimePicker
                                        style={{ width: '100%' }}
                                        format="HH:mm"
                                        clearIcon={false}
                                        defaultValue={moment(
                                            newReservationData.hora_reserva_fin,
                                            'HH:mm'
                                        )}
                                        onChange={e =>
                                            setNewReservationData({
                                                ...newReservationData,
                                                hora_reserva_fin:
                                                    e?.format('HH:mm') || '',
                                            })
                                        }
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Sucursal">
                                <Input
                                    readOnly
                                    value={newReservationData.sucursal}
                                />
                            </Form.Item>
                        </Col>
                        {/* <Col span={12}>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
                <p className="ant-upload-hint">10mb max.</p>
              </Upload.Dragger>
            </Col> */}
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Observacion">
                                <TextArea
                                    rows={3}
                                    onChange={e =>
                                        setReservationObs(e.currentTarget.value)
                                    }
                                    value={reservationObs}
                                />
                            </Form.Item>
                        </Col>
                        {/* <Col span={24}>
              <TableComponent
                onClickAction={() => { }}
                onClickDelete={() => { }}
                useStyle={false}
                enablePagination={false}
              />
            </Col> */}
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
                            span={4}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                onClick={() => onCloseModal('', '')}
                                style={{
                                    backgroundColor: '#E10D17',
                                    color: 'white',
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => handleSaveRequest()}
                                style={{
                                    backgroundColor: 'orange',
                                    borderColor: 'orange',
                                    color: 'white',
                                }}
                            >
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        </Spin>
    )
}

export default EditReservationView
