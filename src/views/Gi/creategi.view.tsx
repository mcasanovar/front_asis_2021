import React, { FunctionComponent, FormEvent } from 'react';

import { Collapse, Input, Row, Col, Select, DatePicker, Upload } from "antd";
import { PhoneOutlined, MailOutlined, InboxOutlined } from '@ant-design/icons';

interface ICreateGiViewProps {
}

const CreateGiView: FunctionComponent<ICreateGiViewProps> = (props) => {
  const { Panel } = Collapse;
  const { Option } = Select;

  const handle = (e: FormEvent<HTMLInputElement>) => {

  }

  //---------RENDERS
  const renderTributaryInformation = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={8}>
            <Input
              placeholder="Rut"
              onChange={(e) => handle(e)}
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Razon Social / Nombre"
              onChange={(e) => handle(e)}
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Nombre fantasía / Pseudónimo"
              onChange={(e) => handle(e)}
            />
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={12}>
            <Select placeholder='Actividad Principal' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Rubro Principal"
              onChange={(e) => handle(e)}
            />
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={12}>
            <Select placeholder='Actividad Secundaria' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Rubro Secundario"
              onChange={(e) => handle(e)}
            />
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={6}>
            <Select placeholder='Grupo Interes' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Tipo Cliente' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Categoria Empresa' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Categoria Cliente' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={6}>
            <DatePicker style={{ width: '100%' }} />
          </Col>
          <Col span={6}>
            <Input
              placeholder="Edad"
              onChange={(e) => handle(e)}
            />
          </Col>
          <Col span={6}>
            <Select placeholder='Crédito' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Orden de Compra' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={6}>
            <Select placeholder='Rol' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderContactInformaction = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={6}>
            <Input size="large" placeholder="Contacto primario" prefix={<PhoneOutlined />} />
          </Col>
          <Col span={6}>
            <Input size="large" placeholder="Contacto secundario" prefix={<PhoneOutlined />} />
          </Col>
          <Col span={6}>
            <Input size="large" placeholder="Email primario" prefix={<MailOutlined />} />
          </Col>
          <Col span={6}>
            <Input size="large" placeholder="Email secundario" prefix={<MailOutlined />} />
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={12}>
            <Input placeholder="Dirección" />
          </Col>
          <Col span={6}>
            <Input placeholder="Localidad" />
          </Col>
          <Col span={6}>
            <Select placeholder='Comuna' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={8}>
            <Input placeholder="Provincia" />
          </Col>
          <Col span={8}>
            <Input placeholder="Región" />
          </Col>
          <Col span={8}>
            <Select placeholder='Sector' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={6}>
            <Input placeholder="Nacionalidad" />
          </Col>
          <Col span={6}>
            <Select placeholder='País Origen' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderPersonalWorkingInformation = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={12}>
            <Select placeholder='Organización Perteneciente' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Select placeholder='Profesión u Oficio' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={8}>
            <Input placeholder="Cargo" />
          </Col>
          <Col span={8}>
            <Select placeholder='Género' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Nivel educacional' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={6}>
            <Select placeholder='Estado Civil' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Grupo Sanguineo' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder='Lentes Ópticos' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder='Lentes Contacto' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder='Audifonos' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={8}>
            <DatePicker placeholder='Fecha vencimiento CI' style={{ width: '100%' }} />
          </Col>
          <Col span={8}>
            <Select placeholder='Usa PC' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select placeholder='Seleccione contracto' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={10}>
            <Select placeholder='Seleccione faena' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder='Licencia de conducir' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={10}>
            <Select placeholder='Tipo licencia' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={8}>
            <Input placeholder="Ley Aplicable" />
          </Col>
          <Col span={8}>
            <DatePicker placeholder='Fecha vencimiento licencia' style={{ width: '100%' }} />
          </Col>
          <Col span={8}>
            <Input placeholder="Estado Licencia" />
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={12}>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
              <p className="ant-upload-hint">10mb max.</p>
            </Upload.Dragger>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={8}>
            <Select placeholder='Grado formalización' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Input placeholder="Número de contrato" />
          </Col>
          <Col span={8}>
            <Input placeholder="Ingrese faena(s)" />
          </Col>
        </Row>
      </Input.Group>
    );
  };

  return (
    <Collapse accordion defaultActiveKey={['1']}>
      <Panel header="Datos Tributarios" key="1">
        {renderTributaryInformation()}
      </Panel>
      <Panel header="Datos de Contacto" key="2">
        {renderContactInformaction()}
      </Panel>
      <Panel header="Datos Personales / Laborales" key="3">
        {renderPersonalWorkingInformation()}
      </Panel>
    </Collapse>
  );
};

export default CreateGiView;
