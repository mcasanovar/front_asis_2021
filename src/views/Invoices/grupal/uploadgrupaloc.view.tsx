import * as React from 'react';
import { Input, Row, Col, Upload, DatePicker, TimePicker } from "antd";
import { InboxOutlined } from '@ant-design/icons';

import TableComponent from "../../../component/Table/Table";

interface IUploadGrupalOCViewProps {
}

const UploadGrupalOCView: React.FunctionComponent<IUploadGrupalOCViewProps> = (props) => {
  const { TextArea, Search } = Input;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={12}>
          <Input
            placeholder="Número OC"
          />
        </Col>
        <Col span={6}>
          <DatePicker placeholder='Fecha subida OC' style={{ width: '100%' }} />
        </Col>
        <Col span={6}>
          <TimePicker placeholder='Hora subida OC' format='HH:mm' style={{ width: '100%' }} />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={24}>
          <TextArea rows={3} placeholder='Observaciones'></TextArea>
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
      <br/>
      <br/>
      <br/>
      <br/>
      <Row>
        <Col span={24}>
          <Search
            placeholder="Buscar solicitudes"
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
      </Row>
    </Input.Group>
  );
};

export default UploadGrupalOCView;
