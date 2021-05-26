import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, EVALUATIONS_COLUMNS_TABLE, FILTERS_EVALUATION, N_PER_PAGE, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import DetailsEvaluationView from "./detailsevaluation.view";
import UploadExamView from "./uploadexam.view";
import PsicosensotecnicoExamView from "./psicosensotecnicoexam.view";
import AversionRiesgoExamView from "./aversionriesgoexam.view";
import ConfirmExamView from "./confirmexam.view";
import { EvaluationModel, IResponseAllEvaluations, IResponseEvaluation } from '../../models/evaluations.models';
import { deleteEvaluationService, downloadExamService, filterEvaluationsService, getAllEvaluationsService } from '../../services/evaluation.services';

import AlertComponent from "../../component/Alert/Alert";
import PaginationComponent from '../../component/Pagination/Pagination';

interface IEvaluationsViewProps {
  authorized: boolean
}

const EvaluationsView: React.FunctionComponent<IEvaluationsViewProps> = ({ authorized }) => {

  const buttons: IButtonsProps[] = [];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [idSelectedEvaluation, setIdSelectedEvaluation] = useState<string>('');
  const [evaluationSelected, setEvaluationSelected] = useState<EvaluationModel>();
  const [evaluations, setEvaluations] = useState<EvaluationModel[]>([]);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [filterText, setFilterText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
          title: 'Detalle de evaluación',
          size: 'small',
          widthModal: 800,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        idregister && setIdSelectedEvaluation(idregister)
        break;
      case 'uploadexam':
        setActualModal({
          _id: id,
          title: 'Subir examen',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        idregister && setEvaluationSelected(evaluations.find((evaluation) => evaluation._id === idregister));
        setOpenModal(true);
        break;
      case 'generateexam':
        setActualModal({
          _id: id,
          title: 'Generar examen',
          size: 'small',
          widthModal: 1300,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        idregister && setEvaluationSelected(evaluations.find((evaluation) => evaluation._id === idregister));
        idregister && setIdSelectedEvaluation(idregister)
        setOpenModal(true);
        break;
      case 'confirmexam':
        setActualModal({
          _id: id,
          title: 'Confirmar examen',
          size: 'small',
          widthModal: 800,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        idregister && setEvaluationSelected(evaluations.find((evaluation) => evaluation._id === idregister));
        setOpenModal(true);
        break;
      case 'downloadexam':
        idregister && setIdSelectedEvaluation(idregister);
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }]
        })
        break;
      case 'nullify':
        idregister && setIdSelectedEvaluation(idregister)
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }]
        })
        break;
      default:
        break
    }
  };

  async function getEvaluations(pagenumber: number) {
    setLoading(true)
    const aux: IResponseAllEvaluations = await getAllEvaluationsService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      console.log(aux.evaluaciones)
      const reservationsMapped = aux.evaluaciones.map((evaluation) => {
        return {
          ...evaluation,
          fecha_evaluacion: `${evaluation.fecha_evaluacion} ${evaluation.hora_inicio_evaluacion}`,
          fecha_evaluacion_fin: `${evaluation.fecha_evaluacion_fin} ${evaluation.hora_termino_evaluacion}`
        }
      });
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      setEvaluations(reservationsMapped);
    }
    setLoading(false)
  };

  async function deleteEvaluation(id: string) {
    const aux: IResponseEvaluation = await deleteEvaluationService(id);
    if (aux.err === null) {
      setMessageAlert({ message: aux.res, type: 'success', show: true });
      getEvaluations(1);
      return setLoading(false);
    }
    if (aux.err === 98) {
      setLoading(false)
      setMessageAlert({ message: aux.msg, type: 'error', show: true });
      return
    }
    setLoading(false)
    return setMessageAlert({ message: aux.err, type: 'error', show: true });
  };

  async function downloadExam(id: string) {
    const aux: IResponseEvaluation = await downloadExamService(id);
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
    const aux: IResponseAllEvaluations = await filterEvaluationsService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      setEvaluations(aux.evaluaciones);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
      return
    }
    if (aux.err) {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      getEvaluations(1);
    }
  };

  const handleFilterByDate = (date: string) => {
    setLoading(true);
    filterEvaluations(date, 'fecha_evaluacion');
    setLoading(false)
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_EVALUATION.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterEvaluations(filterText, headfilter.name)
    setLoading(false)
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getEvaluations(newpage);
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
    getEvaluations(1);
  }, []);

  useEffect(() => {
    if (evaluations.length > 0) {
      setLoading(false)
    };
    // eslint-disable-next-line
  }, [evaluations]);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'downloadexam') {
      setLoading(true)
      downloadExam(idSelectedEvaluation);
      return
    }
    if (ActualModal && ActualModal._id === 'nullify') {
      setLoading(true);
      deleteEvaluation(idSelectedEvaluation);
      return
    }
  }, [ActualModal]);

  if(!authorized){
    return <Redirect to='./login'/>
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Evaluaciones' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Evaluaciones ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        dataFilter={FILTERS_EVALUATION}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => { }}
        filterText={filterText}
        setFilterText={setFilterText}
        onClickSearch={() => handleClickSearch()}
        onClickDateFilter={(date) => handleFilterByDate(date)}
        setOptionFilter={setOptionFilter}
      />
      <TableComponent
        onClickAction={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        onClickDelete={(id: string, _id?: string) => handleCLickActionTable(id, _id)}
        columns={EVALUATIONS_COLUMNS_TABLE}
        data={evaluations}
        loading={loading}
        showProcessState
        showFileState
        showDetails
        showNullify
        showUploadExam
        showGenerateExam
        showDownloadExam
        showConfirmExam
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
            <DetailsEvaluationView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              _id={idSelectedEvaluation}
            />
          }
          {ActualModal._id === 'uploadexam' &&
            <UploadExamView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              evaluationSelected={evaluationSelected}
            />
          }
          {ActualModal._id === 'generateexam' && evaluationSelected?.nombre_servicio === 'Psicosensotécnico Riguroso' &&
            < PsicosensotecnicoExamView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              evaluationSelected={evaluationSelected}
            />
          }
          {ActualModal._id === 'generateexam' && evaluationSelected?.nombre_servicio === 'Aversión al Riesgo' &&
            <AversionRiesgoExamView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              evaluationSelected={evaluationSelected}
            />
          }
          {ActualModal._id === 'confirmexam' &&
            <ConfirmExamView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              evaluationSelected={evaluationSelected}
            />
          }
        </ModalComponent>}
    </div>
  );
};

export default EvaluationsView;
