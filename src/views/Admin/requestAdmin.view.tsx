import React, { useState, useEffect } from 'react'
import {
    Collapse,
    Input,
    Row,
    Col,
    Select,
    DatePicker,
    Spin,
    Typography,
    Button,
    Form,
    InputNumber,
    TimePicker,
} from 'antd'
import { IAlertMessageContent } from '../../models/index.models'

import AlertComponent from '../../component/Alert/Alert'

import {
    ICategory1,
    ICategory2,
    ICategory3,
    ICategory4,
    IResponseRequest,
    RequestModel,
} from '../../models/request.models'
import { RequestInitialization } from '../../initializations/request.initialization'
import {
    CATEGORIES_REQUESTS,
    DEFAULT_PERCENTAGE_IVA,
    FORMAT_DATE,
    SERVICES_TYPE,
    SERVICES_PLACE,
    SUCURSAL,
} from '../../constants/var'
import moment, { Moment } from 'moment'
import SubBarComponent from '../../component/Subbar/SubBar'
import { GiModel, IContract, IFaena, IResponseGI } from '../../models/gi.models'
import {
    getGIByRutService,
    getRequestsByCode,
    getWorkersGIService,
    updateRequestAdmin,
} from '../../services'
import { SelectValue } from 'antd/lib/select'
import { FormatingRut } from '../../functions/validators/index.validators'
import { capitalize } from '../../libs/capitalize'
import { MilesFormat } from '../../libs/formattedPesos'
import { CalculateIVA } from '../../libs/calculateIVA'

type IRequestAdminViewProps = {
    authorized: boolean
}

type IFilterSelected = {
    headerFilter: string
    filter: string
}

type ISelectedCategories = {
    level_1: number
    level_2: number
    level_3: number
}

