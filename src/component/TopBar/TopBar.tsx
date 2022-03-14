import { FunctionComponent, useState, useEffect } from 'react'
import { Typography, Popover } from 'antd'

import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'

type TopBarProps = {
    onClick?: () => void
}

const TopBarComponent: FunctionComponent<TopBarProps> = () => {
    const { Text } = Typography

    const [giName, setgiName] = useState<string>('')
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)

    const handleCloseSession = () => {
        localStorage.removeItem('userLogged')
        localStorage.removeItem('authorizated')
        // window.location.reload();
        // setAuthorizated(false);
        window.location.href = '/gi'
        return
    }

    //--------------------------------------USEEEFECT
    useEffect(() => {
        const userLogged = localStorage.getItem('userLogged')
        if (userLogged !== null) {
            setgiName(JSON.parse(userLogged).gi.razon_social || '')
        }
    }, [])

    return (
        <div className="mainContainer-topbar">
            <div></div>
            <div>
                <Text>Usuario activo : </Text>
                <Text style={{ fontWeight: 'bold' }}>{giName}</Text>
            </div>
            <Popover
                content={
                    <>
                        <Button
                            style={{
                                backgroundColor: '#E6100D',
                                color: 'white',
                            }}
                            onClick={() => handleCloseSession()}
                        >
                            Si
                        </Button>
                        <Button
                            type="default"
                            onClick={() => setDeleteConfirmation(false)}
                        >
                            No
                        </Button>
                    </>
                }
                title="¿Seguro que desea cerrar la session?"
                trigger="click"
                visible={deleteConfirmation}
                onVisibleChange={() => setDeleteConfirmation(true)}
            >
                <Button
                    type="default"
                    icon={
                        <PoweroffOutlined
                            style={{ fontSize: '1.1rem', color: 'black' }}
                        />
                    }
                >
                    Cerrar
                </Button>
            </Popover>
        </div>
    )
}

export default TopBarComponent
