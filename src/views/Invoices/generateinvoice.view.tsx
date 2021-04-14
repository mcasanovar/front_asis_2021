import * as React from 'react';
import { DatePicker, Input, Row, Col, Select, Typography, Upload } from "antd";
import { DollarOutlined, PercentageOutlined, InboxOutlined } from "@ant-design/icons";

import TableComponent from "../../component/Table/Table";

interface IGenerateInvoiceProps {
}

const GenerateInvoice: React.FunctionComponent<IGenerateInvoiceProps> = (props) => {
  const { Option } = Select;
  const { Paragraph, Title } = Typography;

  return (
    <>
      <Title level={5}>Datos generales</Title>
      <Paragraph>Cliente</Paragraph>
      <Row gutter={8}>
        <Col span={6}>
          <Input
            placeholder="Código facturación"
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Sucursal"
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Servicio"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={4}>
          <Input
            placeholder="Rut cliente principal"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Nombre cliente principal"
          />
        </Col>
        <Col span={4}>
          <Input
            placeholder="Rut cliente secundario"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Nombre cliente secundario"
          />
        </Col>
      </Row>
      <br />
      <Paragraph>Empresa</Paragraph>
      <Row gutter={8}>
        <Col span={12}>
          <Input
            placeholder="Representante"
          />
        </Col>
        <Col span={12}>
          <Select placeholder='Razón social empresa' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Input
            placeholder="Email empresa"
          />
        </Col>
      </Row>
      <br />
      <Title level={5}>Datos de facturación</Title>
      <Row gutter={8}>
        <Col span={14}>
          <Input.Group>
            <Row gutter={8}>
              <Col span={8}>
                <DatePicker placeholder='Fecha factura' style={{ width: '100%' }} />
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Número factura"
                />
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Orden de compra"
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Paragraph>Lista de observaciones</Paragraph>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <TableComponent
                  onClickAction={() => { }}
                  onClickDelete={() => { }}
                  useStyle={false}
                  enablePagination={false}
                  headerWithColor
                />
              </Col>
            </Row>
          </Input.Group>
        </Col>
        <Col span={10}>
          <Input.Group>
            <Row>
              <Col span={24}>
                <Input
                  placeholder="Monto neto"
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
            <br />
            <Row gutter={8}>
              <Col span={12}>
                <Input
                  placeholder="IVA"
                  suffix={<PercentageOutlined />}
                />
              </Col>
              <Col span={12}>
                <Input
                  placeholder="Total IVA"
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Input
                  placeholder="Subtotal"
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Input
                  placeholder="Exento"
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Input
                  placeholder="Descuento"
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Input
                  placeholder="Total"
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
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
        </Col>
      </Row>
    </>
  );
};

export default GenerateInvoice;
