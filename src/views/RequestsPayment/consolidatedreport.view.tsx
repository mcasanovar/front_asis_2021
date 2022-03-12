import React, { useState, useEffect } from 'react'
import {
    Input,
    Row,
    Spin,
    Col,
    Form,
    Select,
    Table,
    Typography,
    Checkbox,
    DatePicker,
    Button,
} from 'antd'

import { IAlertMessageContent } from '../../models/index.models'
import AlertComponent from '../../component/Alert/Alert'
import { SelectValue } from 'antd/lib/select'
import { GiModel, IResponseGI, IContract, IFaena } from '../../models/gi.models'
import {
    generateConsolidatedReportService,
    getCompanyGIService,
    getRequestsPaymentByRutGIService,
} from '../../services'
import { MilesFormat } from '../../libs/formattedPesos'
import {
    IResponseRequestPayment,
    RequestPaymentModel,
} from '../../models/requestpayment.models'
import moment, { Moment } from 'moment'
import { FORMAT_DATE } from '../../constants/var'
import { parse } from 'node:url'
import { MapDataToConsolidatedReport } from '../../functions/mappers/requestsPayment.mapper'
import { validateEmail } from '../../functions/validators/index.validators'

interface IConsolidatedReportViewProps {
    onCloseModal: (value: string, message: string) => string | void
}

const ConsolidatedReportView: React.FunctionComponent<
    IConsolidatedReportViewProps
