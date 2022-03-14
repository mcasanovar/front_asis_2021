import React, { useState, useEffect } from 'react'
import {
    Collapse,
    Input,
    Row,
    Col,
    Form,
    Spin,
    Button,
    Table,
    Tag,
    Typography,
} from 'antd'
import {
    PhoneOutlined,
    MailOutlined,
    DownloadOutlined,
} from '@ant-design/icons'

import { GiModel, IFaena, IResponseGI } from '../../models/gi.models'
import { GiInitializationData } from '../../initializations/gi.initialization'
import {
    downloadGIFilesService,
    getOneGIService,
    httpExternalApi,
} from '../../services'
import { API_COUNTRIES } from '../../constants/var'
import { ICountries } from '../../models/index.models'
import { IAlertMessageContent } from '../../models/index.models'

import AlertComponent from '../../component/Alert/Alert'

type IDetailsGIViewProps = {
    onCloseModal: (value: string, message: string) => string | void
    _id?: string
}

const DetailsGIView: React.FunctionComponent<IDetailsGIViewProps> = ({
    onCloseModal,
    _id = '',
}) => {
    const { Column } = Table
    const { Title } = Typography
    const { Panel } = Collapse

    const [newGiData, setNewGiData] = useState<GiModel>(GiInitializationData)
    const [loading, setLoading] = useState<boolean>(false)
    const [countries, setCountries] = useState<ICountries[]>([])
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })

    const handleDownloadFile = () => {
        setLoading(true)
        downloadFile(newGiData?._id || '')
    }

    async function downloadFile(id: string) {
        const aux: IResponseGI = await downloadGIFilesService(id)
        if (!aux.err) {
            const arr = new Uint8Array(aux.res.data)
            const blob = new Blob([arr], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            const fileName = aux?.filename || 'examen'

            link.setAttribute('href', url)
            link.setAttribute('download', fileName)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            setLoading(false)
            return
        }

        setMessageAlert({ message: aux?.msg || '', type: 'error', show: true })
        setLoading(false)
        return
    }

    //--------USEEFECT
    useEffect(() => {
        setLoading(true)

        async function getOneGI() {
            console.log(_id)
            const aux: IResponseGI = await getOneGIService(_id)
            aux.err === null && setNewGiData(aux.res)
        }

        async function getCountries() {
            const aux = await httpExternalApi(API_COUNTRIES)
            setCountries(aux.response)
        }

        getOneGI()
        getCountries()
    }, [])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 3000)
        }
    }, [messageAlert])

    useEffect(() => {
        if (newGiData._id !== '' && countries.length > 0) {
            setLoading(false)
            const aux = countries.find(
                (country: ICountries) =>
                    country.alpha3Code === newGiData.pais_origen
            )
            if (!aux) return
            setNewGiData({ ...newGiData, pais_origen: aux.name })
        }
    }, [newGiData, countries])

    //---------RENDERS
    const renderTributaryInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Rut">
                                <Input
                                    aria-label="Rut"
                                    placeholder="Rut"
                                    name="rut"
                                    value={newGiData.rut}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label="Razon social">
                                <Input
                                    name="razon_social"
                                    value={newGiData.razon_social}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Nombre fantasia">
                                <Input
                                    name="nombre_fantasia"
                                    value={newGiData.nombre_fantasia}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item label="Actividad principal">
                                <Input
                                    name="actividad_principal"
                                    value={
                                        newGiData.actividad_principal.actividad
                                    }
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Rubro principal">
                                <Input
                                    placeholder="Rubro Principal"
                                    readOnly
                                    value={newGiData.rubro_principal}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item label="Actividad secundaria">
                                <Input
                                    name="actividad_secundaria"
                                    value={
                                        newGiData.actividad_secundaria.actividad
                                    }
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Rubro secundario">
                                <Input
                                    placeholder="Rubro secundario"
                                    readOnly
                                    value={newGiData.rubro_secundario}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Grupo interes">
                                <Input
                                    readOnly
                                    value={newGiData.grupo_interes}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Tipo cliente">
                                <Input readOnly value={newGiData.categoria} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Categoria empresa">
                                <Input
                                    readOnly
                                    value={newGiData.categoria_empresa}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Categoria cliente">
                                <Input
                                    readOnly
                                    value={newGiData.categoria_cliente}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Fecha inicio / nacimiento">
                                <Input
                                    readOnly
                                    value={newGiData.fecha_inic_mac}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Edad">
                                <Input readOnly value={newGiData.edad_gi} />
                            </Form.Item>
                        </Col>
                        {newGiData.categoria === 'Empresa/Organizacion' && (
                            <>
                                <Col span={6}>
                                    <Form.Item label="Crédito">
                                        <Input
                                            readOnly
                                            value={newGiData.credito}
                                        />
                                    </Form.Item>
                                </Col>
                                {newGiData.credito === 'Si' && (
                                    <Col span={6}>
                                        <Form.Item label="Dias crédito">
                                            <Input
                                                readOnly
                                                value={newGiData.dias_credito}
                                            />
                                        </Form.Item>
                                    </Col>
                                )}
                            </>
                        )}
                    </Row>
                    {newGiData.categoria === 'Empresa/Organizacion' && (
                        <>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <Form.Item label="Orden de compra">
                                        <Input
                                            readOnly
                                            value={newGiData.orden_compra}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Rol">
                                        <Input readOnly value={newGiData.rol} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form>
            </Input.Group>
        )
    }

    const renderContactInformaction = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Contacto primario">
                                <Input
                                    placeholder="Contacto primario"
                                    type="number"
                                    value={newGiData.contacto}
                                    prefix={<PhoneOutlined />}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Contacto secundario">
                                <Input
                                    placeholder="Contacto secundario"
                                    type="number"
                                    value={newGiData.contacto_2}
                                    prefix={<PhoneOutlined />}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Email primario">
                                <Input
                                    placeholder="Email primario"
                                    type="email"
                                    prefix={<MailOutlined />}
                                    value={newGiData.email_central}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Email secundario">
                                <Input
                                    placeholder="Email secundario"
                                    type="email"
                                    prefix={<MailOutlined />}
                                    value={newGiData.email_encargado}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item label="Dirección">
                                <Input
                                    placeholder="Dirección"
                                    readOnly
                                    value={newGiData.direccion}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Localidad">
                                <Input
                                    placeholder="Localidad"
                                    readOnly
                                    value={newGiData.localidad}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Comuna">
                                <Input readOnly value={newGiData.comuna} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Provincia">
                                <Input
                                    placeholder="Provincia"
                                    value={newGiData.provincia}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Región">
                                <Input
                                    placeholder="Región"
                                    value={newGiData.region}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Sector">
                                <Input readOnly value={newGiData.sector} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Nacionalidad">
                                <Input
                                    readOnly
                                    value={newGiData.nacionalidad}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="País origen">
                                <Input readOnly value={newGiData.pais_origen} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
        )
    }

    const renderPersonalWorkingInformation = () => {
        return (
            <Input.Group>
                <Form layout="vertical">
                    {newGiData.categoria === 'Persona Natural' && (
                        <>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Organización perteneciente">
                                        <Input
                                            readOnly
                                            value={
                                                newGiData.razon_social_org_perteneciente
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Profesión u oficio">
                                        <Input
                                            readOnly
                                            value={newGiData.profesion_oficio}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Form.Item label="Cargo">
                                        <Input
                                            readOnly
                                            value={newGiData.cargo}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Género">
                                        <Input
                                            readOnly
                                            value={newGiData.genero}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Nivel educacional">
                                        <Input
                                            readOnly
                                            value={newGiData.nivel_educacional}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <Form.Item label="Estado civil">
                                        <Input
                                            readOnly
                                            value={newGiData.estado_civil}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Grupo sanguineo">
                                        <Input
                                            readOnly
                                            value={newGiData.grupo_sanguineo}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Lentes ópticos">
                                        <Input
                                            readOnly
                                            value={newGiData.usa_lente_optico}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Lentes contacto">
                                        <Input
                                            readOnly
                                            value={newGiData.usa_lente_contacto}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Audífonos">
                                        <Input
                                            readOnly
                                            value={newGiData.usa_audifonos}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Form.Item label="Fecha vencimiento CI">
                                        <Input
                                            readOnly
                                            value={
                                                newGiData.fecha_vencimiento_ci
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Usa PC">
                                        <Input
                                            readOnly
                                            value={newGiData.usa_pc}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <Form.Item label="Licencia de conducir">
                                        <Input
                                            readOnly
                                            value={
                                                newGiData.licencia_conduccion
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                {newGiData.licencia_conduccion === 'Si' && (
                                    <>
                                        <Col span={6}>
                                            <Form.Item label="Tipo licencia">
                                                <Input
                                                    readOnly
                                                    value={
                                                        newGiData.clase_licencia
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item label="Ley aplicable">
                                                <Input
                                                    readOnly
                                                    value={
                                                        newGiData.ley_aplicable
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Fecha vencimiento licencia">
                                                <Input
                                                    readOnly
                                                    value={
                                                        newGiData.fecha_venc_licencia
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item label="Estado licencia">
                                                <Input
                                                    readOnly
                                                    value={
                                                        newGiData.estado_licencia
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}
                            </Row>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <Form.Item label="Nro. contrato">
                                        <Input
                                            readOnly
                                            value={newGiData.nro_contrato}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Seleccione faena">
                                        <Input
                                            readOnly
                                            value={newGiData.faena}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}></Col>
                            </Row>
                        </>
                    )}
                    {/* <br /> */}
                    {newGiData.categoria === 'Empresa/Organizacion' && (
                        <>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Form.Item label="Grado de formalización">
                                        <Input
                                            readOnly
                                            value={
                                                newGiData.grado_formalizacion
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={24}>
                                    {newGiData.contrato_faenas &&
                                        newGiData.contrato_faenas.length >
                                            0 && (
                                            <Table
                                                showHeader={true}
                                                dataSource={
                                                    newGiData.contrato_faenas
                                                }
                                                pagination={false}
                                            >
                                                <Column
                                                    className="column-money"
                                                    title="Nro. contrato"
                                                    dataIndex="nro_contrato"
                                                    key="nrocontrato"
                                                />
                                                <Column
                                                    title="Faenas"
                                                    dataIndex="faenas"
                                                    key="faenas"
                                                    className="column-money"
                                                    render={faenas => (
                                                        <>
                                                            {faenas.map(
                                                                (
                                                                    faena: IFaena,
                                                                    index: number
                                                                ) => (
                                                                    <Tag
                                                                        color="blue"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            faena.name
                                                                        }
                                                                    </Tag>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                />
                                            </Table>
                                        )}
                                </Col>
                            </Row>
                        </>
                    )}
                </Form>
            </Input.Group>
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
            <Title level={4}>{newGiData.razon_social}</Title>
            <Collapse accordion defaultActiveKey={['1']}>
                <Panel header="Datos Tributarios" key="1">
                    {renderTributaryInformation()}
                </Panel>
                <Panel header="Datos de Contacto" key="2">
                    {renderContactInformaction()}
                </Panel>
                <Panel header="Datos Personales / Laborales" key="3">
                    {renderPersonalWorkingInformation()}
                </Panel>
            </Collapse>
            <br />
            <Row gutter={8}>
                <Col span={4}>
                    <Button
                        onClick={() => handleDownloadFile()}
                        type="primary"
                        icon={<DownloadOutlined />}
                        disabled={!newGiData?.url_file_adjunto ? true : false}
                    >
                        Descargar Archivo
                    </Button>
                </Col>
                {!newGiData?.url_file_adjunto && (
                    <Col>
                        <Title level={5} style={{ color: 'gray' }}>
                            No se ha subido ningún archivo
                        </Title>
                    </Col>
                )}
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
        </Spin>
    )
}

export default DetailsGIView
