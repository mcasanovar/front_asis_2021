import React, { useState, useEffect } from 'react'
import {
    Input,
    Row,
    Col,
    Upload,
    DatePicker,
    TimePicker,
    Spin,
    Typography,
    Form,
    Table,
    Tag,
    Button,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import AlertComponent from '../../component/Alert/Alert'

import { InvoicesModel, IResponseInvoices } from '../../models/invoices.models'
import { IAlertMessageContent } from '../../models/index.models'
import { InvoicesInitialization } from '../../initializations/invoices.initialization'
import { FORMAT_DATE } from '../../constants/var'
import { MapOcToUpload } from '../../functions/mappers'
import { uploadOCService } from '../../services'
import moment from 'moment'

interface IUploadOCViewProps {
    onCloseModal: (value: string, message: string) => string | void
    invoiceSelected: InvoicesModel | undefined
}

const UploadOCView: React.FunctionComponent<IUploadOCViewProps> = ({
    onCloseModal,
    invoiceSelected,
}) => {
    const { TextArea } = Input
    const { Title } = Typography
    const { Column } = Table

    const [loading, setLoading] = useState<boolean>(false)
    const [newDataInvoice, setNewDataInvoice] = useState<InvoicesModel>(
        InvoicesInitialization
    )
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [observationOC, setObservationOC] = useState<string>('')
    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [file, setFile] = useState<string | Blob | null>(null)

    const getFileUploaded = (e: any) => {
        e && setFile(e.file)
        e.onSuccess('ok')
    }

    const handleUploadOC = async () => {
        setLoading(true)
        let formData = new FormData()
        const invoiceMapped = MapOcToUpload(newDataInvoice, observationOC)
        formData.append('data', JSON.stringify(invoiceMapped))
        file !== null && formData.append('archivo', file)
        const result: IResponseInvoices = await uploadOCService(
            invoiceSelected?._id || '',
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

    //---------------------------------------USEEFECT
    useEffect(() => {
        setNewDataInvoice({
            ...newDataInvoice,
            fecha_oc: moment().format(FORMAT_DATE),
            hora_oc: moment().format('HH:mm'),
        })
    }, [])

    useEffect(() => {
        if (
            newDataInvoice.nro_oc !== '' &&
            newDataInvoice.fecha_oc !== '' &&
            newDataInvoice.hora_oc !== '' &&
            file !== null
        ) {
            setDisabledConfirm(false)
        }
    }, [newDataInvoice, file])

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
                >{`${invoiceSelected?.nombre_servicio} - ${invoiceSelected?.codigo}`}</Title>
            }
            <br />
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input.Group>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Número OC"
                                            validateStatus={
                                                newDataInvoice.nro_oc !== ''
                                                    ? 'success'
                                                    : 'error'
                                            }
                                            help={
                                                newDataInvoice.nro_oc !== ''
                                                    ? ''
                                                    : 'Seleccionar'
                                            }
                                        >
                                            <Input
                                                onChange={e =>
                                                    setNewDataInvoice({
                                                        ...newDataInvoice,
                                                        nro_oc: e.currentTarget
                                                            .value,
                                                    })
                                                }
                                                value={newDataInvoice.nro_oc}
                                                id="error"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            label="Fecha subida OC"
                                            validateStatus={
                                                newDataInvoice.fecha_oc !== ''
                                                    ? 'success'
                                                    : 'error'
                                            }
                                            help={
                                                newDataInvoice.fecha_oc !== ''
                                                    ? ''
                                                    : 'Seleccionar'
                                            }
                                        >
                                            <DatePicker
                                                style={{ width: '100%' }}
                                                format={FORMAT_DATE}
                                                id="error_2"
                                                onChange={e =>
                                                    setNewDataInvoice({
                                                        ...newDataInvoice,
                                                        fecha_oc:
                                                            e?.format(
                                                                FORMAT_DATE
                                                            ) || '',
                                                    })
                                                }
                                                value={
                                                    !newDataInvoice.fecha_oc
                                                        ? moment(
                                                              new Date(),
                                                              FORMAT_DATE
                                                          )
                                                        : moment(
                                                              newDataInvoice.fecha_oc,
                                                              FORMAT_DATE
                                                          )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            label="Hora subida OC"
                                            validateStatus={
                                                newDataInvoice.hora_oc !== ''
                                                    ? 'success'
                                                    : 'error'
                                            }
                                            help={
                                                newDataInvoice.hora_oc !== ''
                                                    ? ''
                                                    : 'Seleccionar'
                                            }
                                        >
                                            <TimePicker
                                                format="HH:mm"
                                                style={{ width: '100%' }}
                                                id="error_3"
                                                onChange={e =>
                                                    setNewDataInvoice({
                                                        ...newDataInvoice,
                                                        hora_oc:
                                                            e?.format(
                                                                'HH:mm'
                                                            ) || '',
                                                    })
                                                }
                                                defaultValue={moment(
                                                    new Date(),
                                                    'HH:mm'
                                                )}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={24}>
                                        <Form.Item label="Observaciones">
                                            <TextArea
                                                rows={3}
                                                onChange={e =>
                                                    setObservationOC(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Input.Group>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Examen"
                                getValueFromEvent={getFileUploaded}
                                valuePropName="fileData"
                                validateStatus={
                                    file !== null ? 'success' : 'error'
                                }
                                help={file !== null ? '' : 'Seleccionar'}
                            >
                                <Upload.Dragger
                                    name="file"
                                    customRequest={getFileUploaded}
                                    accept="*"
                                    id="error_4"
                                    maxCount={1}
                                    onRemove={() => setFile(null)}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click o arrastra el archivo para subirlo
                                    </p>
                                    <p className="ant-upload-hint">10mb max.</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
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
                        <Table
                            style={{ width: '100%' }}
                            showHeader={true}
                            dataSource={invoiceSelected?.observacion_oc}
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
            </Input.Group>
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
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Button
                        onClick={() => onCloseModal('', '')}
                        style={{ backgroundColor: '#E10D17', color: 'white' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => handleUploadOC()}
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

export default UploadOCView
