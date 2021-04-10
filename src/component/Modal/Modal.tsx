import * as React from 'react';
import { Modal } from "antd";

interface IModalProps {
  title: string,
  visible: boolean,
  width?: number,
  onClose: () => void
}

const ModalComponent: React.FunctionComponent<IModalProps> = ({
  title,
  visible,
  width = 500,
  children,
  onClose
}) => {
  return (
    <Modal
      title={title}
      centered
      visible={visible}
      okButtonProps={{ style: { backgroundColor: 'green', borderColor: 'green' }}}
      okText='Confirmar'
      onOk={() => onClose()}
      cancelButtonProps={{ style: { backgroundColor: '#E10D17', color: 'white' } }}
      cancelText='Cancelar'
      onCancel={() => onClose()}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
