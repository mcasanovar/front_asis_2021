import * as React from 'react';

import { Input, Row, Col, Select, Form } from "antd";
import { LockOutlined } from "@ant-design/icons";

interface IConfigurationGiProps {

}

const ConfigurationGi: React.FunctionComponent<IConfigurationGiProps> = (props) => {
  const { Option } = Select;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span='12'>
          <Select placeholder='Rol' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Rol 1</Option>
            <Option value="lucy">Rol 2</Option>
            <Option value="Yiminghe">Rol 3</Option>
          </Select>
        </Col>
        <Col span='12'>
          <Select placeholder='¿Cambiar contraseña?' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Si</Option>
            <Option value="lucy">No</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="Contraseña"
            noStyle
            extra="La contraseña debe ser entre 6 y 12 caracteres"
          >
            <Input.Password
              placeholder='Nueva contraseña'
              prefix={<LockOutlined />}
            />
          </Form.Item>
        </Col>
      </Row>
    </Input.Group>
  );
};

export default ConfigurationGi;
