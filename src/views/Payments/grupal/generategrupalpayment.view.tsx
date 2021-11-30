import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, DatePicker, Upload, TimePicker, Spin, Form, InputNumber, Table, Button } from "antd";
import { DollarOutlined, InboxOutlined } from '@ant-design/icons';
import { IGroupConfirmPayment, IResponsePayment, PaymentModel } from '../../../models/payments.models';
import { IGroupConfirmPaymentInitialization } from '../../../initializations/payments.initialization';
import { BANKING_INSTITUTION, FORMAT_DATE, PAYMENT_METHODS, SUCURSAL } from '../../../constants/var';
import moment, { Moment } from 'moment';
import { IAlertMessageContent } from '../../../models/index.models';
import AlertComponent from '../../../component/Alert/Alert';
import { MilesFormat } from '../../../libs/formattedPesos';
import { generateGroupPaymentsService, getAllPendingPaymentsService } from '../../../services';
import { MapGroupConfirmPayments } from '../../../functions/mappers';

interface IGenerateGroupPaymentViewProps {
  onCloseModal: (value: string, message: string) => string | void
}

const GenerateGroupPaymentView: React.FunctionComponent<IGenerateGroupPaymentViewProps> = ({
  onCloseModal
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const { Column } = Table;
  const { RangePicker } = DatePicker;

  const [loading, setLoading] = useState<boolean>(false);
  const [dataConfirmation, setDataConfirmation] = useState<IGroupConfirmPayment>(IGroupConfirmPaymentInitialization);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [amount, setAmount] = useState<number>(0);
  const [payments, setPayments] = useState<PaymentModel[]>();
  const [paymentsSelected, setPaymentsSelected] = useState<PaymentModel[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<React.Key[]>([]);
  const [file, setFile] = useState<string | Blob | null>(null);
  const [dateResultFilter, setDateResultFilter] = useState<any>(null);
  const [filteredPayments, setFilteredPayments] = useState<PaymentModel[]>()

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedPayments: PaymentModel[]) => {
      setSelectedPayments(selectedRowKeys);
      setPaymentsSelected(selectedPayments);
      const reducedPayments = selectedPayments.reduce((acc, current) => {
        const aux = current.valor_servicio - current.valor_cancelado;
        acc = acc + aux;
        return acc;
      }, 0)
      setAmount(reducedPayments);
    },
  };

  const getFileUploaded = (e: any) => {
    e && setFile(e.file)
    e.onSuccess('ok');
  };

  const handleGroupConfirmPayments = async () => {
    setLoading(true);
    let formData = new FormData();
    const dataMapped = MapGroupConfirmPayments(dataConfirmation, selectedPayments, paymentsSelected);
    formData.append("data", JSON.stringify(dataMapped));
    file !== null && formData.append("archivo", file);
    const aux: IResponsePayment = await generateGroupPaymentsService(formData);
    if (!aux.err) {
      return onCloseModal('reload', aux.msg)
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    setLoading(false);
  };

  async function getPendingPayments() {
    const aux: IResponsePayment = await getAllPendingPaymentsService();
    if (!aux.err) {
      setPayments(aux.res);
      setFilteredPayments(aux.res);
      setDataConfirmation({
        ...dataConfirmation,
        fecha_pago: moment().format(FORMAT_DATE),
        hora_pago: moment().format('HH:mm')
      })
      setLoading(false);
      return
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    console.log(aux.err)
    setLoading(false)
  };

  const handleFilterByDate = async (date: any) => {
    if(!date) return;
    setDateResultFilter(date)
    const firstDate = date[0];
    const secondDate = date[1];
    let filteredByDate = payments?.filter((payment) => {
      return moment(payment.fecha_facturacion, FORMAT_DATE).isBetween(firstDate, secondDate)
    });
    const aux = payments?.filter(element => element.fecha_facturacion === moment(firstDate).format(FORMAT_DATE)
      || element.fecha_facturacion === moment(secondDate).format(FORMAT_DATE));
    if (!!aux?.length && !!filteredByDate) {
      filteredByDate = [...filteredByDate, ...aux]
    }
    setFilteredPayments(filteredByDate)
  };

  const handleCleanDateResult = () => {
    setDateResultFilter(undefined);
    setFilteredPayments(payments)
  }

  //-----------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true);
    getPendingPayments();
  }, []);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  useEffect(() => {
    if (!!dataConfirmation.fecha_pago
      && !!dataConfirmation.hora_pago
      && !!dataConfirmation.sucursal
      && !!dataConfirmation.tipo_pago
      && !!dataConfirmation.institucion_bancaria
      && !!amount) {
      return setDisabledConfirm(false)
    }
    return setDisabledConfirm(true)
  }, [dataConfirmation, amount]);

  //----------------------------------------------RENDERS
  const renderInformation = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label='Fecha pago'
              validateStatus={!!dataConfirmation.fecha_pago ? 'success' : 'error'}
              help={!!dataConfirmation.fecha_pago ? '' : 'Seleccione'}
            >
              <DatePicker
                style={{ width: '100%' }}
                format={FORMAT_DATE}
                onChange={(e) => setDataConfirmation({ ...dataConfirmation, fecha_pago: e?.format(FORMAT_DATE) || '' })}
                value={moment(dataConfirmation.fecha_pago, FORMAT_DATE)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Hora pago'
              validateStatus={!!dataConfirmation.hora_pago ? 'success' : 'error'}
              help={!!dataConfirmation.hora_pago ? '' : 'Seleccionar'}
            >
              <TimePicker
                format='HH:mm'
                style={{ width: '100%' }}
                id='error_3'
                value={moment()}
                onChange={(e) => setDataConfirmation({ ...dataConfirmation, hora_pago: e?.format('HH:mm') || '' })}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              validateStatus={!!dataConfirmation.sucursal ? 'success' : 'error'}
              help={!!dataConfirmation.sucursal ? '' : 'Seleccione'}
              label='Sucursal'
            >
              <Select
                style={{ width: '100%' }}
                onSelect={(e) => setDataConfirmation({ ...dataConfirmation, sucursal: e.toString() })}
              >
                {SUCURSAL.map((sucursal, index) => (
                  <Option key={index} value={sucursal}>{sucursal}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              validateStatus={!!dataConfirmation.tipo_pago ? 'success' : 'error'}
              help={!!dataConfirmation.tipo_pago ? '' : 'Seleccione'}
              label='Método de pago'
            >
              <Select
                style={{ width: '100%' }}
                onSelect={(e) => setDataConfirmation({ ...dataConfirmation, tipo_pago: e.toString() })}
              >
                {PAYMENT_METHODS.map((method, index) => (
                  <Option key={index} value={method}>{method}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              validateStatus={!!dataConfirmation.institucion_bancaria ? 'success' : 'error'}
              help={!!dataConfirmation.institucion_bancaria ? '' : 'Seleccione'}
              label='Institución bancaria'
            >
              <Select
                style={{ width: '100%' }}
                onSelect={(e) => setDataConfirmation({ ...dataConfirmation, institucion_bancaria: e.toString() })}
              >
                {BANKING_INSTITUTION.map((inst, index) => (
                  <Option key={index} value={inst}>{inst}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label='Monto'
              validateStatus={!!amount ? 'success' : 'error'}
              help={!!amount ? '' : 'seleccionar pago/s'}
            >
              <InputNumber
                style={{ width: '100%' }}
                readOnly
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
                value={amount}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Total'
              validateStatus={!!amount ? 'success' : 'error'}
              help={!!amount ? '' : 'Seleccionar'}
            >
              <InputNumber
                style={{ width: '100%' }}
                readOnly
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
                value={amount}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label='Observaciones'
            >
              <TextArea
                rows={6}
                onChange={(e) => setDataConfirmation({ ...dataConfirmation, observaciones: e.currentTarget.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='.'
              getValueFromEvent={getFileUploaded}
              valuePropName="fileData"
              validateStatus={file !== null ? 'success' : 'error'}
              help={file !== null ? '' : 'Seleccione'}
            >
              <Upload.Dragger
                name="file"
                customRequest={getFileUploaded}
                accept='*'
                maxCount={1}
                onRemove={() => setFile(null)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
                <p className="ant-upload-hint">10mb max.</p>
              </Upload.Dragger>
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
        dataSource={filteredPayments || []}
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
        <Column className='column-money' title="Fecha Pago" dataIndex="fecha_pago" key="fecha_pago" />
        <Column className='column-money' title="Fecha Facturación" dataIndex="fecha_facturacion" key="fecha_facturacion" />
        <Column
          className='column-money'
          title="Valor Servicio"
          dataIndex="valor_servicio"
          key="valor_servicio"
          render={(text) => `$${MilesFormat(text)}`}
        />
        <Column
          className='column-money'
          title="Valor Pagado"
          dataIndex="valor_cancelado"
          key="valor_cancelado"
          render={(text) => `$${MilesFormat(text)}`}
        />
        <Column className='column-money' title="Nombre Servicio" dataIndex="nombre_servicio" key="nombre_servicio" />
      </Table>
    );
  };

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      <Form layout='vertical'>
        {renderInformation()}
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item
              label="Buscar por Fecha Facturación"
            >
              {/* <DatePicker
                style={{ width: '100%', marginRight: '10px', height: '100%' }}
                onSelect={(e) => handleFilterByDate(e)}
                format={FORMAT_DATE}
                value={dateResultFilter}
              /> */}
              <RangePicker
                onChange={(e) => handleFilterByDate(e)}
                format={FORMAT_DATE}
                value={dateResultFilter}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="."
            >
              <Button
                onClick={() => handleCleanDateResult()}
                style={{ backgroundColor: '#E10D17', color: 'white' }}
              >
                Limpiar
                </Button>
            </Form.Item>
          </Col>
        </Row>
        {renderListInvoices()}
      </Form>
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
            onClick={() => handleGroupConfirmPayments()}
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

export default GenerateGroupPaymentView;
