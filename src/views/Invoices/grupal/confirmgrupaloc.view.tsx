import React, { useState, useEffect, FormEvent } from 'react';
import { Input, Row, Col, Select, Spin, Form, Table, Button } from "antd";

import { IGroupConfirmOC, InvoicesModel, IResponseInvoices } from '../../../models/invoices.models';
import { IGroupConfirmOCInitialization } from '../../../initializations/invoices.initialization';
import { confirmGroupOCService, getGroupOCConfirmService } from '../../../services';
import { IAlertMessageContent } from '../../../models/index.models';
import { MilesFormat } from '../../../libs/formattedPesos';
import { MapGroupInvoiceToConfirmOC } from '../../../functions/mappers';

import AlertComponent from '../../../component/Alert/Alert';
import { FormatingRut } from '../../../functions/validators/index.validators';

interface IConfirmGroupOCViewProps {
  onCloseModal: (value: string, message: string) => string | void
}

const ConfirmGroupOCView: React.FunctionComponent<IConfirmGroupOCViewProps> = ({
  onCloseModal
}) => {
  const { Option } = Select;
  const { TextArea, Search } = Input;
  const { Column } = Table;

  const [dataConfirmation, setDataConfirmation] = useState<IGroupConfirmOC>(IGroupConfirmOCInitialization);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [invoices, setInvoices] = useState<InvoicesModel[]>();
  const [invoicesFiltered, setInvoicesFiltered] = useState<InvoicesModel[]>();
  const [selectedInvoices, setSelectedInvoices] = useState<React.Key[]>([]);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [rutSearchInput, setRutSearchInput] = useState<string>('');

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedInvoices(selectedRowKeys);
    },
  };

  const handleGroupConfirmOC = async () => {
    setLoading(true);
    const dataMapped = MapGroupInvoiceToConfirmOC(dataConfirmation, selectedInvoices);
    const aux: IResponseInvoices = await confirmGroupOCService(dataMapped);
    if (!aux.err) {
      return onCloseModal('reload', aux.msg)
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    console.log(aux.err)
    setLoading(false)
  };

  const handleFormatingRut = (e: FormEvent<HTMLInputElement>) => {
    setRutSearchInput(FormatingRut(e.currentTarget.value));
  };

  const handleSearchInput = () => {
    const aux: InvoicesModel[] | undefined = invoices?.filter((invoice) => invoice.rut_cp === rutSearchInput);
    if(aux){
      setLoading(true);
      setTimeout(() => {
        setInvoicesFiltered(aux);
        setLoading(false);
      }, 2000);
    }
  };

  async function getInvoicesWithOC() {
    const aux: IResponseInvoices = await getGroupOCConfirmService();
    if (!aux.err) {
      setInvoices(aux.res);
      setInvoicesFiltered(aux.res);
      setLoading(false);
      return
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    setLoading(false)
  };

  //---------------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true);
    getInvoicesWithOC();
  }, []);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  useEffect(() => {
    if (!!dataConfirmation.estado_archivo && !!selectedInvoices.length) {
      setDisabledConfirm(false);
      return
    }
    setDisabledConfirm(true)
  }, [dataConfirmation, selectedInvoices]);

  useEffect(() => {
    if(!rutSearchInput){
     setInvoicesFiltered(invoices)
    }
 }, [rutSearchInput]);

  //----------------------------------------------RENDERS
  const renderInformation = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label='Estado archivo'
              validateStatus={!!dataConfirmation.estado_archivo ? 'success' : 'error'}
              help={!!dataConfirmation.estado_archivo ? '' : 'Seleccione'}
            >
              <Select
                style={{ width: '100%' }}
                onSelect={(e) => setDataConfirmation({ ...dataConfirmation, estado_archivo: e.toString() })}
              >
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
                onChange={(e) => setDataConfirmation({ ...dataConfirmation, observaciones: e.currentTarget.value })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderListInvoices = () => {
    return (
      <Table
        style={{ width: '100%' }}
        showHeader={true}
        dataSource={invoicesFiltered || []}
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
        <Column className='column-money' title="Rut (CP)" dataIndex="rut_cp" key="rut_cp" />
        <Column className='column-money' title="Razon Social (CP)" dataIndex="razon_social_cp" key="razon_social_cp" />
        <Column className='column-money' title="Rut (CS)" dataIndex="rut_cs" key="rut_cs" />
        <Column className='column-money' title="Razon Social (CS)" dataIndex="razon_social_cs" key="razon_social_cs" />
        <Column className='column-money' title="Nombre Servicio" dataIndex="nombre_servicio" key="nombre_servicio" />
        <Column
          className='column-money'
          title="Total"
          dataIndex="total"
          key="total"
          render={(text) => `$${MilesFormat(text)}`}
        />
      </Table>
    );
  };

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      <Form layout='vertical'>
        <Row>
          <Col span='24'>
            {renderInformation()}
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Search
              placeholder="Rut CP"
              allowClear
              enterButton="Buscar"
              size="large"
              onChange={(e) => handleFormatingRut(e)}
              onSearch={handleSearchInput}
              value={rutSearchInput}
            />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span='24'>
            {renderListInvoices()}
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
            span={5}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              onClick={() => onCloseModal('', '')}
              style={{ backgroundColor: '#E10D17', color: 'white' }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleGroupConfirmOC()}
              disabled={disabledConfirm}
              style={!disabledConfirm ?
                { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
            >
              Confirmar
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default ConfirmGroupOCView;
