import React, { useState } from 'react';
import { Table, Button, Tooltip, Popover, Tag } from "antd";

import {
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  CloudUploadOutlined,
  ContainerOutlined,
  DownloadOutlined,
  FileDoneOutlined,
  FilePdfOutlined,
  MailOutlined,
  CreditCardOutlined,
  DollarOutlined,
  CloudDownloadOutlined,
  FileSearchOutlined,
  SendOutlined
} from "@ant-design/icons";
import { IColumnTable, ITableDeleteObject } from '../../models/index.models';
import { GiModel } from '../../models/gi.models';
import { RequestModel } from '../../models/request.models';
import { ReservationModel } from '../../models/reservation.models';
import { EvaluationModel } from '../../models/evaluations.models';
import { ResultModel } from '../../models/results.model';
import { InvoicesModel } from '../../models/invoices.models';
import { PaymentModel } from '../../models/payments.models';
import { RequestPaymentModel } from '../../models/requestpayment.models';
import { ExpensesModel } from '../../models/expenses.models';
import { OutputModel } from '../../models/outputs.models';
import { ExistenceModel } from '../../models/existence.models';
import { PERMISSIONS } from '../../constants/var';

interface ITableComponentProps {
  data?: GiModel[]
  | RequestModel[]
  | ReservationModel[]
  | EvaluationModel[]
  | ResultModel[]
  | InvoicesModel[]
  | PaymentModel[]
  | RequestPaymentModel[]
  | ExpensesModel[]
  | OutputModel[]
  | ExistenceModel[]
  | undefined,
  columns?: IColumnTable[],
  onClickAction: (id: string, _id?: string) => (string | void) | (string | undefined),
  onClickDelete: (id: string, _id: string) => string | void,
  loading?: boolean,
  headerWithColor?: boolean,
  enableRowSelection?: boolean,
  enablePagination?: boolean,
  useStyle?: boolean,
  showFileState?: boolean,
  showProcessState?: boolean,
  showConfiguration?: boolean,
  showDetails?: boolean,
  showEdit?: boolean,
  showDelete?: boolean,
  showAbsence?: boolean,
  showNullify?: boolean,
  showSchedule?: boolean,
  showReservation?: boolean,
  showUploadExam?: boolean,
  showUploadResult?: boolean,
  showGenerateExam?: boolean,
  showDownloadExam?: boolean,
  showDownloadResult?: boolean,
  showConfirmExam?: boolean,
  showConfirmResult?: boolean,
  showSendMail?: boolean,
  showInvoice?: boolean,
  showUploadOC?: boolean,
  showConfirmOC?: boolean,
  showDownloadOc?: boolean,
  showDownloadInvoice?: boolean,
  showValidateInvoice?: boolean,
  showManagmentPayments?: boolean,
  showGeneratePayment?: boolean,
  showRequestPaymentCard?: boolean,
  ShowDownloadExpense?: boolean,
  ShowEntries?: boolean,
  showSendMailTemplate?: boolean,
  userPermissions?: string[],
  typeModule?: string
}

