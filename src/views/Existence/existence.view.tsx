import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import DetailsExistenceView from './detailsexistence.view';

import { EXISTENCE_COLUMNS_TABLE, FILTERS_EXISTENCE, N_PER_PAGE } from '../../constants/var';
import { ExistenceModel, IResponseAllExistence } from '../../models/existence.models';
import { filterExistencesService, getAllExistencesService } from '../../services';
import { MilesFormat } from '../../libs/formattedPesos';
import PaginationComponent from '../../component/Pagination/Pagination';

interface IExistenceViewProps {
  authorized: boolean
}

const ExistenceView: React.FunctionComponent<IExistenceViewProps> = ({authorized}) => {

  const buttons: IButtonsProps[] = [];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [existences, setExistences] = useState<ExistenceModel[]>([]);
  const [existenceSelected, setExistenceSelected] = useState<ExistenceModel>();
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      getExistences(1);
    }
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Ver detalle de existencia',
          size: 'small',
          widthModal: 1200,
          showButtons: []
        });
        idregister && setExistenceSelected(existences.find((existence) => existence._id === idregister));
        setOpenModal(true);
        break;
      default:
        break;
    }
  };

  const handleTransformValues = (existences: ExistenceModel[]) => {
    const aux = existences.map((existence) => {
      return {
        ...existence,
        costo_unitario_promedio_string: `$ ${MilesFormat(existence.costo_unitario_promedio)}`,
        costo_total_string: `$ ${MilesFormat(existence.costo_total)}`
      }
    });
    return aux;
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getExistences(newpage);
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_EXISTENCE.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterExistences(filterText, headfilter.name)
  };

  async function filterExistences(date: string, headFilter: string) {
    const aux: IResponseAllExistence = await filterExistencesService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      setExistences(aux.existencias);
    }
    if (aux.err) {
      setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
    setLoading(false)
  }

  async function getExistences(pagenumber: number) {
    const aux: IResponseAllExistence = await getAllExistencesService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setExistences(aux.existencias);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setLoading(false);
      return
    }
    return setMessageAlert({ message: 'No se ha podido cargar las existencias', type: 'error', show: true });
    setLoading(false)
  };

  //----------------------------------------------USEEFECT
  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  useEffect(() => {
    setLoading(true)
    getExistences(1);
  }, []);

  if(!authorized){
    return <Redirect to='./login'/>
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Existencia' />
      <HeaderTableComponent
        title='Existencia ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        dataFilter={FILTERS_EXISTENCE}
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
        data={handleTransformValues(existences)}
        columns={EXISTENCE_COLUMNS_TABLE}
        showProcessState
        showDetails
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
          showButtons={[]}
        >
          {ActualModal._id === 'details' &&
            <DetailsExistenceView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              existenceSelected={existenceSelected}
            />
          }
        </ModalComponent>
      }
    </div>
  );
};

export default ExistenceView;
