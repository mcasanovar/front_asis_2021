import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import CreateGiView from "./creategi.view";

interface IGiViewProps {
}

const GiView: React.FunctionComponent<IGiViewProps> = () => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newgi',
      title: 'NUEVO GI',
      size: 'small'
    },
    {
      _id: 'newgrupalgi',
      title: 'GI GRUPAL',
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
      <SubBarComponent title='Grupo de Interes' />
      <HeaderTableComponent
        title='Grupo de Interes ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
      />
      <TableComponent
        showConfiguration
        showEdit
        showDetails
        showDelete
      />
      {/* modal */}
      <ModalComponent
        visible={OpenModal}
        title={ActualModal.title}
        width={1200}
        onClose={() => setOpenModal(false)}
      >
        {ActualModal._id === 'newgi' && <CreateGiView/>}
      </ModalComponent>
    </div>
  );
};

export default GiView;
