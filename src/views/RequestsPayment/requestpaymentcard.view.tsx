import * as React from 'react';
import { Col, Input, Row, DatePicker, TimePicker } from 'antd';

import TableComponent from "../../component/Table/Table";

interface IRequestPaymentCardViewProps {
}

const RequestPaymentCardView: React.FunctionComponent<IRequestPaymentCardViewProps> = (props) => {
  const { TextArea } = Input;

  return (
    <Row gutter={8}>
      <Col span={12}>
        <Input.Group>
          <Row gutter={8}>
            <Col span={12}>
              <DatePicker placeholder='Fecha creación carta' style={{ width: '100%' }} />
            </Col>
            <Col span={12}>
              <TimePicker placeholder='Hora creación carta' format='HH:mm' style={{ width: '100%' }} />
            </Col>
          </Row>
          <br/>
          <Row gutter={8}>
            <Col span={12}>
              <DatePicker placeholder='Fecha envio carta' style={{ width: '100%' }} />
            </Col>
            <Col span={12}>
              <TimePicker placeholder='Hora envio carta' format='HH:mm' style={{ width: '100%' }} />
            </Col>
          </Row>
          <br/>
          <Row gutter={8}>
            <Col span={24}>
              <TextArea rows={5} placeholder='Observaciones' />
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

export default RequestPaymentCardView;
