import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import DetailsOutputView from './detailsoutput.view';
import PaginationComponent from '../../component/Pagination/Pagination';

import AlertComponent from "../../component/Alert/Alert";

import CreateOutputView from './createoutput.view';
import { IResponseAllOutputs, IResponseOutputs, OutputModel } from '../../models/outputs.models';
import { deleteOutputService, filterOutputsService, getAllOutputsService } from '../../services';
import { FILTERS_OUTPUT, N_PER_PAGE, OUTPUT_COLUMNS_TABLE } from '../../constants/var';
import { MilesFormat } from '../../libs/formattedPesos';

interface IOutputsViewProps {
  authorized: boolean
}

interface IFilterSelected {
  headerFilter: string,
  filter: string
}

const OutputsView: React.FunctionComponent<IOutputsViewProps> = ({authorized}) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newoutput',
      title: 'NUEVA SALIDA',
      size: 'small',
      widthModal: 1200,
      showButtons: []
    },
  ];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [outputs, setOutputs] = useState<OutputModel[]>([]);
  const [outputSelected, setOutputSelected] = useState<OutputModel>();
  const [idSelectedOuput, setIdSelectedOuput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [filterMode, setFilterMode] = useState<boolean>(false);
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
          title: 'Ver detalle de facturación',
          size: 'small',
          widthModal: 1200,
          showButtons: []
        });
        idregister && setOutputSelected(outputs.find((output) => output._id === idregister));
        setOpenModal(true);
        break;
      case 'delete':
        idregister && setIdSelectedOuput(idregister)
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: []
        })
        break;
      default:
        break;
    }
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    if(filterMode){
      filterOutputs(filterObjectSelected?.filter || '', filterObjectSelected?.headerFilter || '', newpage);
      return
    }
    if(!filterMode){
      getOutputs(newpage);
      return
    }
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      getOutputs(1);
    }
  };

  const handleTransformValues = (outputs: OutputModel[]) => {
    const aux = outputs.map((output) => {
      return {
        ...output,
        costo_unitario_string: `$ ${MilesFormat(output.costo_unitario)}`,
        costo_total_string: `$ ${MilesFormat(output.costo_total)}`
      }
    });
    return aux;
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_OUTPUT.find((element) => element.key === optionFilter);
    if (!headfilter) return
    setFilterMode(true);
    setFilterObjectSelected({headerFilter: headfilter.name, filter: filterText});
    filterOutputs(filterText, headfilter.name)
  };

  async function filterOutputs(date: string, headFilter: string, pageNumber: number = 1) {
    const aux: IResponseAllOutputs = await filterOutputsService(
      2,
      date,
      headFilter,
      pageNumber,
      N_PER_PAGE
    );

    if (!aux.err) {
      setOutputs(aux.salidas);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setLoading(false)
      return
    }
    if (aux.err) {
      setMessageAlert({ message: aux.err, type: 'error', show: true });
      setLoading(false);
      return
    }
  }

  async function getOutputs(pagenumber: number) {
    const aux: IResponseAllOutputs = await getAllOutputsService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setOutputs(aux.salidas);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setLoading(false);
      return
    }
    setLoading(false);
    return setMessageAlert({ message: 'No se ha podido cargar los salidas', type: 'error', show: true });
  };

  async function handleDeleteOutput(id: string) {
    const aux: IResponseOutputs = await deleteOutputService(id);
    if (aux.err === null) {
      setMessageAlert({ message: aux.res, type: 'success', show: true });
      getOutputs(1);
      return setLoading(false);
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    return setLoading(false);
  };

  const handleClickClean = () => {
    setLoading(true);
    setFilterMode(false);
    setFilterText('');
    setFilterObjectSelected(null);
    getOutputs(1);
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
    getOutputs(1);
  }, []);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'delete') {
      setLoading(true);
      handleDeleteOutput(idSelectedOuput);
    }
  }, [ActualModal]);

  if(!authorized){
    return <Redirect to='./login'/>
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Salidas' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Salidas ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        onClickDateFilter={() => { }}
        dataFilter={FILTERS_OUTPUT}
        filterText={filterText}
        setFilterText={setFilterText}
        onClickSearch={() => handleClickSearch()}
        setOptionFilter={setOptionFilter}
        onClickClean={() => handleClickClean()}

      />
      <TableComponent
        onClickAction={(id, _id) => handleCLickActionTable(id, _id)}
        onClickDelete={(id, _id) => handleCLickActionTable(id, _id)}
        loading={loading}
        columns={OUTPUT_COLUMNS_TABLE}
        data={handleTransformValues(outputs)}
        showDelete
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
      {buttons.length > 0 &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={ActualModal.widthModal || 500}
          onClose={() => setOpenModal(false)}
          onClickConfirm={(id) => { }}
          showButtons={[]}
        >
          {ActualModal._id === 'newoutput' &&
            <CreateOutputView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
            />
          }
          {ActualModal._id === 'details' &&
            <DetailsOutputView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              outputSelected={outputSelected}
            />
          }
        </ModalComponent>
      }
    </div>
  );
};

export default OutputsView;
