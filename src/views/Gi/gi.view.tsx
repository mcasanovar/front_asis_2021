import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, EDIT, FILTERS_GI, GIS_COLUMNS_TABLE, N_PER_PAGE, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import AlertComponent from "../../component/Alert/Alert";
import PaginationComponent from '../../component/Pagination/Pagination';

import { GiModel, IReponseAllGIs, IResponseGI } from '../../models/gi.models';
import { deleteOneGiService, filterGisService, getAllGIService } from '../../services';

import CreateEditGiView from "./createEditgi.view";
import DetailsGIView from "./detailsgi.view";
import ConfigurationView from "./configurationGi.view";

interface IGiViewProps {
  authorized: boolean
}

const GiView: React.FunctionComponent<IGiViewProps> = ({ authorized }) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newgi',
      title: 'NUEVO GI',
      size: 'small',
      widthModal: 1200,
      showButtons: [
        {
          _id: CANCEL
        },
        {
          _id: CONFIRM
        }
      ]
    },
    {
      _id: 'newgrupalgi',
      title: 'GI GRUPAL',
      size: 'small',
      widthModal: 1200,
      showButtons: []
    }
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [GIs, setGIs] = useState<GiModel[]>([]);
  const [idSelectedGI, setIdSelectedGI] = useState<string>('');
  const [giSelected, setGiSelected] = useState<GiModel>();
  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [disabledCancel, _] = useState<boolean>(false);
  const [disabledConfirm, __] = useState<boolean>(true);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    // console.log(_id)
    switch (id) {
      case 'configurationGi':
        setActualModal({
          _id: id,
          title: 'Configuración GI',
          size: 'small',
          widthModal: 600,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        });
        idregister && setGiSelected(GIs.find((gi) => gi._id === idregister));
        setOpenModal(true);
        break;
      case 'details':
        setActualModal({
          _id: id,
          title: 'Ver detalle de GI',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        idregister && setIdSelectedGI(idregister)
        break;
      case 'edit':
        setActualModal({
          _id: id,
          title: 'Editar Gi',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        setOpenModal(true);
        idregister && setIdSelectedGI(idregister)
        break;
      case 'delete':
        idregister && setIdSelectedGI(idregister)
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
      getGis(1);
    }
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const response: IReponseAllGIs = await filterGisService(
      optionFilter,
      filterText,
      1,
      N_PER_PAGE
    );

    if (response?.err) {
      setMessageAlert({ message: response.err, type: 'error', show: true });
      return;
    };

    setGIs(response.gis);
    setActualPage(response.pagina_actual);
    setTotalItems(response.total_items);
    setLoading(false)
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getGis(newpage);
  };

  async function getGis(pagenumber: number) {
    const aux: IReponseAllGIs = await getAllGIService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setGIs(aux.gis);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setLoading(false)
      return
    }
    setLoading(false)
    return setMessageAlert({ message: 'No se ha podido cargar los GIs', type: 'error', show: true });
  };

  async function hanbleDeleteGI(id: string) {
    const aux: IResponseGI = await deleteOneGiService(id);
    if (aux.err === null) {
      setMessageAlert({ message: aux.res, type: 'success', show: true });
      getGis(1);
      return setLoading(false);
    }
    return setMessageAlert({ message: aux.res, type: 'error', show: true });
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
    GIs.length === 0 && getGis(1);
  }, []);

  useEffect(() => {
    if (GIs.length > 0) {
      setLoading(false)
    };
    // eslint-disable-next-line
  }, [GIs]);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'delete') {
      setLoading(true);
      hanbleDeleteGI(idSelectedGI);
    }
  }, [ActualModal]);

  console.log(authorized)

  if (!authorized) {
    return <Redirect to='./login' />
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Grupo de Interes' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Grupo de Interes ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        onClickDateFilter={() => { }}
        dataFilter={FILTERS_GI}
        filterText={filterText}
        setFilterText={setFilterText}
        onClickSearch={() => handleClickSearch()}
        setOptionFilter={setOptionFilter}
      />
      <TableComponent
        data={GIs}
        columns={GIS_COLUMNS_TABLE}
        onClickAction={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        onClickDelete={(id, _id) => handleCLickActionTable(id, _id)}
        showConfiguration
        showEdit
        showDetails
        showDelete
        loading={loading}
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
        width={ActualModal.widthModal || 500}
        onClose={() => setOpenModal(false)}
        onClickConfirm={() => { }}
        showButtons={ActualModal.showButtons || []}
        disabledCancel={disabledCancel}
        disabledConfirm={disabledConfirm}
      >
        {ActualModal._id === 'newgi' &&
          <CreateEditGiView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            type='insert'
          />
        }
        {ActualModal._id === 'configurationGi' &&
          <ConfigurationView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            giSelected={giSelected}
          />
        }
        {ActualModal._id === 'details' &&
          <DetailsGIView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            _id={idSelectedGI}
          />
        }
        {ActualModal._id === 'edit' &&
          <CreateEditGiView
            onCloseModal={(value, message) => handleCloseModal(value, message)}
            type='edit'
            _id={idSelectedGI}
          />
        }
      </ModalComponent>
    </div>
  );
};

export default GiView;
