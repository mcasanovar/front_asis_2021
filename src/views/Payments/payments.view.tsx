import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

interface IPaymentsViewProps {
}

const PaymentsView: React.FunctionComponent<IPaymentsViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'grouppayment',
      title: 'PAGO GRUPAL',
      size: 'small'
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
        showDetails
        showManagmentPayments
        showGeneratePayment
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

export default PaymentsView;
