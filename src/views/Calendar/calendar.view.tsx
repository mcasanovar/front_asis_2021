import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Spin, Tag } from 'antd';

import moment, { Moment, months } from 'moment';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import Calendar from '../../component/Calendar/Calendar';
import ModalComponent from "../../component/Modal/Modal";
import DetailsCalendarView from "./detailscalendar.view";

import { capitalize } from '../../libs/capitalize';
import { IResponseAllRequests, RequestModel } from '../../models/request.models';
import { getRequestsByDateService, getWorkersGIService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';
import { FORMAT_DATE } from '../../constants/var';
import { getReservationsByDateService } from '../../services/reservation.services';
import { IResponseAllReservations, ReservationModel } from '../../models/reservation.models';
import AlertComponent from "../../component/Alert/Alert";
import { GiModel, IResponseGI } from '../../models/gi.models';

interface ICalendarScreenProps {
  authorized: boolean
}

const CalendarScreen: React.FunctionComponent<ICalendarScreenProps> = ({
  authorized
}) => {

  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [loadDone, setloadDone] = useState<boolean>(false);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [requests, setRequests] = useState<RequestModel[]>([]);
  const [reservations, setReservations] = useState<ReservationModel[]>([]);
  const [selectedRequests, setSelectedRequests] = useState<RequestModel[]>([]);
  const [selectedReservations, setSelectedReservations] = useState<ReservationModel[]>([]);
  const [dateSelected, setDateSelected] = useState<Moment>(moment());
  const [workers, setWorkers] = useState<GiModel[]>([]);

  const handleDataRenderDates = (value: Moment) => {
    const auxRequests = requests.filter((request) => moment(request.fecha_solicitud, FORMAT_DATE).format(FORMAT_DATE) === value.format(FORMAT_DATE));
    const auxReservations = reservations.filter((reservation) => reservation.fecha_reserva === value.format(FORMAT_DATE));
    return (
      <ul className="events">
        {!!auxRequests.length && auxRequests.map(item => (
          <li key={item._id}>
            <Tag
              color={item.estado === 'Ingresado' ? '#15B8D5' : 'green'}
              style={{ fontWeight: 'bold' }}
            >
              {`${item.nombre_servicio}`}
            </Tag>
          </li>
        ))}
        {!!auxReservations.length && auxReservations.map(item => (
          <li key={item._id}>
            <Tag
              color={item.estado === 'Ingresado' ? '#1073B5' : '#21B831'}
              style={{ fontWeight: 'bold' }}
            >
              {`${item.nombre_servicio}`}
            </Tag>
          </li>
        ))}
      </ul>
    );
  };

  const handleDataRenderMonths = (value: Moment) => {
    const auxRequests = requests.filter((request) => moment(request.fecha_solicitud, FORMAT_DATE).format('MMMM') === value.format('MMMM'));
    const auxReservations = reservations.filter((reservation) => moment(reservation.fecha_reserva, FORMAT_DATE).format('MMMM') === value.format('MMMM'));
    return (
      <ul className="notes-month">
        {!!auxRequests.length && auxRequests.map(item => (
          <li key={item._id}>
            <Tag
              color={item.estado === 'Ingresado' ? '#15B8D5' : 'green'}
              style={{ fontWeight: 'bold' }}>{item.nombre_servicio}
            </Tag>
          </li>
        ))}
        {!!auxReservations.length && auxReservations.map(item => (
          <li key={item._id}>
            <Tag
              color={item.estado === 'Ingresado' ? '#15B8D5' : 'green'}
              style={{ fontWeight: 'bold' }}>{item.nombre_servicio}
            </Tag>
          </li>
        ))}
      </ul>
    );
  };

  const handleOnPanelChange = (value: Moment, type: string) => {
    // alert(`PanelChange ${value} - ${type}`)
    setLoading(true);
    if (type === 'year') {
      getRequests(null, value.format('YYYY'));
      getReservations(null, value.format('YYYY'));
    }
    if (type === 'month') {
      getRequests(capitalize(value.format('MMMM')), value.format('YYYY'));
      getReservations(capitalize(value.format('MMMM')), value.format('YYYY'));
    }
  };

  const handleOnSelect = (value: Moment) => {
    const auxRequests = requests.filter((request) => moment(request.fecha_solicitud, FORMAT_DATE).format(FORMAT_DATE) === value.format(FORMAT_DATE));
    const auxReservations = reservations.filter((reservation) => reservation.fecha_reserva === value.format(FORMAT_DATE));

    if (!![...auxRequests, ...auxReservations].length) {
      setSelectedRequests(auxRequests);
      setSelectedReservations(auxReservations);
      setDateSelected(value);
      setOpenModal(true);
    }
  };

  const getRequests = async (month: string | null = null, year: string | null = null) => {
    setLoading(true);
    const aux: IResponseAllRequests = await getRequestsByDateService(month, year);
    if (!aux.err) {
      setRequests(aux.solicitudes);
      return
    }
    setMessageAlert({ message: aux.err, type: 'error', show: true });
  };

  const getReservations = async (month: string | null = null, year: string | null = null) => {
    const aux: IResponseAllReservations = await getReservationsByDateService(month, year);
    if (!aux.err) {
      setReservations(aux.reservas);
      setLoading(false)
      setloadDone(true);
      return
    }
    setMessageAlert({ message: aux.err, type: 'error', show: true });
    setLoading(false)
    setloadDone(true);
  };

  async function getWorkers() {
    const aux: IResponseGI = await getWorkersGIService();
    aux.err === null && setWorkers(aux.res || [])
    return
  };

  //----------------------------------------------------------USEEFFECT
  useEffect(() => {
    getRequests(capitalize(moment().format('MMMM')), capitalize(moment().format('YYYY')));
    getWorkers();
    getReservations(capitalize(moment().format('MMMM')), capitalize(moment().format('YYYY')));
  }, []);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 3000);
    }
  }, [messageAlert]);

  if (!authorized) {
    return <Redirect to='./login' />
  };

  return (
    <div className='container-gi'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      <SubBarComponent title='Grupo de Interes' />
      <HeaderTableComponent
        title='Calendario Solicitudes y Reservas'
        subtitle='Calendario'
        onClick={(button) => { }}
        onClickGrupal={() => { }}
        onClickDateFilter={() => { }}
        setFilterText={setFilterText}
        onClickSearch={() => { }}
        setOptionFilter={setOptionFilter}
        notFIlter
        notSearch
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Tag
          color='#15B8D5'
          style={{
            height: 40,
            fontSize: 14,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10
          }}
        >Solicitud Ingresada</Tag>
        <Tag
          color='green'
          style={{
            height: 40,
            fontSize: 14,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10
          }}
        >Solicitud Confirmada</Tag>
        <Tag
          color='#1073B5'
          style={{
            height: 40,
            fontSize: 14,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10
          }}
        >Reserva Ingresada</Tag>
        <Tag
          color='#21B831'
          style={{
            height: 40,
            fontSize: 14,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10
          }}
        >Reserva Confirmada</Tag>
      </Row>
      <div className='calendario-module'>
        <Spin spinning={loading} size='large' tip='Cargando...'>
          {loadDone &&
            <Calendar
              onSelect={(e: Moment) => handleOnSelect(e)}
              onPanelChange={(e: Moment, type: string) => handleOnPanelChange(e, type)}
              dateCellRender={handleDataRenderDates}
              monthCellRender={handleDataRenderMonths}
            />
          }
        </Spin>
      </div>
      <ModalComponent
        visible={OpenModal}
        title='Detalle Calendario'
        width={1200}
        onClose={() => setOpenModal(false)}
        onClickConfirm={() => { }}
      >
        <DetailsCalendarView
          requests={selectedRequests}
          reservations={selectedReservations}
          workers={workers}
          currentDate={dateSelected}
        />
      </ModalComponent>
    </div>
  );
};

export default CalendarScreen;
