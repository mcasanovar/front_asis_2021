import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import DetailsPaymentView from "./detailsPayment.view";
import ManagePaymentView from "./managePayment.view";
import GeneratePaymentView from "./generatepayment.view";
import GenerateGroupPaymentView from "./grupal/generategrupalpayment.view";

interface IPaymentsViewProps {
}

const PaymentsView: React.FunctionComponent<IPaymentsViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'grouppayment',
      title: 'PAGO GRUPAL',
      size: 'small',
      widthModal: 900,
      showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
    },
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Detalle de pago',
          size: 'small',
          widthModal: 900,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        break;
      case 'managepayment':
        setActualModal({
          _id: id,
          title: 'Gestion de pagos',
          size: 'small',
          widthModal: 1300,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        break
      case 'generatepayment':
        setActualModal({
          _id: id,
          title: 'Generar pago',
          size: 'small',
          widthModal: 900,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break
      default:
        break;
    }
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Facturas' />
      <HeaderTableComponent
        title='Pagos ASIS'
        subtitle='Tabla de información'
        buttons={buttons || []}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => { }}
        showDetails
        showManagmentPayments
        showGeneratePayment
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
          {ActualModal._id === 'details' && <DetailsPaymentView />}
          {ActualModal._id === 'managepayment' && <ManagePaymentView />}
          {ActualModal._id === 'generatepayment' && <GeneratePaymentView />}
          {ActualModal._id === 'grouppayment' && <GenerateGroupPaymentView />}
        </ModalComponent>}
    </div>
  );
};

export default PaymentsView;
