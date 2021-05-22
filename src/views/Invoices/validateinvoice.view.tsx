import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, Spin, Form, Typography, DatePicker, InputNumber, Upload, Table, Tag, Button } from "antd";
import { InboxOutlined } from '@ant-design/icons';

import AlertComponent from "../../component/Alert/Alert";

import { InvoicesModel, IResponseInvoices } from '../../models/invoices.models';
import { IAlertMessageContent } from '../../models/index.models';
import { InvoicesInitialization } from '../../initializations/invoices.initialization';
import { FORMAT_DATE } from '../../constants/var';
import { MapInvoiceToConfirm } from '../../functions/mappers';
import { confirmInvoiceService } from '../../services';
import moment from 'moment';

interface IValidateInvoiceViewProps {
  onCloseModal: (value: string, message: string) => string | void
  invoiceSelected: InvoicesModel | undefined
};

const ValidateInvoiceView: React.FunctionComponent<IValidateInvoiceViewProps> = ({
  onCloseModal,
  invoiceSelected
}) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const { Title } = Typography;
  const { Column } = Table;

  const [loading, setLoading] = useState<boolean>(false);
  const [newDataInvoice, setNewDataInvoice] = useState<InvoicesModel>(invoiceSelected || InvoicesInitialization);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [observation, setObservation] = useState<string>('');
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);

  const handleConfirmInvoice = async () => {
    setLoading(true);
    const invoiceMapped = MapInvoiceToConfirm(newDataInvoice, observation);
    const aux: IResponseInvoices = await confirmInvoiceService(invoiceSelected?._id || '', invoiceMapped);
    if(aux.err === null){
      return onCloseModal('reload', aux.msg)
    }
    return setMessageAlert({ message: aux.err, type: 'error', show: true });
  };

  //------------------------------USEEFFECT
  useEffect(() => {
    setNewDataInvoice({
      ...newDataInvoice,
      fecha_nota_credito: moment().format(FORMAT_DATE)
    })
  }, []);

  useEffect(() => {
    if(newDataInvoice.estado_archivo === 'Rechazado'){
      if(newDataInvoice.nro_nota_credito
        && newDataInvoice.fecha_nota_credito
        && newDataInvoice.monto_nota_credito
        && newDataInvoice.factura_anular){
          return setDisabledConfirm(false)
      }
    }
    if(newDataInvoice.estado_archivo === 'Aprobado'){
      setDisabledConfirm(false)
    }
  }, [newDataInvoice]);

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`${newDataInvoice.nombre_servicio} - ${newDataInvoice.codigo}`}</Title>}
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            <Col span={12}>
              <Input.Group>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      validateStatus={newDataInvoice.estado_archivo !== 'Cargado' ? 'success' : 'error'}
                      help={newDataInvoice.estado_archivo !== 'Cargado' ? '' : 'Seleccione'}
                      label='Estado archivo'
                    >
                      <Select
                        style={{ width: '100%' }}
                        onSelect={(e) => setNewDataInvoice({...newDataInvoice, estado_archivo: e.toString()})}
                      >
                        <Option value="Aprobado">Aprobado</Option>
                        <Option value="Rechazado">Rechazado</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {newDataInvoice.estado_archivo === 'Rechazado' &&
                    <Col span={12}>
                      <Form.Item
                        validateStatus={newDataInvoice?.fecha_nota_credito? 'success' : 'error'}
                        help={newDataInvoice?.fecha_nota_credito ? '' : 'Seleccione'}
                        label='Fecha nota crédito'
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          format={FORMAT_DATE}
                          onChange={(e) => setNewDataInvoice({ ...newDataInvoice, fecha_nota_credito: e?.format(FORMAT_DATE) || '' })}
                          value={!newDataInvoice.fecha_nota_credito ? moment(new Date(), FORMAT_DATE) : moment(newDataInvoice.fecha_nota_credito, FORMAT_DATE)}
                        />
                      </Form.Item>
                    </Col>
                  }
                </Row>
                {newDataInvoice.estado_archivo === 'Rechazado' &&
                  <Row gutter={8}>
                    <Col span={8}>
                      <Form.Item
                        label='Nro. Nota crédito'
                        validateStatus={!!newDataInvoice.nro_nota_credito ? 'success' : 'error'}
                        help={!!newDataInvoice.nro_nota_credito ? '' : 'Seleccionar'}
                      >
                        <Input
                          onChange={(e) => setNewDataInvoice({ ...newDataInvoice, nro_nota_credito: e.currentTarget.value })}
                          value={newDataInvoice.nro_nota_credito}
                          id='error_2'
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label='Monto nota crédito'
                        validateStatus={!!newDataInvoice.nro_nota_credito ? 'success' : 'error'}
                        help={!!newDataInvoice.nro_nota_credito ? '' : 'Seleccionar'}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
                          onChange={(e) => setNewDataInvoice({ ...newDataInvoice, monto_nota_credito: parseInt(e.toString()) })}
                          value={newDataInvoice.monto_nota_credito}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label='Nro. factura anular'
                        validateStatus={!!newDataInvoice.factura_anular ? 'success' : 'error'}
                        help={!!newDataInvoice.factura_anular ? '' : 'Seleccionar'}
                      >
                        <Input
                          onChange={(e) => setNewDataInvoice({ ...newDataInvoice, factura_anular: e.currentTarget.value })}
                          value={newDataInvoice.factura_anular}
                          id='error'
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                }
                <Row gutter={8}>
                  <Col span={24}>
                    <Form.Item
                      label='Observaciones'
                    >
                      <TextArea
                        rows={3}
                        onChange={(e) => setObservation(e.currentTarget.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </Col>
          </Row>
        </Input.Group>
      </Form>
      <Row>
        <Col span={24} style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          paddingLeft: '1rem'
        }}>
          <Table style={{ width: '100%' }} showHeader={true} dataSource={invoiceSelected?.observacion_factura} pagination={false}>
            <Column width='20%' className='column-money' title="Fecha" dataIndex="fecha" key="fecha" />
            <Column width='60%' className='column-money' title="Observación" dataIndex="obs" key="obs" />
            <Column
              width='20%'
              title="Estado archivo"
              dataIndex="estado_archivo"
              key="estado_archivo"
              className='column-money'
              render={(_, record: any) => {
                let color = 'grey';
                if (record.estado === 'Cargado') {
                  color = '#2db7f5';
                }
                if (record.estado === 'Aprobado') {
                  color = '#4CAF50';
                }
                if (record.estado === 'Rechazado') {
                  color = '#E41B0E';
                }
                return <>
                  <Tag color={color}>
                    {record.estado}
                  </Tag>
                </>
              }}
            />
          </Table>
        </Col>
      </Row>
      <br/>
      <Row gutter={8} style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        <Col
          span={4}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={() => onCloseModal('', '')}
            style={{ backgroundColor: '#E10D17', color: 'white' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => handleConfirmInvoice()}
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

export default ValidateInvoiceView;
