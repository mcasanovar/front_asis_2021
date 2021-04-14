import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import DetailsEvaluationView from "./detailsevaluation.view";
import UploadExamView from "./uploadexam.view";
// import PsicosensotecnicoExamView from "./psicosensotecnicoexam.view";
import AversionRiesgoExamView from "./aversionriesgoexam.view";
import ConfirmExamView from "./confirmexam.view";

interface IEvaluationsViewProps {
}

const EvaluationsView: React.FunctionComponent<IEvaluationsViewProps> = (props) => {

  const buttons: IButtonsProps[] = [];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Detalle de evaluación',
          size: 'small',
          widthModal: 600,
          showButtons: [{ _id: OK }]
        })
        setOpenModal(true);
        break;
      case 'uploadexam':
        setActualModal({
          _id: id,
          title: 'Subir examen',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'generateexam':
        setActualModal({
          _id: id,
          title: 'Generar examen -piso o aversion-',
          size: 'small',
          widthModal: 1300,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      case 'confirmexam':
        setActualModal({
          _id: id,
          title: 'Confirmar examen -psico o aversion- -nombre examinado-',
          size: 'small',
          widthModal: 1000,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        })
        setOpenModal(true);
        break;
      default:
        return setActualModal(buttons[0])
    }
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Evaluaciones' />
      <HeaderTableComponent
        title='Evaluaciones ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => { }}
        showDetails
        showNullify
        showUploadExam
        showGenerateExam
        showDownloadExam
        showConfirmExam
      />
      {/* modal */}
      {ActualModal &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={ActualModal.widthModal || 500}
          onClose={() => setOpenModal(false)}
          showButtons={ActualModal.showButtons || []}
        >
          {ActualModal._id === 'details' && <DetailsEvaluationView />}
          {ActualModal._id === 'uploadexam' && <UploadExamView />}
          {/* {ActualModal._id === 'generateexam' && <PsicosensotecnicoExamView />} */}
          {ActualModal._id === 'generateexam' && <AversionRiesgoExamView />}
          {ActualModal._id === 'confirmexam' && <ConfirmExamView />}
        </ModalComponent>}
    </div>
  );
};

export default EvaluationsView;
