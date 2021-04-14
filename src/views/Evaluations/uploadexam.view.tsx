import * as React from 'react';
import { Input, Row, Col, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import TableComponent from "../../component/Table/Table";

interface IUploadExamViewProps {
}

const UploadExamView: React.FunctionComponent<IUploadExamViewProps> = (props) => {
  const { TextArea } = Input;

  return (
    <Row>
      <Col span={12}>
        <Input.Group>
          <Row gutter={8}>
            <Col span={24}>
              <TextArea placeholder='Observaciones' rows={4} />
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
      <Col span={12} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: '1rem'
      }}>
        <TableComponent
          onClickAction={() => { }}
          onClickDelete={() => { }}
          useStyle={false}
          enablePagination={false}
        />
      </Col>
    </Row>
  );
};

export default UploadExamView;
