import * as React from 'react';
import { Input, Row, Col } from "antd";

interface IDetailsEvaluationViewProps {
}

const DetailsEvaluationView: React.FunctionComponent<IDetailsEvaluationViewProps> = (props) => {
  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="Código"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Estado proceso"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Estado archivo"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="Fecha inicio evaluación"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Fecha término evaluación"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="Rut cliente principal"
          />
        </Col>
        <Col span={16}>
          <Input
            placeholder="Razon social"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="Rut cliente secundario"
          />
        </Col>
        <Col span={16}>
          <Input
            placeholder="Razon social"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={16}>
          <Input
            placeholder="Servicio"
          />
        </Col>
      </Row>
    </Input.Group>
  );
};

export default DetailsEvaluationView;
