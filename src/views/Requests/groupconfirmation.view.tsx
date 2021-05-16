import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, DatePicker, Button, TimePicker, Form, Table, Spin } from "antd";

import { confirmGroupRequestsService, getAllRequestToConfirmService } from '../../services';
import { IDataConfirmation, IResponseRequest, RequestModel } from '../../models/request.models';
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

import { IDataConfirmationInitialization } from '../../initializations/request.initialization';
import moment, { Moment } from 'moment';
import { CONFIRMATION_DATA, FORMAT_DATE } from '../../constants/var';
import { MapGroupRequestsToConfirm } from '../../functions/mappers';

interface IGroupConfirmationViewProps {
  onCloseModal: (value: string, message: string) => string | void
}

const GroupConfirmationView: React.FunctionComponent<IGroupConfirmationViewProps> = ({
  onCloseModal
}) => {
  const { Option } = Select;
  const { TextArea, Search } = Input;
  const { Column } = Table;

  const [dataConfirmation, setDataConfirmation] = useState<IDataConfirmation>(IDataConfirmationInitialization);
  const [selectedRequests, setSelectedRequests] = useState<React.Key[]>([]);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<RequestModel[]>();
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRequests(selectedRowKeys);
    },
  };

  async function getRequestsToConfirm() {
    const aux: IResponseRequest = await getAllRequestToConfirmService();
    if (aux.err === null) {
      setRequests(aux.res);
      setDataConfirmation({
        ...dataConfirmation,
        fecha_solicitud: moment().format(FORMAT_DATE),
        hora_solicitud: moment().format('HH:mm')
      });
      setLoading(false);
      return
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    console.log(aux.err)
    setLoading(false)
  };

  const handleGroupConfirmRequests = async () => {
    setLoading(true);
    let formData = new FormData();
    const dataMapped = MapGroupRequestsToConfirm(dataConfirmation, selectedRequests);
    formData.append("data", JSON.stringify(dataMapped));
    const aux: IResponseRequest = await confirmGroupRequestsService(formData);
    if (!aux.err) {
      return onCloseModal('reload', aux.msg)
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    console.log(aux.err)
    setLoading(false)
  };

  //--------------------------------------------------RENDERS
  const renderInformation = () => {
    return (
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Email'
              >
                <Input
                  type='email'
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Fecha confirmación'
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format={FORMAT_DATE}
                  defaultValue={moment(new Date(), FORMAT_DATE)}
                  onChange={(e) => setDataConfirmation({ ...dataConfirmation, fecha_solicitud: e?.format(FORMAT_DATE) || '' })}
                // value={dataConfirmation.fecha_solicitud !== '' ? moment(dataConfirmation.fecha_solicitud, FORMAT_DATE) : undefined}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Hora confirmación'
              >
                <TimePicker
                  style={{ width: '100%' }}
                  format="HH:mm"
                  defaultValue={moment(new Date(), 'HH:mm')}
                  onChange={(e) => setDataConfirmation({ ...dataConfirmation, hora_solicitud: e?.format('HH:mm') || '' })}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Medio de confirmación'
                validateStatus={dataConfirmation.medio_confirmacion !== '' ? 'success' : 'error'}
                help={dataConfirmation.medio_confirmacion !== '' ? '' : 'Seleccione medio de confirmación'}
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setDataConfirmation({ ...dataConfirmation, medio_confirmacion: e.toString() })}
                  id='error'
                >
                  {CONFIRMATION_DATA.map((data, index) => (
                    <Option key={index} value={data}>{data}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Form.Item
                label='Observaciones'
              >
                <TextArea
                  rows={3}
                  onChange={(e) => setDataConfirmation({ ...dataConfirmation, observacion_solicitud: e.currentTarget.value })}
                  value={dataConfirmation.observacion_solicitud}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    );
  };

  const renderListRequests = () => {
    return (
      <Table
        style={{ width: '100%' }}
        showHeader={true}
        dataSource={requests || []}
        // columns={columns}
        loading={loading}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        rowKey={record => record._id}
        pagination={{ position: ['bottomCenter'] }}
      >
        <Column className='column-money' title="Código" dataIndex="codigo" key="codigo" />
        <Column className='column-money' title="Estado" dataIndex="estado" key="estado" />
        <Column className='column-money' title="Rut (CP)" dataIndex="rut_CP" key="rut_CP" />
        <Column className='column-money' title="Cliente Principal (CP)" dataIndex="razon_social_CP" key="razon_social_CP" />
        <Column className='column-money' title="Rut (CS)" dataIndex="rut_cs" key="rut_cs" />
        <Column className='column-money' title="Cliente Secundario (CS)" dataIndex="razon_social_cs" key="razon_social_cs" />
        <Column className='column-money' title="Nombre Servicio" dataIndex="nombre_servicio" key="nombre_servicio" />
      </Table>
    );
  };

  //--------------------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true);
    getRequestsToConfirm();
  }, []);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  useEffect(() => {
    if (!dataConfirmation.medio_confirmacion) return setDisabledConfirm(true);
    if (!selectedRequests.length) return setDisabledConfirm(true);
    return setDisabledConfirm(false);
  }, [dataConfirmation.medio_confirmacion, selectedRequests]);

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      <Row>
        <Col span={24}>
          {renderInformation()}
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24} style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          paddingLeft: '1rem'
        }}>
          {renderListRequests()}
        </Col>
      </Row>
      <br />
      <Row gutter={8} style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        <Col
          span={3}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={() => onCloseModal('', '')}
            style={{ backgroundColor: '#E10D17', color: 'white' }}
          >
            Cancelar
            </Button>
          <Button
            onClick={() => handleGroupConfirmRequests()}
            disabled={disabledConfirm}
            style={!disabledConfirm ?
              { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
              { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
          >
            Confirmar
            </Button>
        </Col>
      </Row>
    </Spin>
  );
};

export default GroupConfirmationView;
