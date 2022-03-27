import React, { useState, useEffect } from 'react'
import SubBarComponent from '../../component/Subbar/SubBar'
import { IAlertMessageContent } from '../../models/index.models'
import { Spin, Typography, Collapse, Row, Col, Switch } from 'antd'

import AlertComponent from '../../component/Alert/Alert'
import { getPermissionsAdmin } from '../../services'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'

type PermissionsAdminProps = {
    authorized: boolean
}

const PermissionsView: React.FunctionComponent<
    PermissionsAdminProps
> = ({}) => {
    const { Title, Paragraph } = Typography
    const { Panel } = Collapse

    const [loading, setLoading] = useState(false)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [permissions, setPermissions] = useState({})

    async function handleGetPermissions() {
        setLoading(true)

        const aux = await getPermissionsAdmin()

        if (aux.err !== null) {
            setLoading(false)
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            return
        }

        // console.log(aux.res)
        setPermissions(aux.res)

        setLoading(false)
    }

    // ----------------------------------- RENDERS
    const renderModulePermissions = (module: any) => {
        const { acciones: actions } = module

        return (
            <>
                <Row>
                    {Object.entries(module).map((item, index) => {
                        if (item[0].includes('modulo_')) {
                            return (
                                <Col
                                    key={index}
                                    style={{
                                        borderStyle: 'solid',
                                        borderWidth: '1px',
                                        borderColor: 'grey',
                                        padding: '1rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={8}
                                    xl={8}
                                >
                                    <div>{item[0].replace('_', ' ')}</div>
                                    <div>
                                        <Switch
                                            defaultChecked
                                            checked={Boolean(item[1])}
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={
                                                <CloseOutlined />
                                            }
                                        />
                                    </div>
                                </Col>
                            )
                        }
                    })}
                </Row>
                <Title style={{ fontSize: '1rem', padding: '10px' }}>
                    Permisos individuales
                </Title>
                <Row>
                    {Object.entries(actions).map((action, index) => (
                        <Col
                            key={index}
                            style={{
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderColor: 'grey',
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            xl={4}
                        >
                            <div>{action[0].replace('_', ' ')}</div>
                            <div>
                                <Switch
                                    defaultChecked
                                    checked={Boolean(action[1])}
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            </>
        )
    }

    //----------------------------------------USEEFECT

    useEffect(() => {
        handleGetPermissions()
    }, [])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2000)
        }
    }, [messageAlert])

    return (
        <div className="container-gi">
            <SubBarComponent title="Permisos administrativos" />
            <Spin spinning={loading}>
                <div style={{ padding: '2rem' }}>
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
                        {'Permisos Administrativos'}
                    </Title>
                    <br />
                    <br />
                    <Collapse
                        accordion
                        defaultActiveKey={['0']}
                        style={{
                            minWidth: 1100,
                        }}
                    >
                        {Object.entries(permissions).map((module, index) => (
                            <Panel header={module[0].toUpperCase()} key={index}>
                                {renderModulePermissions(module[1])}
                            </Panel>
                        ))}
                    </Collapse>
                    <br />
                    <br />
                </div>
            </Spin>
        </div>
    )
}

export default PermissionsView
