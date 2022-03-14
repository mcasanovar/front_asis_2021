import React, { useState } from 'react'
import {
    Collapse,
    Input,
    Form,
    Col,
    Row,
    Select,
    Tag,
    Table,
    Typography,
} from 'antd'
import { RequestModel } from '../../models/request.models'
import { ReservationModel } from '../../models/reservation.models'
import { Moment } from 'moment'
import { GiModel } from '../../models/gi.models'

type IDetailsCalendarScreenProps = {
    requests: RequestModel[]
    reservations: ReservationModel[]
    workers: GiModel[]
    currentDate: Moment
}

const DetailsCalendarScreen: React.FunctionComponent<
    IDetailsCalendarScreenProps
> = ({ requests, reservations, currentDate, workers }) => {
    const { Panel } = Collapse
    const { Option } = Select
    const { Column } = Table
    const { Title } = Typography

    const [requestSelected, setRequestSelected] = useState<RequestModel>()
    const [reservationSelected, setReservationSelected] =
        useState<ReservationModel>()
    const [obsRequestSelected, setObsRequestSelected] = useState<any>([])
    const [workerSelectedRequest, setWorkerSelectedRequest] =
        useState<GiModel>()
    const [workerSelectedReservation, setWorkerSelectedReservation] =
        useState<GiModel>()

    const handleSelectRequest = (id: string) => {
        const selected = requests.find(request => request._id === id)
        if (!!selected) {
            const auxWorker = workers.find(
                worker => worker._id === selected.id_GI_PersonalAsignado
            )
            setWorkerSelectedRequest(auxWorker)
        }
        setRequestSelected(selected)
        setObsRequestSelected(selected?.observacion_solicitud)
    }

    const handleSelectReservation = (id: string) => {
        const selected: ReservationModel | undefined = reservations.find(
            reservation => reservation._id === id
        )
        if (!!selected) {
            const auxWorker = workers.find(
                worker => worker._id === selected.id_GI_personalAsignado
            )
            setWorkerSelectedReservation(auxWorker)
        }
        setReservationSelected(selected)
    }

    //----------------------------RENDERS
    const renderRequestsDetails = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span="18">
                            <Form.Item label="Solicitudes">
                                <Select
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    showSearch
                                    filterOption={(input, option: any) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    onSelect={(e: any) =>
                                        handleSelectRequest(e.toString())
                                    }
                                >
                                    {requests.map((request, index) => (
                                        <Option key={index} value={request._id}>
                                            {`${request.codigo} - ${request.nombre_servicio}`}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {!!requestSelected && (
                            <>
                                <Col span="2"></Col>
                                <Col span="4">
                                    <Form.Item label=".">
                                        <Tag
                                            color={
                                                requestSelected.estado ===
                                                'Ingresado'
                                                    ? '#15B8D5'
                                                    : 'green'
                                            }
                                        >
                                            {requestSelected.estado}
                                        </Tag>
                                    </Form.Item>
                                </Col>
                            </>
                        )}
                    </Row>
                    <Row gutter={8}>
                        <Col span="6">
                            <Form.Item label="Código">
                                <Input
                                    readOnly
                                    value={requestSelected?.codigo}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item label="Nombre Servicio">
                                <Input
                                    readOnly
                                    value={requestSelected?.nombre_servicio}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item label="Fecha Solicitud">
                                <Input
                                    readOnly
                                    value={requestSelected?.fecha_solicitud}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span="3">
                            <Form.Item label="Rut CP">
                                <Input
                                    readOnly
                                    value={requestSelected?.rut_CP}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="9">
                            <Form.Item label="Razon Social CP">
                                <Input
                                    readOnly
                                    value={requestSelected?.razon_social_CP}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="3">
                            <Form.Item label="Rut CS">
                                <Input
                                    readOnly
                                    value={requestSelected?.rut_cs}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="9">
                            <Form.Item label="Razon Social CS">
                                <Input
                                    readOnly
                                    value={requestSelected?.razon_social_cs}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span="4">
                            <Form.Item label="Fecha Confirmación">
                                <Input
                                    readOnly
                                    value={requestSelected?.fecha_confirmacion}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="4">
                            <Form.Item label="Hora Confirmación">
                                <Input
                                    readOnly
                                    value={requestSelected?.hora_confirmacion}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="4">
                            <Form.Item label="Medio Confirmación">
                                <Input
                                    readOnly
                                    value={requestSelected?.fecha_confirmacion}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item label="Profesional Asignado">
                                <Input
                                    readOnly
                                    value={workerSelectedRequest?.razon_social}
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
                                dataSource={
                                    !!obsRequestSelected && obsRequestSelected
                                }
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
                            </Table>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    const renderReservationsDetails = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span="18">
                            <Form.Item label="Reservas">
                                <Select
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    showSearch
                                    filterOption={(input, option: any) =>
                                        option?.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    onSelect={(e: any) =>
                                        handleSelectReservation(e.toString())
                                    }
                                >
                                    {reservations.map((reservation, index) => (
                                        <Option
                                            key={index}
                                            value={reservation._id}
                                        >
                                            {`${reservation.codigo} - ${reservation.nombre_servicio}`}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {!!reservationSelected && (
                            <>
                                <Col span="2"></Col>
                                <Col span="4">
                                    <Form.Item label=".">
                                        <Tag
                                            color={
                                                reservationSelected.estado ===
                                                'Ingresado'
                                                    ? '#1073B5'
                                                    : '#21B831'
                                            }
                                        >
                                            {reservationSelected.estado}
                                        </Tag>
                                    </Form.Item>
                                </Col>
                            </>
                        )}
                    </Row>
                    <Row gutter={8}>
                        <Col span="6">
                            <Form.Item label="Código">
                                <Input
                                    readOnly
                                    value={reservationSelected?.codigo}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item label="Nombre Servicio">
                                <Input
                                    readOnly
                                    value={reservationSelected?.nombre_servicio}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item label="Sucursal">
                                <Input
                                    readOnly
                                    value={reservationSelected?.sucursal}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span="3">
                            <Form.Item label="Rut CP">
                                <Input
                                    readOnly
                                    value={reservationSelected?.rut_cp}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="9">
                            <Form.Item label="Razon Social CP">
                                <Input
                                    readOnly
                                    value={reservationSelected?.razon_social_cp}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="3">
                            <Form.Item label="Rut CS">
                                <Input
                                    readOnly
                                    value={reservationSelected?.rut_cs}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="9">
                            <Form.Item label="Razon Social CS">
                                <Input
                                    readOnly
                                    value={reservationSelected?.razon_social_cs}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span="4">
                            <Form.Item label="Fecha Reserva">
                                <Input
                                    readOnly
                                    value={reservationSelected?.fecha_reserva}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="4">
                            <Form.Item label="Hora Reserva">
                                <Input
                                    readOnly
                                    value={reservationSelected?.hora_reserva}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="4">
                            <Form.Item label="Fecha Reserva Término">
                                <Input
                                    readOnly
                                    value={
                                        reservationSelected?.fecha_reserva_fin
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span="4">
                            <Form.Item label="Hora Reserva Término">
                                <Input
                                    readOnly
                                    value={
                                        reservationSelected?.hora_reserva_fin
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span="8">
                            <Form.Item label="Profesional Asignado">
                                <Input
                                    readOnly
                                    value={
                                        workerSelectedReservation?.razon_social
                                    }
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
                                dataSource={reservationSelected?.observacion}
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
                            </Table>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    return (
        <>
            {
                <Title level={4}>
                    {currentDate.format('DD [de] MMMM YYYY').toUpperCase()}
                </Title>
            }
            <Collapse accordion defaultActiveKey={['1']}>
                <Panel header="Solicitudes" key="1">
                    {renderRequestsDetails()}
                </Panel>
                <Panel header="Reservas" key="2">
                    {renderReservationsDetails()}
                </Panel>
            </Collapse>
        </>
    )
}

export default DetailsCalendarScreen
