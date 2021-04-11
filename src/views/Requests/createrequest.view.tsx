import * as React from 'react';
import { Collapse, Input, Row, Col, Select, DatePicker, Upload } from "antd";
import { PercentageOutlined, DollarOutlined, InboxOutlined } from "@ant-design/icons";

interface ICreateRequestViewProps {
}

const CreateRequestView: React.FunctionComponent<ICreateRequestViewProps> = (props) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { TextArea } = Input;

  //---RENDERS
  const renderServiceInformation = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={3}>
            <DatePicker placeholder='Fecha solicitud' style={{ width: '100%' }} />
          </Col>
          <Col span={3}>
            <Input placeholder="Mes solicitud" />
          </Col>
          <Col span={3}>
            <Input placeholder="Año solicitud" />
          </Col>
          <Col span={5}>
            <Select placeholder='Categoría 1' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={5}>
            <Select placeholder='Categoría 2' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={5}>
            <Select placeholder='Categoría 3' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={8}>
            <Select placeholder='Servicio' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder='Tipo servicio' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder='Lugar servicio' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder='Lugar servicio' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder='Sucursal' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={5}>
            <Input placeholder="Monto neto" prefix={<DollarOutlined />} />
          </Col>
          <Col span={4}>
            <Input placeholder="Porcentaje impuesto" suffix={<PercentageOutlined />} />
          </Col>
          <Col span={5}>
            <Input placeholder="Valor impuesto" prefix={<DollarOutlined />} />
          </Col>
          <Col span={5}>
            <Input placeholder="Exento" prefix={<DollarOutlined />} />
          </Col>
          <Col span={5}>
            <Input placeholder="Monto total" prefix={<DollarOutlined />} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={12}>
            <TextArea rows={2} placeholder='Descripción' />
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderClientInformation = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={12}>
            <Select placeholder='Nombre receptor' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Select placeholder='Personal asignado' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <h2>Cliente principal</h2>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={4}>
            <Input
              placeholder="Rut"
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Nombre fantasia / Pseudonimo"
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Razon social / Nombre"
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Licencia conducir"
            />
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={6}>
            <Select placeholder='Contrato' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Faena' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <h2>Cliente Secundario</h2>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={4}>
            <Input
              placeholder="Rut"
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Nombre fantasia / Pseudonimo"
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Razon social / Nombre"
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Licencia conducir"
            />
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={6}>
            <Select placeholder='Clase licencia conducir' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder='Ley aplicable' style={{ width: '100%' }} onChange={() => { }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
      </Input.Group>
    );
  };

  const renderPreliminaryInformation = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={6}>
            <DatePicker placeholder='Fecha Reserva inicio preliminar' style={{ width: '100%' }} />
          </Col>
          <Col span={6}>
            <DatePicker placeholder='Hora Reserva inicio preliminar' style={{ width: '100%' }} />
          </Col>
          <Col span={6}>
            <DatePicker placeholder='Hora Reserva término preliminar' style={{ width: '100%' }} />
          </Col>
          <Col span={6}>
            <DatePicker placeholder='Hora Reserva término preliminar' style={{ width: '100%' }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={6}>
            <Input
              placeholder="Jornada"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <TextArea rows={3} placeholder='Observación general solicitud' />
          </Col>
        </Row>
        <br />
        <Row>
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
      </Input.Group>
    );
  };

  return (
    <Collapse accordion defaultActiveKey={['1']}>
      <Panel header="Datos del servicio" key="1">
        {renderServiceInformation()}
      </Panel>
      <Panel header="Datos del cliente" key="2">
        {renderClientInformation()}
      </Panel>
      <Panel header="Datos Preliminares" key="3">
        {renderPreliminaryInformation()}
      </Panel>
    </Collapse>
  );
};

export default CreateRequestView;
