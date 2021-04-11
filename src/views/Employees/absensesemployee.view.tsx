import React, { useState } from 'react';
import { Col, Input, Row, Select, TimePicker, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { CANCEL, CONFIRM } from '../../constants/var';

import CalendarComponent from "../../component/Calendar/Calendar";
import ModalComponent from "../../component/Modal/Modal";

interface IAbsensesEmployeeViewProps {
}

const AbsensesEmployeeView: React.FunctionComponent<IAbsensesEmployeeViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea } = Input;

  const [openNewAbsense, setOpenNewAbsense] = useState<boolean>(false);

  return (
    <>
      <CalendarComponent
        onSelect={() => setOpenNewAbsense(true)}
      />
      <ModalComponent
        visible={openNewAbsense}
        title='Ingredo de Ausencia para fecha -dd-mm-yyyy-'
        width={800}
        onClose={() => setOpenNewAbsense(false)}
        showButtons={[{ _id: CANCEL },{ _id: CONFIRM }]}
      >
        <Input.Group>
          <Row gutter={8}>
            <Col span={10}>
              <Select placeholder='Razon' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col span={14}>
              <TimePicker.RangePicker style={{ width: '100%' }} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <TextArea rows={4} placeholder='Descripción' />
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
      </ModalComponent>
    </>
  );
};

export default AbsensesEmployeeView;
