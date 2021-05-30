import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { FormatingRut } from '../../functions/validators/index.validators';
import { IResponseEmployees } from '../../models/gi.models';
import { loginService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

interface ILoginViewProps {
  authorized: boolean
}

const LoginView: React.FunctionComponent<ILoginViewProps> = ({ authorized }) => {

  const { Text } = Typography;

  const [loading, setLoading] = useState<boolean>(false);
  const [rut, setRut] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });

  const handleFormattedRut = (e: string) => {
    const formattedRut = FormatingRut(e);
    setRut(formattedRut);
  };

  const handleLogin = async () => {
    setLoading(true)
    const aux: IResponseEmployees = await loginService(rut, password);
    if (aux.err === null) {
      localStorage.setItem('userLogged', JSON.stringify(aux.res));
      localStorage.setItem('authorizated', JSON.stringify(true));
      setLoading(false)
      window.location.reload();
      return;
    }
    setPassword('');
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    setLoading(false)
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  //------------------------ USEEFECT
  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 3000);
    }
  }, [messageAlert]);

  if(localStorage.getItem('authorizated') !== null){
    return <Redirect to='/gi' />
  }

  return (
    <div className='loginContainer'>
      <div className='card-login-container'>
        <Card style={{ width: '100%', height: '100%' }}>
          <Form
            style={{ marginTop: '100%', width: '100%' }}
            layout='vertical'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className='title-login '>
              <Text style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>ASIS</Text>
            </div>
            {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
            <Form.Item
              label="Rut"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                onChange={(e) => handleFormattedRut(e.currentTarget.value)}
                maxLength={10}
                value={rut}
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                onChange={(e) => setPassword(e.currentTarget.value)}
                value={password}
                disabled={loading}
              />
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked">
              <Checkbox disabled={loading}>Recordarme</Checkbox>
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                onClick={() => handleLogin()}
                loading={loading}
              >
                {!loading ? 'Entrar' : 'Validando usuario...'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginView;
