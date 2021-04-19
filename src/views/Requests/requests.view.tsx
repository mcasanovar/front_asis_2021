import React, { useState, useEffect } from 'react';
import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';

import { CANCEL, CONFIRM, EDIT, N_PER_PAGE, OK, REQUESTS_COLUMNS_TABLE } from '../../constants/var';
import { IResponseAllRequests, IResponseRequest, RequestModel } from '../../models/request.models';

import { deleteOneRequestService, getAllRequestsService } from '../../services';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import CreateEditRequestView from "./createEditrequest.view";
import DetailsRequestView from "./detailsrequest.view";
import GroupConfirmationView from "./groupconfirmation.view";
import ConfirmRequestView from "./confirmrequest.view";

interface IRequestViewProps {
}

const RequestView: React.FunctionComponent<IRequestViewProps> = (props) => {

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
      title: 'CONFIRMAR',
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

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    console.log(id)
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
          widthModal: 700,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
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
      getRequests();
    }
  };

  async function getRequests() {
    const aux: IResponseAllRequests = await getAllRequestsService(1, N_PER_PAGE);
    console.log(aux)
    !aux.err && setRequests(aux.solicitudes);
  };

  async function hanbleDeleteRequest(id: string) {
    const aux: IResponseRequest = await deleteOneRequestService(id);
    if (aux.err === null) {
      setMessageAlert({ message: aux.res, type: 'success', show: true });
      getRequests();
      return setLoading(false);
    }
    return setMessageAlert({ message: aux.msg, type: 'error', show: true });
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
    getRequests();
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      setLoading(false)
    };
    // eslint-disable-next-line
  }, [requests]);

  useEffect(() => {
    if (ActualModal._id === 'nullify') {
      setLoading(true);
      hanbleDeleteRequest(idSelectedRequest);
    }
  }, [ActualModal]);

  return (
    <div className='container-gi'>
      <SubBarComponent title='Solicitudes' />
      <HeaderTableComponent
        title='Solicitudes ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        filterText={''}
        setFilterText={setFilterText}
        onClickSearch={() => { }}
        setOptionFilter={setOptionFilter}
      />
      <TableComponent
        data={requests}
        columns={REQUESTS_COLUMNS_TABLE}
        onClickAction={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        onClickDelete={(id, _id) => handleCLickActionTable(id, _id)}
        showDetails
        showEdit
        showNullify
        showSchedule
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

          />
        }
      </ModalComponent>
    </div>
  );
};

export default RequestView;
