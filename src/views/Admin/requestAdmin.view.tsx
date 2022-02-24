import React, { useState } from 'react'
import { Collapse, Input, Row, Col, Select, DatePicker, Spin, Typography, Button, Form, InputNumber, TimePicker, Checkbox } from "antd";
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from '../../component/Alert/Alert';

import { ICategory1, RequestModel } from '../../models/request.models';
import { RequestInitialization } from '../../initializations/request.initialization';
import { CATEGORIES_REQUESTS, DEFAULT_PERCENTAGE_IVA, FORMAT_DATE } from '../../constants/var';
import moment, { Moment } from 'moment';
import SubBarComponent from '../../component/Subbar/SubBar';

interface IRequestAdminViewProps {
  authorized: boolean
}

interface IFilterSelected {
  headerFilter: string,
  filter: string
}

const ResquestAdminView: React.FunctionComponent<IRequestAdminViewProps> = ({ authorized }) => {
  const { Title, Paragraph } = Typography;
  const { Panel } = Collapse;
  const { Option } = Select;
  const { TextArea, Search } = Input;

  const [newRequestData, setNewRequestData] = useState<RequestModel>(RequestInitialization);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });

  //---RENDERS
  const renderServiceInformation = () => {
    return (
      <Input.Group>
        <Form layout='vertical'>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Fecha solicitud'
              >
                <DatePicker
                  format={`${FORMAT_DATE}`}
                  style={{ width: '100%' }}
                  value={!!newRequestData.fecha_solicitud ? moment(newRequestData.fecha_solicitud, FORMAT_DATE) : undefined}
                // onSelect={(e: Moment) => handleSelectRequestDate(e, true)}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                label='Mes solicitud'
              >
                <Input
                  readOnly
                  value={newRequestData.mes_solicitud}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                label='Año solicitud'
              >
                <Input
                  readOnly
                  value={newRequestData.anio_solicitud}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Categoria 1'
              >
                <Select
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  // onSelect={(e) => handleSelectCategoria1(parseInt(e.toString()))}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={newRequestData.categoria1}
                >
                  {CATEGORIES_REQUESTS.map((category: ICategory1, index) => (
                    <Option key={index} value={category.id}>{category.nivel_1}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Categoria 2'
              >
                <Select
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  // onSelect={(e) => handleSelectCategoria2(parseInt(e.toString()))}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={newRequestData.categoria2}
                >
                  {/* {selectionsCategories.level_1 > 0
                    && CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2.map((category, index) => (
                      <Option key={index} value={category.id}>{category.nivel_2}</Option>
                    ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Categoria 3'
              >
                <Select
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  // onSelect={(e) => handleSelectCategoria3(parseInt(e.toString()))}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={newRequestData.categoria3}
                >
                  {/* {selectionsCategories.level_2 > 0
                    && CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2[selectionsCategories.level_2 - 1].nivel_3.map((category, index) => (
                      <Option key={index} value={category.id}>{category.nivel_3}</Option>
                    ))} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={9}>
              <Form.Item
                label='Nombre servicio'
              >
                <Select
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  // onSelect={(e) => handleSelectServiceName(e.toString())}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={newRequestData.nombre_servicio}
                >
                  {/* {selectionsCategories.level_3 > 0
                    && CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2[selectionsCategories.level_2 - 1].nivel_3[selectionsCategories.level_3 - 1].nivel_4.map((category, index) => (
                      <Option key={index} value={category.nivel_4}>{category.nivel_4}</Option>
                    ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Tipo servicio'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setNewRequestData({ ...newRequestData, tipo_servicio: e.toString() })}
                  value={newRequestData.tipo_servicio}
                >
                  {/* {SERVICES_TYPE.map((service, index) => (
                    <Option key={index} value={service}>{service}</Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Lugar servicio'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setNewRequestData({ ...newRequestData, lugar_servicio: e.toString() })}
                  value={newRequestData.lugar_servicio}
                >
                  {/* {newRequestData.tipo_servicio === 'Presencial' ?
                    SERVICES_PLACE.map((service, index) => (
                      <Option key={index} value={service}>{service}</Option>
                    )) :
                    <Option value='No Aplica'>No Aplica</Option>
                  } */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Sucursal'
              >
                <Select
                  style={{ width: '100%' }}
                  onChange={() => { }}
                  onSelect={(e) => setNewRequestData({ ...newRequestData, sucursal: e.toString() })}
                  value={newRequestData.sucursal}
                >
                  {/* {newRequestData.lugar_servicio === 'Oficina' ?
                    SUCURSAL.map((sucursal, index) => (
                      <Option key={index} value={sucursal}>{sucursal}</Option>
                    )) :
                    <Option value='Fuera de oficina'>Fuera de oficina</Option>
                  } */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={5}>
              <Form.Item
                label='Monto neto'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  type='number'
                  // onChange={(value) => handleFormattedPrices(parseInt(value.toString()), 'monto_neto')}
                  value={newRequestData.monto_neto}
                />
                {/* <Paragraph>{`$${MilesFormat(newRequestData.monto_neto)}.-`}</Paragraph> */}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Porcentaje impuesto'
              >
                <InputNumber
                  defaultValue={DEFAULT_PERCENTAGE_IVA}
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  onChange={(value) => setNewRequestData({ ...newRequestData, porcentaje_impuesto: value })}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Valor mpuesto'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  type='number'
                  // onChange={(value) => handleFormattedPrices(parseInt(value.toString()), 'valor_impuesto')}
                  value={newRequestData.valor_impuesto}
                  readOnly
                />
                {/* <Paragraph>{`$${MilesFormat(newRequestData.valor_impuesto)}.-`}</Paragraph> */}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Exento'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  type='number'
                  // onChange={(value) => handleFormattedPrices(parseInt(value.toString()), 'exento')}
                  value={newRequestData.exento}
                />
                {/* <Paragraph>{`$${MilesFormat(newRequestData.exento)}.-`}</Paragraph> */}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Monto total'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  type='number'
                  // onChange={(value) => handleFormattedPrices(parseInt(value.toString()), 'monto_total')}
                  value={newRequestData.monto_total}
                  readOnly
                />
                {/* <Paragraph>{`$${MilesFormat(newRequestData.monto_total)}.-`}</Paragraph> */}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label='Descripción del servicio'
              >
                <TextArea
                  rows={2}
                  onChange={(e) => setNewRequestData({ ...newRequestData, descripcion_servicio: e.currentTarget.value })}
                  value={newRequestData.descripcion_servicio}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Input.Group>
    );
  };

  return (
    <div className="container-gi">
      <SubBarComponent title='Resultados' />
      <Spin spinning={loading} size='large' tip='Cargando...'>
        {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
        <Title level={4} style={{ textAlign: 'center', marginTop: '10px' }}>{`Administración de Solicitudes`}</Title>
        <br />
        <Title level={5} style={{ textAlign: 'left', marginTop: '10px' }}>{`Código`}</Title>
        <Search
          placeholder="Ingrese el código de la solicitud..."
          enterButton="Buscar"
          size="middle"
          loading={false}
          style={{ width: '100%', height: '2rem', marginLeft: 0 }}
          // onChange={(e) => setFilterText(e.currentTarget.value)}
          // onSearch={() => onClickSearch()}
          // value={filterText}
        />
        <br/>
        <br/>
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel header="Datos del servicio" key="1">
            {renderServiceInformation()}
          </Panel>
          <Panel header="Datos del cliente" key="2">
            {/* {renderClientInformation()} */}
          </Panel>
          <Panel header="Datos Preliminares" key="3">
            {/* {renderPreliminaryInformation()} */}
          </Panel>
        </Collapse>
      </Spin>
    </div>
  )
}



export default ResquestAdminView
