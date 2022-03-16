import React, { useState, useEffect } from 'react'
import SubBarComponent from '../../component/Subbar/SubBar'

import { IAlertMessageContent } from '../../models/index.models'

import AlertComponent from '../../component/Alert/Alert'

import {
    Spin,
    Typography,
    Input,
    Collapse,
    Form,
    Row,
    Col,
    DatePicker,
    Button,
} from 'antd'
import { InvoicesModel, IResponseInvoices } from '../../models/invoices.models'

import { getInvoiceByCode, updateInvoiceAdmin } from '../../services'
import { InvoicesInitialization } from '../../initializations/invoices.initialization'
import { FORMAT_DATE } from '../../constants/var'

import moment, { Moment } from 'moment'

type InvoiceAdminProps = {
    authorized: boolean
}

const InvoiceAdminView: React.FunctionComponent<InvoiceAdminProps> = ({}) => {
    const { Title } = Typography
    const { Search } = Input
    const { Panel } = Collapse

    const [loading, setLoading] = useState<boolean>(false)
    const [codeInvoice, setCodeInvoice] = useState('')
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [newInvoiceData, setNewInvoiceData] = useState<InvoicesModel>(
        InvoicesInitialization
    )
    const [disabledTextInput, setDisabledTextInput] = useState(true)

    async function handleUpdateInvoice() {
        if (!newInvoiceData.sucursal) return

        setLoading(true)

        const aux: IResponseInvoices = await updateInvoiceAdmin(
            newInvoiceData._id,
            newInvoiceData
        )

        if (aux.err !== null) {
            setLoading(false)
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            return
        }

        setMessageAlert({ message: aux.msg, type: 'success', show: true })

        setLoading(false)
    }

    async function handleGetInvoice() {
        if (!codeInvoice) return

        setLoading(true)

        const aux: IResponseInvoices = await getInvoiceByCode(codeInvoice)

        if (aux.err !== null) {
            setLoading(false)
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            return
        }

        const invoice: InvoicesModel = aux.res

        setNewInvoiceData(invoice)

        if (invoice?.fecha_facturacion && !!invoice.fecha_facturacion) {
            setDisabledTextInput(false)
        }

        setLoading(false)
    }

    const handleSelectInvoiceDate = (e: Moment) => {
        setNewInvoiceData({
            ...newInvoiceData,
            fecha_facturacion: e.format(FORMAT_DATE),
        })
    }

    //-----------------------------------------RENDERS
    const renderInvoiceInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Fecha Factura">
                                <DatePicker
                                    format={`${FORMAT_DATE}`}
                                    style={{ width: '100%' }}
                                    value={
                                        !!newInvoiceData.fecha_facturacion
                                            ? moment(
                                                  newInvoiceData.fecha_facturacion,
                                                  FORMAT_DATE
                                              )
                                            : undefined
                                    }
                                    onSelect={(e: Moment) =>
                                        handleSelectInvoiceDate(e)
                                    }
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="Nro. Factura">
                                <Input
                                    onChange={e =>
                                        setNewInvoiceData({
                                            ...newInvoiceData,
                                            nro_factura: e.currentTarget.value,
                                        })
                                    }
                                    value={newInvoiceData.nro_factura}
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="Nro. OC">
                                <Input
                                    onChange={e =>
                                        setNewInvoiceData({
                                            ...newInvoiceData,
                                            nro_oc: e.currentTarget.value,
                                        })
                                    }
                                    value={newInvoiceData.nro_oc}
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    //----------------------------------------USEEFECT
    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2000)
        }
    }, [messageAlert])

    console.log(newInvoiceData)

    return (
        <div className="container-gi">
            <SubBarComponent title="Facturaciones" />
            <Spin spinning={loading} size="large" tip="Cargando...">
                {messageAlert.show && (
                    <AlertComponent
                        message={messageAlert.message}
                        type={messageAlert.type}
                    />
                )}
                <Title
                    level={4}
                    style={{ textAlign: 'center', marginTop: '10px' }}
                >
                    {'Administración de Facturas'}
                </Title>
                <br />
                <Title
                    level={5}
                    style={{ textAlign: 'left', marginTop: '10px' }}
                >
                    {'Busqueda por Código del Proceso de Facturación'}
                </Title>
                <Search
                    placeholder="Ingrese Código del Proceso de Facturación..."
                    enterButton="Buscar"
                    size="middle"
                    loading={false}
                    style={{ width: '100%', height: '2rem', marginLeft: 0 }}
                    onChange={e => setCodeInvoice(e.currentTarget.value)}
                    onSearch={() => handleGetInvoice()}
                />
                <br />
                <br />
                <Collapse
                    accordion
                    defaultActiveKey={['1']}
                    style={{ minWidth: 1100 }}
                >
                    <Panel header="Datos del servicio" key="1">
                        {renderInvoiceInformation()}
                    </Panel>
                </Collapse>
                <br />
                <br />
                <Row
                    gutter={8}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Col>
                        {!newInvoiceData.fecha_facturacion &&
                            newInvoiceData._id && (
                                <Title
                                    level={5}
                                    style={{
                                        textAlign: 'center',
                                        marginTop: '10px',
                                        color: 'red',
                                    }}
                                >
                                    {'Esta factura no contiene fecha aún'}
                                </Title>
                            )}
                    </Col>
                    <Col>
                        <Button
                            onClick={() => handleUpdateInvoice()}
                            disabled={
                                !!newInvoiceData._id &&
                                !!newInvoiceData.fecha_facturacion
                                    ? false
                                    : true
                            }
                            style={
                                !!newInvoiceData._id &&
                                !!newInvoiceData.fecha_facturacion
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
        </div>
    )
}

export default InvoiceAdminView
