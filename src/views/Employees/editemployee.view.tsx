import React, { useState, useEffect } from 'react'
import {
    Col,
    Input,
    Row,
    Select,
    DatePicker,
    Button,
    Form,
    InputNumber,
    Spin,
} from 'antd'
import { DollarOutlined, InboxOutlined } from '@ant-design/icons'
import { GiModel, IResponseEmployees } from '../../models/gi.models'
import {
    AFP_LIST,
    CONTRACT_TYPES,
    FORMAT_DATE,
    ISAPRE_LIST,
    SECURITY_WORK,
} from '../../constants/var'
import { GiInitializationData } from '../../initializations/gi.initialization'
import moment, { Moment } from 'moment'
import { editEmployeeService } from '../../services'
import { IAlertMessageContent } from '../../models/index.models'
import { MapEmployeeToEdit } from '../../functions/mappers'

interface IEditEmployeeViewProps {
    onCloseModal: (value: string, message: string) => string | void
    employeesSelected: GiModel
}

const EditEmployeeView: React.FunctionComponent<IEditEmployeeViewProps> = ({
    onCloseModal,
    employeesSelected,
}) => {
    const { Option } = Select

    const [loading, setLoading] = useState<boolean>(false)
    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [newDataEmployee, setNewDataEmployee] = useState<GiModel>({
        ...employeesSelected,
        fecha_inicio_contrato: moment().format(FORMAT_DATE),
        fecha_fin_contrato: moment().format(FORMAT_DATE),
        estado_contrato: 'Vigente',
    })

    const handleComparateDates = (enddate: Moment) => {
        const aux = moment().diff(enddate, 'days')
        return aux > 0 ? 'No Vigente' : 'Vigente'
    }

    const handleEditEmployee = async () => {
        setLoading(true)
        const employeeMapped = MapEmployeeToEdit(newDataEmployee)
        const aux: IResponseEmployees = await editEmployeeService(
            employeesSelected?._id || '',
            employeeMapped
        )
        if (aux.err === null) {
            onCloseModal('reload', aux.msg)
        } else {
            return setMessageAlert({
                message: aux.err,
                type: 'error',
                show: true,
            })
        }
    }

    const handleStateContract = () => {
        if (newDataEmployee.tipo_contrato === 'Contrato Indefinido') {
            setNewDataEmployee({
                ...newDataEmployee,
                estado_contrato: 'Vigente',
                fecha_fin_contrato: '',
            })
        } else {
            setNewDataEmployee({
                ...newDataEmployee,
                estado_contrato: 'No Vigente',
                fecha_fin_contrato: moment().format(FORMAT_DATE),
            })
        }
    }

    //-------------------------------------------USEEFFECT

    useEffect(() => {
        if (!!newDataEmployee._id) {
            return setNewDataEmployee({
                ...newDataEmployee,
                fecha_inicio_contrato: moment().format(FORMAT_DATE),
                fecha_fin_contrato: moment().format(FORMAT_DATE),
            })
        }
    }, [newDataEmployee._id])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2500)
        }
    }, [messageAlert])

    useEffect(() => {
        handleStateContract()
    }, [newDataEmployee.tipo_contrato])

    useEffect(() => {
        if (newDataEmployee.fecha_fin_contrato !== '') {
            setNewDataEmployee({
                ...newDataEmployee,
                estado_contrato: handleComparateDates(
                    moment(newDataEmployee.fecha_fin_contrato)
                ),
            })
        }
    }, [newDataEmployee.fecha_fin_contrato])

    useEffect(() => {
        if (!!newDataEmployee.tipo_contrato && !!newDataEmployee.sueldo_bruto) {
            return setDisabledConfirm(false)
        }
        return setDisabledConfirm(true)
    }, [newDataEmployee])

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            <Form layout="vertical">
                <Input.Group>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label="Rut">
                                <Input
                                    readOnly
                                    value={employeesSelected?.rut}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Nombre">
                                <Input
                                    readOnly
                                    value={employeesSelected?.razon_social}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Cargo">
                                <Input
                                    readOnly
                                    value={employeesSelected?.cargo}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={10}>
                            <Form.Item
                                label="Tipo de contrato"
                                validateStatus={
                                    !!newDataEmployee.tipo_contrato
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    !!newDataEmployee.tipo_contrato
                                        ? ''
                                        : 'Seleccione'
                                }
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewDataEmployee({
                                            ...newDataEmployee,
                                            tipo_contrato: e.toString(),
                                        })
                                    }
                                    value={newDataEmployee.tipo_contrato}
                                >
                                    {CONTRACT_TYPES.map((contract, index) => (
                                        <Option key={index} value={contract}>
                                            {contract}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Fecha inicio contrato">
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format={FORMAT_DATE}
                                    onChange={e =>
                                        setNewDataEmployee({
                                            ...newDataEmployee,
                                            fecha_inicio_contrato:
                                                e?.format(FORMAT_DATE) || '',
                                        })
                                    }
                                    value={
                                        !newDataEmployee.fecha_inicio_contrato
                                            ? moment(new Date(), FORMAT_DATE)
                                            : moment(
                                                  newDataEmployee?.fecha_inicio_contrato,
                                                  FORMAT_DATE
                                              )
                                    }
                                />
                            </Form.Item>
                        </Col>
                        {newDataEmployee.tipo_contrato !==
                            'Contrato Indefinido' && (
                            <Col span={5}>
                                <Form.Item label="Fecha término contrato">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        format={FORMAT_DATE}
                                        onChange={e =>
                                            setNewDataEmployee({
                                                ...newDataEmployee,
                                                fecha_fin_contrato:
                                                    e?.format(FORMAT_DATE) ||
                                                    '',
                                            })
                                        }
                                        value={
                                            !newDataEmployee.fecha_fin_contrato
                                                ? moment(
                                                      new Date(),
                                                      FORMAT_DATE
                                                  )
                                                : moment(
                                                      newDataEmployee?.fecha_fin_contrato,
                                                      FORMAT_DATE
                                                  )
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        )}
                        <Col span={4}>
                            <Form.Item label="Estado">
                                <Input
                                    readOnly
                                    value={newDataEmployee?.estado_contrato}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item
                                label="Sueldo bruto"
                                validateStatus={
                                    !!newDataEmployee.sueldo_bruto
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    !!newDataEmployee.sueldo_bruto
                                        ? ''
                                        : 'Seleccione'
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
                                            value?.replace(/\$\s?|(,*)/g, '') ||
                                                '0'
                                        )
                                    }
                                    onChange={e =>
                                        setNewDataEmployee({
                                            ...newDataEmployee,
                                            sueldo_bruto: parseInt(
                                                e.toString()
                                            ),
                                        })
                                    }
                                    value={newDataEmployee.sueldo_bruto}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="AFP">
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewDataEmployee({
                                            ...newDataEmployee,
                                            afp: e.toString(),
                                        })
                                    }
                                    value={newDataEmployee.afp}
                                >
                                    {AFP_LIST.map((afp, index) => (
                                        <Option key={index} value={afp}>
                                            {afp}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="ISAPRE">
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewDataEmployee({
                                            ...newDataEmployee,
                                            isapre: e.toString(),
                                        })
                                    }
                                    value={newDataEmployee.isapre}
                                >
                                    {ISAPRE_LIST.map((isapre, index) => (
                                        <Option key={index} value={isapre}>
                                            {isapre}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item label="Seguridad laboral">
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={e =>
                                        setNewDataEmployee({
                                            ...newDataEmployee,
                                            seguridad_laboral: e.toString(),
                                        })
                                    }
                                    value={newDataEmployee.seguridad_laboral}
                                >
                                    {SECURITY_WORK.map((security, index) => (
                                        <Option key={index} value={security}>
                                            {security}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="Comentarios">
                                <Input
                                    onChange={e =>
                                        setNewDataEmployee({
                                            ...newDataEmployee,
                                            comentarios: e.currentTarget.value,
                                        })
                                    }
                                    value={newDataEmployee.comentarios}
                                />
                            </Form.Item>
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
                        span={5}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            onClick={() => onCloseModal('', '')}
                            style={{
                                backgroundColor: '#E10D17',
                                color: 'white',
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleEditEmployee()}
                            disabled={disabledConfirm}
                            style={
                                !disabledConfirm
                                    ? {
                                          backgroundColor: 'orange',
                                          borderColor: 'orange',
                                          color: 'white',
                                      }
                                    : {
                                          backgroundColor: 'grey',
                                          borderColor: 'grey',
                                          color: 'white',
                                      }
                            }
                        >
                            Guardar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Spin>
    )
}

export default EditEmployeeView
