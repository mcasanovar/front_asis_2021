import React, { useState } from 'react';
import { IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

interface IRequestsPaymentViewProps {
}

const RequestsPaymentView: React.FunctionComponent<IRequestsPaymentViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'consolidatereport',
      title: 'INFORME CONSOLIDADO',
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
      <SubBarComponent title='Cobranzas' />
      <HeaderTableComponent
        title='Cobranzas ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
      />
      <TableComponent
        onClickAction={(id: string) => { }}
        onClickDelete={() => {}}
        showDetails
        showRequestPaymentCard
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

export default RequestsPaymentView;
