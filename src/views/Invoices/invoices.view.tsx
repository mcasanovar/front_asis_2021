import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';
import { ICompanyInfo, InvoicesModel, IResponseAllInvoices, IResponseInvoices } from '../../models/invoices.models';
import { CANCEL, CONFIRM, FILTERS_INVOICES, INVOICES_COLUMNS_TABLE, N_PER_PAGE, OK } from '../../constants/var';

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

import AlertComponent from "../../component/Alert/Alert";

import { downloadFilesService, filterInvoicesService, getAllInvoicesService } from '../../services/invoices.services';
import PaginationComponent from '../../component/Pagination/Pagination';
import { MilesFormat } from '../../libs/formattedPesos';

interface IInvoicesViewProps {
  authorized: boolean
}

const InvoicesView: React.FunctionComponent<IInvoicesViewProps> = ({ authorized }) => {

  const buttons: IButtonsProps[] = [];

  const [loading, setLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<InvoicesModel[]>([]);
  const [invoiceSelected, setInvoiceSelected] = useState<InvoicesModel>();
  const [idInvoiceSelected, setIdInvoiceSelected] = useState<string>('');
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [company, setCompany] = useState<ICompanyInfo>();
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);

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
          widthModal: 1100,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'validategroupoc':
        setActualModal({
          _id: value,
          title: 'Validación grupal de OC',
          size: 'small',
          widthModal: 1100,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'uploadgroupinvoice':
        setActualModal({
          _id: value,
          title: 'Subida grupal de facturas',
          size: 'small',
          widthModal: 1100,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'validategroupinvoice':
        setActualModal({
          _id: value,
          title: 'Validación grupal de facturas',
          size: 'small',
          widthModal: 1100,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      default:
        break;
    }
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Ver detalle de facturación',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        });
        idregister && setInvoiceSelected(invoices.find((invoice) => invoice._id === idregister));
        setOpenModal(true);
        break;
      case 'uploadoc':
        setActualModal({
          _id: id,
          title: 'Subir orden de compra (OC)',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        });
        idregister && setInvoiceSelected(invoices.find((invoice) => invoice._id === idregister));
        setOpenModal(true);
        break;
      case 'downloadoc':
        idregister && setIdInvoiceSelected(idregister);
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }]
        })
        break;
      case 'confirmoc':
        setActualModal({
          _id: id,
          title: 'Confirmar orden de compra (OC)',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        idregister && setInvoiceSelected(invoices.find((invoice) => invoice._id === idregister));
        setOpenModal(true);
        break;
      case 'generateinvoice':
        setActualModal({
          _id: id,
          title: 'Generar factura',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        });
        idregister && setInvoiceSelected(invoices.find((invoice) => invoice._id === idregister));
        setOpenModal(true);
        break;
      case 'downloadinvoice':
        idregister && setIdInvoiceSelected(idregister)
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        });
        break;
      case 'validateinvoice':
        setActualModal({
          _id: id,
          title: 'Validar factura',
          size: 'small',
          widthModal: 1300,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        idregister && setInvoiceSelected(invoices.find((invoice) => invoice._id === idregister));
        setOpenModal(true);
        break;
      default:
        return setActualModal(buttons[0])
    }
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getInvoices(newpage);
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      getInvoices(1);
    }
  };

  async function downloadFile(id: string, type: string) {
    const aux: IResponseInvoices = await downloadFilesService(id, type);
    if (aux.err === null) {
      const arr = new Uint8Array(aux.res.data);
      const blob = new Blob([arr], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fileName = aux?.filename || 'examen';

      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoading(false)
      return
    }
    if (aux.err !== '') {
      setMessageAlert({ message: aux.msg, type: 'error', show: true });
      setLoading(false)
      return
    }
  };

  async function getInvoices(pagenumber: number) {
    setLoading(true)
    const aux: IResponseAllInvoices = await getAllInvoicesService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setInvoices(aux.facturaciones);
      setCompany(aux.empresa);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setLoading(false);
      return
    }
    setLoading(false);
    return setMessageAlert({ message: 'No se ha podido cargar las facturaciones', type: 'error', show: true });
  };

  async function filterInvoices(date: string, headFilter: string) {
    const aux: IResponseAllInvoices = await filterInvoicesService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      setInvoices(aux.facturaciones);
      setCompany(aux.empresa);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      return
    }
    if (aux.err) {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
    setLoading(false)
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_INVOICES.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterInvoices(filterText, headfilter.name)
    setLoading(false)
  };

  const handleTransformPrice = (invoices: InvoicesModel[]) => {
    const aux = invoices.map((invoice) => {
      return {
        ...invoice,
        total_string: `$ ${MilesFormat(invoice.total)}`
      }
    });
    return aux;
  };

  //--------------USEEFECT
  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  useEffect(() => {
    setLoading(true)
    getInvoices(1);
  }, []);

  useEffect(() => {
    if (invoices.length > 0) {
      setLoading(false)
    };
    // eslint-disable-next-line
  }, [invoices]);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'downloadoc') {
      setLoading(true)
      downloadFile(idInvoiceSelected, 'oc');
      return
    };
    if (ActualModal && ActualModal._id === 'downloadinvoice') {
      setLoading(true)
      downloadFile(idInvoiceSelected, 'invoice');
      return
    }
  }, [ActualModal]);

  if (!authorized) {
    return <Redirect to='./login' />
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Facturas' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Facturas ASIS'
        subtitle='Tabla de información'
        buttons={[]}
        dataFilter={FILTERS_INVOICES}
        onClick={(button) => handleClickButton(button)}
        showInvoicesOptions
        onClickGrupal={(value) => handleClickGrupalSelection(value)}
        filterText={filterText}
        setFilterText={setFilterText}
        onClickSearch={() => handleClickSearch()}
        onClickDateFilter={() => { }}
        setOptionFilter={setOptionFilter}

      />
      <TableComponent
        onClickAction={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        onClickDelete={() => { }}
        columns={INVOICES_COLUMNS_TABLE}
        data={handleTransformPrice(invoices)}
        loading={loading}
        showProcessState
        showFileState
        showDetails
        showInvoice
        showUploadOC
        showConfirmOC
        showDownloadOc
        showDownloadInvoice
        showValidateInvoice
        enablePagination={false}
      />
      <br />
      <PaginationComponent
        actualPage={actualPage}
        onChange={(newpage: number) => handleChangePagination(newpage)}
        totalItems={totalItems}
        pageSize={N_PER_PAGE}
      />
      {/* modal */}
      {ActualModal &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={ActualModal.widthModal || 500}
          onClose={() => setOpenModal(false)}
          onClickConfirm={(id) => { }}
          showButtons={ActualModal.showButtons || []}
        >
          {ActualModal._id === 'details' &&
            <DetailsInvoceView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              invoiceSelected={invoiceSelected}
              onDownloadOC={() => downloadFile(invoiceSelected?._id || '', 'oc')}
              company={company || undefined}
            />
          }
          {ActualModal._id === 'uploadoc' &&
            <UploadOCView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              invoiceSelected={invoiceSelected}
            />
          }
          {ActualModal._id === 'confirmoc' &&
            <ConfirmOCView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              invoiceSelected={invoiceSelected}
            />
          }
          {ActualModal._id === 'generateinvoice' &&
            <GenerateInvoiceView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              invoiceSelected={invoiceSelected}
              company={company || undefined}
            />
          }
          {ActualModal._id === 'validateinvoice' &&
            <ValidateInvoiceView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              invoiceSelected={invoiceSelected}
            />
          }
          {ActualModal._id === 'uploadgroupoc' &&
            <UploadGroupOCView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
            />
          }
          {ActualModal._id === 'validategroupoc' &&
            <ConfirmGroupOCView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
            />
          }
          {ActualModal._id === 'uploadgroupinvoice' &&
            <UploadGroupInvoicesView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              company={company}
            />
          }
          {ActualModal._id === 'validategroupinvoice' &&
            <ValidateGroupInvoicesView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
            />
          }
        </ModalComponent>
      }
    </div>
  );
};

export default InvoicesView;
