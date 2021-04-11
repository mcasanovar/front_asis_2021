import React, { useState } from 'react';
import { Table, Button, Tooltip, Popover } from "antd";

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
  FolderOpenOutlined
} from "@ant-design/icons";
import { ITableDeleteObject } from '../../models/index.models';

interface ITableComponentProps {
  onClickAction: (id: string) => string | void,
  onClickDelete: (id: string) => string | void,
  useStyle?: boolean,
  showConfiguration?: boolean,
  showDetails?: boolean,
  showEdit?: boolean,
  showDelete?: boolean,
  showAbsence?: boolean,
  showNullify?: boolean,
  showSchedule?: boolean,
  showReservacion?: boolean,
  showUploadExam?: boolean,
  showUploadResult?: boolean,
  showGenerateExam?: boolean,
  showDownloadExam?: boolean,
  showConfirmExam?: boolean,
  showSendMail?: boolean,
  showInvoice?: boolean,
  showUploadOC?: boolean,
  showManagmentPayments?: boolean,
  showGeneratePayment?: boolean,
  showRequestPaymentCard?: boolean
}

const TableComponent: React.FunctionComponent<ITableComponentProps> = ({
  onClickAction,
  onClickDelete,
  useStyle = true,
  showConfiguration = false,
  showDetails = false,
  showEdit = false,
  showDelete = false,
  showAbsence = false,
  showNullify = false,
  showSchedule = false,
  showReservacion = false,
  showUploadExam = false,
  showGenerateExam = false,
  showDownloadExam = false,
  showConfirmExam = false,
  showUploadResult = false,
  showSendMail = false,
  showInvoice = false,
  showUploadOC = false,
  showManagmentPayments = false,
  showGeneratePayment = false,
  showRequestPaymentCard = false
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<ITableDeleteObject>({ _id: '', show: false });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: any, index: any) => (
        <>
          {showConfiguration &&
            <Tooltip title="Configuración" color={'#546E7A'} key={'#546E7A'}>
              <Button
                onClick={() => onClickAction('configurationGi')}
                style={{ backgroundColor: '#546E7A' }}
                icon={<LockOutlined style={{ fontSize: '1.1rem', color: 'white' }} />}
              />
            </Tooltip>
          }
          {showDetails &&
            <Tooltip title='Detalle' color={'#50ACF5'} key={'#50ACF5'}>
              <Button
                onClick={() => onClickAction('details')}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<EyeOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showEdit &&
            <Tooltip title='Editar' color={'#F68923'} key={'#F68923'}>
              <Button
                onClick={() => onClickAction('edit')}
                style={{ backgroundColor: '#F68923' }}
                icon={<EditOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDelete &&
            <Popover
              content={<Button style={{ backgroundColor: '#E6100D', color: 'white' }} onClick={() => onClickDelete(record._id)}>
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
            <Tooltip title='Ausencias' color={'#4DE13E'} key={'#4DE13E'}>
              <Button
                onClick={() => onClickAction('absense')}
                style={{ backgroundColor: '#4DE13E' }}
                icon={<ClockCircleOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showNullify &&
            <Tooltip title='Anular' color={'#FE5151'} key={'#FE5151'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: 'white' }}
                icon={<MinusCircleOutlined style={{ fontSize: '1.1rem', color: '#FE5151' }} />} />
            </Tooltip>
          }
          {showSchedule &&
            <Tooltip title='Agendar' color={'#50ACF5'} key={'#50ACF5'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<CalendarOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showReservacion &&
            <Tooltip title='Reservar' color={'#4CAF50'} key={'#4CAF50'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#4CAF50' }}
                icon={<ScheduleOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showUploadExam &&
            <Tooltip title='Subir Examen' color={'#1073B5'} key={'#1073B5'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#1073B5' }}
                icon={<CloudUploadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showGenerateExam &&
            <Tooltip title='Generar Examen' color={'#69DF43'} key={'#69DF43'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#69DF43' }}
                icon={<ContainerOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDownloadExam &&
            <Tooltip title='Descargar Examen' color={'#1A9D02'} key={'#1A9D02'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#1A9D02' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showConfirmExam &&
            <Tooltip title='Confirmar Examen' color={'#18BBC3'} key={'#18BBC3'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#18BBC3' }}
                icon={<FileDoneOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showUploadResult &&
            <Tooltip title='Subir Resultado' color={'#0EB0A1'} key={'#0EB0A1'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#0EB0A1' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showSendMail &&
            <Tooltip title='Enviar Email' color={'#0E27B0'} key={'#0E27B0'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#0E27B0' }}
                icon={<MailOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showInvoice &&
            <Tooltip title='Factura' color={'#50ACF5'} key={'#50ACF5'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: 'white' }}
                icon={<CreditCardOutlined style={{ fontSize: '1.1rem', color: '#50ACF5' }} />} />
            </Tooltip>
          }
          {showUploadOC &&
            <Tooltip title='Subir OC' color={'#50ACF5'} key={'#50ACF5'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showManagmentPayments &&
            <Tooltip title='Gestión de Pagos' color={'#870989'} key={'#870989'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#870989' }}
                icon={<FolderOpenOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showGeneratePayment &&
            <Tooltip title='Realizar Pago' color={'#35A20C'} key={'#35A20C'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: 'white' }}
                icon={<DollarOutlined style={{ fontSize: '1.1rem', color: '#35A20C' }} />} />
            </Tooltip>
          }
          {showRequestPaymentCard &&
            <Tooltip title='Carta Cobranza' color={'#50ACF5'} key={'#50ACF5'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<MailOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
        </>
      )
    },
  ];

  const data: any = [
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
      columns={columns}
      dataSource={data}
      style={useStyle ? { width: '94%', marginTop: '10.7rem' } : {}}
      rowKey={'key'}
    />
  );
};

export default TableComponent;
