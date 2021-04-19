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
  FileSearchOutlined
} from "@ant-design/icons";
import { IColumnTable, ITableDeleteObject } from '../../models/index.models';
import { GiModel } from '../../models/gi.models';
import { RequestModel } from '../../models/request.models';

interface ITableComponentProps {
  data?: GiModel[] | RequestModel[] | undefined,
  columns?: IColumnTable[],
  onClickAction: (id: string, _id?: string) => (string | void) | (string | undefined),
  onClickDelete: (id: string, _id: string) => string | void,
  loading?: boolean,
  headerWithColor?: boolean,
  enableRowSelection?: boolean,
  enablePagination?: boolean,
  useStyle?: boolean,
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
  showConfirmExam?: boolean,
  showSendMail?: boolean,
  showInvoice?: boolean,
  showUploadOC?: boolean,
  showConfirmOC?: boolean,
  showDownloadOc?: boolean,
  showDownloadInvoice?: boolean,
  showValidateInvoice?: boolean,
  showManagmentPayments?: boolean,
  showGeneratePayment?: boolean,
  showRequestPaymentCard?: boolean
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
  showConfirmExam = false,
  showUploadResult = false,
  showSendMail = false,
  showInvoice = false,
  showUploadOC = false,
  showConfirmOC = false,
  showDownloadOc = false,
  showDownloadInvoice = false,
  showValidateInvoice = false,
  showManagmentPayments = false,
  showGeneratePayment = false,
  showRequestPaymentCard = false
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<ITableDeleteObject>({ _id: '', show: false });
  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox');

  const rowSelection = {
    // onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const processStates = [
    {
      title: 'Estado proceso',
      dataIndex: 'estado_proceso',
      key: 'estado_proceso',
      render: (_: string, record: any) => (
        <>
          {record.estado === 'Ingresado' &&
            <Tag style={{ textAlign: 'center' }} color="#2db7f5">Ingresado</Tag>
          }
          {record.estado === 'Cnfirmado' &&
            <Tag style={{ textAlign: 'center' }} color="#4CAF50">Ingresado</Tag>
          }
        </>
      )
    }
  ];

  const defaultColumns = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      className: headerWithColor ? 'column-money' : '',
      render: (text: string, record: any, index: any) => (
        <>
          {showConfiguration &&
            <Tooltip title="Configuración" color={'#546E7A'}>
              <Button
                onClick={() => onClickAction('configurationGi')}
                style={{ backgroundColor: '#546E7A' }}
                icon={<LockOutlined style={{ fontSize: '1.1rem', color: 'white' }} />}
              />
            </Tooltip>
          }
          {showDetails &&
            <Tooltip title='Detalle' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('details', record._id)}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<EyeOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showEdit &&
            <Tooltip title='Editar' color={'#F68923'}>
              <Button
                onClick={() => onClickAction('edit', record._id)}
                style={{ backgroundColor: '#F68923' }}
                icon={<EditOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDelete &&
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
          {showAbsence &&
            <Tooltip title='Ausencias' color={'#4DE13E'}>
              <Button
                onClick={() => onClickAction('absense')}
                style={{ backgroundColor: '#4DE13E' }}
                icon={<ClockCircleOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showNullify &&
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
          {showSchedule &&
            <Tooltip title='Agendar' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('schedule')}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<CalendarOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showReservation &&
            <Tooltip title='Reservar' color={'#4CAF50'}>
              <Button
                onClick={() => onClickAction('reservation')}
                style={{ backgroundColor: '#4CAF50' }}
                icon={<ScheduleOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showUploadExam &&
            <Tooltip title='Subir Examen' color={'#1073B5'}>
              <Button
                onClick={() => onClickAction('uploadexam')}
                style={{ backgroundColor: '#1073B5' }}
                icon={<CloudUploadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showGenerateExam &&
            <Tooltip title='Generar Examen' color={'#69DF43'}>
              <Button
                onClick={() => onClickAction('generateexam')}
                style={{ backgroundColor: '#69DF43' }}
                icon={<ContainerOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDownloadExam &&
            <Tooltip title='Descargar Examen' color={'#1A9D02'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#1A9D02' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showConfirmExam &&
            <Tooltip title='Confirmar Examen' color={'#18BBC3'}>
              <Button
                onClick={() => onClickAction('confirmexam')}
                style={{ backgroundColor: '#18BBC3' }}
                icon={<FileDoneOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showUploadResult &&
            <Tooltip title='Subir Resultado' color={'#0EB0A1'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#0EB0A1' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showSendMail &&
            <Tooltip title='Enviar Email' color={'#0E27B0'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#0E27B0' }}
                icon={<MailOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showUploadOC &&
            <Tooltip title='Subir OC' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('uploadoc')}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showConfirmOC &&
            <Tooltip title='Confirmar OC' color={'#39AE16'}>
              <Button
                onClick={() => onClickAction('confirmoc')}
                style={{ backgroundColor: '#39AE16' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDownloadOc &&
            <Tooltip title='Descargar OC' color={'#39AE16'}>
              <Button
                onClick={() => onClickAction('')}
                style={{ backgroundColor: '#39AE16' }}
                icon={<CloudDownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDownloadInvoice &&
            <Tooltip title='Descargar factura' color={'#39AE16'}>
              <Button
                onClick={() => onClickAction('')}
                style={{ backgroundColor: '#39AE16' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showInvoice &&
            <Tooltip title='Factura' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('generateinvoice')}
                style={{ backgroundColor: 'white' }}
                icon={<CreditCardOutlined style={{ fontSize: '1.1rem', color: '#50ACF5' }} />} />
            </Tooltip>
          }
          {showValidateInvoice &&
            <Tooltip title='Validar factura' color={'#39AE16'}>
              <Button
                onClick={() => onClickAction('validateinvoice')}
                style={{ backgroundColor: 'white' }}
                icon={<FileSearchOutlined style={{ fontSize: '1.1rem', color: '#39AE16' }} />} />
            </Tooltip>
          }
          {showManagmentPayments &&
            <Tooltip title='Gestión de Pagos' color={'#870989'}>
              <Button
                onClick={() => onClickAction('managepayment')}
                style={{ backgroundColor: 'white' }}
                icon={<DollarOutlined style={{ fontSize: '1.1rem', color: '#870989' }} />} />
            </Tooltip>
          }
          {showGeneratePayment &&
            <Tooltip title='Realizar Pago' color={'#35A20C'}>
              <Button
                onClick={() => onClickAction('generatepayment')}
                style={{ backgroundColor: 'white' }}
                icon={<DollarOutlined style={{ fontSize: '1.1rem', color: '#35A20C' }} />} />
            </Tooltip>
          }
          {showRequestPaymentCard &&
            <Tooltip title='Carta Cobranza' color={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('requestpaymentcard')}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<MailOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
        </>
      )
    },
  ];

  const defaultData: any = [
    {
      _id: '736767wgdy3gd',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    },
    {
      _id: 'sssssdd873e3e',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    },
    {
      _id: 'sduishdwudw6666',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    },
  ];

  return (
    <Table
      columns={[...processStates, ...columns, ...defaultColumns]}
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
