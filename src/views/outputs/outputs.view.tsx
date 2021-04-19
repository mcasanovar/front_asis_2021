import React, { useState } from 'react';

import { IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

interface IOutputsViewProps {
}

const OutputsView: React.FunctionComponent<IOutputsViewProps> = (props) => {

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
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  return (
    <div className='container-gi'>
      <SubBarComponent title='Salidas' />
      <HeaderTableComponent
        title='Salidas ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        onClick={(button) => handleClickButton(button)}
        onClickGrupal={() => {}}
        filterText={''}
        setFilterText={setFilterText}
        onClickSearch={() => {}}
        setOptionFilter={setOptionFilter}
        
      />
      <TableComponent
        onClickAction={(id: string) => { }}
        onClickDelete={() => {}}
      />
      {/* modal */}
      {buttons.length > 0 &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={1200}
          onClose={() => setOpenModal(false)}
          onClickConfirm={(id) => {}}
          showButtons={[]}
        >

        </ModalComponent>
      }
    </div>
  );
};

export default OutputsView;
