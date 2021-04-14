import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, EDIT, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import CreateGiView from "./creategi.view";
import ConfigurationView from "./configurationGi.view";

interface IGiViewProps {
}

const GiView: React.FunctionComponent<IGiViewProps> = () => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newgi',
      title: 'NUEVO GI',
      size: 'small',
      widthModal: 1200,
      showButtons: [
        {
          _id: CANCEL
        },
        {
          _id: CONFIRM
        }
      ]
    },
    {
      _id: 'newgrupalgi',
      title: 'GI GRUPAL',
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
    switch (id) {
      case 'configurationGi':
        setActualModal({ 
          _id: id, 
          title: 'Configuración de -nombre-', 
          size: 'small', 
          widthModal: 600,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }] 
        })
        setOpenModal(true);
        break;
      case 'details':
        setActualModal({ 
          _id: id, 
          title: 'Ver detalle de GI', 
          size: 'small', 
          widthModal: 1200,
          showButtons: [{ _id: OK }] 
        })
        setOpenModal(true);
        break;
      case 'edit':
        setActualModal({ 
          _id: id, 
          title: 'Editar Gi', 
          size: 'small', 
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }] 
        })
        setOpenModal(true);
        break;
      default:
        return setActualModal(buttons[0])
    }
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Grupo de Interes' />
      <HeaderTableComponent
        title='Grupo de Interes ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => {}}
        showConfiguration
        showEdit
        showDetails
        showDelete
      />
      {/* modal */}
      <ModalComponent
        visible={OpenModal}
        title={ActualModal.title}
        width={ActualModal.widthModal || 500}
        onClose={() => setOpenModal(false)}
        showButtons={ActualModal.showButtons || []}
      >
        {ActualModal._id === 'newgi' && <CreateGiView/>}
        {ActualModal._id === 'configurationGi' && <ConfigurationView/>}
        {ActualModal._id === 'details' && <CreateGiView/>}
        {ActualModal._id === 'edit' && <CreateGiView/>}
      </ModalComponent>
    </div>
  );
};

export default GiView;
