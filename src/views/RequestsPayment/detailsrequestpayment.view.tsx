import React, { useState } from 'react'
import { Col, Input, Row, Form, Typography, Button } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { IAlertMessageContent } from '../../models/index.models'

import AlertComponent from '../../component/Alert/Alert'
import { RequestPaymentModel } from '../../models/requestpayment.models'
import { MilesFormat } from '../../libs/formattedPesos'

interface IDetailsRequestPaymentViewProps {
    onCloseModal: (value: string, message: string) => string | void
    requestpaymentSelected: RequestPaymentModel | undefined
}

const DetailsRequestPaymentView: React.FunctionComponent<
    IDetailsRequestPaymentViewProps
> = ({ onCloseModal, requestpaymentSelected }) => {
    const { Title } = Typography

    const [messageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })

    return (
        <Form layout="vertical">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            {
                <Title
                    level={4}
                >{`${requestpaymentSelected?.nombre_servicio} - ${requestpaymentSelected?.codigo}`}</Title>
            }
            <br />
            <Input.Group>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Código">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.codigo}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Estado proceso">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.estado}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={4}>
                        <Form.Item label="Rut CP">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.rut_cp}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Razon social CP">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.razon_social_cp}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Rut CS">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.rut_cs}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Razon social CS">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.razon_social_cs}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item label="Faena">
                            <Input
                                readOnly
                                value={
                                    requestpaymentSelected?.faena_seleccionada_cp
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Nombre servicio">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.nombre_servicio}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item label="Fecha facturación">
                            <Input
                                readOnly
                                value={
                                    requestpaymentSelected?.fecha_facturacion
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        {/* <Form.Item
              label='Nro. factura'
            >
              <Input
                readOnly
                value={paymentSelected?.nro_factura}
              />
            </Form.Item> */}
                    </Col>
                    <Col span={8}>
                        {/* <Form.Item
              label='Fecha de pago'
            >
              <Input
                readOnly
                value={paymentSelected?.fecha_pago}
              />
            </Form.Item> */}
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Sucursal">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.sucursal}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Lugar de servicio">
                            <Input
                                readOnly
                                value={requestpaymentSelected?.lugar_servicio}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item label="Valor servicio">
                            <Input
                                readOnly
                                value={`$ ${MilesFormat(
                                    requestpaymentSelected?.valor_servicio || 0
                                )}`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Valor deuda">
                            <Input
                                readOnly
                                value={`$ ${MilesFormat(
                                    requestpaymentSelected?.valor_deuda || 0
                                )}`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Valor pagado">
                            <Input
                                readOnly
                                value={`$ ${MilesFormat(
                                    requestpaymentSelected?.valor_cancelado || 0
                                )}`}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Input.Group>
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
        </Form>
    )
}

export default DetailsRequestPaymentView
