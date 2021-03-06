import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, EDIT, FILTERS_RESERVATION, N_PER_PAGE, OK, RESERVATIONS_COLUMNS_TABLE } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import AlertComponent from "../../component/Alert/Alert";
import PaginationComponent from '../../component/Pagination/Pagination';

import { IResponseAllReservations, IResponseReservation, ReservationModel } from '../../models/reservation.models';
import { getAllReservationsService, filterReservationsService, deleteReservationService } from '../../services/reservation.services';

import DetailsReservationView from "./detailsreservation.view";
import GroupConfirmReservationView from "./groupconfirmreservation.view";
import EditReservationView from "./editreservation.view";
import ConfirmReservationView from "./confirmreservation.view";

interface IReservationViewProps {
  authorized: boolean
}

const ReservationView: React.FunctionComponent<IReservationViewProps> = ({ authorized }) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'confirm',
      title: 'CONFIRMACION GRUPAL',
      customTitle: 'Confirmación grupal de reservas,',
      size: 'small',
      widthModal: 1200,
      showButtons: []
    },
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [idSelectedReservation, setidSelectedReservation] = useState<string>('');
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [reservations, setReservations] = useState<ReservationModel[]>([]);
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
          title: 'Detalle de reserva',
          size: 'small',
          widthModal: 800,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        idregister && setidSelectedReservation(idregister)
        break;
      case 'edit':
        setActualModal({
          _id: id,
          title: 'Editar Reserva',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        setOpenModal(true);
        idregister && setidSelectedReservation(idregister)
        break;
      case 'reservation':
        setActualModal({
          _id: id,
          title: 'Confirmar reserva',
          size: 'small',
          widthModal: 1000,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        });
        idregister && setidSelectedReservation(idregister)
        setOpenModal(true);
        break;
      case 'nullify':
        idregister && setidSelectedReservation(idregister)
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        break;
      default:
        break;
    }
  };

  const handleFilterByDate = (date: string) => {
    setLoading(true);
    filterRequests(date, 'fecha_reserva');
    setLoading(false)
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_RESERVATION.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterRequests(filterText, headfilter.name)
    setLoading(false)
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      getReservations(1);
    }
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getReservations(newpage);
    setLoading(false)
  };

  async function getReservations(pagenumber: number) {
    setLoading(true)
    const aux: IResponseAllReservations = await getAllReservationsService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      const reservationsMapped = aux.reservas.map((reservation) => {
        return {
          ...reservation,
          fecha_reserva: `${reservation.fecha_reserva} ${reservation.hora_reserva}`,
          fecha_reserva_fin: `${reservation.fecha_reserva_fin} ${reservation.hora_reserva_fin}`
        }
      });
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setReservations(reservationsMapped);
    }
    setLoading(false);
  };

  async function filterRequests(date: string, headFilter: string) {
    const aux: IResponseAllReservations = await filterReservationsService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      return setReservations(aux.reservas);
    }
    if (aux.err) {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
  };

  async function hanbleDeleteRequest(id: string) {
    const aux: IResponseReservation = await deleteReservationService(id);
    if (aux.err === null) {
      setMessageAlert({ message: aux.res, type: 'success', show: true });
      getReservations(1);
      return setLoading(false);
    }
    if (aux.err === 98) {
      setMessageAlert({ message: aux.msg, type: 'error', show: true });
    }
    return setMessageAlert({ message: aux.err, type: 'error', show: true });
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
    getReservations(1);
  }, []);

  useEffect(() => {
    if (reservations.length > 0) {
      setLoading(false)
    };
    // eslint-disable-next-line
  }, [reservations]);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'nullify') {
      setLoading(true);
      hanbleDeleteRequest(idSelectedReservation);
    }
    //eslint-disable-next-line
  }, [ActualModal]);

  if(!authorized){
    return <Redirect to='./login'/>
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Reservas' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Reservas ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        dataFilter={FILTERS_RESERVATION}
        filterText={filterText}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        onClickDateFilter={(date) => handleFilterByDate(date)}
        setFilterText={setFilterText}
        onClickSearch={() => handleClickSearch()}
        setOptionFilter={setOptionFilter}

      />
      <TableComponent
        columns={RESERVATIONS_COLUMNS_TABLE}
        data={reservations}
        onClickAction={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        onClickDelete={(id, _id) => handleCLickActionTable(id, _id)}
        loading={loading}
        showProcessState
        showDetails
        showEdit
        showNullify
        showReservation
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
      <ModalComponent
        visible={OpenModal}
        title={ActualModal.title}
        width={ActualModal.widthModal || 500}
        onClose={() => setOpenModal(false)}
        onClickConfirm={(id) => { }}
        showButtons={ActualModal.showButtons || []}
      >
        {ActualModal._id === 'confirm' && <GroupConfirmReservationView />}
        {ActualModal._id === 'details' &&
          <DetailsReservationView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            _id={idSelectedReservation}
          />
        }
        {ActualModal._id === 'edit' &&
          <EditReservationView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            _id={idSelectedReservation}
          />
        }
        {ActualModal._id === 'reservation' &&
          <ConfirmReservationView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            _id={idSelectedReservation}
          />
        }
      </ModalComponent>
    </div>
  );
};

export default ReservationView;
