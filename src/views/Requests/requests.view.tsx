import React, { useState } from 'react';
import { IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import CreateRequestView from "./createrequest.view";
import { CANCEL, CONFIRM } from '../../constants/var';

interface IRequestViewProps {
}

const RequestView: React.FunctionComponent<IRequestViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newrequest',
      title: 'NUEVA SOLICITUD',
      size: 'small',
      widthModal: 1200,
      showButtons: [{ _id: CANCEL },{ _id: CONFIRM }]
    },
    {
      _id: 'confirm',
      title: 'CONFIRMAR',
      size: 'small',
      widthModal: 1200,
      showButtons: []
    }
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string) => {

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
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => {}}
        showDetails
        showEdit
        showNullify
        // showSchedule
      />
      {/* modal */}
      <ModalComponent
        visible={OpenModal}
        title={ActualModal.title}
        width={ActualModal.widthModal || 500}
        onClose={() => setOpenModal(false)}
        showButtons={ActualModal.showButtons || []}
      >
        {ActualModal._id === 'newrequest' && <CreateRequestView />}
      </ModalComponent>
    </div>
  );
};

export default RequestView;