const TableComponent: React.FunctionComponent<ITableComponentProps> = ({
  data = undefined,
  columns = [],
  onClickAction,
  onClickDelete,
  loading = false,
  headerWithColor = false,
  enableRowSelection = false,
  enablePagination = true,
  useStyle = true,
  showFileState = false,
  showProcessState = false,
  showConfiguration = false,
  showDetails = false,
  showEdit = false,
  showDelete = false,
  showAbsence = false,
  showNullify = false,
  showSchedule = false,
  showReservation = false,
  showUploadExam = false,
  showGenerateExam = false,
  showDownloadExam = false,
  showDownloadResult = false,
  showConfirmExam = false,
  showUploadResult = false,
  showConfirmResult = false,
  showSendMail = false,
  showInvoice = false,
  showUploadOC = false,
  showConfirmOC = false,
  showDownloadOc = false,
  showDownloadInvoice = false,
  showValidateInvoice = false,
  showManagmentPayments = false,
  showGeneratePayment = false,
  showRequestPaymentCard = false,
  ShowDownloadExpense = false,
  ShowEntries = false,
  showSendMailTemplate = false,
  userPermissions = [],
  typeModule = ''
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<ITableDeleteObject>({ _id: '', show: false });
  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox');

  const handleShowPermission = (selectedPermission: string) => {
    if (!userPermissions.length || !selectedPermission) return false;
    if (userPermissions.indexOf(selectedPermission) > -1) return true;
    return false
  };

  const handleShowDeletePermission = (type: string) => {
    switch (type) {
      case 'gi':
        return userPermissions.indexOf(PERMISSIONS.DELETE_GI) > -1 ? true : false
      case 'employees':
        return userPermissions.indexOf(PERMISSIONS.DELETE_EMPLOYEE) > -1 ? true : false
      default:
        return false
    }
  };

  const handleShowDetailsPermission = (type: string) => {
    switch (type) {
      case 'gi':
        return userPermissions.indexOf(PERMISSIONS.DETAILS_GI) > -1 ? true : false
      case 'employees':
        return userPermissions.indexOf(PERMISSIONS.DETAILS_EMPLOYEE) > -1 ? true : false
      case 'requests':
        return userPermissions.indexOf(PERMISSIONS.DETAILS_REQUETS) > -1 ? true : false
      case 'reservations':
        return userPermissions.indexOf(PERMISSIONS.DETAILS_RESERVATION) > -1 ? true : false
      case 'evaluations':
        return userPermissions.indexOf(PERMISSIONS.DETAILS_EVALUATION) > -1 ? true : false
      case 'results':
        return userPermissions.indexOf(PERMISSIONS.DETAILS_RESULT) > -1 ? true : false
      default:
        return false
    }
  };

  const handleShowEditPermission = (type: string) => {
    switch (type) {
      case 'gi':
        return userPermissions.indexOf(PERMISSIONS.EDIT_GI) > -1 ? true : false
      case 'employees':
        return userPermissions.indexOf(PERMISSIONS.EDIT_EMPLOYEE) > -1 ? true : false
      case 'requests':
        return userPermissions.indexOf(PERMISSIONS.EDIT_REQUEST) > -1 ? true : false
      case 'reservations':
        return userPermissions.indexOf(PERMISSIONS.EDIT_RESERVATION) > -1 ? true : false
      default:
        return false
    }
  };

  const handleShowNullifyPermission = (type: string) => {
    switch (type) {
      case 'requests':
        return userPermissions.indexOf(PERMISSIONS.NULLIFY_REQUEST) > -1 ? true : false
      case 'reservations':
        return userPermissions.indexOf(PERMISSIONS.NULLIFY_RESERVATION) > -1 ? true : false
      case 'evaluations':
        return userPermissions.indexOf(PERMISSIONS.NULLIFY_EVALUATION) > -1 ? true : false
      case 'results':
        return userPermissions.indexOf(PERMISSIONS.NULLIFY_RESULT) > -1 ? true : false
      default:
        return false
    }
  };

  const handleShowSendMailTemplate = (type: string) => {
    switch (type) {
      case 'requests':
        return userPermissions.indexOf(PERMISSIONS.SEND_MAIL_TEMPLATE_REQUEST) > -1 ? true : false
      case 'reservations':
        return userPermissions.indexOf(PERMISSIONS.SEND_MAIL_TEMPLATE_RESERVATION) > -1 ? true : false
      default:
        return false
    }
  };

  const handleShowSendMail = (type: string) => {
    switch (type) {
      case 'results':
        return userPermissions.indexOf(PERMISSIONS.SEND_MAIL) > -1 ? true : false
      default:
        return false
    }
  };

  const handleShowDownloadExam = (type: string) => {
    switch (type) {
      case 'evaluations':
        return userPermissions.indexOf(PERMISSIONS.DOWNLOAD_EXAM_EVALUACION) > -1 ? true : false
      default:
        return false
    }
  }

  const handleShowConfirmExam = (type: string) => {
    switch (type) {
      case 'evaluations':
        return userPermissions.indexOf(PERMISSIONS.CONFIRM_EXAM_EVALUATION) > -1 ? true : false
      default:
        return false
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const processStates = showProcessState ? [
    {
      title: 'Estado proceso',
      dataIndex: 'estado_proceso',
      key: 'estado_proceso',
      render: (_: string, record: any) => (
        <>
          {record.estado === 'Ingresado' &&
            <Tag style={{ textAlign: 'center' }} color="#2db7f5">Ingresado</Tag>
          }
          {record.estado === 'Confirmado' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Confirmado</Tag>
          }
          {record.estado === 'Reservado' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Reservado</Tag>
          }
          {record.estado === 'En Evaluacion' &&
            <Tag style={{ textAlign: 'center' }} color="#FC9410">En Evaluación</Tag>
          }
          {record.estado === 'Evaluado' &&
            <Tag style={{ textAlign: 'center' }} color="#0CC220">Evaluado</Tag>
          }
          {record.estado === 'En Revisión' &&
            <Tag style={{ textAlign: 'center' }} color="#FC9410">En Revisión</Tag>
          }
          {record.estado === 'Revisado' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Revisado</Tag>
          }
          {record.estado === 'En Facturacion' &&
            <Tag style={{ textAlign: 'center' }} color="#FC9410">En Facturación</Tag>
          }
          {record.estado === 'Facturado' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Facturado</Tag>
          }
          {record.estado === 'No Pagado' &&
            <Tag style={{ textAlign: 'center' }} color="#E41B0E">No Pagado</Tag>
          }
          {record.estado === 'Pago Parcial' &&
            <Tag style={{ textAlign: 'center' }} color="#FC9410">Pago Parcial</Tag>
          }
          {record.estado === 'Pagado' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Pagado</Tag>
          }
          {record.estado === 'Vencido' &&
            <Tag style={{ textAlign: 'center' }} color="#E41B0E">Vencido</Tag>
          }
          {record.estado === 'Al Dia' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Al Dia</Tag>
          }
          {record.estado === 'Sin Stock' &&
            <Tag style={{ textAlign: 'center' }} color="#E41B0E">Sin Stock</Tag>
          }
          {record.estado === 'Adquirir Stock' &&
            <Tag style={{ textAlign: 'center' }} color="#FC9410">Adquirir Stock</Tag>
          }
          {record.estado === 'Stock al Día' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Stock al Día</Tag>
          }
        </>
      )
    }
  ] : [];

  const processFile = showFileState ? [
    {
      title: 'Estado archivo',
      dataIndex: 'estado_archivo',
      key: 'estado_archivo',
      render: (_: string, record: any) => (
        <>
          {record.estado_archivo === 'Sin Documento' &&
            <Tag style={{ textAlign: 'center' }} color="grey">Sin Documento</Tag>
          }
          {record.estado_archivo === 'Cargado' &&
            <Tag style={{ textAlign: 'center' }} color="#116FEF">Cargado</Tag>
          }
          {record.estado_archivo === 'Rechazado' &&
            <Tag style={{ textAlign: 'center' }} color="#E41B0E">Rechazado</Tag>
          }
          {record.estado_archivo === 'Aprobado' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Aprobado</Tag>
          }
        </>
      )
    }
  ] : [];

  const defaultColumns = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      className: headerWithColor ? 'column-money' : '',
      render: (text: string, record: any, index: any) => (
        <>
          {handleShowPermission(PERMISSIONS.CONFIGURATION_GI) && showConfiguration &&
            <Tooltip title="Configuración" color={'#546E7A'}>
              <Button
                onClick={() => onClickAction('configurationGi', record._id)}
                style={{ backgroundColor: '#546E7A' }}
                icon={<LockOutlined style={{ fontSize: '1.1rem', color: 'white' }} />}
              />
            </Tooltip>
          }
          {handleShowDetailsPermission(typeModule) && showDetails &&
            <Tooltip title='Detalle' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('details', record._id)}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<EyeOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {handleShowEditPermission(typeModule) && showEdit
            && (record.estado === 'Ingresado'
              || record.grupo_interes === 'Empleados'
              || record.grupo_interes === 'Clientes'
              || record.grupo_interes === 'Colaboradores'
              || record.grupo_interes === 'admin'
              || record.codigo.includes('SAL')) &&
            <Tooltip title='Editar' color={'#F68923'}>
              <Button
                onClick={() => onClickAction('edit', record._id)}
                style={{ backgroundColor: '#F68923' }}
                icon={<EditOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {userPermissions.indexOf(PERMISSIONS.ABSENSES_EMPLOYEE) > -1 && showAbsence &&
            <Tooltip title='Ausencias' color={'#4DE13E'}>
              <Button
                onClick={() => onClickAction('absense', record._id)}
                style={{ backgroundColor: '#4DE13E' }}
                icon={<ClockCircleOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {handleShowNullifyPermission(typeModule) && showNullify &&
            <Popover
              content={<Button style={{ backgroundColor: '#E6100D', color: 'white' }} onClick={() => onClickDelete('nullify', record._id)}>
                Confirmar anulación</Button>}
              title="¿Seguro que desea anular este registro?"
              trigger="click"
              visible={(deleteConfirmation._id === record._id && deleteConfirmation.show === true) ? true : false}
              onVisibleChange={() => setDeleteConfirmation({ _id: record._id, show: !deleteConfirmation.show })}
            >
              <Button
                onClick={() => setDeleteConfirmation({ _id: record._id, show: true })}
                style={{ backgroundColor: '#E6100D' }}
                icon={<MinusCircleOutlined style={{ fontSize: '1.1rem', color: 'white' }} />}
              />
            </Popover>
          }
          {userPermissions.indexOf(PERMISSIONS.CONFIRM_REQUEST) > -1 && showSchedule && record.estado === 'Ingresado' &&
            <Tooltip title='Agendar' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('schedule', record._id)}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<CalendarOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {userPermissions.indexOf(PERMISSIONS.CONFIRM_RESERVATION) > -1 && showReservation && record.estado === 'Ingresado' &&
            <Tooltip title='Reservar' color={'#4CAF50'}>
              <Button
                onClick={() => onClickAction('reservation', record._id)}
                style={{ backgroundColor: '#4CAF50' }}
                icon={<ScheduleOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {userPermissions.indexOf(PERMISSIONS.UPLOAD_EXAM_EVALUATION) > -1 && showUploadExam
            && record.estado === 'Ingresado'
            && (record.estado_archivo === 'Sin Documento' || record.estado_archivo === 'Rechazado')
            && showFileState &&
            <Tooltip title='Subir Examen' color={'#1073B5'}>
              <Button
                onClick={() => onClickAction('uploadexam', record._id)}
                style={{ backgroundColor: '#1073B5' }}
                icon={<CloudUploadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {userPermissions.indexOf(PERMISSIONS.GENERATE_EXAM_EVALUATION) > -1 && showGenerateExam
            && record.estado === 'Ingresado'
            && (record.estado_archivo === 'Sin Documento' || record.estado_archivo === 'Rechazado')
            && (record.nombre_servicio === 'Psicosensotécnico Riguroso' || record.nombre_servicio === 'Aversión al Riesgo') &&
            <Tooltip title='Generar Examen' color={'#69DF43'}>
              <Button
                onClick={() => onClickAction('generateexam', record._id)}
                style={{ backgroundColor: '#69DF43' }}
                icon={<ContainerOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {handleShowDownloadExam(typeModule) && showDownloadExam
            && record.estado === 'En Evaluacion'
            && record.estado_archivo === 'Cargado'
            && (record.nombre_servicio === 'Psicosensotécnico Riguroso' || record.nombre_servicio === 'Aversión al Riesgo') &&
            <Tooltip title='Descargar Examen' color={'#1A9D02'}>
              <Button
                onClick={() => onClickAction('downloadexam', record._id)}
                style={{ backgroundColor: '#1A9D02' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {handleShowConfirmExam(typeModule) && showConfirmExam && record.estado === 'En Evaluacion' && record.estado_archivo === 'Cargado' &&
            <Tooltip title='Confirmar Examen' color={'#18BBC3'}>
              <Button
                onClick={() => onClickAction('confirmexam', record._id)}
                style={{ backgroundColor: '#18BBC3' }}
                icon={<FileDoneOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {userPermissions.indexOf(PERMISSIONS.UPLOAD_RESULT) > -1 && showUploadResult && record.estado === 'En Revisión'
            && (record.estado_archivo === 'Sin Documento' || record.estado_archivo === 'Rechazado') &&
            <Tooltip title='Subir Resultado' color={'#0EB0A1'}>
              <Button
                onClick={() => onClickAction('uploadresult', record._id)}
                style={{ backgroundColor: '#0EB0A1' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {userPermissions.indexOf(PERMISSIONS.DOWNLOAD_EXAM_RESULT) > -1 && showDownloadResult
            && (record.estado === 'En Revisión' || record.estado === 'Revisado')
            && (record.estado_archivo === 'Cargado' || record.estado_archivo === 'Aprobado') &&
            <Tooltip title='Descargar resultado' color={'#1A9D02'}>
              <Button
                onClick={() => onClickAction('downloadresult', record._id)}
                style={{ backgroundColor: '#1A9D02' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {userPermissions.indexOf(PERMISSIONS.CONFIRM_RESULT) > -1 && showConfirmResult && record.estado === 'En Revisión' && record.estado_archivo === 'Cargado' &&
            <Tooltip title='Confirmar resultado' color={'#116FEF'}>
              <Button
                onClick={() => onClickAction('confirmresult', record._id)}
                style={{ backgroundColor: '#116FEF' }}
                icon={<FileDoneOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {handleShowSendMail(typeModule) && showSendMail && record.estado === 'Revisado' && record.estado_archivo === 'Aprobado' &&
            <Tooltip title='Enviar Email' color={'#0E27B0'}>
              <Button
                onClick={() => onClickAction('resultsendmail', record._id)}
                style={{ backgroundColor: '#0E27B0' }}
                icon={<MailOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showUploadOC && record.estado === 'Ingresado'
            && (record.estado_archivo === 'Sin Documento' || record.estado_archivo === 'Rechazado')
            && record.oc === 'Si' &&
            <Tooltip title='Subir OC' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('uploadoc', record._id)}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showConfirmOC && record.estado === 'En Revisión' && record.estado_archivo === 'Cargado' &&
            <Tooltip title='Confirmar OC' color={'#39AE16'}>
              <Button
                onClick={() => onClickAction('confirmoc', record._id)}
                style={{ backgroundColor: '#39AE16' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDownloadOc && record.estado === 'En Revisión' && record.estado_archivo === 'Cargado' &&
            <Tooltip title='Descargar OC' color={'#1A9D02'}>
              <Button
                onClick={() => onClickAction('downloadoc', record._id)}
                style={{ backgroundColor: '#1A9D02' }}
                icon={<CloudDownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDownloadInvoice && record.estado === 'En Facturacion' && record.estado_archivo === 'Cargado' &&
            <Tooltip title='Descargar factura' color={'#1A9D02'}>
              <Button
                onClick={() => onClickAction('downloadinvoice', record._id)}
                style={{ backgroundColor: '#39AE16' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showInvoice && record.estado === 'En Facturacion'
            && (record.estado_archivo === 'Sin Documento' || record.estado_archivo === 'Aprobado' || record.estado_archivo === 'Rechazado')
            &&
            <Tooltip title='Factura' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('generateinvoice', record._id)}
                style={{ backgroundColor: 'white' }}
                icon={<CreditCardOutlined style={{ fontSize: '1.1rem', color: '#50ACF5' }} />} />
            </Tooltip>
          }
          {showValidateInvoice && record.estado === 'En Facturacion' && record.estado_archivo === 'Cargado' &&
            <Tooltip title='Validar factura' color={'#39AE16'}>
              <Button
                onClick={() => onClickAction('validateinvoice', record._id)}
                style={{ backgroundColor: 'white' }}
                icon={<FileSearchOutlined style={{ fontSize: '1.1rem', color: '#39AE16' }} />} />
            </Tooltip>
          }
          {showManagmentPayments &&
            <Tooltip title='Gestión de Pagos' color={'#870989'}>
              <Button
                onClick={() => onClickAction('managepayment', record._id)}
                style={{ backgroundColor: 'white' }}
                icon={<DollarOutlined style={{ fontSize: '1.1rem', color: '#870989' }} />} />
            </Tooltip>
          }
          {showGeneratePayment && record.estado !== 'Pagado' &&
            <Tooltip title='Realizar Pago' color={'#35A20C'}>
              <Button
                onClick={() => onClickAction('generatepayment', record._id)}
                style={{ backgroundColor: 'white' }}
                icon={<DollarOutlined style={{ fontSize: '1.1rem', color: '#35A20C' }} />} />
            </Tooltip>
          }
          {showRequestPaymentCard && record.estado === 'Vencido' &&
            <Tooltip title='Carta Cobranza' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('requestpaymentcard', record._id)}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<MailOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {ShowDownloadExpense &&
            <Tooltip title='Descargar gasto' color={'#1A9D02'}>
              <Button
                onClick={() => onClickAction('downloadexpense', record._id)}
                style={{ backgroundColor: '#39AE16' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {ShowEntries && record.inventario === 'Si' &&
            <Tooltip title='Entradas' color={'#55D515'}>
              <Button
                onClick={() => onClickAction('entries', record._id)}
                style={{ backgroundColor: '#55D515' }}
                icon={<DollarOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {handleShowSendMailTemplate(typeModule) && showSendMailTemplate &&
            (record.codigo.includes('SOL') || (record.codigo.includes('AGE') && record.estado === 'Reservado')) &&
            <Tooltip title='Enviar Mail' color={'#222DB7'}>
              <Button
                onClick={() => onClickAction('sendmail', record._id)}
                style={{ backgroundColor: '#222DB7' }}
                icon={<SendOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {handleShowDeletePermission(typeModule) && showDelete &&
            <Popover
              content={<Button style={{ backgroundColor: '#E6100D', color: 'white' }}
                onClick={() => onClickDelete('delete', record._id)}>
                Confirmar eliminación</Button>}
              title="¿Seguro que desea eliminar este registro?"
              trigger="click"
              visible={(deleteConfirmation._id === record._id && deleteConfirmation.show === true) ? true : false}
              onVisibleChange={() => setDeleteConfirmation({ _id: record._id, show: !deleteConfirmation.show })}
            >
              <Button
                onClick={() => setDeleteConfirmation({ _id: record._id, show: true })}
                style={{ backgroundColor: '#E6100D' }}
                icon={<DeleteOutlined style={{ fontSize: '1.1rem', color: 'white' }} />}
              />
            </Popover>
          }
        </>
      )
    },
  ];

  const defaultData: any = [];

  return (
    <Table
      columns={[...processStates, ...processFile, ...columns, ...defaultColumns]}
      dataSource={data || defaultData}
      loading={loading}
      rowSelection={enableRowSelection ? {
        type: selectionType,
        ...rowSelection
      } : undefined}
      style={useStyle ? { width: '94%', marginTop: '10.7rem' } : { width: '100%' }}
      rowKey={'key'}
      pagination={enablePagination ? { position: ['bottomCenter'] } : false}
    />
  );
};

export default TableComponent;
