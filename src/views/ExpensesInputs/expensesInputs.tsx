import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

interface IExpensesInputsViewProps {
}

const ExpensesInputsView: React.FunctionComponent<IExpensesInputsViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newexpense',
      title: 'NUEVO GASTO',
      size: 'small',
      widthModal: 1200,
      showButtons: []
    },
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Gastos/Entradas' />
      <HeaderTableComponent
        title='Gastos/Entradas ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
      />
      <TableComponent
        onClickAction={(id: string) => { }}
        onClickDelete={() => {}}
        showDetails
        showDelete
      />
      {/* modal */}
      {buttons.length > 0 &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={1200}
          onClose={() => setOpenModal(false)}
          showButtons={[]}
        >

        </ModalComponent>
      }
    </div>
  );
};

export default ExpensesInputsView;
