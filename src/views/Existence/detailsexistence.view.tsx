import React, { useState, useEffect } from 'react';
import { Spin, Form, Collapse, Row, Col, Select, Input, Button, DatePicker, InputNumber, Typography } from 'antd';
import { ExistenceModel } from '../../models/existence.models';
import { MilesFormat } from '../../libs/formattedPesos';

interface IDetailsExistenceViewProps {
  onCloseModal: (value: string, message: string) => string | void
  existenceSelected: ExistenceModel | undefined
}

const DetailsExistenceView: React.FunctionComponent<IDetailsExistenceViewProps> = ({
  onCloseModal,
  existenceSelected
}) => {
  const { Title } = Typography;

  return (
    <Form layout='vertical'>
      {<Title level={4}>{`${existenceSelected?.codigo_categoria_tres} - ${existenceSelected?.subcategoria_tres}`}</Title>}
      <br />
      <Input.Group>
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item
              label='Categoria general'
            >
              <Input
                readOnly
                value={existenceSelected?.categoria_general}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Subcategoria 1'
            >
              <Input
                readOnly
                value={existenceSelected?.subcategoria_uno}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Subcategoria 2'
            >
              <Input
                readOnly
                value={existenceSelected?.subcategoria_dos}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Subcategoria 3'
            >
              <Input
                readOnly
                value={existenceSelected?.subcategoria_tres}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label='Código'
            >
              <Input
                readOnly
                value={existenceSelected?.codigo_categoria_tres}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            <Form.Item
              label='Cantidad máxima'
            >
              <Input
                readOnly
                value={existenceSelected?.cantMaxima}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Entradas'
            >
              <Input
                readOnly
                value={existenceSelected?.entradas}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Salidas'
            >
              <Input
                readOnly
                value={existenceSelected?.salidas}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Existencia'
            >
              <Input
                readOnly
                value={existenceSelected?.existencia}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Costo unitario promedio'
            >
              <Input
                readOnly
                value={`$ ${MilesFormat(existenceSelected?.costo_unitario_promedio || 0)}`}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Costo total'
            >
              <Input
                readOnly
                value={`$ ${MilesFormat(existenceSelected?.costo_total || 0)}`}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Form.Item
              label='Estado'
            >
              <Input
                readOnly
                value={existenceSelected?.estado}
              />
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>
      <Row gutter={8} style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        <Col
          span={3}
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
    </Form>
  );
};

export default DetailsExistenceView;
