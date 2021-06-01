import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Form, Button, Spin } from "antd";
import { validateEmail } from '../../functions/validators/index.validators';
import { IResponseRequest, RequestModel } from '../../models/request.models';
import { sendMailsTemplateService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';


interface ISendEmailsTemplateViewProps {
  onCloseModal: (value: string, message: string) => string | void,
  request: RequestModel | undefined
}

const SendEmailsTemplateView: React.FunctionComponent<ISendEmailsTemplateViewProps> = ({
  onCloseModal,
  request
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [emails, setEmails] = useState<string>('');
  const [isValidEmails, setIsValidEmails] = useState<boolean>(false);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);

  const handleValidEmails = (emailsString: string) => {
    setEmails(emailsString);
    if (!emailsString) return
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

  const handleSendEmails = async () => {
    setLoading(true);
    let arrayEmails = [];
    if (!emails.includes(',')) {
      arrayEmails.push({
        email: emails.trim(),
        name: emails.trim()
      });
    };
    if (emails.includes(',')) {
      const aux = emails.split(',');
      arrayEmails = aux.map((mail) => {
        return {
          email: mail.trim(),
          name: mail.trim()
        }
      });
    };
    const aux: IResponseRequest = await sendMailsTemplateService({...request, emailsArray: arrayEmails});
    if (!aux.err) {
      onCloseModal('sended', aux.msg)
      return
    }
    setMessageAlert({ message: aux.err, type: 'error', show: true });
    setLoading(false);
    return
  };

  //--------------------------USEEFFECT
  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 3000);
    }
  }, [messageAlert]);

  useEffect(() => {
    if(!emails) return setDisabledConfirm(true);
    if (isValidEmails) return setDisabledConfirm(false);
    return setDisabledConfirm(true)
  }, [isValidEmails, emails]);

  return (
    <Spin spinning={loading} size='large' tip='Enviando...'>
      <Form layout='vertical'>
        <Row gutter={8}>
          <Col span='24'>
            <Form.Item
              label="Para enviar multiples correos, puede separarlos por coma (,)."
              validateStatus={isValidEmails ? 'success' : 'error'}
              help={isValidEmails ? '' : "El correo o los correos ingresados no contienen el formato correcto."}
            >
              <Input
                placeholder='Ingrese los correos electrónicos'
                onChange={(e) => handleValidEmails(e.currentTarget.value)}
                value={emails}
                id="error"
              />
            </Form.Item>
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
              onClick={() => handleSendEmails()}
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

export default SendEmailsTemplateView;
