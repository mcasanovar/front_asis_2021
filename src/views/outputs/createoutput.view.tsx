import React, { useState, useEffect } from 'react';
import { Spin, Form, Collapse, Row, Col, Select, Input, Button, DatePicker, InputNumber } from 'antd';
import { IResponseOutputs, OutputModel } from '../../models/outputs.models';
import { OutputsInitialization } from '../../initializations/output.initializations';
import { CATEGORIES_EXPENSES, FORMAT_DATE } from '../../constants/var';
import { ExpensesModel, IEntries, IResponseExpenses } from '../../models/expenses.models';
import { getExpenseByCategory, insertOutputService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";
import moment, { Moment } from 'moment';
import { parse } from 'node:path';
import { MapOutputToInsert } from '../../functions/mappers';

interface ICreateOutputViewProps {
  onCloseModal: (value: string, message: string) => string | void
}

const CreateOutputView: React.FunctionComponent<ICreateOutputViewProps> = ({
  onCloseModal
}) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { TextArea } = Input;

  const [loading, setLoading] = useState<boolean>(false);
  const [tipLoading, setTipLoading] = useState<string>('');
  const [subcategorythreemessage, setSubcategorythreemessage] = useState<string>('');
  const [cantMessage, setCantMessage] = useState<string>('Seleccione');
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [newDataOutput, setNewDataOutput] = useState<OutputModel>(OutputsInitialization);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [indexsubone, setIndexsubone] = useState<number>(-1);
  const [indexsubtwo, setIndexsubtwo] = useState<number>(-1);
  const [indexsubthree, setIndexsubthree] = useState<number>(-1);
  const [isInventary, setHasInventary] = useState<boolean>(false);
  const [entry, setEntry] = useState<IEntries>();

  const handleSelectedMainCategory = (index: number) => {
    setIndexsubone(index);
    setIndexsubtwo(-1);
    setIndexsubthree(-1);
    setNewDataOutput({
      ...newDataOutput,
      categoria_general: CATEGORIES_EXPENSES[index].categoria_general,
      subcategoria_uno: '',
      subcategoria_dos: '',
      subcategoria_tres: ''
    });
  };

  const handleSelectedSubcagoryOne = (index: number) => {
    setIndexsubtwo(index);
    setIndexsubthree(-1);
    setNewDataOutput({
      ...newDataOutput,
      subcategoria_uno: CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[index].subcategoria_uno,
      subcategoria_dos: '',
      subcategoria_tres: ''
    });
  };

  const handleSelectedSubcagoryTwo = (index: number) => {
    setIndexsubthree(index);
    const aux = CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[indexsubtwo].subcategoria_dos[index];
    setHasInventary(aux.inventario);
    setNewDataOutput({
      ...newDataOutput,
      subcategoria_dos: aux.subcategoria_dos,
      subcategoria_tres: ''
    });
  };

  const handleSelectedSubcategoryThree = async (index: number) => {
    setTipLoading('Validando categoria...');
    setLoading(true);
    const aux: IResponseExpenses = await getExpenseByCategory(
      newDataOutput.categoria_general,
      newDataOutput.subcategoria_uno,
      newDataOutput.subcategoria_dos
    );
    if (aux.err === 98) {
      setSubcategorythreemessage(aux.msg);
      setLoading(false);
      return
    }
    if (aux.err === null) {
      const auxSubcategory = CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[indexsubtwo].subcategoria_dos[indexsubthree].sub_cat_tres[index];
      setNewDataOutput({
        ...newDataOutput,
        subcategoria_tres: auxSubcategory.subcategoria_tres,
        codigo_categoria_tres: auxSubcategory.codigo
      });
      const expense: ExpensesModel = aux.res;
      if (expense.entradas.length === 0) {
        setLoading(false);
        setSubcategorythreemessage('No existen entradas ingresadas');
        return
      }
      const existsEntry = expense.entradas.find((entry: IEntries) => entry.codigo_categoria_tres === auxSubcategory.codigo);
      if (!existsEntry) {
        setSubcategorythreemessage('No se encuentra entradas para esta subcategoria');
        setLoading(false);
        return
      }
      setEntry(existsEntry);
      // setNewDataOutput({
      //   ...newDataOutput,
      //   costo_unitario: existsEntry.costo_unitario
      // });
      setSubcategorythreemessage('');
      setLoading(false);
      return
    }
    if (aux.err !== null && aux.err !== 98) {
      setMessageAlert({ message: aux.err, type: 'error', show: true });
      setLoading(false);
      return
    }
  };

  const handleCalculateTotalCost = (cant: number) => {
    const totalCost = cant * (entry?.costo_unitario || 0);
    const totalEntry = cant * newDataOutput.precio_venta_unitario;
    setNewDataOutput({
      ...newDataOutput,
      cantidad: cant,
      costo_total: totalCost,
      ingreso_total: totalEntry
    });
  };

  const handleCalculateTotalEntry = (price: number) => {
    const totalEntry = price * newDataOutput.cantidad;
    setNewDataOutput({
      ...newDataOutput,
      precio_venta_unitario: price,
      ingreso_total: totalEntry
    });
  };

  const handleInsertOutput = async () => {
    setLoading(true);
    const outputMapped = MapOutputToInsert(newDataOutput, entry);
    const aux : IResponseOutputs = await insertOutputService(outputMapped);
    if(aux.err === null){
      onCloseModal('reload', aux.msg);
    }
    else{
      return setMessageAlert({ message: aux.err, type: 'error', show: true });
    }
  };

  //--------------------------------RENDERS
  const renderGeneralData = () => {
    return (
      <>
        <Row gutter={8}>
          <Col span={4}>
            <Form.Item
              validateStatus={newDataOutput.tipo_salida !== '' ? 'success' : 'error'}
              help={newDataOutput.tipo_salida !== '' ? '' : 'Seleccione'}
              label='Tipo salida'
            >
              <Select
                style={{ width: '100%' }}
                onSelect={(e) => setNewDataOutput({ ...newDataOutput, tipo_salida: e.toString() })}
              >
                <Option value='Uso interno'>Uso interno</Option>
                <Option value='Venta'>Venta</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Nro. Documento'
            >
              <Input
                onChange={(e) => setNewDataOutput({ ...newDataOutput, nro_documento: e.currentTarget.value })}
                value={newDataOutput.nro_documento}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Usuario sistema'
            >
              <Input
                readOnly
                value={newDataOutput.usuario}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              validateStatus={newDataOutput.categoria_general !== '' ? 'success' : 'error'}
              help={newDataOutput.categoria_general !== '' ? '' : 'Seleccione'}
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
              validateStatus={newDataOutput.subcategoria_uno !== '' ? 'success' : 'error'}
              help={newDataOutput.subcategoria_uno !== '' ? '' : 'Seleccione'}
              label='Sub-categoria 1'
            >
              <Select
                style={{ width: '100%' }}
                onSelect={(e) => handleSelectedSubcagoryOne(parseInt(e.toString()))}
                value={newDataOutput.subcategoria_uno}
              >
                {indexsubone >= 0 && CATEGORIES_EXPENSES[indexsubone].subcategoria_uno.map((sub1, index) => (
                  <Option key={index} value={index}>{sub1.subcategoria_uno}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              validateStatus={newDataOutput.subcategoria_dos !== '' ? 'success' : 'error'}
              help={newDataOutput.subcategoria_dos !== '' ? '' : 'Seleccione'}
              label='Sub-categoria 2'
            >
              <Select
                style={{ width: '100%' }}
                onSelect={(e) => handleSelectedSubcagoryTwo(parseInt(e.toString()))}
                value={newDataOutput.subcategoria_dos}
              >
                {indexsubtwo >= 0 && CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[indexsubtwo].subcategoria_dos.map((sub2, index) => (
                  <Option key={index} value={index}>{sub2.subcategoria_dos}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          {isInventary &&
            <Col span={8}>
              <Form.Item
                validateStatus={subcategorythreemessage === '' ? 'success' : 'error'}
                help={subcategorythreemessage === '' ? '' : subcategorythreemessage}
                label='Sub-categoria 3'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => handleSelectedSubcategoryThree(parseInt(e.toString()))}
                  value={`${newDataOutput.codigo} - ${newDataOutput.subcategoria_tres}`}
                >
                  {indexsubthree >= 0 && CATEGORIES_EXPENSES[indexsubone].subcategoria_uno[indexsubtwo].subcategoria_dos[indexsubthree].sub_cat_tres.map((sub3, index) => (
                    <Option key={index} value={index}>{`${sub3.codigo} - ${sub3.subcategoria_tres}`}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          }
          <Col span={4}>
            <Form.Item
              label='Fecha'
            >
              <DatePicker
                format={FORMAT_DATE}
                defaultValue={moment(new Date(), FORMAT_DATE)}
                style={{ width: '100%' }}
                value={newDataOutput.fecha !== '' ? moment(newDataOutput.fecha) : undefined}
                onSelect={(e: Moment) => setNewDataOutput({ ...newDataOutput, fecha: e.format(FORMAT_DATE) })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label='Motivo salida'
            >
              <TextArea
                rows={1}
                maxLength={100}
                onChange={(e) => setNewDataOutput({ ...newDataOutput, motivo_salida: e.currentTarget.value })}
                value={newDataOutput.motivo_salida}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label='Descripción'
            >
              <TextArea
                rows={3}
                onChange={(e) => setNewDataOutput({ ...newDataOutput, descripcion: e.currentTarget.value })}
                value={newDataOutput.descripcion}
              />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const renderMonetaryData = () => {
    return (
      <>
        <Row gutter={8}>
          <Col span={4}>
            <Form.Item
              label='Cantidad'
              validateStatus={(newDataOutput.cantidad <= (entry?.cantidad || 0)) && (newDataOutput.cantidad !== 0) ? 'success' : 'error'}
              help={(newDataOutput.cantidad <= (entry?.cantidad || 0)) && (newDataOutput.cantidad !== 0) ? '' : cantMessage}
            >
              <Input
                type='number'
                onChange={(e) => handleCalculateTotalCost(parseInt(e.currentTarget.value))}
                style={{ width: '100%' }}
                value={newDataOutput.cantidad}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Costo unitario'
              validateStatus={entry?.costo_unitario ? 'success' : 'error'}
              help={entry?.costo_unitario ? '' : 'Seleccione'}
            >
              <InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                defaultValue={entry?.costo_unitario || 0}
                style={{ width: '100%' }}
                readOnly
                value={entry?.costo_unitario}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Costo total'
              validateStatus={newDataOutput.costo_total !== 0 ? 'success' : 'error'}
              help={newDataOutput.costo_total !== 0 ? '' : 'Seleccione'}
            >
              <InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                style={{ width: '100%' }}
                readOnly
                value={newDataOutput.costo_total}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Precio venta unitario'
              validateStatus={newDataOutput.precio_venta_unitario !== 0 ? 'success' : 'error'}
              help={newDataOutput.precio_venta_unitario !== 0 ? '' : 'Seleccione'}
            >
              <InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                style={{ width: '100%' }}
                onChange={(e) => handleCalculateTotalEntry(parseInt(e.toString()))}
                value={newDataOutput.precio_venta_unitario}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Ingreso total'
              validateStatus={newDataOutput.ingreso_total !== 0 ? 'success' : 'error'}
              help={newDataOutput.ingreso_total !== 0 ? '' : 'Seleccione'}
            >
              <InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                style={{ width: '100%' }}
                readOnly
                value={newDataOutput.ingreso_total}
              />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  //-----------------------------USEEFFECT
  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2000);
    }
  }, [messageAlert]);

  useEffect(() => {
    if(newDataOutput.tipo_salida !== ''
      && newDataOutput.categoria_general !== ''
      && newDataOutput.subcategoria_uno !== ''
      && newDataOutput.subcategoria_dos !== ''
      && newDataOutput.subcategoria_tres !== ''
      && newDataOutput.cantidad !== 0
      && entry
      && entry.costo_unitario !== 0
      && newDataOutput.costo_total !== 0
      && newDataOutput.precio_venta_unitario !== 0
      && newDataOutput.ingreso_total !== 0){
        setDisabledConfirm(false)
    };

    if(newDataOutput.cantidad === 0){
      setCantMessage('Seleccione');
    }

    if(entry && newDataOutput.cantidad > entry.cantidad){
      setCantMessage('Cantidad supera lo ingresado : '+entry.cantidad);
    }
    
  }, [newDataOutput.tipo_salida, 
    newDataOutput.categoria_general, 
    newDataOutput.subcategoria_uno,
    newDataOutput.subcategoria_dos,
    newDataOutput.subcategoria_tres,
    newDataOutput.cantidad,
    entry,
    newDataOutput.costo_total,
    newDataOutput.precio_venta_unitario,
    newDataOutput.ingreso_total
  ]);

  return (
    <Spin spinning={loading} size='large' tip={tipLoading}>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      <Form layout='vertical'>
        <Collapse accordion defaultActiveKey={['0']}>
          <Panel header="Datos generales" key="0">
            {renderGeneralData()}
          </Panel>
          <Panel header="Formulario de factura" key="2">
            {renderMonetaryData()}
          </Panel>
        </Collapse>
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
              onClick={() => handleInsertOutput()}
              disabled={disabledConfirm}
              style={!disabledConfirm ?
                { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
            >
              Generar
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default CreateOutputView;
