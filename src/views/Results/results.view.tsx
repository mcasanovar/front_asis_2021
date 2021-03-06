import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, FILTERS_RESULT, N_PER_PAGE, OK, RESULTS_COLUMNS_TABLE } from '../../constants/var';
import { IResponseAllResults, IResponseResults, ResultModel } from '../../models/results.model';
import { deleteResultService, downloadResultService, getAllResultsService, filterResultsService } from '../../services';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import PaginationComponent from '../../component/Pagination/Pagination';

import DetailsResultsView from "./detailsresults.view";
import ConfirmResultView from "./confirmresult.view";
import UploadResultView from './uploadresults.view';

import AlertComponent from "../../component/Alert/Alert";

interface IResultsViewProps {
  authorized: boolean
}

const ResultsView: React.FunctionComponent<IResultsViewProps> = ({ authorized }) => {

  const buttons: IButtonsProps[] = [];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [results, setResults] = useState<ResultModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [idSelectedResult, setIdSelectedResult] = useState<string>('');
  const [resultSelected, setResultSelected] = useState<ResultModel>();
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  async function getResults(pagenumber: number) {
    setLoading(true)
    const aux: IResponseAllResults = await getAllResultsService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      const reservationsMapped = aux.resultados.map((reservation) => {
        return {
          ...reservation,
          fecha_resultado: reservation.fecha_resultado ? `${reservation.fecha_resultado} ${reservation.hora_resultado}` : 'En Revisi??n',
        }
      });
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setResults(reservationsMapped);
    }
    setLoading(false);
  };

  async function deleteResult(id: string) {
    const aux: IResponseResults = await deleteResultService(id);
    if (aux.err === null) {
      setMessageAlert({ message: aux.res, type: 'success', show: true });
      getResults(1);
      return setLoading(false);
    }
    if (aux.err === 98) {
      setMessageAlert({ message: aux.msg, type: 'error', show: true });
    }
    return setMessageAlert({ message: aux.err, type: 'error', show: true });
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Ver detalle resultado',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        })
        idregister && setIdSelectedResult(idregister)
        setOpenModal(true);
        break;
      case 'confirmexam':
        setActualModal({
          _id: id,
          title: 'Confirmar resultado',
          size: 'small',
          widthModal: 600,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'uploadresult':
        setActualModal({
          _id: id,
          title: 'Subir resultado',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        idregister && setResultSelected(results.find((result) => result._id === idregister));
        setOpenModal(true);
        break;
      case 'downloadresult':
        idregister && setIdSelectedResult(idregister);
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }]
        })
        break;
      case 'confirmresult':
        idregister && setIdSelectedResult(idregister);
        idregister && setResultSelected(results.find((result) => result._id === idregister));
        setActualModal({
          _id: id,
          title: 'Confirmar resultado',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }]
        });
        setOpenModal(true);
        break;
      case 'nullify':
        idregister && setIdSelectedResult(idregister)
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }]
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
      getResults(1);
    }
  };

  async function downloadResult(id: string) {
    const aux: IResponseResults = await downloadResultService(id);
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

  async function filterEvaluations(date: string, headFilter: string) {
    const aux: IResponseAllResults = await filterResultsService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      return setResults(aux.resultados.map((result) => {
        return {
          ...result,
          fecha_resultado: result?.fecha_resultado
            ? `${result.fecha_resultado} ${result.hora_resultado}`
            : 'En Revisi??n'
        }
      }));
    }
    if (aux.err) {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_RESULT.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterEvaluations(filterText, headfilter.name)
    setLoading(false)
  };

  const handleFilterByDate = (date: string) => {
    setLoading(true);
    filterEvaluations(date, 'fecha_resultado');
    setLoading(false)
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getResults(newpage);
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
    getResults(1);
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      setLoading(false)
    };
    // eslint-disable-next-line
  }, [results]);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'downloadresult') {
      setLoading(true)
      downloadResult(idSelectedResult);
      return
    }
    if (ActualModal && ActualModal._id === 'nullify') {
      setLoading(true);
      deleteResult(idSelectedResult);
      return
    }
    // eslint-disable-next-line
  }, [ActualModal]);

  if(!authorized){
    return <Redirect to='./login'/>
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Resultados' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Resultados ASIS'
        subtitle='Tabla de informaci??n'
        buttons={buttons}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        onClickDateFilter={(date) => handleFilterByDate(date)}
        dataFilter={FILTERS_RESULT}
        filterText={filterText}
        setFilterText={setFilterText}
        onClickSearch={() => handleClickSearch()}
        setOptionFilter={setOptionFilter}

      />
      <TableComponent
        columns={RESULTS_COLUMNS_TABLE}
        data={results}
        onClickAction={(id: string, _id?: string) => handleCLickActionTable(id, _id,)}
        onClickDelete={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        loading={loading}
        showProcessState
        showFileState
        showDetails
        showNullify
        showDownloadExam
        showDownloadResult
        showConfirmExam
        showConfirmResult
        showUploadResult
        showSendMail
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
          {ActualModal._id === 'uploadresult' &&
            <UploadResultView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              resultSelected={resultSelected}
            />
          }
          {ActualModal._id === 'details' &&
            <DetailsResultsView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              _id={idSelectedResult}
            />
          }
          {ActualModal._id === 'confirmresult' &&
            <ConfirmResultView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              resultSelected={resultSelected}
            />
          }
        </ModalComponent>}
    </div>
  );
};

export default ResultsView;