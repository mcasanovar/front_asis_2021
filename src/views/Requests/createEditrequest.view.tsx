import React, { useState, useEffect } from 'react';
import { Collapse, Input, Row, Col, Select, DatePicker, Spin, Typography, Button, Form, InputNumber, TimePicker } from "antd";
import { IAlertMessageContent } from '../../models/index.models';

import { editRequestService, getGIByRutService, getOneRequestService, getWorkersGIService, insertRequestService } from "../../services/index";

import AlertComponent from "../../component/Alert/Alert";

import { ICategory1, IResponseRequest, RequestModel } from '../../models/request.models';
import { RequestInitialization } from '../../initializations/request.initialization';
import { CATEGORIES_REQUESTS, FORMAT_DATE, SERVICES_TYPE, SERVICES_PLACE, SUCURSAL } from '../../constants/var';
import { capitalize } from '../../libs/capitalize';
import { MilesFormat } from "../../libs/formattedPesos";
import { CalculateIVA } from "../../libs/calculateIVA";

import moment, { Moment } from 'moment';
import { GiModel, IContract, IFaena, IResponseGI } from '../../models/gi.models';
import { SelectValue } from 'antd/lib/select';
import { FormatingRut } from '../../functions/validators/index.validators';
import { MapRequestToInsert } from '../../functions/mappers';

interface ICreateRequestViewProps {
  onCloseModal: (value: string, message: string) => string | void
  type: string,
  _id?: string
}

interface ISelectedCategories {
  level_1: number,
  level_2: number,
  level_3: number
}

