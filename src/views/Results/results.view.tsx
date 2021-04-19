import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, OK } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import DetailsResultsView from "./detailsresults.view";
import ConfirmResultView from "./confirmresult.view";

interface IResultsViewProps {
}

const ResultsView: React.FunctionComponent<IResultsViewProps> = (props) => {

  const buttons: IButtonsProps[] = [];

  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Ver detalle resultado',
          size: 'small',
          widthModal: 600,
          showButtons: [{ _id: OK }]
        })
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
      default:
        return setActualModal(buttons[0])
    }
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Resultados' />
      <HeaderTableComponent
        title='Resultados ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        showDateFilter
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
        filterText={''}
        setFilterText={setFilterText}
        onClickSearch={() => {}}
        setOptionFilter={setOptionFilter}
        
      />
      <TableComponent
        onClickAction={(id: string) => handleCLickActionTable(id)}
        onClickDelete={() => { }}
        showDetails
        showNullify
        showDownloadExam
        showConfirmExam
        showUploadResult
        showSendMail
      />
      {/* modal */}
      {ActualModal &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={1200}
          onClose={() => setOpenModal(false)}
          onClickConfirm={(id) => {}}
          showButtons={ActualModal.showButtons || []}
        >
          {ActualModal._id === 'details' && <DetailsResultsView />}
          {ActualModal._id === 'confirmexam' && <ConfirmResultView />}
        </ModalComponent>}
    </div>
  );
};

export default ResultsView;