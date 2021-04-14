import * as React from 'react';
import { Input, Row, Col, Tag, Typography } from "antd";

import TableComponent from "../../component/Table/Table";

interface IDetailsResultViewProps {
}

const DetailsResultView: React.FunctionComponent<IDetailsResultViewProps> = (props) => {
  const { Paragraph } = Typography;

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
            <Col span={12}>
              <Input
                placeholder="Restado resultado"
              />
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={8}>
              <Input
                placeholder="Vigencia examen"
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Fecha resultado"
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Hora resultado"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Paragraph>Condicionantes</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tag>Lentes ópticos</Tag>
              <Tag>Baja audición</Tag>
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
        />
      </Col>
    </Row>
  );
};

export default DetailsResultView;
