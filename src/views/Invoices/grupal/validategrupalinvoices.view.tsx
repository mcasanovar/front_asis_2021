import React, { useState, useEffect, FormEvent } from 'react'
import {
    Input,
    Row,
    Col,
    Select,
    Spin,
    Form,
    Checkbox,
    DatePicker,
    InputNumber,
    Table,
    Button,
} from 'antd'
import {
    IGroupConfirmInvoices,
    InvoicesModel,
    IResponseInvoices,
} from '../../../models/invoices.models'
import { IGroupConfirmInvoicesInitialization } from '../../../initializations/invoices.initialization'
import { FORMAT_DATE } from '../../../constants/var'
import {
    confirmGroupInvoicesService,
    getGroupInvoiceToUploadService,
    getResultsByDateService,
} from '../../../services'
import { IAlertMessageContent } from '../../../models/index.models'
import AlertComponent from '../../../component/Alert/Alert'
import { MilesFormat } from '../../../libs/formattedPesos'
import { MapGroupConfirmInvoices } from '../../../functions/mappers'
import moment, { Moment } from 'moment'
import { FormatingRut } from '../../../functions/validators/index.validators'
import { IResponseResults, ResultModel } from '../../../models/results.model'
import getFilteredInvoicesByResults from '../../../functions/getFilteredInvoicesByResults'
import sortingObjects from '../../../functions/sortingObjects'

interface IValidateGroupInvoicesViewProps {
    onCloseModal: (value: string, message: string) => string | void
}

const ValidateGroupInvoicesView: React.FunctionComponent<
    IValidateGroupInvoicesViewProps
