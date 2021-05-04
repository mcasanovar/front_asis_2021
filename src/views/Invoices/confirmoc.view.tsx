import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, Spin, Table, Typography, Tag, Form, Button } from "antd";

import TableComponent from "../../component/Table/Table";
import { InvoicesModel, IResponseInvoices } from '../../models/invoices.models';
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

import { InvoicesInitialization } from '../../initializations/invoices.initialization';
import { confirmOCService } from '../../services';
import { MapOcToUpload } from '../../functions/mappers';

interface IConfirmOCViewProps {
  onCloseModal: (value: string, message: string) => string | void
  invoiceSelected: InvoicesModel | undefined
}

const ConfirmOCView: React.FunctionComponent<IConfirmOCViewProps> = ({
  onCloseModal,
  invoiceSelected
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const { Column } = Table;
  const { Title } = Typography;

  const [loading, setLoading] = useState<boolean>(false);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [newDataInvoice, setNewDataInvoice] = useState<InvoicesModel>(invoiceSelected || InvoicesInitialization);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [observationOC, setObservationOC] = useState<string>('');

  const handleConfirmOC = async () => {
    setLoading(true);
    const invoiceToInsert = MapOcToUpload(newDataInvoice, observationOC);
    const aux: IResponseInvoices = await confirmOCService(newDataInvoice._id, invoiceToInsert);
    if(aux.err === null){
      return onCloseModal('reload', aux.msg);
    };
    return setMessageAlert({ message: aux.err, type: 'error', show: true });
  };

  //------------------------ USEEFECT
  useEffect(() => {
    if (newDataInvoice.estado_archivo !== 'Cargado') return setDisabledConfirm(false);
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
                        onSelect={(e) => setNewDataInvoice({...newDataInvoice, estado_archivo: e.toString()})}>
                        <Option value="Aprobado">Aprobado</Option>
                        <Option value="Rechazado">Rechazado</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={24}>
                    <Form.Item
                      label='Observaciones'
                    >
                      <TextArea
                        rows={3}
                        onChange={(e) => setObservationOC(e.currentTarget.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={24} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
            }}>
              <Table style={{ width: '100%' }} showHeader={true} dataSource={invoiceSelected?.observacion_oc} pagination={false}>
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
                onClick={() => handleConfirmOC()}
                disabled={disabledConfirm}
                style={!disabledConfirm ?
                  { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                  { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
              >
                Confirmar
              </Button>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    </Spin>
  );
};

export default ConfirmOCView;
