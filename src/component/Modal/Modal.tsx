import React from 'react'
import { Modal } from 'antd'

type IModalProps = {
    title: string
    customTitle?: string
    visible: boolean
    width?: number
    onClose: () => void
}

const ModalComponent: React.FunctionComponent<IModalProps> = ({
    title,
    customTitle = '',
    visible,
    width = 500,
    children,
    onClose,
}) => {
    return (
        <Modal
            title={customTitle !== '' ? customTitle : title}
            centered
            visible={visible}
            cancelButtonProps={{
                style: { backgroundColor: '#E10D17', color: 'white' },
            }}
            cancelText="Cancelar"
            maskClosable={false}
            onCancel={() => onClose()}
            destroyOnClose={true}
            width={width}
            closable={true}
            footer={false}
        >
            {children}
        </Modal>
    )
}

export default ModalComponent
