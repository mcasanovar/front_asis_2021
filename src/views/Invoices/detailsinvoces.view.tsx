import * as React from 'react';
import { Collapse, Input, Row, Col, Button, Typography } from "antd";
import { DownloadOutlined, DollarOutlined, PercentageOutlined } from '@ant-design/icons';

import TableComponent from "../../component/Table/Table";

interface IDetailsInvoicesViewProps {
}

const DetailsInvoicesView: React.FunctionComponent<IDetailsInvoicesViewProps> = (props) => {
  const { Panel } = Collapse;
  const { Paragraph, Title } = Typography;

  //------RENDERS
  const renderInformationOC = () => {
    return (
      <Row gutter={8}>
        <Col span={12}>
          <Input.Group>
            <Row gutter={8}>
              <Col span={12}>
                <Input
                  placeholder="Número OC"
                />
              </Col>
              <Col span={6}>
                <Input
                  placeholder="Fecha OC"
                />
              </Col>
              <Col span={6}>
                <Input
                  placeholder="Hora OC"
                />
              </Col>
            </Row>
            <br />
            <Row gutter={8}>
              <Col span={16}>
                <Button type="primary" icon={<DownloadOutlined />}>
                  Descargar OC
                </Button>
              </Col>
            </Row>
          </Input.Group>
        </Col>
        <Col span={12}>
          <TableComponent
            onClickAction={() => { }}
            onClickDelete={() => { }}
            useStyle={false}
            enablePagination={false}
            headerWithColor
          />
        </Col>
      </Row>
    );
  };

  const renderValidationOC = () => {
    return (
      <Row>
        <Col span={12}>
          <Input.Group>
            <Row gutter={8}>
              <Col span={12}>
                <Input
                  placeholder="Estado archivo"
                />
              </Col>
            </Row>
          </Input.Group>
        </Col>
        <Col span={12}>
          <TableComponent
            onClickAction={() => { }}
            onClickDelete={() => { }}
            useStyle={false}
            enablePagination={false}
            headerWithColor
          />
        </Col>
      </Row>
    );
  };

  const renderInvoiceInformation = () => {
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
            <Input
              placeholder="Razon social empresa"
            />
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
          <Col span={16}>
            <Input.Group>
              <Row gutter={8}>
                <Col span={8}>
                  <Input
                    placeholder="Fecha factura"
                  />
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
          <Col span={8}>
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
            </Input.Group>
          </Col>
        </Row>
      </>
    );
  };

  const renderValidationInvoice = () => {
    return (
      <Row>
        <Col span={12}>
          <Input.Group>
            <Row gutter={8}>
              <Col span={12}>
                <Input
                  placeholder="Estado archivo"
                />
              </Col>
            </Row>
          </Input.Group>
        </Col>
        <Col span={12}>
          <TableComponent
            onClickAction={() => { }}
            onClickDelete={() => { }}
            useStyle={false}
            enablePagination={false}
            headerWithColor
          />
        </Col>
      </Row>
    );
  };

  return (
    <Collapse accordion defaultActiveKey={['1']}>
      <Panel header="Datos generales OC" key="1">
        {renderInformationOC()}
      </Panel>
      <Panel header="Datos validación OC" key="2">
        {renderValidationOC()}
      </Panel>
      <Panel header="Datos Factura" key="3">
        {renderInvoiceInformation()}
      </Panel>
      <Panel header="Datos validación factura" key="4">
        {renderValidationInvoice()}
      </Panel>
    </Collapse>
  );
};

export default DetailsInvoicesView;
