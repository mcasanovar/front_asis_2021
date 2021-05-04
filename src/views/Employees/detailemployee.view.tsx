import * as React from 'react';
import { Col, Input, Row, Select, DatePicker, Button, Form, Table, Collapse } from "antd";

import TableComponent from "../../component/Table/Table";
import { GiModel } from '../../models/gi.models';
import { MilesFormat } from '../../libs/formattedPesos';
import TextArea from 'antd/lib/input/TextArea';

interface IDetailsEmployeeProps {
  onCloseModal: (value: string, message: string) => string | void
  employeesSelected: GiModel | undefined
}

const DetailsEmployee: React.FunctionComponent<IDetailsEmployeeProps> = ({
  onCloseModal,
  employeesSelected
}) => {
  const { Panel } = Collapse;
  const { Column } = Table;

  //-----------RENDERS
  const renderEmployeeInformation = () => {
    return (
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Rut'
              >
                <Input
                  readOnly
                  value={employeesSelected?.rut}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label='Nombre'
              >
                <Input
                  readOnly
                  value={employeesSelected?.razon_social}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label='Cargo'
              >
                <Input
                  readOnly
                  value={employeesSelected?.cargo}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10}>
              <Form.Item
                label='Tipo de contrato'
              >
                <Input
                  readOnly
                  value={employeesSelected?.tipo_contrato}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Fecha inicio contrato'
              >
                <Input
                  readOnly
                  value={employeesSelected?.fecha_inicio_contrato}
                />
              </Form.Item>
            </Col>
            {employeesSelected?.tipo_contrato !== 'Contrato Indefinido' &&
              <Col span={5}>
                <Form.Item
                  label='Fecha término contrato'
                >
                  <Input
                    readOnly
                    value={employeesSelected?.fecha_fin_contrato}
                  />
                </Form.Item>
              </Col>
            }
            <Col span={4}>
              <Form.Item
                label='Estado'
              >
                <Input
                  readOnly
                  value={employeesSelected?.estado_contrato}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Sueldo bruto'
              >
                <Input
                  readOnly
                  value={`$ ${MilesFormat(employeesSelected?.sueldo_bruto || 0)}`}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label='AFP'
              >
                <Input
                  readOnly
                  value={employeesSelected?.afp}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label='ISAPRE'
              >
                <Input
                  readOnly
                  value={employeesSelected?.isapre}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Seguridad laboral'
              >
                <Input
                  readOnly
                  value={employeesSelected?.seguridad_laboral}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Form.Item
                label='Comentarios'
              >
                <TextArea
                  rows={3}
                  readOnly
                  value={employeesSelected?.comentarios}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    );
  };

  return (
    <Collapse accordion defaultActiveKey={['1']}>
      <Panel header="Empleado" key="1">
        {renderEmployeeInformation()}
      </Panel>
      {/* <Panel header="Desglose" key="2">
        <TableComponent
          onClickAction={(id: string) => { }}
          onClickDelete={() => { }}
          useStyle={false}
        />
      </Panel>
      <Panel header="Ausencias" key="3">
        <TableComponent
          onClickAction={(id: string) => { }}
          onClickDelete={() => { }}
          useStyle={false}
        />
      </Panel> */}
      <Panel header="Pagos" key="4">
        <TableComponent
          onClickAction={(id: string) => { }}
          onClickDelete={() => { }}
          useStyle={false}
        />
      </Panel>
    </Collapse>
  );
};

export default DetailsEmployee;