> = ({ onCloseModal }) => {
    const { TextArea, Search } = Input
    const { Option } = Select
    const { Column } = Table
    const { RangePicker } = DatePicker

    const [loading, setLoading] = useState<boolean>(false)
    const [dataConfirmation, setDataConfirmation] =
        useState<IGroupConfirmInvoices>(IGroupConfirmInvoicesInitialization)
    const [invoices, setInvoices] = useState<InvoicesModel[]>()
    const [invoicesFiltered, setInvoicesFiltered] = useState<InvoicesModel[]>()
    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [selectedInvoices, setSelectedInvoices] = useState<React.Key[]>([])
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [rutSearchInput, setRutSearchInput] = useState<string>('')
    const [dateResultFilter, setDateResultFilter] = useState<any>(null)
    //filters
    const [checkRutFilter, setCheckRutFilter] = useState<boolean>(false)
    const [checkRangeDateFilter, setCheckRangeDateFilter] =
        useState<boolean>(false)

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedInvoices(selectedRowKeys)
        },
    }

    const handleGroupConfirmInvoices = async () => {
        setLoading(true)
        const dataMapped = MapGroupConfirmInvoices(
            dataConfirmation,
            selectedInvoices
        )
        const aux: IResponseInvoices = await confirmGroupInvoicesService(
            dataMapped
        )
        if (!aux.err) {
            return onCloseModal('reload', aux.msg)
        }
        setMessageAlert({ message: aux.msg, type: 'error', show: true })
        console.log(aux.err)
        setLoading(false)
    }

    const handleFormatingRut = (e: FormEvent<HTMLInputElement>) => {
        setRutSearchInput(FormatingRut(e.currentTarget.value))
    }

    const handleSearchInput = () => {
        let aux: InvoicesModel[] | undefined = invoices?.filter(
            invoice => invoice.rut_cp === rutSearchInput
        )

        setLoading(true)

        if (!checkRangeDateFilter) {
            if (aux) {
                setTimeout(() => {
                    setInvoicesFiltered(aux)
                    setLoading(false)
                    return
                }, 2000)
            }
        }

        if (checkRangeDateFilter && !!dateResultFilter) {
            const filteredInvoicesByRutCP = !!invoicesFiltered?.length
                ? invoicesFiltered.filter(
                      invoice => invoice.rut_cp === rutSearchInput
                  )
                : []

            setTimeout(() => {
                setInvoicesFiltered(filteredInvoicesByRutCP)
                setLoading(false)
                return
            }, 2000)
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }

    async function getInvoicesToUpload() {
        const aux: IResponseInvoices = await getGroupInvoiceToUploadService()
        if (!aux.err) {
            const filteredInvoices = aux.res.filter(
                (invoice: InvoicesModel) => invoice.estado_archivo === 'Cargado'
            )
            const filteredAux = sortingObjects(
                filteredInvoices,
                'codigo',
                'desc'
            )
            setInvoices(filteredAux)
            setInvoicesFiltered(filteredAux)
            setLoading(false)
            return
        }
        setMessageAlert({ message: aux.msg, type: 'error', show: true })
        console.log(aux.err)
        setLoading(false)
    }

    const handleFilterByDate = async (date: any) => {
        if (!date) return
        setLoading(true)
        setDateResultFilter(date)

        let aux: IResponseResults = await getResultsByDateService(
            moment(date[0]).format(FORMAT_DATE),
            moment(date[1]).format(FORMAT_DATE)
        )

        if (aux.err) {
            setLoading(false)
            setMessageAlert({ message: aux.msg, type: 'error', show: true })
            return
        }

        //eliminar rastros de otra fecha que no sea la del rango enviado
        aux.res = aux.res.filter((result: ResultModel) => {
            const dateResultFormatted = moment(
                result.fecha_resultado,
                FORMAT_DATE
            )
            const firstFormattedDate = moment(date[0], FORMAT_DATE)
            const secondFormattedDate = moment(date[1], FORMAT_DATE)

            if (
                dateResultFormatted.isBetween(
                    firstFormattedDate,
                    secondFormattedDate,
                    'days',
                    '[]'
                )
            ) {
                return result
            }
        })

        let invoicesRes = getFilteredInvoicesByResults(aux.res, invoices || [])
        let invoicesResFiltered = sortingObjects(invoicesRes, 'codigo', 'desc')

        if (!checkRutFilter) {
            setInvoicesFiltered(invoicesResFiltered)
            setLoading(false)
            return
        }

        if (checkRutFilter && !!rutSearchInput) {
            const filteredInvoicesByRutCP = invoicesResFiltered.filter(
                (invoice: any) => invoice.rut_cp === rutSearchInput
            )
            const sortedInvoices = sortingObjects(
                filteredInvoicesByRutCP,
                'codigo',
                'desc'
            )
            setInvoicesFiltered(sortedInvoices)
            setLoading(false)
            return
        }
    }

    const handleCleanDateResult = () => {
        setDateResultFilter(undefined)
        if (checkRutFilter && !!rutSearchInput) {
            handleSearchInput()
        } else {
            setInvoicesFiltered(invoices)
        }
    }

    //-----------------------------------------USEEFECT
    useEffect(() => {
        setLoading(true)
        getInvoicesToUpload()
    }, [])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2500)
        }
    }, [messageAlert])

    useEffect(() => {
        if (dataConfirmation.estado_archivo === 'Aprobado') {
            if (!!selectedInvoices.length) return setDisabledConfirm(false)
            return setDisabledConfirm(true)
        }
        if (dataConfirmation.estado_archivo === 'Rechazado') {
            if (
                !!dataConfirmation.fecha_nota_credito &&
                !!dataConfirmation.nro_nota_credito &&
                !!dataConfirmation.monto_nota_credito &&
                !!dataConfirmation.factura_anular &&
                !!selectedInvoices.length
            ) {
                return setDisabledConfirm(false)
            }
            return setDisabledConfirm(true)
        }
        setDisabledConfirm(true)
    }, [dataConfirmation, selectedInvoices])

    useEffect(() => {
        if (!rutSearchInput) {
            setInvoicesFiltered(invoices)
        }
    }, [rutSearchInput])

    useEffect(() => {
        if (!checkRangeDateFilter) {
            handleCleanDateResult()
        }
    }, [checkRangeDateFilter])

    useEffect(() => {
        if (!checkRangeDateFilter && !checkRutFilter) {
            if (!checkRutFilter) {
                setRutSearchInput('')
            }
            setInvoicesFiltered(invoices)
        }
    }, [checkRutFilter, checkRangeDateFilter])

    //---------------------------------------------------------RENDERS
    const renderInformation = () => {
        return (
            <Input.Group>
                <Row gutter={8}>
                    <Col span={4}>
                        <Form.Item
                            validateStatus={
                                !!dataConfirmation.estado_archivo
                                    ? 'success'
                                    : 'error'
                            }
                            help={
                                !!dataConfirmation.estado_archivo
                                    ? ''
                                    : 'Seleccione'
                            }
                            label="Estado"
                        >
                            <Select
                                style={{ width: '100%' }}
                                onSelect={e =>
                                    setDataConfirmation({
                                        ...dataConfirmation,
                                        estado_archivo: e.toString(),
                                    })
                                }
                            >
                                <Option value="Aprobado">Aprobado</Option>
                                <Option value="Rechazado">Rechazado</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    {dataConfirmation.estado_archivo === 'Rechazado' && (
                        <>
                            <Col span={5}>
                                <Form.Item
                                    validateStatus={
                                        !!dataConfirmation.fecha_nota_credito
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        !!dataConfirmation.fecha_nota_credito
                                            ? ''
                                            : 'Seleccione'
                                    }
                                    label="Fecha nota crédito"
                                >
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        format={FORMAT_DATE}
                                        onChange={e =>
                                            setDataConfirmation({
                                                ...dataConfirmation,
                                                fecha_nota_credito:
                                                    e?.format(FORMAT_DATE) ||
                                                    '',
                                            })
                                        }
                                        value={
                                            !dataConfirmation.fecha_nota_credito
                                                ? moment(
                                                      new Date(),
                                                      FORMAT_DATE
                                                  )
                                                : moment(
                                                      dataConfirmation.fecha_nota_credito,
                                                      FORMAT_DATE
                                                  )
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    label="Nro. Nota crédito"
                                    validateStatus={
                                        !!dataConfirmation.nro_nota_credito
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        !!dataConfirmation.nro_nota_credito
                                            ? ''
                                            : 'Seleccionar'
                                    }
                                >
                                    <Input
                                        onChange={e =>
                                            setDataConfirmation({
                                                ...dataConfirmation,
                                                nro_nota_credito:
                                                    e.currentTarget.value,
                                            })
                                        }
                                        value={
                                            dataConfirmation.nro_nota_credito
                                        }
                                        id="error_2"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    label="Monto nota crédito"
                                    validateStatus={
                                        !!dataConfirmation.nro_nota_credito
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        !!dataConfirmation.nro_nota_credito
                                            ? ''
                                            : 'Seleccionar'
                                    }
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        formatter={value =>
                                            `$ ${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        parser={value =>
                                            parseInt(
                                                value?.replace(
                                                    /\$\s?|(,*)/g,
                                                    ''
                                                ) || ''
                                            )
                                        }
                                        onChange={e =>
                                            setDataConfirmation({
                                                ...dataConfirmation,
                                                monto_nota_credito: parseInt(
                                                    e.toString()
                                                ),
                                            })
                                        }
                                        value={
                                            dataConfirmation.monto_nota_credito
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    label="Nro. factura anular"
                                    validateStatus={
                                        !!dataConfirmation.factura_anular
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={
                                        !!dataConfirmation.factura_anular
                                            ? ''
                                            : 'Seleccionar'
                                    }
                                >
                                    <Input
                                        onChange={e =>
                                            setDataConfirmation({
                                                ...dataConfirmation,
                                                factura_anular:
                                                    e.currentTarget.value,
                                            })
                                        }
                                        value={dataConfirmation.factura_anular}
                                        id="error"
                                    />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Form.Item label="Observaciones">
                            <TextArea
                                rows={3}
                                onChange={e =>
                                    setDataConfirmation({
                                        ...dataConfirmation,
                                        observaciones: e.currentTarget.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Input.Group>
        )
    }

    const renderListInvoices = () => {
        return (
            <Table
                style={{ width: '100%' }}
                showHeader={true}
                dataSource={invoicesFiltered || []}
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
                    title="Rut (CP)"
                    dataIndex="rut_cp"
                    key="rut_cp"
                />
                <Column
                    className="column-money"
                    title="Razon Social (CP)"
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
                    title="Razon Social (CS)"
                    dataIndex="razon_social_cs"
                    key="razon_social_cs"
                />
                <Column
                    className="column-money"
                    title="Nombre Servicio"
                    dataIndex="nombre_servicio"
                    key="nombre_servicio"
                />
                {!!dateResultFilter && (
                    <Column
                        className="column-money"
                        title="Fecha Resultado"
                        dataIndex="fecha_resultado"
                        key="fecha_resultado"
                    />
                )}
                <Column
                    className="column-money"
                    title="Total"
                    dataIndex="total"
                    key="total"
                    render={text => `$${MilesFormat(text)}`}
                />
            </Table>
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
            <Form layout="vertical">
                {renderInformation()}
                <Row
                    gutter={8}
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Col
                        span={12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Checkbox
                            style={{ marginRight: '10px' }}
                            onChange={() => setCheckRutFilter(!checkRutFilter)}
                            value={checkRutFilter}
                        />
                        <Form.Item
                            label="Buscar por Rut CP"
                            style={{ width: '100%' }}
                        >
                            <Search
                                placeholder="Rut CP"
                                allowClear
                                enterButton="Buscar"
                                size="large"
                                disabled={checkRutFilter ? false : true}
                                onChange={e => handleFormatingRut(e)}
                                onSearch={handleSearchInput}
                                value={rutSearchInput}
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        span={6}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Checkbox
                            style={{ marginRight: '10px' }}
                            onChange={() =>
                                setCheckRangeDateFilter(!checkRangeDateFilter)
                            }
                            value={checkRangeDateFilter}
                        />
                        <Form.Item label="Buscar por Fecha Resultado">
                            <RangePicker
                                onChange={e => handleFilterByDate(e)}
                                format={FORMAT_DATE}
                                value={dateResultFilter}
                                disabled={checkRangeDateFilter ? false : true}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label=".">
                            <Button
                                onClick={() => handleCleanDateResult()}
                                style={{
                                    backgroundColor: '#E10D17',
                                    color: 'white',
                                }}
                            >
                                Limpiar
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span="24">{renderListInvoices()}</Col>
                </Row>
            </Form>
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
                    span={5}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Button
                        onClick={() => onCloseModal('', '')}
                        style={{ backgroundColor: '#E10D17', color: 'white' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => handleGroupConfirmInvoices()}
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

export default ValidateGroupInvoicesView
