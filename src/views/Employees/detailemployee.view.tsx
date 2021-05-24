import React, { useState } from 'react';
import { Col, Input, Row, Form, Table, Collapse, Tooltip, Button } from "antd";
import {
  DownloadOutlined,
} from "@ant-design/icons";

import { GiModel } from '../../models/gi.models';
import { MilesFormat } from '../../libs/formattedPesos';
import TextArea from 'antd/lib/input/TextArea';
import { IResponseExpenses } from '../../models/expenses.models';
import { downloadFileEmployeeService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';

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

  const [loading, setLoading] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });

  const handleDownloadFile = async (filestring: string) => {
    setLoading(true)
    const aux: IResponseExpenses = await downloadFileEmployeeService(filestring);
    if (aux.err === null) {
      const arr = new Uint8Array(aux.res.data);
      const blob = new Blob([arr], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fileName = aux?.filename || 'examen';

      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoading(false)
      return
    }
    if (aux.err !== '') {
      setMessageAlert({ message: aux.msg, type: 'error', show: true });
      setLoading(false)
      return
    }
  };

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

  const renderListInvoices = () => {
    return (
      <Table
        style={{ width: '100%' }}
        showHeader={true}
        loading={loading}
        dataSource={employeesSelected?.detalle_pagos || []}
        // columns={columns}
        pagination={{ position: ['bottomCenter'] }}
      >
        <Column className='column-money' title="Código" dataIndex="codigo" key="codigo" />
        <Column className='column-money' title="Fecha" dataIndex="fecha" key="fecha" />
        <Column className='column-money' title="Subcategoria" dataIndex="subcategoria_dos" key="subcategoria_dos" />
        <Column className='column-money' title="Medio de pago" dataIndex="medio_pago" key="medio_pago" />
        <Column className='column-money' title="Institución bancaria" dataIndex="institucion_bancaria" key="institucion_bancaria" />
        <Column
          className='column-money'
          title="Monto Total"
          dataIndex="monto_total"
          key="monto_total"
          render={(text) => `$${MilesFormat(text)}`}
        />
        <Column
          className='column-money'
          title="Action"
          render={(_:string, record: any) => (
            <Tooltip title='Descargar liquidación' color={'#1A9D02'}>
              <Button
                onClick={() => handleDownloadFile(record.archivo_adjunto)}
                style={{ backgroundColor: '#39AE16' }}
                icon={<DownloadOutlined style={{ fontSize: '1.1rem', color: 'white' }} />} />
            </Tooltip>
          )}
        />
      </Table>
    );
  };

  return (
    <Collapse accordion defaultActiveKey={['1']}>
      <Panel header="Empleado" key="1">
        {renderEmployeeInformation()}
      </Panel>
      <Panel header="Pagos" key="4">
        {renderListInvoices()}
      </Panel>
    </Collapse>
  );
};

export default DetailsEmployee;
