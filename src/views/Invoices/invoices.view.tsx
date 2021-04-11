import React, { useState } from 'react';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import { IButtonsProps } from '../../models/index.models';

interface IInvoicesViewProps {
}

const InvoicesView: React.FunctionComponent<IInvoicesViewProps> = (props) => {

  const buttons: IButtonsProps[] = [];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Facturas' />
      <HeaderTableComponent
        title='Facturas ASIS'
        subtitle='Tabla de información'
        buttons={[]}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        showInvoicesOptions
      />
      <TableComponent
        onClickAction={(id: string) => { }}
        onClickDelete={() => {}}
        showDetails
        showInvoice
        showUploadOC
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

export default InvoicesView;
