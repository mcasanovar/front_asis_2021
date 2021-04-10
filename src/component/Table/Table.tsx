import * as React from 'react';
import { Table, Button, Tooltip } from "antd";

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
  MailOutlined
} from "@ant-design/icons";

interface ITableComponentProps {
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
  showSendMail?: boolean
}

const TableComponent: React.FunctionComponent<ITableComponentProps> = ({
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
  showSendMail = false
}) => {

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
      render: () => (
        <>
          {showConfiguration &&
            <Tooltip title="Configuración" color={'#546E7A'} key={'#546E7A'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#546E7A' }}
                icon={<LockOutlined style={{ fontSize: '1.1rem', color: 'white' }} />}
              />
            </Tooltip>}

          {showDetails &&
            <Tooltip title='Detalle' color={'#50ACF5'} key={'#50ACF5'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#50ACF5' }}
                icon={<EyeOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showEdit &&
            <Tooltip title='Editar' color={'#F68923'} key={'#F68923'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#F68923' }}
                icon={<EditOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showDelete &&
            <Tooltip title='Eliminar' color={'#F72F2F'} key={'#F72F2F'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#F72F2F' }}
                icon={<DeleteOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          }
          {showAbsence &&
            <Tooltip title='Ausencias' color={'#4DE13E'} key={'#4DE13E'}>
              <Button
                onClick={() => { }}
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
                icon={<ScheduleOutlined style={{ fontSize: '1.1rem', color: 'white' }}/>} />
            </Tooltip>
          }
          {showUploadExam &&
            <Tooltip title='Subir Examen' color={'#1073B5'} key={'#1073B5'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#1073B5' }}
                icon={<CloudUploadOutlined style={{ fontSize: '1.1rem', color: 'white' }}/>} />
            </Tooltip>
          }
          {showGenerateExam &&
            <Tooltip title='Generar Examen' color={'#69DF43'} key={'#69DF43'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#69DF43' }}
                icon={<ContainerOutlined style={{ fontSize: '1.1rem', color: 'white' }}/>} />
            </Tooltip>
          }
          {showDownloadExam &&
            <Tooltip title='Descargar Examen' color={'#1A9D02'} key={'#1A9D02'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#1A9D02' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }}/>} />
            </Tooltip>
          }
          {showConfirmExam &&
            <Tooltip title='Confirmar Examen' color={'#18BBC3'} key={'#18BBC3'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#18BBC3' }}
                icon={<FileDoneOutlined style={{ fontSize: '1.1rem', color: 'white' }}/>} />
            </Tooltip>
          }
          {showUploadResult &&
            <Tooltip title='Subir Resultado' color={'#0EB0A1'} key={'#0EB0A1'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#0EB0A1' }}
                icon={<FilePdfOutlined style={{ fontSize: '1.1rem', color: 'white' }}/>} />
            </Tooltip>
          }
          {showSendMail &&
            <Tooltip title='Enviar Email' color={'#0E27B0'} key={'#0E27B0'}>
              <Button
                onClick={() => { }}
                style={{ backgroundColor: '#0E27B0' }}
                icon={<MailOutlined style={{ fontSize: '1.1rem', color: 'white' }}/>} />
            </Tooltip>
          }
        </>
      )
    },
  ];

  const data: any = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      style={{ width: '94%', marginTop: '10.7rem' }}
    />
  );
};

export default TableComponent;