const CreateRequestView: React.FunctionComponent<ICreateRequestViewProps> = ({
  onCloseModal,
  type,
  _id = ''
}) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { TextArea, Search } = Input;
  const { Title, Paragraph } = Typography;

  const [loading, setLoading] = useState<boolean>(false);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [disabledCancel, setDisabledCancel] = useState<boolean>(false);
  const [newRequestData, setNewRequestData] = useState<RequestModel>(RequestInitialization);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [selectionsCategories, setSelectionsCategories] = useState<ISelectedCategories>({ level_1: 0, level_2: 0, level_3: 0 });
  const [workers, setWorkers] = useState<GiModel[]>([]);
  const [isRutOk, setIsRutOk] = useState<boolean>(true);
  const [faenasSelected, setFaenasSelected] = useState<IFaena[]>([]);
  const [primaryClient, setPrimaryClient] = useState<GiModel>();
  const [secondaryClient, setSecondaryClient] = useState<GiModel>();

  async function getGIByRut(rut: string, typeRequest: number) {
    setLoading(true);
    const aux: IResponseGI = await getGIByRutService(rut, typeRequest)
    if (aux.err !== null && aux.err !== 98) {
      setMessageAlert({ message: aux.err, type: 'error', show: true });
      setLoading(false);
      return
    }

    if (aux.err === 98) {
      setMessageAlert({ message: 'No se ha encontrado ningun GI', type: 'error', show: true });
      setLoading(false);
      return
    }

    if (type === 'edit') {
      setLoading(false);
      if (typeRequest === 1) {
        setPrimaryClient(aux.res);
      }
      else {
        setSecondaryClient(aux.res);
      }
      return
    };

    if (typeRequest === 1) {
      setNewRequestData({ ...newRequestData, razon_social_CP: aux.res.razon_social, rut_CP: aux.res.rut, id_GI_Principal: aux.res._id });
      setPrimaryClient(aux.res);
    }
    else {
      setNewRequestData({ ...newRequestData, razon_social_cs: aux.res.razon_social, rut_cs: aux.res.rut, id_GI_Secundario: aux.res._id });
      setSecondaryClient(aux.res);
    }

    setLoading(false);
  };

  const handleWorkingDay = (date: string) => {

  };

  const handleSelectRequestDate = (e: Moment) => {
    setNewRequestData({
      ...newRequestData,
      fecha_solicitud: e.format(`${FORMAT_DATE} HH:mm`),
      hora_solicitud: e.format('HH:mm'),
      mes_solicitud: capitalize(e.format('MMMM')),
      anio_solicitud: e.format('YYYY')
    });
  };

  const handleSelectCategoria1 = (id: number) => {
    const aux = CATEGORIES_REQUESTS.find((category) => category.id === id);
    if (!aux) return;
    setSelectionsCategories({ ...selectionsCategories, level_1: id });
    setNewRequestData({ ...newRequestData, categoria1: aux.nivel_1, categoria2: '', categoria3: '', nombre_servicio: '' });
  };

  const handleSelectCategoria2 = (id: number) => {
    const aux = CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2.find((category) => category.id === id);
    if (!aux) return;
    setSelectionsCategories({ ...selectionsCategories, level_2: id });
    setNewRequestData({ ...newRequestData, categoria2: aux.nivel_2, categoria3: '', nombre_servicio: '' });
  };

  const handleSelectCategoria3 = (id: number) => {
    const aux = CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2[selectionsCategories.level_2 - 1].nivel_3.find((category) => category.id === id);
    if (!aux) return;
    setSelectionsCategories({ ...selectionsCategories, level_3: id });
    setNewRequestData({ ...newRequestData, categoria3: aux.nivel_3, nombre_servicio: '' });
  };

  const handleSelectServiceName = (name: string) => {
    const aux = CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2[selectionsCategories.level_2 - 1].nivel_3[selectionsCategories.level_3 - 1].nivel_4.find((category) => category.nivel_4 === name);
    if (!aux) return;
    setNewRequestData({ ...newRequestData, nombre_servicio: aux.nivel_4 });
  };

  const handleFormattedPrices = (price: number, type: string) => {
    setNewRequestData({ ...newRequestData, [type]: price });
  };

  const handleSearchPrimaryClient = (e: string) => {
    const rutFormatted = FormatingRut(e);
    setNewRequestData({ ...newRequestData, rut_CP: rutFormatted });
    getGIByRut(rutFormatted, 1);
  };

  const handleSearchSecondaryClient = (e: string) => {
    const rutFormatted = FormatingRut(e);
    setNewRequestData({ ...newRequestData, rut_cs: rutFormatted });
    getGIByRut(rutFormatted, 2);
  };

  const handleSetContractNumber = (e: string) => {
    setNewRequestData({ ...newRequestData, nro_contrato_seleccionado_cp: e });
    const aux = primaryClient?.contrato_faenas.find((contract: IContract) => contract.nro_contrato === e);
    if (!aux) return
    setFaenasSelected(aux.faenas);
  };

  const handleInsertRequest = async () => {
    setLoading(true);
    let formData = new FormData();
    const requestToInsert = MapRequestToInsert(newRequestData);
    formData.append("data", JSON.stringify(requestToInsert));
    const result: IResponseRequest = await insertRequestService(formData);
    if (result.err === null) {
      onCloseModal('reload', result.msg)
    } else {
      if (result.err === 99 || result.err === 98) {
        setLoading(false)
        return setMessageAlert({ message: result.msg, type: 'error', show: true });
      }
    }
  };

  const handleSaveRequest = async () => {
    setLoading(true);
    let formData = new FormData();
    const requestToInsert = MapRequestToInsert(newRequestData);
    formData.append("data", JSON.stringify(requestToInsert));
    const result: IResponseRequest = await editRequestService(newRequestData._id, formData);
    if (result.err === null) {
      onCloseModal('reload', result.msg)
    } else {
      if (result.err === 98) return setMessageAlert({ message: result.res, type: 'error', show: true });
      return setMessageAlert({ message: result.err, type: 'error', show: true });
    }
  };

  async function getOneRequest() {
    const aux: IResponseGI = await getOneRequestService(_id);
    if (aux.err !== null) {
      setMessageAlert({ message: aux.err, type: 'error', show: true });
      return
    }
    const request: RequestModel = aux.res;
    setNewRequestData({ ...request, observacion_solicitud: '' });

    getGIByRut(request.rut_CP, 1);
    getGIByRut(request.rut_cs, 2);
  };

  async function getWorkers() {
    const aux: IResponseGI = await getWorkersGIService();
    aux.err === null && setWorkers(aux.res || [])
    return
  }

  //----------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true)

    getWorkers();
    type === 'edit' && getOneRequest();
    setLoading(false)
  }, []);

  useEffect(() => {
    if (type === 'edit' && primaryClient) {
      handleSetContractNumber(newRequestData.nro_contrato_seleccionado_cp || '');
    }
  }, [type, primaryClient]);

  useEffect(() => {
    // setNewRequestData({ ...newRequestData, fecha_system: moment().format(FORMAT_DATE), hora_system: moment().format('HH:mm') });
    handleSelectRequestDate(moment());
    if (workers && workers.length > 0) return setLoading(false);
  }, [workers]);

  useEffect(() => {
    if (newRequestData.tipo_servicio === 'Online') {
      setNewRequestData({ ...newRequestData, lugar_servicio: 'No Aplica', sucursal: 'Fuera de oficina' });
    };
    if (newRequestData.tipo_servicio === 'Presencial') {
      setNewRequestData({ ...newRequestData, lugar_servicio: '', sucursal: '' });
    };
  }, [newRequestData.tipo_servicio]);

  useEffect(() => {
    if (newRequestData.lugar_servicio === 'Terreno') {
      setNewRequestData({ ...newRequestData, sucursal: 'Fuera de oficina' });
    };
    if (newRequestData.lugar_servicio === 'Oficina') {
      setNewRequestData({ ...newRequestData, sucursal: '' });
    };
  }, [newRequestData.lugar_servicio]);

  useEffect(() => {
    const aux = CalculateIVA(newRequestData.monto_neto, newRequestData.porcentaje_impuesto);
    const total = newRequestData.monto_neto + aux + newRequestData.exento;
    setNewRequestData({ ...newRequestData, valor_impuesto: aux, monto_total: total });
    // eslint-disable-next-line
  }, [newRequestData.monto_neto, newRequestData.porcentaje_impuesto, newRequestData.exento]);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 3000);
    }
  }, [messageAlert]);

  useEffect(() => {
    if(newRequestData.hora_servicio_solicitado !== ''){
      const arrayHour = newRequestData.hora_servicio_solicitado.split(':');
      if((parseInt(arrayHour[0]) >= 6 && parseInt(arrayHour[0]) < 20) || (parseInt(arrayHour[0]) === 20 && parseInt(arrayHour[1]) === 0)){
        setNewRequestData({...newRequestData, jornada: 'Diurna'});
        return
      }
      setNewRequestData({...newRequestData, jornada: 'Vespertina'});
      return
    }
  }, [newRequestData.hora_servicio_solicitado]);

  useEffect(() => {
    if (newRequestData.nombre_servicio !== ''
      && newRequestData.id_GI_PersonalAsignado !== ''
      && newRequestData.id_GI_Principal
      && newRequestData.id_GI_Secundario !== ''
      && newRequestData.nro_contrato_seleccionado_cp !== ''
      && newRequestData.faena_seleccionada_cp !== '') {

      setDisabledConfirm(false)
    }
    // eslint-disable-next-line
  }, [newRequestData.nombre_servicio,
  newRequestData.id_GI_PersonalAsignado,
  newRequestData.id_GI_Principal,
  newRequestData.id_GI_Secundario,
  newRequestData.nro_contrato_seleccionado_cp,
  newRequestData.faena_seleccionada_cp
  ]);


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
                  format={`${FORMAT_DATE} HH:mm`}
                  style={{ width: '100%' }}
                  value={newRequestData.fecha_solicitud !== '' ? moment(newRequestData.fecha_solicitud) : undefined}
                  onSelect={(e: Moment) => handleSelectRequestDate(e)}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
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
                label='A??o solicitud'
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
                  onSelect={(e) => handleSelectCategoria1(parseInt(e.toString()))}
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
                  onSelect={(e) => handleSelectCategoria2(parseInt(e.toString()))}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={newRequestData.categoria2}
                >
                  {selectionsCategories.level_1 > 0
                    && CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2.map((category, index) => (
                      <Option key={index} value={category.id}>{category.nivel_2}</Option>
                    ))}
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
                  onSelect={(e) => handleSelectCategoria3(parseInt(e.toString()))}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={newRequestData.categoria3}
                >
                  {selectionsCategories.level_2 > 0
                    && CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2[selectionsCategories.level_2 - 1].nivel_3.map((category, index) => (
                      <Option key={index} value={category.id}>{category.nivel_3}</Option>
                    ))}
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
                  onSelect={(e) => handleSelectServiceName(e.toString())}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={newRequestData.nombre_servicio}
                >
                  {selectionsCategories.level_3 > 0
                    && CATEGORIES_REQUESTS[selectionsCategories.level_1 - 1].nivel_2[selectionsCategories.level_2 - 1].nivel_3[selectionsCategories.level_3 - 1].nivel_4.map((category, index) => (
                      <Option key={index} value={category.nivel_4}>{category.nivel_4}</Option>
                    ))}
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
                  {SERVICES_TYPE.map((service, index) => (
                    <Option key={index} value={service}>{service}</Option>
                  ))}
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
                  {newRequestData.tipo_servicio === 'Presencial' ?
                    SERVICES_PLACE.map((service, index) => (
                      <Option key={index} value={service}>{service}</Option>
                    )) :
                    <Option value='No Aplica'>No Aplica</Option>
                  }
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
                  {newRequestData.lugar_servicio === 'Oficina' ?
                    SUCURSAL.map((sucursal, index) => (
                      <Option key={index} value={sucursal}>{sucursal}</Option>
                    )) :
                    <Option value='Fuera de oficina'>Fuera de oficina</Option>
                  }
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
                  onChange={(value) => handleFormattedPrices(parseInt(value.toString()), 'monto_neto')}
                  value={newRequestData.monto_neto}
                />
                <Paragraph>{`$${MilesFormat(newRequestData.monto_neto)}.-`}</Paragraph>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Porcentaje impuesto'
              >
                <InputNumber
                  defaultValue={19}
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
                  onChange={(value) => handleFormattedPrices(parseInt(value.toString()), 'valor_impuesto')}
                  value={newRequestData.valor_impuesto}
                  readOnly
                />
                <Paragraph>{`$${MilesFormat(newRequestData.valor_impuesto)}.-`}</Paragraph>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Exento'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  type='number'
                  onChange={(value) => handleFormattedPrices(parseInt(value.toString()), 'exento')}
                  value={newRequestData.exento}
                />
                <Paragraph>{`$${MilesFormat(newRequestData.exento)}.-`}</Paragraph>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Monto total'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  type='number'
                  onChange={(value) => handleFormattedPrices(parseInt(value.toString()), 'monto_total')}
                  value={newRequestData.monto_total}
                  readOnly
                />
                <Paragraph>{`$${MilesFormat(newRequestData.monto_total)}.-`}</Paragraph>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label='Descripci??n del servicio'
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

  const renderClientInformation = () => {
    return (
      <Input.Group>
        <Form layout='vertical'>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label='Nombre receptor'
              >
                <Input
                  readOnly
                  value={newRequestData.nombre_receptor}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateStatus={newRequestData.id_GI_PersonalAsignado !== '' ? 'success' : 'error'}
                help={newRequestData.id_GI_PersonalAsignado !== '' ? '' : 'Debe seleccionar un profesional asignado'}
                label='Profesional asignado'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e: SelectValue) => setNewRequestData({ ...newRequestData, id_GI_PersonalAsignado: e.toString() })}
                  id='error'
                  value={newRequestData.id_GI_PersonalAsignado}
                >
                  {workers.length > 0 && workers.map((worker, index) => (
                    <Option key={index} value={worker._id}>{worker.razon_social}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <h2>Cliente principal</h2>
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={4}>
              <Form.Item
                validateStatus={isRutOk ? 'success' : 'error'}
                help={isRutOk ? '' : 'Formato de rut incorrecto'}
                label='Rut'
              >
                <Search
                  aria-label='Rut'
                  placeholder="Rut"
                  name='rut'
                  allowClear
                  enterButton
                  onChange={(e) => setNewRequestData({ ...newRequestData, rut_CP: e.currentTarget.value })}
                  onSearch={(e) => handleSearchPrimaryClient(e.toString())}
                  value={newRequestData.rut_CP}
                  id='error'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Razon social'
              >
                <Input
                  readOnly
                  value={newRequestData.razon_social_CP || ''}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Nombre fantasia / Pseud??nimo'
              >
                <Input
                  readOnly
                  value={primaryClient?.nombre_fantasia || ''}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                validateStatus={newRequestData.nro_contrato_seleccionado_cp !== '' ? 'success' : 'error'}
                help={newRequestData.nro_contrato_seleccionado_cp !== '' ? '' : 'Formato de rut incorrecto'}
                label='Contrato'
              >
                <Select
                  style={{ width: '100%' }}
                  onChange={(e) => handleSetContractNumber(e.toString())}
                  value={newRequestData.nro_contrato_seleccionado_cp}
                  id='error'
                >
                  {primaryClient?.contrato_faenas && primaryClient.contrato_faenas.map((contract) => (
                    <Option value={contract.nro_contrato}>{contract.nro_contrato}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                validateStatus={newRequestData.faena_seleccionada_cp !== '' ? 'success' : 'error'}
                help={newRequestData.faena_seleccionada_cp !== '' ? '' : 'Formato de rut incorrecto'}
                label='Seleccione faena'
              >
                <Select
                  style={{ width: '100%' }}
                  onChange={(e) => setNewRequestData({ ...newRequestData, faena_seleccionada_cp: e.toString() })}
                  value={newRequestData.faena_seleccionada_cp}
                >
                  {faenasSelected && faenasSelected.length > 0 && faenasSelected.map((faena, index) => (
                    <Option key={index} value={faena.name}>{faena.name}</Option>
                  ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <h2>Cliente Secundario</h2>
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={4}>
              <Form.Item
                validateStatus={isRutOk ? 'success' : 'error'}
                help={isRutOk ? '' : 'Formato de rut incorrecto'}
                label='Rut'
              >
                <Search
                  aria-label='Rut'
                  placeholder="Rut"
                  name='rut'
                  allowClear
                  enterButton
                  onChange={(e) => setNewRequestData({ ...newRequestData, rut_cs: e.currentTarget.value })}
                  onSearch={(e) => handleSearchSecondaryClient(e.toString())}
                  value={newRequestData.rut_cs}
                  id='error'
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Razon social'
              >
                <Input
                  readOnly
                  value={newRequestData.razon_social_cs || ''}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Nombre fantasia / Pseud??nimo'
              >
                <Input
                  readOnly
                  value={secondaryClient?.nombre_fantasia || ''}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Licencia de conducir'
              >
                <Input
                  readOnly
                  value={secondaryClient?.licencia_conduccion || ''}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Clase licencia conducir'
              >
                <Select
                  mode='multiple'
                  disabled
                  value={secondaryClient?.clase_licencia || ''}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Ley aplicable'
              >
                <Input
                  readOnly
                  value={secondaryClient?.ley_aplicable}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Input.Group>
    );
  };

  const renderPreliminaryInformation = () => {
    return (
      <Input.Group>
        <Form layout='vertical'>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Fecha inicio reserva preliminar'
              >
                <DatePicker
                  format={FORMAT_DATE}
                  style={{ width: '100%' }}
                  onSelect={(e: Moment) => setNewRequestData({ ...newRequestData, fecha_servicio_solicitado: e.format(FORMAT_DATE) })}
                  value={newRequestData.fecha_servicio_solicitado !== '' ? moment(newRequestData.fecha_servicio_solicitado) : undefined}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Hora inicio reserva preliminar'
              >
                <TimePicker
                  style={{ width: '100%' }}
                  format="HH:mm"
                  onChange={(e) => setNewRequestData({ ...newRequestData, hora_servicio_solicitado: e?.format('HH:mm') || '' })}
                  value={newRequestData.hora_servicio_solicitado !== '' ? moment(`${newRequestData.fecha_servicio_solicitado} ${newRequestData.hora_servicio_solicitado}`) : undefined}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Fecha t??rmino reserva preliminar'
              >
                <DatePicker
                  format={FORMAT_DATE}
                  style={{ width: '100%' }}
                  onSelect={(e: Moment) => setNewRequestData({ ...newRequestData, fecha_servicio_solicitado_termino: e.format(FORMAT_DATE) })}
                  value={newRequestData.fecha_servicio_solicitado_termino !== '' ? moment(newRequestData.fecha_servicio_solicitado_termino) : undefined}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Hora t??rmino reserva preliminar'
              >
                <TimePicker
                  style={{ width: '100%' }}
                  format="HH:mm"
                  onChange={(e) => setNewRequestData({ ...newRequestData, hora_servicio_solicitado_termino: e?.format('HH:mm') || '' })}
                  value={newRequestData.hora_servicio_solicitado_termino !== '' ? moment(`${newRequestData.fecha_servicio_solicitado_termino} ${newRequestData.hora_servicio_solicitado_termino}`) : undefined}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item
                label='Jornada'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e: SelectValue) => setNewRequestData({ ...newRequestData, jornada: e.toString() })}
                  value={newRequestData.jornada}
                >
                  <Option value='Diurna'>Diurna</Option>
                  <Option value='Vespertina'>Vespertina</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label='Observacion solicitud'
              >
                <TextArea
                  rows={3}
                  onChange={(e) => setNewRequestData({ ...newRequestData, observacion_solicitud: e.currentTarget.value })}
                  value={newRequestData.observacion_solicitud}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <br />
          <Row>
            <Col span={12}>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
                <p className="ant-upload-hint">10mb max.</p>
              </Upload.Dragger>
            </Col>
          </Row> */}
        </Form>
      </Input.Group>
    );
  };

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {type === 'edit' && <Title level={4}>{`Solicitud ${newRequestData.codigo}`}</Title>}
      <Collapse accordion defaultActiveKey={['1']}>
        <Panel header="Datos del servicio" key="1">
          {renderServiceInformation()}
        </Panel>
        <Panel header="Datos del cliente" key="2">
          {renderClientInformation()}
        </Panel>
        <Panel header="Datos Preliminares" key="3">
          {renderPreliminaryInformation()}
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
            disabled={disabledCancel}
            style={!disabledCancel ? {
              backgroundColor: '#E10D17', color: 'white'
            } : { backgroundColor: 'grey', color: 'white' }}
          >
            Cancelar
            </Button>
          {type === 'insert' ?
            <Button
              onClick={() => handleInsertRequest()}
              disabled={disabledConfirm}
              style={!disabledConfirm ?
                { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
            >
              Confirmar
            </Button> :
            <Button
              onClick={() => handleSaveRequest()}
              disabled={disabledConfirm}
              style={!disabledConfirm ?
                { backgroundColor: 'orange', borderColor: 'orange', color: 'white' } :
                { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
            >
              Guardar
              </Button>
          }
        </Col>
      </Row>
    </Spin>
  );
};

export default CreateRequestView;
