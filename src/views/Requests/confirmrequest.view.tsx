import React, { FormEvent, useEffect, useState } from 'react';
import { Input, Row, Col, Select, DatePicker, Form, TimePicker, Button, Spin, Checkbox } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { RequestInitialization } from '../../initializations/request.initialization';
import { IResponseRequest, RequestModel } from '../../models/request.models';
import { CONFIRMATION_DATA, FORMAT_DATE } from '../../constants/var';
import { confirmRequestService, getRequestToConfirmService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';

import moment, { Moment } from 'moment';

import AlertComponent from "../../component/Alert/Alert";
import { validateEmail } from '../../functions/validators/index.validators';
import { MapRequestToConfirm } from '../../functions/mappers';

interface IConfirmRequestViewProps {
  onCloseModal: (value: string, message: string) => string | void
  _id?: string
}

const ConfirmRequestView: React.FunctionComponent<IConfirmRequestViewProps> = ({
  onCloseModal,
  _id = ''
}) => {
  const { Option } = Select;
  const { TextArea } = Input;

  const [loading, setLoading] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [confirmRequest, setConfirmRequest] = useState<RequestModel>(RequestInitialization);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [isPrimaryEmailOk, setIsPrimaryEmailOk] = useState<boolean>(true);
  const [checkSendMail, setCheckSendMail] = useState<boolean>(false);
  const [isValidEmails, setIsValidEmails] = useState<boolean>(true);
  const [emails, setEmails] = useState<string>('');

  const handleValidateEmail = (e: FormEvent<HTMLInputElement>) => {
    setIsPrimaryEmailOk(validateEmail(e.currentTarget.value) && e.currentTarget.value !== '');
    setConfirmRequest({ ...confirmRequest, email_gi: e.currentTarget.value })
  };

  const handleValidEmails = (emailsString: string) => {
    setEmails(emailsString);
    if (checkSendMail && !emailsString) return
    if (emailsString.includes(',')) {
      const aux = emailsString.split(',');
      const isValid = aux.some((element) => !validateEmail(element));
      return isValid ? setIsValidEmails(false) : setIsValidEmails(true);
    }
    if (!emailsString.includes(',')) {
      if (!validateEmail(emailsString)) return setIsValidEmails(false);
      return setIsValidEmails(true);
    }
  };

  const handleConfirmRequest = async () => {
    setLoading(true);
    let formData = new FormData();
    let arrayEmails = [];
    if (checkSendMail && !emails.includes(',')) {
      arrayEmails.push({
        email: emails.trim(),
        name: emails.trim()
      });
    };
    if (checkSendMail && emails.includes(',')) {
      const aux = emails.split(',');
      arrayEmails = aux.map((mail) => {
        return {
          email: mail.trim(),
          name: mail.trim()
        }
      });
    };
    const requestToConfirm = MapRequestToConfirm(confirmRequest, checkSendMail, arrayEmails)
    formData.append("data", JSON.stringify(requestToConfirm));
    const result: IResponseRequest = await confirmRequestService(confirmRequest._id, formData);
    if (result.err === null) {
      return onCloseModal('reload', result.msg)
    };
    if (result.err === 99) {
      setLoading(false)
      return setMessageAlert({ message: result.res, type: 'error', show: true });
    }
    return setMessageAlert({ message: result.err, type: 'error', show: true });
  };

  //----------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true)

    async function getOneRequest() {
      const aux: IResponseRequest = await getRequestToConfirmService(_id);
      if (aux.err !== null) {
        setMessageAlert({ message: aux.err, type: 'error', show: true });
        return
      }
      const request: RequestModel = aux.res;
      setConfirmRequest({
        ...request,
        observacion_solicitud: '',
        medio_confirmacion: '',
        fecha_confirmacion: moment().format(FORMAT_DATE),
        hora_confirmacion: moment().format('HH:mm')
      });
    }

    getOneRequest();
  }, []);

  useEffect(() => {
    !checkSendMail ? setIsValidEmails(true) : setIsValidEmails(false)
    checkSendMail && setEmails('');
  }, [checkSendMail]);

  useEffect(() => {
    if (confirmRequest._id !== '') return setLoading(false);
  }, [confirmRequest]);

  useEffect(() => {
    if (confirmRequest.medio_confirmacion && 
      confirmRequest.medio_confirmacion !== '' && 
      isPrimaryEmailOk &&
      ((!checkSendMail && isValidEmails) || (checkSendMail && isValidEmails)))
      return setDisabledConfirm(false);
    return setDisabledConfirm(true)
    // eslint-disable-next-line
  }, [confirmRequest.medio_confirmacion, isPrimaryEmailOk, isValidEmails, checkSendMail]);

  //-------------------------------------------------------RENDERS
  const renderSendingMail = () => {
    return (
      <Form layout='vertical'>
        <Row gutter={8}>
          <Col span='6' style={{ marginTop: 34 }}>
            <Checkbox onChange={() => setCheckSendMail(!checkSendMail)}>¿Desea enviar email de confirmación?</Checkbox>
          </Col>
          <Col span='18'>
            <Form.Item
              label="Para enviar multiples correos, puede separarlos por coma (,)."
              validateStatus={isValidEmails ? 'success' : 'error'}
              help={isValidEmails ? '' : "El correo o los correos ingresados no contienen el formato correcto."}
            >
              <Input
                placeholder='Ingrese los correos electrónicos'
                disabled={!checkSendMail}
                onChange={(e) => handleValidEmails(e.currentTarget.value)}
                value={emails}
                id="error"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      <Input.Group>
        <Form layout='vertical'>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Código servicio'
              >
                <Input
                  value={confirmRequest.codigo}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Nombre servicio'
              >
                <Input
                  value={confirmRequest.nombre_servicio}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Fecha confirmación'
              >
                <DatePicker
                  onSelect={(e: Moment) => setConfirmRequest({ ...confirmRequest, fecha_confirmacion: e.format(FORMAT_DATE) })}
                  format={FORMAT_DATE}
                  style={{ width: '100%' }}
                  value={confirmRequest.fecha_confirmacion !== '' ? moment(confirmRequest.fecha_confirmacion, FORMAT_DATE) : undefined}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Hora confirmación'
              >
                <TimePicker
                  style={{ width: '100%' }}
                  format="HH:mm"
                  defaultValue={moment(new Date(), 'HH:mm')}
                  onChange={(e) => setConfirmRequest({ ...confirmRequest, hora_confirmacion: e?.format('HH:mm') })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                validateStatus={isPrimaryEmailOk ? 'success' : 'error'}
                help={isPrimaryEmailOk ? '' : 'Formato de email incorrecto'}
                label='Email primario'
              >
                <Input
                  type='email'
                  onChange={(e) => handleValidateEmail(e)}
                  prefix={<MailOutlined />}
                  // onChange={(e) => setConfirmRequest({ ...confirmRequest, email_gi: e.currentTarget.value })}
                  value={confirmRequest.email_gi}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Medio de confirmación'
                validateStatus={confirmRequest.medio_confirmacion !== '' ? 'success' : 'error'}
                help={confirmRequest.medio_confirmacion !== '' ? '' : 'Seleccione medio de confirmación'}
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setConfirmRequest({ ...confirmRequest, medio_confirmacion: e.toString() })}
                  id='error'
                >
                  {CONFIRMATION_DATA.map((data, index) => (
                    <Option key={index} value={data}>{data}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label='Observaciones'
              >
                <TextArea
                  rows={3}
                  onChange={(e) => setConfirmRequest({ ...confirmRequest, observacion_solicitud: e.currentTarget.value })}
                  value={confirmRequest.observacion_solicitud}
                />
              </Form.Item>
            </Col>
          </Row>
          {renderSendingMail()}
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
                onClick={() => handleConfirmRequest()}
                disabled={disabledConfirm}
                style={!disabledConfirm ?
                  { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                  { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
              >
                Confirmar
            </Button>
            </Col>
          </Row>
          {/* <Row>
        <Col span={24}>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
            <p className="ant-upload-hint">10mb max.</p>
          </Upload.Dragger>
        </Col>
      </Row> */}
        </Form>
      </Input.Group>
    </Spin>
  );
};

export default ConfirmRequestView;
