import React, { useState, useEffect } from 'react';

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models';
import { CANCEL, CONFIRM, EDIT, EMPLOYEES_COLUMNS_TABLE, FILTERS_EMPLOYEES, N_PER_PAGE } from '../../constants/var';

import SubBarComponent from "../../component/Subbar/SubBar";
import HeaderTableComponent from "../../component/HeaderTable/HeaderTable";
import ModalComponent from "../../component/Modal/Modal";
import TableComponent from "../../component/Table/Table";

import EditEmployeeView from "./editemployee.view";
import DetailsEmployeeView from "./detailemployee.view";
import AbsensesEmployee from "./absensesemployee.view";
import { GiModel, IResponseEmployees } from '../../models/gi.models';
import { MilesFormat } from '../../libs/formattedPesos';

import AlertComponent from "../../component/Alert/Alert";
import PaginationComponent from '../../component/Pagination/Pagination';

import { IReponseAllEmployees } from '../../models/gi.models';
import { deleteEmployeeService, filterEmployeesService, getAllEmployeesService } from '../../services';

const buttons: IButtonsProps[] = [];

interface IEmployeesProps {

}

const Employees: React.FunctionComponent<IEmployeesProps> = (props) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0]);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [optionFilter, setOptionFilter] = useState<number>(0);
  const [employees, setEmployees] = useState<GiModel[]>([]);
  const [employeeSelected, setEmployeeSelected] = useState<GiModel>();
  const [idEmployeeSelected, setIdEmployeeSelected] = useState<string>('');
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);

  const handleClickButton = (button: IButtonsProps) => {
    setActualModal(button);
    setOpenModal(true);
  };

  const handleCLickActionTable = (id: string, idregister: string | undefined) => {
    switch (id) {
      case 'edit':
        setActualModal({
          _id: id,
          title: 'Edición de Empleado',
          size: 'small',
          widthModal: 1050,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        });
        idregister && setEmployeeSelected(employees.find((employee) => employee._id === idregister));
        setOpenModal(true);
        break;
      case 'details':
        setActualModal({
          _id: id,
          title: 'Información del Empleado',
          size: 'small',
          widthModal: 1200,
          showButtons: [{ _id: CANCEL }]
        });
        idregister && setEmployeeSelected(employees.find((employee) => employee._id === idregister));
        setOpenModal(true);
        break;
      case 'absense':
        setActualModal({
          _id: id,
          title: 'Ausencias de Empleado',
          size: 'small',
          widthModal: 1500,
          showButtons: [{ _id: CANCEL }, { _id: CONFIRM }]
        });
        idregister && setIdEmployeeSelected(idregister);
        setOpenModal(true);
        break;
      case 'delete':
        idregister && setIdEmployeeSelected(idregister)
        setActualModal({
          _id: id,
          title: '',
          size: 'small',
          widthModal: 0,
          showButtons: [{ _id: CANCEL }, { _id: EDIT }]
        })
        break;
      default:
        break;
    }
  };

  const handleCloseModal = (value: string, message: string) => {
    setOpenModal(false)
    if (value === '') return
    setMessageAlert({ message, type: 'success', show: true });
    if (value === 'reload') {
      getEmployees(1);
    }
  };

  const handleTransformPrice = (employees: GiModel[]) => {
    const aux = employees.map((employee) => {
      return {
        ...employee,
        sueldo_bruto_string: `$ ${MilesFormat(employee.sueldo_bruto || 0)}`
      }
    });
    return aux;
  };

  const handleClickSearch = async () => {
    setLoading(true)
    const headfilter = FILTERS_EMPLOYEES.find((element) => element.key === optionFilter);
    if (!headfilter) return
    filterEmployees(filterText, headfilter.name)
    setLoading(false)
  };

  const handleChangePagination = (newpage: number) => {
    setLoading(true);
    getEmployees(newpage);
    setLoading(false)
  };

  async function hanbleDeleteEmployee(id: string) {
    const aux: IResponseEmployees = await deleteEmployeeService(id);
    if (aux.err === null) {
      setMessageAlert({ message: aux.res, type: 'success', show: true });
      getEmployees(1);
      return setLoading(false);
    }
    setMessageAlert({ message: aux.res, type: 'error', show: true });
    return setLoading(false);
  };

  async function getEmployees(pagenumber: number) {
    setLoading(true)
    const aux: IReponseAllEmployees = await getAllEmployeesService(pagenumber, N_PER_PAGE);
    if (!aux.err) {
      setEmployees(aux.empleados);
      setActualPage(aux.pagina_actual);
      setTotalItems(aux.total_items);
    }
    setLoading(false)
  };

  async function filterEmployees(date: string, headFilter: string) {
    const aux: IReponseAllEmployees = await filterEmployeesService(
      2,
      date,
      headFilter,
      1,
      N_PER_PAGE
    );

    if (!aux.err) {
      return setEmployees(aux.empleados);
    }
    if (aux.err) {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
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
    getEmployees(1);
  }, []);

  useEffect(() => {
    if (ActualModal && ActualModal._id === 'delete') {
      setLoading(true);
      hanbleDeleteEmployee(idEmployeeSelected);
    }
  }, [ActualModal]);

  return (
    <div className='container-gi'>
      <SubBarComponent title='Empleados' />
      {messageAlert.show &&
        <AlertComponent
          message={messageAlert.message}
          type={messageAlert.type}
          customStyle={{ width: '60%', height: 50, fontSize: 18, fontWeight: 'bold' }}
          showIcon
        />
      }
      <HeaderTableComponent
        title='Empleados ASIS'
        subtitle='Tabla de información'
        buttons={buttons}
        dataFilter={FILTERS_EMPLOYEES}
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
        onClickDelete={(id, _id) => handleCLickActionTable(id, _id)}
        columns={EMPLOYEES_COLUMNS_TABLE}
        data={handleTransformPrice(employees)}
        loading={loading}
        showAbsence
        showEdit
        showDetails
        showDelete
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
          {ActualModal._id === 'edit' &&
            <EditEmployeeView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              employeesSelected={employeeSelected}
            />
          }
          {ActualModal._id === 'details' &&
            <DetailsEmployeeView
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              employeesSelected={employeeSelected}
            />
          }
          {ActualModal._id === 'absense' &&
            <AbsensesEmployee
              onCloseModal={(value, message) => handleCloseModal(value, message)}
              idEmployee={idEmployeeSelected}
            />
          }
        </ModalComponent>}
    </div>
  );
};

export default Employees;
