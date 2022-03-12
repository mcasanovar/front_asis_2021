import React, { useState } from 'react'
import {
    Col,
    Input,
    Row,
    Card,
    Typography,
    Form,
    Table,
    Popover,
    Button,
    Spin,
} from 'antd'

import {
    IPayment,
    IResponsePayment,
    PaymentModel,
} from '../../models/payments.models'
import moment from 'moment'
import { FORMAT_DATE } from '../../constants/var'
import { MilesFormat } from '../../libs/formattedPesos'
import {
    IAlertMessageContent,
    ITableDeleteObject,
} from '../../models/index.models'
import { DeleteOutlined } from '@ant-design/icons'
import { deletePaymentService } from '../../services'

interface IManagePaymentViewProps {
    onCloseModal: (value: string, message: string) => string | void
    paymentSelected: PaymentModel | undefined
}

const ManagePaymentView: React.FunctionComponent<IManagePaymentViewProps> = ({
    onCloseModal,
    paymentSelected,
}) => {
    const { Title, Text } = Typography
    const { Column } = Table

    const [loading, setLoading] = useState<boolean>(false)
    const [deleteConfirmation, setDeleteConfirmation] =
        useState<ITableDeleteObject>({ _id: '', show: false })
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })

    const handleCalculateDatePaymentRequest = () => {
        const invoiceDate =
            moment(paymentSelected?.fecha_facturacion)
                .add(paymentSelected?.dias_credito, 'days')
                .format(FORMAT_DATE) || moment().format(FORMAT_DATE)
        return invoiceDate
    }

    const handlePaymentsCount = () => {
        return paymentSelected?.pagos.length || 0
    }

    const handleDividedAmmount = (type: string) => {
        return (
            paymentSelected?.pagos.reduce((acc, current) => {
                if (current.tipo_pago === type) {
                    return acc + current.total
                }
                return acc
            }, 0) || 0
        )
    }

    const handleDeletePayment = async (payment: IPayment) => {
        setLoading(true)
        // let formData = new FormData();
        // formData.append("data", JSON.stringify(payment));
        const aux: IResponsePayment = await deletePaymentService(
            paymentSelected?._id || '',
            payment
        )
        if (!aux.err) {
            onCloseModal('reload', aux.msg)
            return
        } else {
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            setLoading(true)
            return
        }
    }

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            <Form layout="vertical">
                <Input.Group>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Fecha factura">
                                <Input
                                    readOnly
                                    value={paymentSelected?.fecha_facturacion}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Dias crédito">
                                <Input
                                    readOnly
                                    value={paymentSelected?.dias_credito}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Fecha inicio cobranza">
                                <Input
                                    readOnly
                                    value={handleCalculateDatePaymentRequest()}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Efectivo">
                                <Input
                                    readOnly
                                    value={`$ ${MilesFormat(
                                        handleDividedAmmount('Efectivo')
                                    )}`}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Débito">
                                <Input
                                    readOnly
                                    value={`$ ${MilesFormat(
                                        handleDividedAmmount('Débito')
                                    )}`}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Crédito">
                                <Input
                                    readOnly
                                    value={`$ ${MilesFormat(
                                        handleDividedAmmount('Crédito')
                                    )}`}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Transferencia bancaria">
                                <Input
                                    readOnly
                                    value={`$ ${MilesFormat(
                                        handleDividedAmmount(
                                            'Transferencia bancaria'
                                        )
                                    )}`}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Card
                                title="Cantidad de pagos"
                                headStyle={{
                                    backgroundColor: '#1073B5',
                                    color: 'white',
                                }}
                                bodyStyle={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '10rem',
                                }}
                            >
                                <Title level={4}>{handlePaymentsCount()}</Title>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card
                                title="Recaudado / Deuda total"
                                headStyle={{
                                    backgroundColor: '#1073B5',
                                    color: 'white',
                                }}
                                bodyStyle={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '10rem',
                                }}
                            >
                                <Title level={4}>
                                    {`$ ${MilesFormat(
                                        paymentSelected?.valor_cancelado || 0
                                    )} / $ ${MilesFormat(
                                        paymentSelected?.valor_servicio || 0
                                    )}`}
                                </Title>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
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
                                dataSource={paymentSelected?.pagos}
                                pagination={false}
                            >
                                <Column
                                    className="column-money"
                                    title="Fecha de pago"
                                    dataIndex="fecha_pago"
                                    key="fecha_pago"
                                />
                                <Column
                                    className="column-money"
                                    title="Sucursal"
                                    dataIndex="sucursal"
                                    key="sucursal"
                                />
                                <Column
                                    className="column-money"
                                    title="Método de pago"
                                    dataIndex="tipo_pago"
                                    key="tipo_pago"
                                />
                                <Column
                                    className="column-money"
                                    title="Monto"
                                    dataIndex="monto"
                                    key="monto"
                                    render={(_, record: any) => {
                                        return (
                                            <>
                                                <Text>{`$ ${MilesFormat(
                                                    record.monto
                                                )}`}</Text>
                                            </>
                                        )
                                    }}
                                />
                                <Column
                                    className="column-money"
                                    title="Descuento"
                                    dataIndex="descuento"
                                    key="descuento"
                                    render={(_, record: any) => {
                                        return (
                                            <>
                                                <Text>{`$ ${MilesFormat(
                                                    record.descuento
                                                )}`}</Text>
                                            </>
                                        )
                                    }}
                                />
                                <Column
                                    className="column-money"
                                    title="Total"
                                    dataIndex="total"
                                    key="total"
                                    render={(_, record: any) => {
                                        return (
                                            <>
                                                <Text>{`$ ${MilesFormat(
                                                    record.total
                                                )}`}</Text>
                                            </>
                                        )
                                    }}
                                />
                                <Column
                                    width="5%"
                                    title="Action"
                                    className="column-money"
                                    render={(_, record: any) => {
                                        return (
                                            <>
                                                <Popover
                                                    content={
                                                        <Button
                                                            style={{
                                                                backgroundColor:
                                                                    '#E6100D',
                                                                color: 'white',
                                                            }}
                                                            onClick={() =>
                                                                handleDeletePayment(
                                                                    record
                                                                )
                                                            }
                                                        >
                                                            Confirmar
                                                            eliminación
                                                        </Button>
                                                    }
                                                    title="¿Seguro que desea eliminar este registro?"
                                                    trigger="click"
                                                    visible={
                                                        deleteConfirmation._id ===
                                                            record.id &&
                                                        deleteConfirmation.show ===
                                                            true
                                                            ? true
                                                            : false
                                                    }
                                                    onVisibleChange={() =>
                                                        setDeleteConfirmation({
                                                            _id: record.id,
                                                            show: !deleteConfirmation.show,
                                                        })
                                                    }
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            setDeleteConfirmation(
                                                                {
                                                                    _id: record.id,
                                                                    show: true,
                                                                }
                                                            )
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                '#E6100D',
                                                        }}
                                                        icon={
                                                            <DeleteOutlined
                                                                style={{
                                                                    fontSize:
                                                                        '1.1rem',
                                                                    color: 'white',
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </Popover>
                                            </>
                                        )
                                    }}
                                />
                            </Table>
                        </Col>
                    </Row>
                </Input.Group>
            </Form>
        </Spin>
    )
}

export default ManagePaymentView
