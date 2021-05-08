import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, FILTERS_PAYMENTS, N_PER_PAGE, OK, PAYMENTS_COLUMNS_TABLE } from '../../constants/var';
import { IResponseAllPayments, PaymentModel } from '../../models/payments.models';
import { filterPaymentsService, getAllPaymentsService } from '../../services';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import PaginationComponent from '../../component/Pagination/Pagination';

import DetailsPaymentView from "./detailsPayment.view";
import ManagePaymentView from "./managePayment.view";
import GeneratePaymentView from "./generatepayment.view";
import GenerateGroupPaymentView from "./grupal/generategrupalpayment.view";

import AlertComponent from "../../component/Alert/Alert";

import { MilesFormat } from '../../libs/formattedPesos';

interface IPaymentsViewProps {
  authorized: boolean
}

const PaymentsView: React.FunctionComponent<IPaymentsViewProps> = ({ authorized }) => {

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
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [payments, setPayments] = useState<PaymentModel[]>([]);
  const [paymentSelected, setPaymentSelected] = useState<PaymentModel>();
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Detalle de pago',
          size: 'small',
          widthModal: 900,
          showButtons: [{ _id: OK }]
        });
        idregister && setPaymentSelected(payments.find((payment) => payment._id === idregister));
        setOpenModal(true);
        break;
      case 'managepayment':
        setActualModal({
          _id: id,
          title: 'Gestion de pagos',
          size: 'small',
          widthModal: 1000,
          showButtons: [{ _id: OK }]
        });
        idregister && setPaymentSelected(payments.find((payment) => payment._id === idregister));
        setOpenModal(true);
        break
      case 'generatepayment':
        setActualModal({
          _id: id,
          title: 'Generar pago',
          size: 'small',
          widthModal: 900,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        });
        idregister && setPaymentSelected(payments.find((payment) => payment._id === idregister));
        setOpenModal(true);
        break
      default:
        break;
    }
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getPayments(newpage);
    setLoading(false)
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      getPayments(1);
    }
  };

  const handleTransformValues = (payments: PaymentModel[]) => {
    const aux = payments.map((payment) => {
      return {
        ...payment,
        valor_cancelado_string: `$ ${MilesFormat(payment.valor_cancelado)}`,
        valor_servicio_string: `$ ${MilesFormat(payment.valor_servicio)}`
      }
    });
    return aux;
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_PAYMENTS.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterPayments(filterText, headfilter.name)
    setLoading(false)
  };

  async function filterPayments(date: string, headFilter: string) {
    const aux: IResponseAllPayments = await filterPaymentsService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      return setPayments(aux.pagos);
    }
    if (aux.err) {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
    setLoading(false)
  };

  async function getPayments(pagenumber: number) {
    setLoading(true)
    const aux: IResponseAllPayments = await getAllPaymentsService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setPayments(aux.pagos);
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
    getPayments(1);
  }, []);

  if(!authorized){
    return <Redirect to='./login'/>
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
        title='Pagos ASIS'
        subtitle='Tabla de información'
        buttons={buttons || []}
        dataFilter={FILTERS_PAYMENTS}
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
        columns={PAYMENTS_COLUMNS_TABLE}
        data={handleTransformValues(payments)}
        loading={loading}
        showProcessState
        showDetails
        showManagmentPayments
        showGeneratePayment
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
            <DetailsPaymentView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              paymentSelected={paymentSelected}
            />
          }
          {ActualModal._id === 'managepayment' &&
            <ManagePaymentView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              paymentSelected={paymentSelected}
            />
          }
          {ActualModal._id === 'generatepayment' &&
            <GeneratePaymentView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              paymentSelected={paymentSelected}
            />
          }
          {ActualModal._id === 'grouppayment' && <GenerateGroupPaymentView />}
        </ModalComponent>}
    </div>
  );
};

export default PaymentsView;
