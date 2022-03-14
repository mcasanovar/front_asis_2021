import React, { useState, useEffect } from 'react'
import { Spin, Form, Collapse, Row, Col, Select, Input, Button } from 'antd'
import { OutputModel } from '../../models/outputs.models'
import { OutputsInitialization } from '../../initializations/output.initializations'
import { IEntries } from '../../models/expenses.models'
import { IAlertMessageContent } from '../../models/index.models'

import AlertComponent from '../../component/Alert/Alert'
import { MilesFormat } from '../../libs/formattedPesos'

type IDetailsOutputViewProps = {
    onCloseModal: (value: string, message: string) => string | void
    outputSelected: OutputModel | undefined
}

const DetailsOutputView: React.FunctionComponent<IDetailsOutputViewProps> = ({
    onCloseModal,
    outputSelected,
}) => {
    const { Panel } = Collapse
    const { Option } = Select
    const { TextArea } = Input

    const [loading, setLoading] = useState<boolean>(false)
    const [tipLoading, setTipLoading] = useState<string>('')
    const [cantMessage, setCantMessage] = useState<string>('Seleccione')
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [newDataOutput, setNewDataOutput] = useState<OutputModel>(
        OutputsInitialization
    )
    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [isInventary, setHasInventary] = useState<boolean>(false)
    const [entry, setEntry] = useState<IEntries>()

    //--------------------------------RENDERS
    const renderGeneralData = () => {
        return (
            <>
                <Row gutter={8}>
                    <Col span={4}>
                        <Form.Item label="Tipo salida">
                            <Input
                                readOnly
                                value={outputSelected?.tipo_salida}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Nro. Documento">
                            <Input
                                readOnly
                                value={outputSelected?.nro_documento}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Usuario sistema">
                            <Input readOnly value={outputSelected?.usuario} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item label="Categoria general">
                            <Input
                                readOnly
                                value={outputSelected?.categoria_general}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Sub-categoria 1">
                            <Input
                                readOnly
                                value={outputSelected?.subcategoria_uno}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Sub-categoria 2">
                            <Input
                                readOnly
                                value={outputSelected?.subcategoria_dos}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    {isInventary && (
                        <Col span={8}>
                            <Form.Item label="Sub-categoria 3">
                                <Input
                                    readOnly
                                    value={outputSelected?.subcategoria_tres}
                                />
                            </Form.Item>
                        </Col>
                    )}
                    <Col span={4}>
                        <Form.Item label="Fecha">
                            <Input readOnly value={outputSelected?.fecha} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Motivo salida">
                            <Input
                                readOnly
                                value={outputSelected?.motivo_salida}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Descripción">
                            <TextArea
                                rows={3}
                                readOnly
                                value={outputSelected?.descripcion}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </>
        )
    }

    const renderMonetaryData = () => {
        return (
            <>
                <Row gutter={8}>
                    <Col span={4}>
                        <Form.Item label="Cantidad">
                            <Input readOnly value={outputSelected?.cantidad} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Costo unitario">
                            <Input
                                readOnly
                                value={`$ ${MilesFormat(
                                    outputSelected?.costo_unitario || 0
                                )}`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Costo total">
                            <Input
                                readOnly
                                value={`$ ${MilesFormat(
                                    outputSelected?.costo_total || 0
                                )}`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Precio venta unitario">
                            <Input
                                readOnly
                                value={`$ ${MilesFormat(
                                    outputSelected?.precio_venta_unitario || 0
                                )}`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Ingreso total">
                            <Input
                                readOnly
                                value={`$ ${MilesFormat(
                                    outputSelected?.ingreso_total || 0
                                )}`}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </>
        )
    }

    //-----------------------------USEEFFECT
    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2000)
        }
    }, [messageAlert])

    useEffect(() => {
        if (
            newDataOutput.tipo_salida !== '' &&
            newDataOutput.categoria_general !== '' &&
            newDataOutput.subcategoria_uno !== '' &&
            newDataOutput.subcategoria_dos !== '' &&
            newDataOutput.subcategoria_tres !== '' &&
            newDataOutput.cantidad !== 0 &&
            entry &&
            entry.costo_unitario !== 0 &&
            newDataOutput.costo_total !== 0 &&
            newDataOutput.precio_venta_unitario !== 0 &&
            newDataOutput.ingreso_total !== 0
        ) {
            setDisabledConfirm(false)
        }

        if (newDataOutput.cantidad === 0) {
            setCantMessage('Seleccione')
        }

        if (entry && newDataOutput.cantidad > entry.cantidad) {
            setCantMessage('Cantidad supera lo ingresado : ' + entry.cantidad)
        }
    }, [
        newDataOutput.tipo_salida,
        newDataOutput.categoria_general,
        newDataOutput.subcategoria_uno,
        newDataOutput.subcategoria_dos,
        newDataOutput.subcategoria_tres,
        newDataOutput.cantidad,
        entry,
        newDataOutput.costo_total,
        newDataOutput.precio_venta_unitario,
        newDataOutput.ingreso_total,
    ])

    return (
        <Spin spinning={loading} size="large" tip={tipLoading}>
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            <Form layout="vertical">
                <Collapse accordion defaultActiveKey={['0']}>
                    <Panel header="Datos generales" key="0">
                        {renderGeneralData()}
                    </Panel>
                    <Panel header="Formulario de factura" key="2">
                        {renderMonetaryData()}
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
                        span={3}
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
        </Spin>
    )
}

export default DetailsOutputView
