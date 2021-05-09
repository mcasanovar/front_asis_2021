import React, { useState, useEffect } from 'react';
import { Col, Input, Row, Form, Typography, Button, Select, Spin, Collapse, DatePicker, InputNumber, Upload } from 'antd';
import { InboxOutlined } from "@ant-design/icons";
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

import { ExpensesModel, IResponseExpenses } from '../../models/expenses.models';
import { ExpensesInitialization } from '../../initializations/expenses.initialization';
import { BANKING_INSTITUTION, CATEGORIES_EXPENSES, DEFAULT_PERCENTAGE_IVA, DOCUMENTS, FORMAT_DATE, PAYMENT_METHODS, REGISTER_TYPE } from '../../constants/var';
import { GiModel, IReponseAllGIs, IResponseGI } from '../../models/gi.models';
import { getAllGIWithoutPaginationService, getAllRequestsNoPaginationService, insertExpenseService } from '../../services';
import { IResponseAllRequests, IResponseRequest, RequestModel } from '../../models/request.models';

import moment, { Moment } from 'moment';
import { CalculateIVA } from '../../libs/calculateIVA';
import { MapExpenseToInsert } from '../../functions/mappers';

interface IExpensesProps {
  onCloseModal: (value: string, message: string) => string | void
  expenseSelected: ExpensesModel | undefined
}

