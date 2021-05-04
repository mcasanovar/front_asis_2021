import React, { useState, useEffect } from 'react';
import { Col, Input, Row, Form, Typography, Button, Select, Spin, Collapse, DatePicker, InputNumber, Upload } from 'antd';
import { InboxOutlined } from "@ant-design/icons";
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

import { ExpensesModel } from '../../models/expenses.models';
import { MilesFormat } from '../../libs/formattedPesos';

interface IExpensesProps {
  onCloseModal: (value: string, message: string) => string | void
  expenseSelected: ExpensesModel | undefined
}

const ExpensesView: React.FunctionComponent<IExpensesProps> = ({
  onCloseModal,
  expenseSelected
}) => {
  const { Title } = Typography;
  const { Panel } = Collapse;
  const { TextArea } = Input;

  const [loading, setLoading] = useState<boolean>(false);
  // const [newDataExpense, setNewDataExpense] = useState<ExpensesModel>(expenseSelected || ExpensesInitialization);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });


  //--------------------------------RENDERS
  const renderGeneralData = () => {
    return (
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Categoria general'
              >
                <Input
                  readOnly
                  value={expenseSelected?.categoria_general}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Sub-categoria 1'
              >
                <Input
                  readOnly
                  value={expenseSelected?.subcategoria_uno}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Sub-categoria 2'
              >
                <Input
                  readOnly
                  value={expenseSelected?.subcategoria_dos}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Proveedor'
              >
                <Input
                  readOnly
                  value={`${expenseSelected?.razon_social_proveedor} - ${expenseSelected?.rut_proveedor}`}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={4}>
              <Form.Item
                label='Tipo de pago'
              >
                <Input
                  readOnly
                  value={expenseSelected?.medio_pago}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Requiere servicio'
              >
                <Input
                  readOnly
                  value={expenseSelected?.requiere_servicio}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Documento'
              >
                <Input
                  readOnly
                  value={expenseSelected?.tipo_documento}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Nro. documento'
              >
                <Input
                  readOnly
                  value={expenseSelected?.nro_documento}
                />
              </Form.Item>
            </Col>
          </Row>
          {expenseSelected?.requiere_servicio === 'Si' &&
            <Row>
              <Col span={8}>
                <Form.Item
                  label='Servicio asociado'
                >
                  <Input
                    readOnly
                    value={expenseSelected?.servicio}
                  />
                </Form.Item>
              </Col>
            </Row>
          }
          <Row>
            <Col span={4}>
              <Form.Item
                label='Fecha'
              >
                <Input
                  readOnly
                  value={expenseSelected?.fecha}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Form.Item
                label='Descripción gasto'
              >
                <TextArea
                  rows={3}
                  readOnly
                  value={expenseSelected?.descripcion_gasto}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    );
  };

  const renderMoneyData = () => {
    return (
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Método de pago'
              >
                <Input
                  readOnly
                  value={expenseSelected?.medio_pago}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Institución bancaria'
              >
                <Input
                  readOnly
                  value={expenseSelected?.institucion_bancaria}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Inventario'
              >
                <Input
                  readOnly
                  value={expenseSelected?.inventario}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Cantidad / factor'
              >
                <Input
                  readOnly
                  value={expenseSelected?.cantidad_factor}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Precio unitario'
              >
                <Input
                  readOnly
                  value={`$${MilesFormat(expenseSelected?.precio_unitario || 0)}`}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Monto neto'
              >
                <Input
                  readOnly
                  value={`$${MilesFormat(expenseSelected?.monto_neto || 0)}`}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Impuesto'
              >
                <Input
                  readOnly
                  value={`${MilesFormat(expenseSelected?.impuesto || 0)}%`}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Exento'
              >
                <Input
                  readOnly
                  value={`$${MilesFormat(expenseSelected?.exento || 0)}`}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Total'
              >
                <Input
                  readOnly
                  value={`$${MilesFormat(expenseSelected?.total || 0)}`}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={9}>
              <Form.Item
                label='Observaciones'
              >
                <TextArea
                  rows={3}
                  readOnly
                  value={expenseSelected?.observaciones}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    );
  }

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`${expenseSelected?.codigo}`}</Title>}
      <Form layout='vertical'>
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel header="Datos generales" key="1">
            {renderGeneralData()}
          </Panel>
          <Panel header="Datos monetarios" key="2">
            {renderMoneyData()}
          </Panel>
        </Collapse>
      </Form>
      <br />
      <Row gutter={8} style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        <Col
          span={2}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={() => onCloseModal('', '')}
            style={{ backgroundColor: '#1073B5', color: 'white', width: '100%' }}
          >
            OK
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};

export default ExpensesView;
