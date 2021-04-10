import React, { useState } from 'react';
import { IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

interface IRequestViewProps {
}

const RequestView: React.FunctionComponent<IRequestViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newrequest',
      title: 'NUEVA SOLICITUD',
      size: 'small'
    },
    {
      _id: 'confirm',
      title: 'CONFIRMAR',
      size: 'small'
    }
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
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
        showDetails
        showEdit
        showNullify
        showSchedule
      />
      {/* modal */}
      <ModalComponent
        visible={OpenModal}
        title={ActualModal.title}
        width={1200}
        onClose={() => setOpenModal(false)}
      >
        
      </ModalComponent>
    </div>
  );
};

export default RequestView;