const ResquestAdminView: React.FunctionComponent<IRequestAdminViewProps> = ({
    authorized,
}) => {
    const { Title, Paragraph } = Typography
    const { Panel } = Collapse
    const { Option } = Select
    const { TextArea, Search } = Input

    const [codeRequest, setCodeRequest] = useState('')
    const [newRequestData, setNewRequestData] = useState<RequestModel>(
        RequestInitialization
    )
    const [loading, setLoading] = useState<boolean>(false)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [workers, setWorkers] = useState<GiModel[]>([])
    const [primaryClient, setPrimaryClient] = useState<GiModel>()
    const [secondaryClient, setSecondaryClient] = useState<GiModel>()
    const [faenasSelected, setFaenasSelected] = useState<IFaena[]>([])
    const [selectionsCategories, setSelectionsCategories] =
        useState<ISelectedCategories>({ level_1: 0, level_2: 0, level_3: 0 })
    const [disabledTextInput, setDisabledTextInput] = useState(true)

    async function handleUpdateRequest() {
        if (!newRequestData.sucursal) return

        setLoading(true)

        const aux: IResponseRequest = await updateRequestAdmin(
            newRequestData._id,
            newRequestData
        )

        if (aux.err !== null) {
            setLoading(false)
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            return
        }

        setMessageAlert({ message: aux.msg, type: 'success', show: true })

        setLoading(false)
    }

    async function handleGetRequest() {
        if (!codeRequest) return

        setLoading(true)

        const aux: IResponseGI = await getRequestsByCode(codeRequest)

        if (aux.err !== null) {
            setLoading(false)
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            return
        }

        getWorkers()

        const request: RequestModel = aux.res

        const lastObservation = request.observacion_solicitud || ''
        setNewRequestData({
            ...request,
            observacion_solicitud: lastObservation,
        })

        // handleWorkDay();

        handleSearchClient(request.rut_CP, 'primary')
        handleSearchClient(request.rut_cs, 'secondary')

        setDisabledTextInput(false)

        setLoading(false)
    }

    const handleSelectRequestDate = (e: Moment) => {
        setNewRequestData({
            ...newRequestData,
            fecha_solicitud: e.format(FORMAT_DATE),
            hora_solicitud: e.format('HH:mm'),
            mes_solicitud: capitalize(e.format('MMMM')),
            anio_solicitud: e.format('YYYY'),
        })
    }

    const handleFormattedPrices = (price: number, type: string) => {
        setNewRequestData({ ...newRequestData, [type]: price })
    }

    const handleSelectCategory = (id: number, category: number) => {
        let aux: ICategory1 | ICategory2 | ICategory3 | ICategory4 | undefined
        let data: RequestModel | undefined = undefined
        let selectedCategories: ISelectedCategories | undefined = undefined

        if (category === 1) {
            aux = CATEGORIES_REQUESTS.find(category => category.id === id)
            if (!aux) return
            selectedCategories = { ...selectionsCategories, level_1: id }
            data = {
                ...newRequestData,
                categoria1: aux.nivel_1,
                categoria2: '',
                categoria3: '',
                nombre_servicio: '',
            }
        }

        if (category === 2) {
            aux = CATEGORIES_REQUESTS[
                selectionsCategories.level_1 - 1
            ].nivel_2.find(category => category.id === id)
            if (!aux) return
            selectedCategories = { ...selectionsCategories, level_2: id }
            data = {
                ...newRequestData,
                categoria2: aux.nivel_2,
                categoria3: '',
                nombre_servicio: '',
            }
        }

        if (category === 3) {
            aux = CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2[
                selectionsCategories.level_2 - 1
            ].nivel_3.find(category => category.id === id)
            if (!aux) return
            selectedCategories = { ...selectionsCategories, level_3: id }
            data = {
                ...newRequestData,
                categoria3: aux.nivel_3,
                nombre_servicio: '',
            }
        }

        setSelectionsCategories(selectedCategories ?? selectionsCategories)
        setNewRequestData(data ?? RequestInitialization)
    }

    const handleSelectServiceName = (name: string) => {
        const aux = CATEGORIES_REQUESTS[
            selectionsCategories.level_1 - 1
        ].nivel_2[selectionsCategories.level_2 - 1].nivel_3[
            selectionsCategories.level_3 - 1
        ].nivel_4.find(category => category.nivel_4 === name)
        if (!aux) return
        setNewRequestData({ ...newRequestData, nombre_servicio: aux.nivel_4 })
    }

    const handleSearchClient = (rut: string, type: string) => {
        const rutFormatted = FormatingRut(rut)
        // setNewRequestData({ ...newRequestData, rut_CP: rutFormatted });
        type === 'primary'
            ? getGIByRut(rutFormatted, 1)
            : getGIByRut(rutFormatted, 2)
    }

    async function getGIByRut(rut: string, typeRequest: number) {
        setLoading(true)
        const aux: IResponseGI = await getGIByRutService(rut, typeRequest)
        if (aux.err !== null && aux.err !== 98) {
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            setLoading(false)
            return
        }

        if (aux.err === 98) {
            setMessageAlert({
                message: 'No se ha encontrado ningun GI',
                type: 'error',
                show: true,
            })
            setLoading(false)
            return
        }

        if (typeRequest === 1) {
            // setNewRequestData({ ...newRequestData, razon_social_CP: aux.res.razon_social, rut_CP: aux.res.rut, id_GI_Principal: aux.res._id });
            setPrimaryClient(aux.res)
        } else {
            // setNewRequestData({ ...newRequestData, razon_social_cs: aux.res.razon_social, rut_cs: aux.res.rut, id_GI_Secundario: aux.res._id });
            setSecondaryClient(aux.res)
        }

        setLoading(false)
    }

    const handleWorkDay = (hour: string) => {
        const arrayHour = hour.split(':')
        if (
            (parseInt(arrayHour[0]) >= 6 && parseInt(arrayHour[0]) < 20) ||
            (parseInt(arrayHour[0]) === 20 && parseInt(arrayHour[1]) === 0)
        ) {
            setNewRequestData({
                ...newRequestData,
                hora_servicio_solicitado: hour,
                jornada: 'Diurna',
            })
        } else {
            setNewRequestData({
                ...newRequestData,
                hora_servicio_solicitado: hour,
                jornada: 'Vespertina',
            })
        }
    }

    const handleSetContractNumber = (nro: string) => {
        setNewRequestData({
            ...newRequestData,
            nro_contrato_seleccionado_cp: nro,
        })
        const aux = primaryClient?.contrato_faenas.find(
            (contract: IContract) => contract.nro_contrato === nro
        )
        if (!aux) return
        setFaenasSelected(aux.faenas)
        setNewRequestData({
            ...newRequestData,
            nro_contrato_seleccionado_cp: aux.nro_contrato,
            faena_seleccionada_cp: '',
        })
    }

    async function getWorkers() {
        const aux: IResponseGI = await getWorkersGIService()
        aux.err === null && setWorkers(aux.res || [])
        return
    }

    //---------------------------------------------------------------USEEFFECTS
    useEffect(() => {
        if (newRequestData.tipo_servicio === 'Online') {
            setNewRequestData({
                ...newRequestData,
                lugar_servicio: 'No Aplica',
                sucursal: 'Fuera de oficina',
            })
        }
        if (newRequestData.tipo_servicio === 'Presencial') {
            setNewRequestData({
                ...newRequestData,
                lugar_servicio: 'Oficina',
                sucursal: '',
            })
        }
    }, [newRequestData.tipo_servicio])

    useEffect(() => {
        if (newRequestData.lugar_servicio === 'Terreno') {
            setNewRequestData({
                ...newRequestData,
                sucursal: 'Fuera de oficina',
            })
        }
        if (newRequestData.lugar_servicio === 'Oficina') {
            setNewRequestData({ ...newRequestData, sucursal: '' })
        }
    }, [newRequestData.lugar_servicio])

    //----------------------------------------------------------------RENDERS
    const renderServiceInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Fecha solicitud">
                                <DatePicker
                                    format={`${FORMAT_DATE}`}
                                    style={{ width: '100%' }}
                                    value={
                                        !!newRequestData.fecha_solicitud
                                            ? moment(
                                                  newRequestData.fecha_solicitud,
                                                  FORMAT_DATE
                                              )
                                            : undefined
                                    }
                                    onSelect={(e: Moment) =>
                                        handleSelectRequestDate(e)
                                    }
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="Mes solicitud">
                                <Input
                                    readOnly
                                    value={newRequestData.mes_solicitud}
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="Año solicitud">
                                <Input
                                    readOnly
                                    value={newRequestData.anio_solicitud}
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Categoria 1">
                                <Select
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    onSelect={(e: any) =>
                                        handleSelectCategory(
                                            parseInt(e.toString()),
                                            1
                                        )
                                    }
                                    // filterOption={(input, option) =>
                                    //     option.children
                                    //         .toLowerCase()
                                    //         .indexOf(input.toLowerCase()) >= 0
                                    // }
                                    value={newRequestData.categoria1}
                                    disabled={disabledTextInput}
                                >
                                    {CATEGORIES_REQUESTS.map(
                                        (category: ICategory1, index) => (
                                            <Option
                                                key={index}
                                                value={category.id}
                                            >
                                                {category.nivel_1}
                                            </Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Categoria 2">
                                <Select
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    onSelect={(e: SelectValue) =>
                                        handleSelectCategory(
                                            parseInt(!!e ? e.toString() : ''),
                                            2
                                        )
                                    }
                                    // filterOption={(input, option) =>
                                    //     /* eslint-disable */
                                    //     option?.children
                                    //         .toLowerCase()
                                    //         .indexOf(input.toLowerCase()) >= 0
                                    // }
                                    value={newRequestData.categoria2}
                                    disabled={disabledTextInput}
                                >
                                    {selectionsCategories.level_1 > 0 &&
                                        CATEGORIES_REQUESTS[
                                            selectionsCategories.level_1 - 1
                                        ].nivel_2.map((category, index) => (
                                            <Option
                                                key={index}
                                                value={category.id}
                                            >
                                                {category.nivel_2}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Categoria 3">
                                <Select
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    onSelect={(e: SelectValue) =>
                                        handleSelectCategory(
                                            parseInt(!!e ? e.toString() : ''),
                                            3
                                        )
                                    }
                                    // filterOption={(input, option) =>
                                    //     /* eslint-disable */
                                    //     option.children
                                    //         .toLowerCase()
                                    //         .indexOf(input.toLowerCase()) >= 0
                                    // }
                                    value={newRequestData.categoria3}
                                    disabled={disabledTextInput}
                                >
                                    {selectionsCategories.level_2 > 0 &&
                                        CATEGORIES_REQUESTS[
                                            selectionsCategories.level_1 - 1
                                        ].nivel_2[
                                            selectionsCategories.level_2 - 1
                                        ].nivel_3.map((category, index) => (
                                            <Option
                                                key={index}
                                                value={category.id}
                                            >
                                                {category.nivel_3}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={9}>
                            <Form.Item label="Nombre servicio">
                                <Select
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    onSelect={(e: SelectValue) =>
                                        handleSelectServiceName(
                                            !!e ? e.toString() : ''
                                        )
                                    }
                                    // filterOption={(input, option) =>
                                    //     option?.children
                                    //         .toLowerCase()
                                    //         .indexOf(input.toLowerCase()) >= 0
                                    // }
                                    value={newRequestData.nombre_servicio}
                                    disabled={disabledTextInput}
                                >
                                    {selectionsCategories.level_3 > 0 &&
                                        CATEGORIES_REQUESTS[
                                            selectionsCategories.level_1 - 1
                                        ].nivel_2[
                                            selectionsCategories.level_2 - 1
                                        ].nivel_3[
                                            selectionsCategories.level_3 - 1
                                        ].nivel_4.map((category, index) => (
                                            <Option
                                                key={index}
                                                value={category.nivel_4}
                                            >
                                                {category.nivel_4}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Tipo servicio">
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            tipo_servicio: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={newRequestData.tipo_servicio}
                                    disabled={disabledTextInput}
                                >
                                    {SERVICES_TYPE.map((service, index) => (
                                        <Option key={index} value={service}>
                                            {service}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Lugar servicio">
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            lugar_servicio: !!e
                                                ? e.toString()
                                                : '',
                                        })
                                    }
                                    value={newRequestData.lugar_servicio}
                                    disabled={disabledTextInput}
                                >
                                    {newRequestData.tipo_servicio ===
                                    'Presencial' ? (
                                        SERVICES_PLACE.map((service, index) => (
                                            <Option key={index} value={service}>
                                                {service}
                                            </Option>
                                        ))
                                    ) : (
                                        <Option value="No Aplica">
                                            No Aplica
                                        </Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="Sucursal"
                                validateStatus={
                                    newRequestData.sucursal !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    newRequestData.sucursal !== ''
                                        ? ''
                                        : 'Debe seleccionar una sucursal'
                                }
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    // onChange={() => {}}
                                    onSelect={(e: any) =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            sucursal: e.toString(),
                                        })
                                    }
                                    value={newRequestData.sucursal}
                                    disabled={disabledTextInput}
                                >
                                    {newRequestData.lugar_servicio ===
                                    'Oficina' ? (
                                        SUCURSAL.map((sucursal, index) => (
                                            <Option
                                                key={index}
                                                value={sucursal}
                                            >
                                                {sucursal}
                                            </Option>
                                        ))
                                    ) : (
                                        <Option value="Fuera de oficina">
                                            Fuera de oficina
                                        </Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={5}>
                            <Form.Item label="Monto neto">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    type="number"
                                    onChange={value =>
                                        handleFormattedPrices(
                                            parseInt(value.toString()),
                                            'monto_neto'
                                        )
                                    }
                                    value={newRequestData.monto_neto}
                                    disabled={disabledTextInput}
                                />
                                <Paragraph>{`$${MilesFormat(
                                    newRequestData.monto_neto
                                )}.-`}</Paragraph>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Porcentaje impuesto">
                                <InputNumber
                                    defaultValue={DEFAULT_PERCENTAGE_IVA}
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    onChange={value =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            porcentaje_impuesto: value,
                                        })
                                    }
                                    value={newRequestData.porcentaje_impuesto}
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Valor mpuesto">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    type="number"
                                    onChange={value =>
                                        handleFormattedPrices(
                                            parseInt(value.toString()),
                                            'valor_impuesto'
                                        )
                                    }
                                    value={newRequestData.valor_impuesto}
                                    disabled={disabledTextInput}
                                />
                                <Paragraph>{`$${MilesFormat(
                                    newRequestData.valor_impuesto
                                )}.-`}</Paragraph>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Exento">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    type="number"
                                    onChange={value =>
                                        handleFormattedPrices(
                                            parseInt(value.toString()),
                                            'exento'
                                        )
                                    }
                                    value={newRequestData.exento}
                                    disabled={disabledTextInput}
                                />
                                <Paragraph>{`$${MilesFormat(
                                    newRequestData.exento
                                )}.-`}</Paragraph>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Monto total">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    type="number"
                                    onChange={value =>
                                        handleFormattedPrices(
                                            parseInt(value.toString()),
                                            'monto_total'
                                        )
                                    }
                                    value={newRequestData.monto_total}
                                    disabled={disabledTextInput}
                                />
                                <Paragraph>{`$${MilesFormat(
                                    newRequestData.monto_total
                                )}.-`}</Paragraph>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Descripción del servicio">
                                <TextArea
                                    rows={2}
                                    onChange={e =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            descripcion_servicio:
                                                e.currentTarget.value,
                                        })
                                    }
                                    value={newRequestData.descripcion_servicio}
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    const renderClientInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item label="Nombre receptor">
                                <Input
                                    disabled
                                    value={newRequestData.nombre_receptor}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                validateStatus={
                                    newRequestData.id_GI_PersonalAsignado !== ''
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    newRequestData.id_GI_PersonalAsignado !== ''
                                        ? ''
                                        : 'Debe seleccionar un profesional asignado'
                                }
                                label="Profesional asignado"
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            id_GI_PersonalAsignado:
                                                e.toString(),
                                        })
                                    }
                                    id="error"
                                    value={
                                        newRequestData.id_GI_PersonalAsignado
                                    }
                                    disabled={disabledTextInput}
                                >
                                    {workers.length > 0 &&
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
                    </Row>
                    <Row>
                        <Col span={24}>
                            <h2>Cliente principal</h2>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col span={4}>
                            <Form.Item
                                // validateStatus={isRutOk ? 'success' : 'error'}
                                // help={isRutOk ? '' : 'Formato de rut incorrecto'}
                                label="Rut"
                            >
                                <Input
                                    disabled
                                    value={newRequestData.rut_CP || ''}
                                />

                                {/* <Search
                  aria-label='Rut'
                  placeholder="Rut"
                  name='rut'
                  allowClear
                  enterButton
                  disabled
                  onChange={(e) => setNewRequestData({ ...newRequestData, rut_CP: e.currentTarget.value })}
                  onSearch={(e) => handleSearchPrimaryClient(e.toString())}
                  value={newRequestData.rut_CP}
                  id='error'
                /> */}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Razon social">
                                <Input
                                    disabled
                                    value={newRequestData.razon_social_CP || ''}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Nombre fantasia / Pseudónimo">
                                <Input
                                    disabled
                                    readOnly
                                    value={primaryClient?.nombre_fantasia || ''}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Contrato">
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={e =>
                                        handleSetContractNumber(e.toString())
                                    }
                                    value={
                                        newRequestData.nro_contrato_seleccionado_cp
                                    }
                                    disabled={disabledTextInput}
                                >
                                    {primaryClient?.contrato_faenas &&
                                        primaryClient.contrato_faenas.map(
                                            contract => (
                                                <Option
                                                    value={
                                                        contract.nro_contrato
                                                    }
                                                >
                                                    {contract.nro_contrato}
                                                </Option>
                                            )
                                        )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Seleccione faena">
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={e =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            faena_seleccionada_cp: e.toString(),
                                        })
                                    }
                                    value={newRequestData.faena_seleccionada_cp}
                                    disabled={disabledTextInput}
                                >
                                    {faenasSelected &&
                                        faenasSelected.length > 0 &&
                                        faenasSelected.map((faena, index) => (
                                            <Option
                                                key={index}
                                                value={faena.name}
                                            >
                                                {faena.name}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <h2>Cliente Secundario</h2>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col span={4}>
                            <Form.Item
                                // validateStatus={isRutOk ? 'success' : 'error'}
                                // help={isRutOk ? '' : 'Formato de rut incorrecto'}
                                label="Rut"
                            >
                                <Input
                                    disabled
                                    value={newRequestData.rut_cs || ''}
                                />

                                {/* <Search
                  aria-label='Rut'
                  placeholder="Rut"
                  name='rut'
                  allowClear
                  enterButton
                  onChange={(e) => setNewRequestData({ ...newRequestData, rut_cs: e.currentTarget.value })}
                  onSearch={(e) => handleSearchSecondaryClient(e.toString())}
                  value={newRequestData.rut_cs}
                  id='error'
                /> */}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Razon social">
                                <Input
                                    disabled
                                    readOnly
                                    value={newRequestData.razon_social_cs || ''}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Licencia de conducir">
                                <Input
                                    disabled
                                    readOnly
                                    value={
                                        secondaryClient?.licencia_conduccion ||
                                        ''
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Nombre fantasia / Pseudónimo">
                                <Input
                                    disabled
                                    readOnly
                                    value={
                                        secondaryClient?.nombre_fantasia || ''
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Clase licencia conducir">
                                <Select
                                    mode="multiple"
                                    disabled
                                    value={
                                        secondaryClient?.clase_licencia || ''
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ley aplicable">
                                <Input
                                    disabled
                                    readOnly
                                    value={secondaryClient?.ley_aplicable}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    const renderPreliminaryInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Fecha inicio reserva preliminar">
                                <DatePicker
                                    format={FORMAT_DATE}
                                    style={{ width: '100%' }}
                                    onSelect={(e: Moment) =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            fecha_servicio_solicitado:
                                                e.format(FORMAT_DATE),
                                        })
                                    }
                                    value={
                                        !!newRequestData.fecha_servicio_solicitado
                                            ? moment(
                                                  newRequestData.fecha_servicio_solicitado,
                                                  FORMAT_DATE
                                              )
                                            : undefined
                                    }
                                    disabled={disabledTextInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Hora inicio reserva preliminar">
                                <TimePicker
                                    style={{ width: '100%' }}
                                    format="HH:mm"
                                    onChange={e => {
                                        // setNewRequestData({ ...newRequestData, hora_servicio_solicitado: e?.format('HH:mm') || '' })
                                        handleWorkDay(e?.format('HH:mm') || '')
                                    }}
                                    disabled={disabledTextInput}
                                    value={
                                        newRequestData.hora_servicio_solicitado !==
                                        ''
                                            ? moment(
                                                  `${newRequestData.fecha_servicio_solicitado} ${newRequestData.hora_servicio_solicitado}`,
                                                  `${FORMAT_DATE} HH:mm`
                                              )
                                            : undefined
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Fecha término reserva preliminar">
                                <DatePicker
                                    format={FORMAT_DATE}
                                    style={{ width: '100%' }}
                                    onSelect={(e: Moment) =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            fecha_servicio_solicitado_termino:
                                                e.format(FORMAT_DATE),
                                        })
                                    }
                                    disabled={disabledTextInput}
                                    value={
                                        newRequestData.fecha_servicio_solicitado_termino !==
                                        ''
                                            ? moment(
                                                  newRequestData.fecha_servicio_solicitado_termino,
                                                  FORMAT_DATE
                                              )
                                            : undefined
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Hora término reserva preliminar">
                                <TimePicker
                                    style={{ width: '100%' }}
                                    format="HH:mm"
                                    onChange={e =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            hora_servicio_solicitado_termino:
                                                e?.format('HH:mm') || '',
                                        })
                                    }
                                    disabled={disabledTextInput}
                                    value={
                                        newRequestData.hora_servicio_solicitado_termino !==
                                        ''
                                            ? moment(
                                                  `${newRequestData.fecha_servicio_solicitado_termino} ${newRequestData.hora_servicio_solicitado_termino}`,
                                                  `${FORMAT_DATE} HH:mm`
                                              )
                                            : undefined
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item label="Jornada">
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            jornada: !!e ? e.toString() : '',
                                        })
                                    }
                                    value={newRequestData.jornada}
                                    disabled={disabledTextInput}
                                >
                                    <Option value="Diurna">Diurna</Option>
                                    <Option value="Vespertina">
                                        Vespertina
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Observacion solicitud">
                                <TextArea
                                    rows={3}
                                    onChange={e =>
                                        setNewRequestData({
                                            ...newRequestData,
                                            observacion_solicitud:
                                                e.currentTarget.value,
                                        })
                                    }
                                    defaultValue={
                                        newRequestData.observacion_solicitud[
                                            newRequestData.observacion_solicitud
                                                .length - 1 || 0
                                        ]
                                    }
                                    value={newRequestData.observacion_solicitud}
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
        const aux = CalculateIVA(
            newRequestData.monto_neto,
            newRequestData.porcentaje_impuesto
        )
        const total = newRequestData.monto_neto + aux + newRequestData.exento
        setNewRequestData({
            ...newRequestData,
            valor_impuesto: aux,
            monto_total: total,
        })
        // eslint-disable-next-line
    }, [
        newRequestData.monto_neto,
        newRequestData.porcentaje_impuesto,
        newRequestData.exento,
    ])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2000)
        }
    }, [messageAlert])

    return (
        <div className="container-gi">
            <SubBarComponent title="Resultados" />
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
                    {'Administración de Solicitudes'}
                </Title>
                <br />
                <Title
                    level={5}
                    style={{ textAlign: 'left', marginTop: '10px' }}
                >
                    {'Busqueda por Código de Solicitud'}
                </Title>
                <Search
                    placeholder="Ingrese el código de la solicitud..."
                    enterButton="Buscar"
                    size="middle"
                    loading={false}
                    style={{ width: '100%', height: '2rem', marginLeft: 0 }}
                    onChange={e => setCodeRequest(e.currentTarget.value)}
                    onSearch={() => handleGetRequest()}
                />
                <br />
                <br />
                <Collapse
                    accordion
                    defaultActiveKey={['1']}
                    style={{ minWidth: 1100 }}
                >
                    <Panel header="Datos del servicio" key="1">
                        {renderServiceInformation()}
                    </Panel>
                    <Panel header="Datos del cliente" key="2">
                        {renderClientInformation()}
                    </Panel>
                    <Panel header="Datos Preliminares" key="3">
                        {renderPreliminaryInformation()}
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
                    <Col>
                        <Button
                            onClick={() => handleUpdateRequest()}
                            disabled={!!newRequestData._id ? false : true}
                            style={
                                !!newRequestData._id
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

export default ResquestAdminView
