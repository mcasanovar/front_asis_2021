import React, { useState, useEffect } from 'react'

import { Input, Row, Col, Select, Form, Button } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import {
    ConfigurationGIModel,
    GiModel,
    IResponseEmployees,
} from '../../models/gi.models'
import { ROLES_GI } from '../../constants/var'
import { ConfigurationGIInitialization } from '../../initializations/gi.initialization'
import { editPasswordService } from '../../services'
import { IAlertMessageContent } from '../../models/index.models'

import AlertComponent from '../../component/Alert/Alert'
import { SelectValue } from 'antd/lib/select'

type IConfigurationGiProps = {
    onCloseModal: (value: string, message: string) => string | void
    giSelected: GiModel | undefined
}

const ConfigurationGi: React.FunctionComponent<IConfigurationGiProps> = ({
    onCloseModal,
    giSelected,
}) => {
    const { Option } = Select

    const [loading, setLoading] = useState<boolean>(false)
    const [newDataConfiguracionGI, setnewDataConfiguracionGI] =
        useState<ConfigurationGIModel>({
            ...ConfigurationGIInitialization,
            rol: giSelected?.rol || '',
        })
    const [isValidPassword, setisValidPassword] = useState<boolean>(false)
    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })

    const handleSaveConfiguration = async () => {
        setLoading(true)
        const aux: IResponseEmployees = await editPasswordService(
            giSelected?._id || '',
            newDataConfiguracionGI
        )
        if (aux.err === null) {
            onCloseModal('reload', aux.msg)
            setLoading(false)
            return
        }
    }

    const handleValidPassword = (confirmpass: string) => {
        setisValidPassword(
            newDataConfiguracionGI.new_password === confirmpass ? true : false
        )
    }

    //--------------------------------------USEEFECT
    useEffect(() => {
        if (!newDataConfiguracionGI.isEditPassword)
            return setDisabledConfirm(false)
        if (!isValidPassword) return setDisabledConfirm(true)
        return setDisabledConfirm(false)
    }, [newDataConfiguracionGI.isEditPassword, isValidPassword])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 3000)
        }
    }, [messageAlert])

    return (
        <Form layout="vertical">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            <Input.Group>
                <Row gutter={8}>
                    <Col span="12">
                        <Form.Item label="Rol">
                            <Select
                                style={{ width: '100%' }}
                                onSelect={(e: SelectValue) =>
                                    setnewDataConfiguracionGI({
                                        ...newDataConfiguracionGI,
                                        rol: !!e ? e.toString() : '',
                                    })
                                }
                                value={newDataConfiguracionGI.rol}
                            >
                                {ROLES_GI.map((rol, index) => (
                                    <Option key={index} value={rol}>
                                        {rol}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span="12">
                        <Form.Item label="¿Cambiar contraseña?">
                            <Select
                                style={{ width: '100%' }}
                                onSelect={(e: SelectValue) =>
                                    setnewDataConfiguracionGI({
                                        ...newDataConfiguracionGI,
                                        isEditPassword: !!e
                                            ? e.toString() === 'Si'
                                                ? true
                                                : false
                                            : false,
                                    })
                                }
                            >
                                <Option value="Si">Si</Option>
                                <Option value="No">No</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {newDataConfiguracionGI.isEditPassword && (
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                label="Nueva contraseña"
                                extra="La contraseña debe ser entre 6 y 12 caracteres"
                            >
                                <Input.Password
                                    maxLength={12}
                                    minLength={6}
                                    onChange={e =>
                                        setnewDataConfiguracionGI({
                                            ...newDataConfiguracionGI,
                                            new_password: e.currentTarget.value,
                                        })
                                    }
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                validateStatus={
                                    isValidPassword ? 'success' : 'error'
                                }
                                help={
                                    isValidPassword
                                        ? ''
                                        : 'Contraseñas no coinciden'
                                }
                                label="Repetir contraseña"
                            >
                                <Input.Password
                                    maxLength={12}
                                    minLength={6}
                                    onChange={e =>
                                        handleValidPassword(
                                            e.currentTarget.value
                                        )
                                    }
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                )}
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
                    span={4}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Button
                        onClick={() => handleSaveConfiguration()}
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
        </Form>
    )
}

export default ConfigurationGi
