import React, { useState, useEffect } from 'react';
import { Col, Input, Row, Tag, DatePicker, TimePicker, Select, Upload, Form, Spin, InputNumber, Button, Typography } from 'antd';
import { InboxOutlined } from "@ant-design/icons";
import { IPayment, IResponsePayment, PaymentModel } from '../../models/payments.models';
import { MilesFormat } from '../../libs/formattedPesos';
import { BANKING_INSTITUTION, FORMAT_DATE, PAYMENT_METHODS } from '../../constants/var';
import { ParcialPaymentInitialization, PaymentInitialization } from '../../initializations/payments.initialization';
import { MapParcialPaymentToGenerate } from '../../functions/mappers';
import { generateParcialPaymentService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';
import AlertComponent from "../../component/Alert/Alert";
import { setInterval } from 'node:timers';

interface IGeneratePaymentViewProps {
  onCloseModal: (value: string, message: string) => string | void
  paymentSelected: PaymentModel | undefined
}

const GeneratePaymentView: React.FunctionComponent<IGeneratePaymentViewProps> = ({
  onCloseModal,
  paymentSelected
}) => {
  const { Option } = Select;
  const { TextArea } = Input
  const { Title } = Typography;

  const [loading, setLoading] = useState<boolean>(false);
  const [validAmmount, setValidAmmount] = useState<boolean>(true);
  const [newDataParcialPayment, setNewDataParcialPayment] = useState<IPayment>(ParcialPaymentInitialization);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [file, setFile] = useState<string | Blob | null>(null);

  const getFileUploaded = (e: any) => {
    e && setFile(e.file)
    e.onSuccess('ok');
  };

  const calculatePendingPayment = () => {
    const aux = ((paymentSelected?.valor_servicio || 0) - (paymentSelected?.valor_cancelado || 0));
    return aux;
  };

  const handleCalculateTotal = (discount: number = 0, ammount: number = 0) => {
    setNewDataParcialPayment({
      ...newDataParcialPayment,
      descuento: discount,
      monto: ammount,
      total: ammount - discount
    });

    const pandingAmmount = ((paymentSelected?.valor_servicio || 0) - (paymentSelected?.valor_cancelado || 0));
    if ((ammount - discount) > pandingAmmount) {
      setValidAmmount(false);
    }
    else {
      setValidAmmount(true);
    }
  };

  const handleGenerateParcialPayment = async () => {
    setLoading(true);
    let formData = new FormData();
    const partialPaymentMapped = MapParcialPaymentToGenerate(paymentSelected || PaymentInitialization, newDataParcialPayment);
    formData.append("data", JSON.stringify(partialPaymentMapped));
    file !== null && formData.append("archivo", file);
    const aux: IResponsePayment = await generateParcialPaymentService(paymentSelected?._id || '', formData);
    if (aux.err === null) {
      onCloseModal('reload', aux.msg)
    } else {
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
  };

  //-----------------------------USEEFECT
  useEffect(() => {
    if (newDataParcialPayment.tipo_pago !== ''
      && newDataParcialPayment.fecha_pago !== ''
      && newDataParcialPayment.hora_pago !== ''
      && file !== null
      && newDataParcialPayment.monto !== 0
      && validAmmount) {
      setDisabledConfirm(false)
    };

    if (newDataParcialPayment.tipo_pago === 'Efectivo') {
      setNewDataParcialPayment({ ...newDataParcialPayment, institucion_bancaria: 'No Aplica' });
    }
    else {
      setNewDataParcialPayment({ ...newDataParcialPayment, institucion_bancaria: '' });
    }
  }, [newDataParcialPayment.tipo_pago, newDataParcialPayment.fecha_pago, newDataParcialPayment.hora_pago, file, validAmmount, newDataParcialPayment.monto]);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`${paymentSelected?.nombre_servicio} - ${paymentSelected?.codigo}`}</Title>}
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Tag
                color="#1976D2"
                style={{
                  width: '100%',
                  height: 40,
                  fontSize: 14,
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {`Valor servicio : $ ${MilesFormat(paymentSelected?.valor_servicio || 0)}`}
              </Tag>
            </Col>
            <Col span={8}>
              <Tag
                color="#388E3C"
                style={{
                  width: '100%',
                  height: 40,
                  fontSize: 14,
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {`Valor pagado : $ ${MilesFormat(paymentSelected?.valor_cancelado || 0)}`}
              </Tag>
            </Col>
            <Col span={8}>
              <Tag
                color="#F57C00"
                style={{
                  width: '100%',
                  height: 40,
                  fontSize: 14,
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {`Valor pendiente : $ ${MilesFormat(calculatePendingPayment())}`}
              </Tag>
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Fecha pago'
                validateStatus={newDataParcialPayment.fecha_pago !== '' ? 'success' : 'error'}
                help={newDataParcialPayment.fecha_pago !== '' ? '' : 'Seleccionar'}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format={FORMAT_DATE}
                  onChange={(e) => setNewDataParcialPayment({ ...newDataParcialPayment, fecha_pago: e?.format(FORMAT_DATE) || '' })}
                  id='error_4'
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Hora pago'
                validateStatus={newDataParcialPayment.hora_pago !== '' ? 'success' : 'error'}
                help={newDataParcialPayment.hora_pago !== '' ? '' : 'Seleccionar'}
              >
                <TimePicker
                  format='HH:mm'
                  style={{ width: '100%' }}
                  onChange={(e) => setNewDataParcialPayment({ ...newDataParcialPayment, hora_pago: e?.format('HH:mm') || '' })}
                  id='error_5 '
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Sucursal'
              >
                <Input
                  readOnly
                  value={paymentSelected?.sucursal}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label='Cliente principal'
              >
                <Input
                  readOnly
                  value={paymentSelected?.razon_social_cp}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label='Método de pago'
                validateStatus={newDataParcialPayment.tipo_pago !== '' ? 'success' : 'error'}
                help={newDataParcialPayment.tipo_pago !== '' ? '' : 'Seleccionar'}
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setNewDataParcialPayment({ ...newDataParcialPayment, tipo_pago: e.toString() })}
                  id='error'
                >
                  {PAYMENT_METHODS.map((method, index) => (
                    <Option key={index} value={method}>{method}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Institución bancaria'
                validateStatus={newDataParcialPayment.institucion_bancaria !== '' ? 'success' : 'error'}
                help={newDataParcialPayment.institucion_bancaria !== '' ? '' : 'Seleccionar'}
              >
                {newDataParcialPayment.tipo_pago !== 'Efectivo' ?
                  <Select
                    style={{ width: '100%' }}
                    onSelect={(e) => setNewDataParcialPayment({ ...newDataParcialPayment, institucion_bancaria: e.toString() })}
                    id='error_2'
                  >
                    {BANKING_INSTITUTION.map((inst, index) => (
                      <Option key={index} value={inst}>{inst}</Option>
                    ))}
                  </Select> :
                  <Input
                    readOnly
                    value='No Aplica'
                  />
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Monto'
                validateStatus={newDataParcialPayment.monto !== 0 ? 'success' : 'error'}
                help={newDataParcialPayment.monto !== 0 ? '' : 'ingrese valor'}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  onChange={(e) => handleCalculateTotal(newDataParcialPayment.descuento, parseInt(e.toString()))}
                  value={newDataParcialPayment.monto}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Descuento'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  onChange={(e) => handleCalculateTotal(parseInt(e.toString()), newDataParcialPayment.monto)}
                  value={newDataParcialPayment.descuento}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Total'
                validateStatus={validAmmount ? 'success' : 'error'}
                help={validAmmount ? '' : 'Valor superior al valor pendiente'}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  readOnly
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  value={newDataParcialPayment.total}
                  id='error_3'
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
                  rows={7}
                  onChange={(e) => setNewDataParcialPayment({ ...newDataParcialPayment, observaciones: e.currentTarget.value })}
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
                  accept='.pdf'
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
        <br />
        <Row gutter={8} style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}>
          <Col
            span={6}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              onClick={() => onCloseModal('', '')}
              style={{ backgroundColor: '#E10D17', color: 'white' }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleGenerateParcialPayment()}
              disabled={disabledConfirm}
              style={!disabledConfirm ?
                { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
            >
              Generar
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default GeneratePaymentView;
