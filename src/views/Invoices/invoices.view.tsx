import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';

import { CANCEL, CONFIRM, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import DetailsInvoceView from "./detailsinvoces.view";
import UploadOCView from "./uploadoc.view";
import ConfirmOCView from "./confirmoc.view";
import GenerateInvoiceView from "./generateinvoice.view";
import ValidateInvoiceView from "./validateinvoice.view";
import UploadGroupOCView from "./grupal/uploadgrupaloc.view";
import ConfirmGroupOCView from "./grupal/confirmgrupaloc.view";
import UploadGroupInvoicesView from "./grupal/uploadgrupalinvoices.view";
import ValidateGroupInvoicesView from "./grupal/validategrupalinvoices.view";

interface IInvoicesViewProps {
}

const InvoicesView: React.FunctionComponent<IInvoicesViewProps> = (props) => {

  const buttons: IButtonsProps[] = [];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleClickGrupalSelection = (value: string) => {
    switch (value) {
      case 'uploadgroupoc':
        setActualModal({
          _id: value,
          title: 'Carga grupal de OC',
          size: 'small',
          widthModal: 1500,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'validategroupoc':
        setActualModal({
          _id: value,
          title: 'Validación grupal de OC',
          size: 'small',
          widthModal: 1500,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'uploadgroupinvoice':
        setActualModal({
          _id: value,
          title: 'Subida grupal de facturas',
          size: 'small',
          widthModal: 1500,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'validategroupinvoice':
        setActualModal({
          _id: value,
          title: 'Validación grupal de facturas',
          size: 'small',
          widthModal: 1500,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      default:
        break;
    }
  };

  const handleCLickActionTable = (id: string) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Ver detalle de facturación',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        break;
      case 'uploadoc':
        setActualModal({
          _id: id,
          title: 'Subir orden de compra (OC)',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'confirmoc':
        setActualModal({
          _id: id,
          title: 'Confirmar orden de compra (OC)',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'generateinvoice':
        setActualModal({
          _id: id,
          title: 'Generar factura',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'validateinvoice':
        setActualModal({
          _id: id,
          title: 'Validar factura',
          size: 'small',
          widthModal: 1300,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      default:
        return setActualModal(buttons[0])
    }
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
        onClickGrupal={(value) => handleClickGrupalSelection(value)}
        filterText={''}
        setFilterText={setFilterText}
        onClickSearch={() => {}}
        setOptionFilter={setOptionFilter}
        
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => { }}
        showDetails
        showInvoice
        showUploadOC
        showConfirmOC
        showDownloadOc
        showDownloadInvoice
        showValidateInvoice
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
          {ActualModal._id === 'details' && <DetailsInvoceView />}
          {ActualModal._id === 'uploadoc' && <UploadOCView />}
          {ActualModal._id === 'confirmoc' && <ConfirmOCView />}
          {ActualModal._id === 'generateinvoice' && <GenerateInvoiceView />}
          {ActualModal._id === 'validateinvoice' && <ValidateInvoiceView />}
          {ActualModal._id === 'uploadgroupoc' && <UploadGroupOCView />}
          {ActualModal._id === 'validategroupoc' && <ConfirmGroupOCView />}
          {ActualModal._id === 'uploadgroupinvoice' && <UploadGroupInvoicesView />}
          {ActualModal._id === 'validategroupinvoice' && <ValidateGroupInvoicesView/>}
        </ModalComponent>
      }
    </div>
  );
};

export default InvoicesView;
