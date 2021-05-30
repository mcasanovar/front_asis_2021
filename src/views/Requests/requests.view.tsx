import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';

import { CANCEL, CONFIRM, EDIT, FILTERS_REQUEST, N_PER_PAGE, OK, REQUESTS_COLUMNS_TABLE } from '../../constants/var';
import { IResponseAllRequests, IResponseRequest, RequestModel } from '../../models/request.models';

import { deleteOneRequestService, filterRequestsService, getAllRequestsService } from '../../services';

import AlertComponent from "../../component/Alert/Alert";

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import PaginationComponent from '../../component/Pagination/Pagination';

import CreateEditRequestView from "./createEditrequest.view";
import DetailsRequestView from "./detailsrequest.view";
import GroupConfirmationView from "./groupconfirmation.view";
import ConfirmRequestView from "./confirmrequest.view";

interface IRequestViewProps {
  authorized: boolean
}

interface IFilterSelected {
  headerFilter: string,
  filter: string
}


const RequestView: React.FunctionComponent<IRequestViewProps> = ({ authorized }) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newrequest',
      title: 'NUEVA SOLICITUD',
      size: 'small',
      widthModal: 1200,
      showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
    },
    {
      _id: 'confirm',
      title: 'CONFIRMACIÓN GRUPAL',
      customTitle: 'CONFIRMACIÓN GRUPAL DE SOLICITUDES',
      size: 'small',
      widthModal: 1600,
      showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
    }
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [requests, setRequests] = useState<RequestModel[]>([]);
  const [idSelectedRequest, setIdSelectedRequest] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [filterMode, setFilterMode] = useState<boolean>(false);
  const [filterSelected, setFilterSelected] = useState<string>('');
  const [filterObjectSelected, setFilterObjectSelected] = useState<IFilterSelected | null>();

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Detalle de la solicitud',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        idregister && setIdSelectedRequest(idregister)
        break;
      case 'edit':
        setActualModal({
          _id: id,
          title: 'Editar solicitud',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        setOpenModal(true);
        idregister && setIdSelectedRequest(idregister)
        break;
      case 'schedule':
        setActualModal({
          _id: id,
          title: 'Confirmar solicitud',
          size: 'small',
          widthModal: 900,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        idregister && setIdSelectedRequest(idregister)
        break;
      case 'nullify':
        idregister && setIdSelectedRequest(idregister)
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        break;
      case 'confirm':
        setActualModal({
          _id: id,
          title: 'Confirmación grupal de solicitudes',
          size: 'small',
          widthModal: 400,
          showButtons: []
        });
        break;
      default:
        return setActualModal(buttons[0])
    }
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      //reload gi
      getRequests(1);
    }
  };

  const handleFilterByDate = (date: string) => {
    setLoading(true);
    setFilterMode(true);
    setFilterSelected(date);
    setFilterObjectSelected(null)
    filterRequests(date, 'fecha_solicitud')
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_REQUEST.find((element) => element.key === optionFilter);
    if (!headfilter) return
    setFilterMode(true);
    setFilterObjectSelected({headerFilter: headfilter.name, filter: filterText});
    await filterRequests(filterText, headfilter.name)
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    if(filterMode){
      !filterObjectSelected && filterRequests(filterSelected, 'fecha_solicitud', newpage)
      !!filterObjectSelected && filterRequests(filterObjectSelected.filter, filterObjectSelected.headerFilter, newpage)
    }
    if(!filterMode){
      getRequests(newpage);
      return
    }
  };

  async function getRequests(pagenumber: number) {
    const aux: IResponseAllRequests = await getAllRequestsService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setRequests(aux.solicitudes);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setLoading(false)
      return
    };
    setLoading(false);
    return setMessageAlert({ message: 'No se ha podido cargar las solicitudes', type: 'error', show: true });
  };

  async function hanbleDeleteRequest(id: string) {
    const aux: IResponseRequest = await deleteOneRequestService(id);
    if (aux.err === null) {
      setMessageAlert({ message: aux.res, type: 'success', show: true });
      getRequests(1);
      return setLoading(false);
    }
    return setMessageAlert({ message: aux.msg, type: 'error', show: true });
  };

  async function filterRequests(date: string, headFilter: string, pageNumber: number = 1) {
    const aux: IResponseAllRequests = await filterRequestsService(
      2,
      date,
      headFilter,
      pageNumber,
      N_PER_PAGE
    );

    if (!aux.err) {
      setRequests(aux.solicitudes);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setLoading(false)
      return
    }
    if (aux.err) {
      setMessageAlert({ message: aux.err, type: 'error', show: true });
      setLoading(false)
      return
    }
  }

  const handleClickClean = () => {
    setLoading(true);
    setFilterMode(false);
    setFilterText('');
    setFilterObjectSelected(null);
    setFilterSelected('');
    getRequests(1);
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
    getRequests(1);
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      setLoading(false)
    };
    // eslint-disable-next-line
  }, [requests]);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'nullify') {
      setLoading(true);
      hanbleDeleteRequest(idSelectedRequest);
    }
  }, [ActualModal]);

  if (!authorized) {
    return <Redirect to='/login' />
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Solicitudes' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Solicitudes ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        dataFilter={FILTERS_REQUEST}
        filterText={filterText}
        setFilterText={setFilterText}
        onClickSearch={() => handleClickSearch()}
        onClickDateFilter={(date) => handleFilterByDate(date)}
        setOptionFilter={setOptionFilter}
        onClickClean={() => handleClickClean()}
      />
      <TableComponent
        data={requests}
        columns={REQUESTS_COLUMNS_TABLE}
        onClickAction={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        onClickDelete={(id, _id) => handleCLickActionTable(id, _id)}
        loading={loading}
        showProcessState
        showDetails
        showEdit
        showNullify
        showSchedule
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
      <ModalComponent
        visible={OpenModal}
        title={ActualModal.title}
        customTitle={ActualModal.customTitle || ''}
        width={ActualModal.widthModal || 500}
        onClose={() => setOpenModal(false)}
        onClickConfirm={(id) => { }}
        showButtons={ActualModal.showButtons || []}
      >
        {ActualModal._id === 'newrequest' &&
          <CreateEditRequestView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            type='insert'
          />
        }
        {ActualModal._id === 'edit' &&
          <CreateEditRequestView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            type='edit'
            _id={idSelectedRequest}
          />
        }
        {ActualModal._id === 'details' &&
          <DetailsRequestView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            _id={idSelectedRequest}
          />
        }
        {ActualModal._id === 'schedule' &&
          <ConfirmRequestView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            _id={idSelectedRequest}
          />
        }
        {ActualModal._id === 'confirm' &&
          <GroupConfirmationView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
          />
        }
      </ModalComponent>
    </div>
  );
};

export default RequestView;
