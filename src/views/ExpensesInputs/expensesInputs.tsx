import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ExpensesModel, IResponseAllExpenses, IResponseExpenses } from '../../models/expenses.models';
import { CANCEL, EXPENSES_COLUMNS_TABLE, FILTERS_EXPENSES, N_PER_PAGE, OK } from '../../constants/var';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";
import AlertComponent from "../../component/Alert/Alert";

import NewEditExpenseView from './newexpense';
import DetailsExpenseView from './detailsexpense';
import EntriesView from './entries';

import { downloadFileExpenseService, filterExpensesService, getAllExpensesService } from '../../services';
import { MilesFormat } from '../../libs/formattedPesos';
import PaginationComponent from '../../component/Pagination/Pagination';

interface IExpensesInputsViewProps {
  authorized: boolean
}

const ExpensesInputsView: React.FunctionComponent<IExpensesInputsViewProps> = ({authorized}) => {

  const buttons: IButtonsProps[] = [
    {
      _id: 'newexpense',
      title: 'NUEVO GASTO',
      size: 'small',
      widthModal: 1200,
      showButtons: []
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<ExpensesModel[]>([]);
  const [idExpenseSelected, setIdExpenseSelected] = useState<string>('');
  const [expenseSelected, setExpenseSelected] = useState<ExpensesModel>();
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
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
      getExpenses(1);
    }
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    switch (id) {
      case 'details':
        setActualModal({
          _id: id,
          title: 'Detalle de gasto',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        });
        idregister && setExpenseSelected(expenses.find((expense) => expense._id === idregister));
        setOpenModal(true);
        break;
      case 'newexpense':
        setActualModal({
          _id: id,
          title: 'Nuevo gasto',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        });
        idregister && setExpenseSelected(expenses.find((expense) => expense._id === idregister));
        setOpenModal(true);
        break;
      case 'downloadexpense':
        idregister && setIdExpenseSelected(idregister);
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }]
        })
        break;
      case 'entries':
        setActualModal({
          _id: id,
          title: 'Entradas',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: OK }]
        });
        idregister && setExpenseSelected(expenses.find((expense) => expense._id === idregister));
        setOpenModal(true);
        break;
      default:
        break;
    }
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getExpenses(newpage);
    setLoading(false)
  };

  const handleTransformPrice = (expenses: ExpensesModel[]) => {
    const aux = expenses.map((expense) => {
      return {
        ...expense,
        total_string: `$ ${MilesFormat(expense.total)}`
      }
    });
    return aux;
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_EXPENSES.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterExpenses(filterText, headfilter.name)
    setLoading(false)
  };

  async function filterExpenses(date: string, headFilter: string) {
    const aux: IResponseAllExpenses = await filterExpensesService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      return setExpenses(aux.gastos);
    }
    if (aux.err) {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
    setLoading(false)
  };

  async function getExpenses(pagenumber: number) {
    setLoading(true)
    const aux: IResponseAllExpenses = await getAllExpensesService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setExpenses(aux.gastos);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
    }
    setLoading(false)
  };

  async function downloadFile(id: string) {
    const aux: IResponseExpenses = await downloadFileExpenseService(id);
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
    getExpenses(1);
  }, []);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'downloadexpense') {
      setLoading(true)
      downloadFile(idExpenseSelected);
      return
    }
  }, [ActualModal]);

  if(!authorized){
    return <Redirect to='./login'/>
  }

  return (
    <div className='container-gi'>
      <SubBarComponent title='Gastos/Entradas' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Gastos/Entradas ASIS'
        subtitle='Tabla de informaci??n'
        buttons={buttons}
        dataFilter={FILTERS_EXPENSES}
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
        columns={EXPENSES_COLUMNS_TABLE}
        data={handleTransformPrice(expenses)}
        loading={loading}
        showDetails
        showDelete
        ShowDownloadExpense
        ShowEntries
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
      {buttons.length > 0 &&
        <ModalComponent
          visible={OpenModal}
          title={ActualModal.title}
          width={1200}
          onClose={() => setOpenModal(false)}
          onClickConfirm={(id) => { }}
          showButtons={[]}
        >
          {ActualModal._id === 'newexpense' &&
            <NewEditExpenseView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              expenseSelected={expenseSelected}
            />
          }
          {ActualModal._id === 'details' &&
            <DetailsExpenseView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              expenseSelected={expenseSelected}
            />
          }
          {ActualModal._id === 'entries' &&
            <EntriesView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              expenseSelected={expenseSelected}
            />
          }
        </ModalComponent>
      }
    </div>
  );
};

export default ExpensesInputsView;
