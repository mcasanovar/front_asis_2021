import * as React from 'react'
import { Alert } from 'antd'

interface IAlertComponentProps {
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    showIcon?: boolean
    closable?: boolean
    customStyle?: React.CSSProperties
}

const AlertComponent: React.FunctionComponent<IAlertComponentProps> = ({
    message,
    type = 'info',
    showIcon = true,
    customStyle,
}) => {
    return (
        <Alert
            message={message}
            type={type}
            showIcon={showIcon}
            style={customStyle}
        />
    )
}

export default AlertComponent
