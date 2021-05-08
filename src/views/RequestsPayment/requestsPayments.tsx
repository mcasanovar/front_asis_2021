import React, { useState, useEffect } from 'react';
import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';
import { Redirect } from 'react-router-dom';

import { CANCEL, CONFIRM, FILTERS_REQUEST_PAYMENT, N_PER_PAGE, OK, REQUESTPAYMENT_COLUMNS_TABLE } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import AlertComponent from "../../component/Alert/Alert";
import PaginationComponent from '../../component/Pagination/Pagination';

import DetailsRequestPaymentView from "./detailsrequestpayment.view";
// import RequestPaymentCardView from "./requestpaymentcard.view";
import { IResponseAllRequestPayment, RequestPaymentModel } from '../../models/requestpayment.models';
import { MilesFormat } from '../../libs/formattedPesos';
import { filterRequestPaymentService, getAllRequestPaymentService } from '../../services';

interface IRequestsPaymentViewProps {
  authorized: boolean
}

const RequestsPaymentView: React.FunctionComponent<IRequestsPaymentViewProps> = ({ authorized }) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'consolidatereport',
      title: 'INFORME CONSOLIDADO',
      size: 'small',
      widthModal: 900,
      showButtons: []
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [requestpayment, setRequestpayment] = useState<RequestPaymentModel[]>([]);
  const [requestpaymentSelected, setRequestpaymentSelected] = useState<RequestPaymentModel>();
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleTransformPrice = (requestpayment: RequestPaymentModel[]) => {
    const aux = requestpayment.map((request) => {
      return {
        ...request,
        valor_cancelado_string: `$ ${MilesFormat(request.valor_cancelado)}`,
        valor_deuda_string: `$ ${MilesFormat(request.valor_deuda)}`,
        valor_servicio_string: `$ ${MilesFormat(request.valor_servicio)}`
      }
    });
    return aux;
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getRequestPayment(newpage);
    setLoading(false)
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Detalle de cobranza',
          size: 'small',
          widthModal: 900,
          showButtons: [{ _id: OK }]
        });
        idregister && setRequestpaymentSelected(requestpayment.find((request) => request._id === idregister));
        setOpenModal(true);
        break;
      // case 'requestpaymentcard':
      //   setActualModal({
      //     _id: id,
      //     title: 'Envio carta de cobranza',
      //     size: 'small',
      //     widthModal: 1200,
      //     showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
      //   })
      //   setOpenModal(true);
      //   break;
      default:
        break;
    }
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      getRequestPayment(1);
    }
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_REQUEST_PAYMENT.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterRequestPayment(filterText, headfilter.name)
    setLoading(false)
  };

  async function filterRequestPayment(date: string, headFilter: string) {
    const aux: IResponseAllRequestPayment = await filterRequestPaymentService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      return setRequestpayment(aux.cobranzas);
    }
    if (aux.err) {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
    setLoading(false)
  };

  async function getRequestPayment(pagenumber: number) {
    setLoading(true)
    const aux: IResponseAllRequestPayment = await getAllRequestPaymentService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setRequestpayment(aux.cobranzas);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
    }
    setLoading(false)
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
    getRequestPayment(1);
  }, []);

  if(!authorized){
    return <Redirect to='./login'/>
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Cobranzas' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Cobranzas ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        dataFilter={FILTERS_REQUEST_PAYMENT}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        onClickDateFilter={() => { }}
        filterText={filterText}
        setFilterText={setFilterText}
        onClickSearch={() => handleClickSearch()}
        setOptionFilter={setOptionFilter}

      />
      <TableComponent
        onClickAction={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        onClickDelete={() => { }}
        loading={loading}
        columns={REQUESTPAYMENT_COLUMNS_TABLE}
        data={handleTransformPrice(requestpayment)}
        showProcessState
        showDetails
        showRequestPaymentCard
        enablePagination={false}
      />
      <br/>
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
            <DetailsRequestPaymentView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              requestpaymentSelected={requestpaymentSelected}
            />
          }
          {/* {ActualModal._id === 'requestpaymentcard' && <RequestPaymentCardView />} */}
        </ModalComponent>
      }
    </div>
  );
};

export default RequestsPaymentView;