> = ({ onCloseModal }) => {
    const { Option } = Select
    const { Column } = Table
    const { Text } = Typography
    const { RangePicker } = DatePicker

    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [emails, setEmails] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [companies, setCompanies] = useState<GiModel[]>()
    const [companySelected, setCompanySelected] = useState<GiModel>()
    const [requestsPayment, setRequestsPayment] =
        useState<RequestPaymentModel[]>()
    const [requestsPaymentFiltered, setRequestsPaymentFiltered] =
        useState<RequestPaymentModel[]>()
    const [contractSelected, setContractSelected] = useState<IContract>()
    const [servicesSelected, setServicesSelected] = useState<string[]>([])
    const [showDateFilter, setShowDateFilter] = useState<boolean>(false)
    const [showContractFilter, setShowContractFilter] = useState<boolean>(false)
    const [showServiceNameFilter, setShowServiceNameFilter] =
        useState<boolean>(false)
    const [isValidEmails, setIsValidEmails] = useState<boolean>(false)
    //filter selected
    const [dateValueRange, setDateValueRange] = useState<any>(null)
    const [faenaSelected, setFaenaSelected] = useState<string | null>(null)
    const [serviceSelected, setServiceSelected] = useState<string | null>(null)

    async function getGIsCompanies() {
        setLoading(true)
        const aux: IResponseGI = await getCompanyGIService()
        if (!!aux.err) {
            setMessageAlert({
                message: 'No se ha encontrado ningun GI',
                type: 'error',
                show: true,
            })
            setLoading(false)
            return
        }
        setCompanies(aux.res)
        setLoading(false)
    }

    async function getRequetsPaymentByGI() {
        setLoading(true)
        const aux: IResponseRequestPayment =
            await getRequestsPaymentByRutGIService(companySelected?.rut || '')
        if (!!aux.err && aux.err === 98) {
            setMessageAlert({ message: aux.msg, type: 'error', show: true })
            setLoading(false)
            return
        }
        if (!!aux.err) {
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            setLoading(false)
            return
        }

        //agregarle en formato fecha la fecha de cobranza
        const res: RequestPaymentModel[] = aux.res
        const requestPaymentMapped: RequestPaymentModel[] = res.map(element => {
            return {
                ...element,
                fecha_cobranza: moment(element.fecha_facturacion, FORMAT_DATE)
                    .add(element.dias_credito, 'd')
                    .toDate(),
            }
        })

        //sacar los nombres de servicvios para cargarlos en el filtro
        const auxServices = res.reduce(
            (acc: string[], current: RequestPaymentModel) => {
                const aux = acc.find(old => current.nombre_servicio === old)
                if (!aux) {
                    acc.push(current.nombre_servicio)
                }
                return acc
            },
            []
        )

        setServicesSelected(auxServices)

        setRequestsPayment(requestPaymentMapped)
        setRequestsPaymentFiltered(requestPaymentMapped)
        setLoading(false)
    }

    const handleGetCompanySelected = (id: string) => {
        if (!companies) return
        const aux = companies.find(company => company._id === id)
        setCompanySelected(aux)
    }

    const handleFilterRequestPayment = () => {
        let result: RequestPaymentModel[] | undefined = requestsPayment
        if (!showDateFilter && !showContractFilter && !showServiceNameFilter)
            return setRequestsPaymentFiltered(requestsPayment)

        //si filtra por fecha
        if (showDateFilter) {
            setDateValueRange(dateValueRange)
            if (!dateValueRange)
                return setRequestsPaymentFiltered(requestsPayment)
            result = requestsPayment?.filter(element => {
                // return element?.fecha_cobranza && element.fecha_cobranza >= daterange[0].toDate() && element.fecha_cobranza <= daterange[1].toDate()
                return (
                    element?.fecha_cobranza &&
                    moment(element.fecha_cobranza).isBetween(
                        dateValueRange[0],
                        dateValueRange[1]
                    )
                )
            })
        }

        //si tambien filtra por faena
        if (showContractFilter) {
            result = result?.filter(
                element =>
                    element.faena_seleccionada_cp.toLowerCase() ===
                    faenaSelected?.toLowerCase()
            )
        }

        //si tambien filtra por nombre de servicio
        if (showServiceNameFilter) {
            result = result?.filter(
                element => element.nombre_servicio === serviceSelected
            )
        }

        setRequestsPaymentFiltered(result)
    }

    const handleGetFaenas = (contractNumber: string) => {
        const aux: IContract | undefined =
            companySelected?.contrato_faenas.find(
                element => element.nro_contrato === contractNumber
            )
        console.log(aux)
        if (!aux) return
        setContractSelected(aux)
    }

    const handleValidEmails = (emailsString: string) => {
        setEmails(emailsString)
        if (!emailsString) return setIsValidEmails(false)
        if (emailsString.includes(',')) {
            const aux = emailsString.split(',')
            const isValid = aux.some(element => !validateEmail(element))
            return isValid ? setIsValidEmails(false) : setIsValidEmails(true)
        }
        if (!emailsString.includes(',')) {
            if (!validateEmail(emailsString)) return setIsValidEmails(false)
            return setIsValidEmails(true)
        }
    }

    const handleGenerateReport = async () => {
        setLoading(true)
        let arrayEmails = []
        if (!emails.includes(',')) {
            arrayEmails.push({
                email: emails.trim(),
                name: emails.trim(),
            })
        }
        if (emails.includes(',')) {
            const aux = emails.split(',')
            arrayEmails = aux.map(mail => {
                return {
                    email: mail.trim(),
                    name: mail.trim(),
                }
            })
        }
        const dataMapped = MapDataToConsolidatedReport(
            companySelected,
            requestsPaymentFiltered,
            arrayEmails,
            showDateFilter && !!dateValueRange
                ? `${moment(dateValueRange[0]).format(FORMAT_DATE)} - ${moment(
                      dateValueRange[1]
                  ).format(FORMAT_DATE)}`
                : null,
            showContractFilter && !!contractSelected
                ? contractSelected.nro_contrato
                : null,
            showContractFilter && !!faenaSelected ? faenaSelected : null
        )
        const aux: IResponseRequestPayment =
            await generateConsolidatedReportService(dataMapped)
        if (!aux.err) {
            onCloseModal('sended', aux.msg)
            return
        }
        setMessageAlert({ message: aux.err, type: 'error', show: true })
        setLoading(false)
        return
    }

    //-----------------------------------------RENDERS
    const renderFilters = () => {
        return (
            <>
                <Col span={6}>
                    <Form layout="vertical">
                        <Form.Item label="Filtro de fecha">
                            <RangePicker
                                disabled={!showDateFilter}
                                onChange={e => setDateValueRange(e)}
                                format={FORMAT_DATE}
                                value={dateValueRange}
                            />
                            <Checkbox
                                style={{ paddingLeft: '1rem' }}
                                onChange={() =>
                                    setShowDateFilter(!showDateFilter)
                                }
                            ></Checkbox>
                        </Form.Item>
                    </Form>
                </Col>
                <Col
                    span={10}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: 'max-content',
                    }}
                >
                    <Form layout="vertical" style={{ width: '100%' }}>
                        <Form.Item
                            label="Filtro Contrato-Faena"
                            style={{ width: '100%' }}
                        >
                            <Select
                                style={{ width: '50%' }}
                                onSelect={(e: SelectValue) => {
                                    setFaenaSelected(null)
                                    handleGetFaenas(e.toString())
                                }}
                                placeholder="Contrato"
                                disabled={!showContractFilter}
                            >
                                {!!companySelected &&
                                    !!companySelected.contrato_faenas.length &&
                                    companySelected.contrato_faenas.map(
                                        (company, index) => (
                                            <Option
                                                key={index}
                                                value={company.nro_contrato}
                                            >
                                                {company.nro_contrato}
                                            </Option>
                                        )
                                    )}
                            </Select>
                            <Select
                                style={{ width: '40%' }}
                                onSelect={(e: SelectValue) =>
                                    setFaenaSelected(e.toString())
                                }
                                placeholder="Faena"
                                disabled={!showContractFilter}
                                value={faenaSelected || ''}
                            >
                                {!!contractSelected &&
                                    !!contractSelected.faenas.length &&
                                    contractSelected.faenas.map(
                                        (contract, index) => (
                                            <Option
                                                key={index}
                                                value={contract.name}
                                            >
                                                {contract.name}
                                            </Option>
                                        )
                                    )}
                            </Select>
                            <Checkbox
                                style={{ paddingLeft: '1rem' }}
                                onChange={() =>
                                    setShowContractFilter(!showContractFilter)
                                }
                            ></Checkbox>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    <Form layout="vertical">
                        <Form.Item label="Filtro Nombre Servicio">
                            <Select
                                style={{ width: '90%' }}
                                onSelect={(e: SelectValue) =>
                                    setServiceSelected(e.toString())
                                }
                                placeholder="Nombre Servicio"
                                disabled={!showServiceNameFilter}
                            >
                                {!!servicesSelected.length &&
                                    servicesSelected.map((service, index) => (
                                        <Option key={index} value={service}>
                                            {service}
                                        </Option>
                                    ))}
                            </Select>
                            <Checkbox
                                style={{ paddingLeft: '1rem' }}
                                onChange={() =>
                                    setShowServiceNameFilter(
                                        !showServiceNameFilter
                                    )
                                }
                            ></Checkbox>
                        </Form.Item>
                    </Form>
                </Col>
            </>
        )
    }

    const renderTableExams = () => {
        return (
            <Table
                style={{ width: '100%' }}
                showHeader={true}
                pagination={false}
                dataSource={requestsPaymentFiltered}
            >
                <Column
                    className="column-money"
                    title="Código"
                    dataIndex="codigo"
                    key="codigo"
                />
                <Column
                    className="column-money"
                    title="Fecha Cobranza"
                    dataIndex="fecha_cobranza"
                    key="fecha_cobranza"
                    render={(_, record: any) => {
                        return (
                            <>
                                <Text>
                                    {moment(
                                        record.fecha_cobranza,
                                        FORMAT_DATE
                                    ).format(FORMAT_DATE)}
                                </Text>
                            </>
                        )
                    }}
                />
                <Column
                    className="column-money"
                    title="Nombre Servicio"
                    dataIndex="nombre_servicio"
                    key="nombre_servicio"
                />
                <Column
                    className="column-money"
                    title="Rut Evaluado"
                    dataIndex="rut_cs"
                    key="rut_cs"
                />
                <Column
                    className="column-money"
                    title="Razon Social Evaluado"
                    dataIndex="razon_social_cs"
                    key="razon_social_cs"
                />
                <Column
                    className="column-money"
                    title="Valor Servicio"
                    dataIndex="valor_servicio"
                    key="valor_servicio"
                    render={(_, record: any) => {
                        return (
                            <>
                                <Text>{`$ ${MilesFormat(
                                    record.valor_servicio
                                )}`}</Text>
                            </>
                        )
                    }}
                />
                <Column
                    className="column-money"
                    title="Valor Cancelado"
                    dataIndex="valor_cancelado"
                    key="valor_cancelado"
                    render={(_, record: any) => {
                        return (
                            <>
                                <Text>{`$ ${MilesFormat(
                                    record.valor_cancelado
                                )}`}</Text>
                            </>
                        )
                    }}
                />
                <Column
                    className="column-money"
                    title="Valor Deuda"
                    dataIndex="valor_deuda"
                    key="valor_deuda"
                    render={(_, record: any) => {
                        return (
                            <>
                                <Text>{`$ ${MilesFormat(
                                    record.valor_deuda
                                )}`}</Text>
                            </>
                        )
                    }}
                />
            </Table>
        )
    }

    //---------------------------------------USEEFFECT
    useEffect(() => {
        getGIsCompanies()
    }, [])

    useEffect(() => {
        if (!!companySelected && !!companySelected._id) {
            getRequetsPaymentByGI()
        }
    }, [companySelected])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 3000)
        }
    }, [messageAlert])

    useEffect(() => {
        handleFilterRequestPayment()
    }, [dateValueRange, faenaSelected, serviceSelected])

    useEffect(() => {
        if (!showDateFilter) {
            setDateValueRange(null)
        }
        if (!showContractFilter) {
            setContractSelected(undefined)
            setFaenaSelected(null)
        }
        if (!showServiceNameFilter) {
            setServiceSelected(null)
        }
    }, [showDateFilter, showContractFilter, showServiceNameFilter])

    useEffect(() => {
        if (!emails) return setDisabledConfirm(true)
        if (!isValidEmails) return setDisabledConfirm(true)
        if (!!requestsPaymentFiltered && !requestsPaymentFiltered.length) {
            setDisabledConfirm(true)
        }
        if (!!requestsPaymentFiltered && !!requestsPaymentFiltered.length)
            return setDisabledConfirm(false)
    }, [isValidEmails, emails, requestsPaymentFiltered])

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                label="Proveedor"
                                validateStatus={
                                    !!companySelected ? 'success' : 'error'
                                }
                                help={
                                    !!companySelected
                                        ? ''
                                        : 'Seleccione proveedor'
                                }
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, optionOrgPert) =>
                                        optionOrgPert?.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        handleGetCompanySelected(e.toString())
                                    }
                                >
                                    {!!companies &&
                                        !!companies.length &&
                                        companies.map((company, index) => (
                                            <Option
                                                key={index}
                                                value={company._id}
                                            >
                                                {company.razon_social}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>{renderFilters()}</Row>
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
                            {renderTableExams()}
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
            <br />
            <Row>
                <Col span={24}>
                    <Form layout="vertical">
                        <Row gutter={8}>
                            <Col span="24">
                                <Form.Item
                                    label="Para enviar multiples correos, puede separarlos por coma (,)."
                                    validateStatus={
                                        isValidEmails ? 'success' : 'error'
                                    }
                                    help={
                                        isValidEmails
                                            ? ''
                                            : 'El correo o los correos ingresados no contienen el formato correcto.'
                                    }
                                >
                                    <Input
                                        placeholder="Ingrese los correos electrónicos"
                                        onChange={e =>
                                            handleValidEmails(
                                                e.currentTarget.value
                                            )
                                        }
                                        value={emails}
                                        id="error"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
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
                        onClick={() => handleGenerateReport()}
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
                        Generar Informe
                    </Button>
                </Col>
            </Row>
        </Spin>
    )
}

export default ConsolidatedReportView
