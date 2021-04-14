import React, { useState } from 'react';
import { IButtonsProps } from '../../models/index.models';

import { CANCEL, CONFIRM, EDIT, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import CreateRequestView from "./createrequest.view";
import GroupConfirmationView from "./groupconfirmation.view";
import ConfirmRequestView from "./confirmrequest.view";

interface IRequestViewProps {
}

const RequestView: React.FunctionComponent<IRequestViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newrequest',
      title: 'NUEVA SOLICITUD',
      size: 'small',
      widthModal: 1200,
      showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
    },
    {
      _id: 'confirm',
      title: 'CONFIRMAR',
      customTitle: 'CONFIRMACIÓN GRUPAL DE SOLICITUDES',
      size: 'small',
      widthModal: 1600,
      showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
    }
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Detalle de la solicitud',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        break;
      case 'edit':
        setActualModal({
          _id: id,
          title: 'Editar solicitud',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        setOpenModal(true);
        break;
      case 'schedule':
        setActualModal({
          _id: id,
          title: 'Confirmar solicitud',
          size: 'small',
          widthModal: 700,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      default:
        return setActualModal(buttons[0])
    }
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Solicitudes' />
      <HeaderTableComponent
        title='Solicitudes ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => { }}
        showDetails
        showEdit
        showNullify
      showSchedule
      />
      {/* modal */}
      <ModalComponent
        visible={OpenModal}
        title={ActualModal.title}
        customTitle={ActualModal.customTitle || ''}
        width={ActualModal.widthModal || 500}
        onClose={() => setOpenModal(false)}
        showButtons={ActualModal.showButtons || []}
      >
        {ActualModal._id === 'newrequest' && <CreateRequestView />}
        {ActualModal._id === 'confirm' && <GroupConfirmationView />}
        {ActualModal._id === 'details' && <CreateRequestView />}
        {ActualModal._id === 'edit' && <CreateRequestView />}
        {ActualModal._id === 'schedule' && <ConfirmRequestView/>}
      </ModalComponent>
    </div>
  );
};

export default RequestView;
