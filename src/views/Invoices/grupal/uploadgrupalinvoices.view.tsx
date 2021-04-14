import * as React from 'react';
import { Col, Input, Row, DatePicker, Upload } from 'antd';
import { DollarOutlined, PercentageOutlined, InboxOutlined } from "@ant-design/icons";

import TableComponent from "../../../component/Table/Table";

interface IUploadGroupInvoicesViewProps {
}

const UploadGroupInvoicesView: React.FunctionComponent<IUploadGroupInvoicesViewProps> = (props) => {
  const { Search } = Input;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={12}>
          <Row gutter={8}>
            <Col span={6}>
              <DatePicker placeholder='Fecha factura' style={{ width: '100%' }} />
            </Col>
            <Col span={6}>
              <Input
                placeholder="Número factura"
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder="Orden de compra"
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
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
      <br/>
      <br/>
      <br/>
      <Row>
        <Col span={24}>
          <Col span={24} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingLeft: '1rem'
          }}>
            <Search
              placeholder="Buscar reservas"
              onSearch={() => { }}
              style={{
                paddingBottom: '1rem',
                width: '100%'
              }}
            />
            <TableComponent
              onClickAction={() => { }}
              onClickDelete={() => { }}
              useStyle={false}
              enableRowSelection
              enablePagination={false}
              headerWithColor
            />
          </Col>
        </Col>
      </Row>
    </Input.Group>
  );
};

export default UploadGroupInvoicesView;