const ExpensesView: React.FunctionComponent<IExpensesProps> = ({
  onCloseModal,
  expenseSelected
}) => {
  const { Title } = Typography;
  const { Option } = Select;
  const { Panel } = Collapse;
  const { TextArea } = Input;

  const [loading, setLoading] = useState<boolean>(false);
  const [newDataExpense, setNewDataExpense] = useState<ExpensesModel>(expenseSelected || ExpensesInitialization);
  const [suppliers, setSuppliers] = useState<GiModel[]>([]);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [requests, setRequests] = useState<RequestModel[]>([]);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [indexsubone, setIndexsubone] = useState<number>(-1);
  const [indexsubtwo, setIndexsubtwo] = useState<number>(-1);
  const [indexsubthree, setIndexsubthree] = useState<number>(-1);
  const [file, setFile] = useState<string | Blob | null>(null);

  const getFileUploaded = (e: any) => {
    e && setFile(e.file)
    e.onSuccess('ok');
  };

  const handleInsertExpense = async () => {
    setLoading(true);
    let formData = new FormData();
    const expenseMapped = MapExpenseToInsert(newDataExpense);
    formData.append("data", JSON.stringify(expenseMapped));
    file !== null && formData.append("archivo", file);
    const result: IResponseExpenses = await insertExpenseService(formData);
    if (result.err === null) {
      onCloseModal('reload', result.msg)
    } else {
      return setMessageAlert({ message: result.err, type: 'error', show: true });
    }
  };

  const handleSelectedMainCategory = (index: number) => {
    setIndexsubone(index);
    setIndexsubtwo(-1);
    setIndexsubthree(-1);
    setNewDataExpense({
      ...newDataExpense,
      categoria_general: CATEGORIES_EXPENSES[index].categoria_general,
      subcategoria_uno: '',
      subcategoria_dos: ''
    });
  };

  const handleSelectedSubcagoryOne = (index: number) => {
    setIndexsubtwo(index);
    setIndexsubthree(-1);
    setNewDataExpense({
      ...newDataExpense,
      subcategoria_uno: CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[index].subcategoria_uno,
      subcategoria_dos: ''
    });
  };

  const handleSelectedSubcagoryTwo = (index: number) => {
    setIndexsubthree(index);
    setNewDataExpense({
      ...newDataExpense,
      subcategoria_dos: CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[indexsubtwo].subcategoria_dos[index].subcategoria_dos,
      inventario: CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[indexsubtwo].subcategoria_dos[index].inventario ? 'Si' : 'No'
    });
  };

  const handleAssingSupplier = (id: string) => {
    const aux = suppliers.find((supplier) => supplier._id === id);
    if (!aux) return;
    setNewDataExpense({
      ...newDataExpense,
      rut_proveedor: aux.rut,
      id_proveedor: aux._id,
      categoria_proveedor: aux.categoria,
      razon_social_proveedor: aux.razon_social
    });
  };

  const handleAssignRequest = (id: string) => {
    const aux = requests.find((request) => request._id === id);
    if (!aux) return;
    setNewDataExpense({
      ...newDataExpense,
      id_servicio: aux._id,
      servicio: aux.nombre_servicio
    });
  };

  const handleCalculateTotal = (uniquePrice: number, count: number, percentage: number, exento: number) => {
    const ammount = (uniquePrice * count);
    const iva = CalculateIVA(ammount, percentage);
    const total = (ammount + iva + exento);
    setNewDataExpense({
      ...newDataExpense,
      precio_unitario: uniquePrice,
      cantidad_factor: count,
      impuesto: percentage,
      exento: exento,
      monto_neto: ammount,
      total: total
    });
  };

  async function getSuppliers() {
    const aux: IReponseAllGIs = await getAllGIWithoutPaginationService();
    if (aux && aux.gis && aux.gis.length > 0) {
      setSuppliers(aux.gis);
    };
  };

  async function getRequests() {
    const aux: IResponseRequest = await getAllRequestsNoPaginationService();
    if (aux.err === null) {
      setRequests(aux.res);
    };
  };

  //--------------------------------RENDERS
  const renderGeneralData = () => {
    return (
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                validateStatus={newDataExpense.categoria_general !== '' ? 'success' : 'error'}
                help={newDataExpense.categoria_general !== '' ? '' : 'Seleccione'}
                label='Categoria general'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => handleSelectedMainCategory(parseInt(e.toString()))}
                >
                  {CATEGORIES_EXPENSES.map((category, index) => (
                    <Option key={index} value={index}>{category.categoria_general}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                validateStatus={newDataExpense.subcategoria_uno !== '' ? 'success' : 'error'}
                help={newDataExpense.subcategoria_uno !== '' ? '' : 'Seleccione'}
                label='Sub-categoria 1'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => handleSelectedSubcagoryOne(parseInt(e.toString()))}
                  value={newDataExpense.subcategoria_uno}
                >
                  {indexsubone >= 0 && CATEGORIES_EXPENSES[indexsubone].subcategoria_uno.map((sub1, index) => (
                    <Option key={index} value={index}>{sub1.subcategoria_uno}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                validateStatus={newDataExpense.subcategoria_dos !== '' ? 'success' : 'error'}
                help={newDataExpense.subcategoria_dos !== '' ? '' : 'Seleccione'}
                label='Sub-categoria 2'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => handleSelectedSubcagoryTwo(parseInt(e.toString()))}
                  value={newDataExpense.subcategoria_dos}
                >
                  {indexsubtwo >= 0 && CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[indexsubtwo].subcategoria_dos.map((sub2, index) => (
                    <Option key={index} value={index}>{sub2.subcategoria_dos}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                validateStatus={newDataExpense.rut_proveedor !== '' ? 'success' : 'error'}
                help={newDataExpense.rut_proveedor !== '' ? '' : 'Seleccione'}
                label='Proveedor'
              >
                <Select
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  optionFilterProp="children"
                  showSearch
                  style={{ width: '100%' }}
                  onSearch={(e) => handleAssingSupplier(e.toString())}
                  value={`${newDataExpense.rut_proveedor} - ${newDataExpense.razon_social_proveedor}`}
                >
                  {suppliers.map((supplier) => (
                    <Option key={supplier._id} value={supplier._id}>{`${supplier.rut} - ${supplier.razon_social}`}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={4}>
              <Form.Item
                label='Tipo registro'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setNewDataExpense({ ...newDataExpense, tipo_registro: e.toString() })}
                  value={newDataExpense.tipo_registro}
                >
                  {REGISTER_TYPE.map((type, index) => (
                    <Option key={index} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Requiere servicio'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setNewDataExpense({ ...newDataExpense, requiere_servicio: e.toString() })}
                  value={newDataExpense.requiere_servicio}
                >
                  <Option value='Si'>Si</Option>
                  <Option value='No'>No</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Documento'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setNewDataExpense({ ...newDataExpense, tipo_documento: e.toString() })}
                  value={newDataExpense.tipo_documento}
                >
                  {DOCUMENTS.map((document, index) => (
                    <Option key={index} value={document}>{document}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Nro. documento'
              >
                <Input
                  onChange={(e) => setNewDataExpense({ ...newDataExpense, nro_documento: e.currentTarget.value })}
                  value={newDataExpense.nro_documento}
                />
              </Form.Item>
            </Col>
          </Row>
          {newDataExpense.requiere_servicio === 'Si' &&
            <Row>
              <Col span={8}>
                <Form.Item
                  label='Servicio asociado'
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: '100%' }}
                    onSelect={(e) => handleAssignRequest(e.toString())}
                  >
                    {requests.map((request) => (
                      <Option key={request._id} value={request._id}>{`${request.codigo} - ${request.nombre_servicio}`}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          }
          <Row>
            <Col span={4}>
              <DatePicker
                format={FORMAT_DATE}
                defaultValue={moment(new Date(), FORMAT_DATE)}
                style={{ width: '100%' }}
                value={newDataExpense.fecha !== '' ? moment(newDataExpense.fecha) : undefined}
                onSelect={(e: Moment) => setNewDataExpense({ ...newDataExpense, fecha: e.format(FORMAT_DATE) })}
              />
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
                  onChange={(e) => setNewDataExpense({ ...newDataExpense, descripcion_gasto: e.currentTarget.value })}
                  value={newDataExpense.descripcion_gasto}
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
                validateStatus={newDataExpense.medio_pago !== '' ? 'success' : 'error'}
                help={newDataExpense.medio_pago !== '' ? '' : 'Seleccione'}
                label='Método de pago'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setNewDataExpense({ ...newDataExpense, medio_pago: e.toString() })}
                  value={newDataExpense.medio_pago}
                >
                  {PAYMENT_METHODS.map((method, index) => (
                    <Option key={index} value={method}>{method}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Institución bancaria'
                validateStatus={newDataExpense.institucion_bancaria !== '' ? 'success' : 'error'}
                help={newDataExpense.institucion_bancaria !== '' ? '' : 'Seleccione'}
              >
                {newDataExpense.medio_pago !== 'Efectivo' ?
                  <Select
                    style={{ width: '100%' }}
                    onSelect={(e) => setNewDataExpense({ ...newDataExpense, institucion_bancaria: e.toString() })}
                    value={newDataExpense.institucion_bancaria}
                  >
                    {BANKING_INSTITUTION.map((inst, index) => (
                      <Option key={index} value={inst}>{inst}</Option>
                    ))}
                  </Select> :
                  <Input
                    readOnly
                    value='No Aplica'
                  />
                }
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Inventario'
              >
                <Input
                  readOnly
                  value={newDataExpense.inventario}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Cantidad/Factor'
                validateStatus={newDataExpense.cantidad_factor !== 0 ? 'success' : 'error'}
                help={newDataExpense.cantidad_factor !== 0 ? '' : 'Seleccione'}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  onChange={(e) => handleCalculateTotal(
                    newDataExpense.precio_unitario,
                    parseInt(e.toString()),
                    newDataExpense.impuesto,
                    newDataExpense.exento
                  )}
                  value={newDataExpense.cantidad_factor}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Precio Unitario'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  onChange={(e) => handleCalculateTotal(
                    parseInt(e.toString()),
                    newDataExpense.cantidad_factor,
                    newDataExpense.impuesto,
                    newDataExpense.exento
                  )}
                  value={newDataExpense.precio_unitario}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Monto Neto'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  readOnly
                  value={newDataExpense.monto_neto}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Impuesto'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  maxLength={3}
                  formatter={value => `${value}%`}
                  parser={value => parseInt(value?.replace('%', '') || '0')}
                  onChange={(e) => handleCalculateTotal(
                    newDataExpense.precio_unitario,
                    newDataExpense.cantidad_factor,
                    parseInt(e.toString()),
                    newDataExpense.exento
                  )}
                  defaultValue={DEFAULT_PERCENTAGE_IVA}
                  value={newDataExpense.impuesto}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Exento'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  onChange={(e) => handleCalculateTotal(
                    newDataExpense.precio_unitario,
                    newDataExpense.cantidad_factor,
                    newDataExpense.impuesto,
                    parseInt(e.toString())
                  )}
                  value={newDataExpense.exento}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Total'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  readOnly
                  value={newDataExpense.total}
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
                  rows={6}
                  onChange={(e) => setNewDataExpense({ ...newDataExpense, observaciones: e.currentTarget.value })}
                  value={newDataExpense.observaciones}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label='.'
                getValueFromEvent={getFileUploaded}
                valuePropName="fileData"
                validateStatus={file !== null ? 'success' : 'error'}
                help={file !== null ? '' : 'Seleccione'}
              >
                <Upload.Dragger
                  name="file"
                  customRequest={getFileUploaded}
                  accept='.pdf'
                  maxCount={1}
                  onRemove={() => setFile(null)}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
                  <p className="ant-upload-hint">10mb max.</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    );
  }

  console.log(newDataExpense)
  console.log(file)

  //---------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true);
    getSuppliers();
    getRequests();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (newDataExpense.fecha === '') {
      setNewDataExpense({
        ...newDataExpense,
        impuesto: DEFAULT_PERCENTAGE_IVA,
        fecha: moment().format(FORMAT_DATE),
      })
    }

    if (newDataExpense.categoria_general !== ''
      && newDataExpense.subcategoria_uno !== ''
      && newDataExpense.subcategoria_dos !== ''
      && newDataExpense.rut_proveedor !== ''
      && newDataExpense.medio_pago !== ''
      && newDataExpense.institucion_bancaria !== ''
      && newDataExpense.cantidad_factor !== 0
      && file !== null) {
      setDisabledConfirm(false);
    }
  }, [newDataExpense, file]);

  useEffect(() => {
    if (newDataExpense.medio_pago === 'Efectivo') {
      setNewDataExpense({ ...newDataExpense, institucion_bancaria: 'No Aplica' });
    }
    else {
      setNewDataExpense({ ...newDataExpense, institucion_bancaria: '' });
    }
  }, [newDataExpense.medio_pago]);

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
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
          span={4}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={() => onCloseModal('', '')}
            style={{ backgroundColor: '#E10D17', color: 'white' }}
          >
            Cancelar
            </Button>
          <Button
            onClick={() => handleInsertExpense()}
            disabled={disabledConfirm}
            style={!disabledConfirm ?
              { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
              { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
          >
            Confirmar
            </Button>
        </Col>
      </Row>
    </Spin>
  );
};

export default ExpensesView;
