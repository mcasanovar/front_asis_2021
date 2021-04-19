import React, { useState } from 'react';
import { IButtonsProps } from '../../models/index.models';

import { CANCEL, CONFIRM, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import DetailsRequestPaymentView from "./detailsrequestpayment.view";
import RequestPaymentCardView from "./requestpaymentcard.view";

interface IRequestsPaymentViewProps {
}

const RequestsPaymentView: React.FunctionComponent<IRequestsPaymentViewProps> = (props) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'consolidatereport',
      title: 'INFORME CONSOLIDADO',
      size: 'small',
      widthModal: 900,
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
          title: 'Detalle de cobranza',
          size: 'small',
          widthModal: 900,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        break;
      case 'requestpaymentcard':
        setActualModal({
          _id: id,
          title: 'Envio carta de cobranza',
          size: 'small',
          widthModal: 1200,
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
      <SubBarComponent title='Cobranzas' />
      <HeaderTableComponent
        title='Cobranzas ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        filterText={''}
        setFilterText={setFilterText}
        onClickSearch={() => {}}
        setOptionFilter={setOptionFilter}
        
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => { }}
        showDetails
        showRequestPaymentCard
      />
      {/* modal */}
      {ActualModal &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={ActualModal.widthModal || 500}
          onClose={() => setOpenModal(false)}
          onClickConfirm={(id) => {}}
          showButtons={ActualModal.showButtons || []}
        >
          {ActualModal._id === 'details' && <DetailsRequestPaymentView />}
          {ActualModal._id === 'requestpaymentcard' && <RequestPaymentCardView/>}
        </ModalComponent>
      }
    </div>
  );
};

export default RequestsPaymentView;
