import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, EDIT } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import EditEmployeeView from "./editemployee.view";
import DetailsEmployeeView from "./detailemployee.view";
import AbsensesEmployee from "./absensesemployee.view";

const buttons: IButtonsProps[] = [];

interface IEmployeesProps {
}

const Employees: React.FunctionComponent<IEmployeesProps> = (props) => {

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string) => {
    switch (id) {
      case 'edit':
        setActualModal({
          _id: id,
          title: 'Edición de Empleado',
          size: 'small',
          widthModal: 1050,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        setOpenModal(true);
        break;
      case 'details':
        setActualModal({
          _id: id,
          title: 'Información del Empleado',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }]
        })
        setOpenModal(true);
        break;
      case 'absense':
        setActualModal({
          _id: id,
          title: 'Ausencias de Empleado',
          size: 'small',
          widthModal: 1500,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      default:
        setActualModal(buttons[0])
        break;
    }
  };

  console.log('actual', ActualModal);
  console.log('open modal', OpenModal);

  return (
    <div className='container-gi'>
      <SubBarComponent title='Empleados' />
      <HeaderTableComponent
        title='Empleados ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => { }}
        showAbsence
        showEdit
        showDetails
        showDelete
      />
      {/* modal */}
      {ActualModal &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={ActualModal.widthModal || 500}
          onClose={() => setOpenModal(false)}
          showButtons={ActualModal.showButtons || []}
        >
          {ActualModal._id === 'edit' && <EditEmployeeView />}
          {ActualModal._id === 'details' && <DetailsEmployeeView />}
          {ActualModal._id === 'absense' && <AbsensesEmployee />}
        </ModalComponent>}
    </div>
  );
};

export default Employees;
