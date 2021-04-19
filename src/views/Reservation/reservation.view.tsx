import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, EDIT, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import GroupConfirmReservationView from "./groupconfirmreservation.view";
import EditReservationView from "./editreservation.view";
import ConfirmReservationView from "./confirmreservation.view";

interface IReservationViewProps {
}

const ReservationView: React.FunctionComponent<IReservationViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'confirm',
      title: 'CONFIRMAR',
      customTitle: 'Confirmación grupal de reservas,',
      size: 'small',
      widthModal: 1200,
      showButtons: []
    },
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Detalle de reserva -codigo-',
          size: 'small',
          widthModal: 500,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        break;
      case 'edit':
        setActualModal({
          _id: id,
          title: 'Editar Reserva',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        setOpenModal(true);
        break;
      case 'reservation':
        setActualModal({
          _id: id,
          title: 'Confirmar reserva -codigo-',
          size: 'small',
          widthModal: 500,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Reservas' />
      <HeaderTableComponent
        title='Reservas ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
        filterText={''}
        setFilterText={setFilterText}
        onClickSearch={() => {}}
        setOptionFilter={setOptionFilter}
        
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => { }}
        showDetails
        showEdit
        showNullify
        showReservation
      />
      {/* modal */}
      <ModalComponent
        visible={OpenModal}
        title={ActualModal.title}
        width={1200}
        onClose={() => setOpenModal(false)}
        onClickConfirm={(id) => {}}
        showButtons={ActualModal.showButtons || []}
      >
        {ActualModal._id === 'confirm' && <GroupConfirmReservationView />}
        {ActualModal._id === 'details' && <EditReservationView />}
        {ActualModal._id === 'edit' && <EditReservationView />}
        {ActualModal._id === 'reservation' && <ConfirmReservationView/>}
      </ModalComponent>
    </div>
  );
};

export default ReservationView;
