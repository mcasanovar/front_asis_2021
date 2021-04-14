import * as React from 'react';
import { Button, Modal } from "antd";
import { IShowButtonModals } from '../../models/index.models';
import { CANCEL, CONFIRM, EDIT, OK } from '../../constants/var';

interface IModalProps {
  title: string,
  customTitle?: string,
  visible: boolean,
  width?: number,
  onClose: () => void,
  showButtons?: IShowButtonModals[]
}

const ModalComponent: React.FunctionComponent<IModalProps> = ({
  title,
  customTitle = '',
  visible,
  width = 500,
  children,
  onClose,
  showButtons = []
}) => {

  //--------renders
  const renderButtonsModal = (selected: IShowButtonModals, index: number) => {
    if (selected._id === CANCEL)
      return <Button
        key={index}
        onClick={() => onClose()}
        style={{ backgroundColor: '#E10D17', color: 'white' }}
      >
        Cancelar
      </Button>

    if (selected._id === CONFIRM)
      return <Button
        key={index}
        onClick={() => onClose()}
        style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}
      >
        Confirmar
      </Button>

    if (selected._id === OK)
      return <Button
        key={index}
        onClick={() => onClose()}
        style={{ backgroundColor: '#1073B5', borderColor: '#1073B5', color: 'white' }}
      >
        Ok
      </Button>

    if (selected._id === EDIT)
      return <Button
        key={index}
        onClick={() => onClose()}
        style={{ backgroundColor: '#F68923', borderColor: '#F68923', color: 'white' }}
      >
        Guardar
      </Button>
  };

  return (
    <Modal
      title={customTitle !== '' ? customTitle : title}
      centered
      visible={visible}
      cancelButtonProps={{ style: { backgroundColor: '#E10D17', color: 'white' } }}
      cancelText='Cancelar'
      maskClosable={false}
      onCancel={() => onClose()}
      destroyOnClose={true}
      width={width}
      footer={showButtons.length > 0 ?
        [
          <>
            {showButtons.map((selected: IShowButtonModals, index) => renderButtonsModal(selected, index))}
          </>
        ] : []}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
