import { FunctionComponent, FormEvent, useState, useEffect } from 'react';
import moment, { Moment } from 'moment';

import { Collapse, Input, Row, Col, Select, DatePicker, Form, Spin, Button, Table, Tag, Typography, Upload } from "antd";
import { PhoneOutlined, MailOutlined, DeleteOutlined, EditOutlined, InboxOutlined } from '@ant-design/icons';
import { SelectValue } from 'antd/lib/select';
import { GiModel, IContract, IFaena, IResponseGI } from '../../models/gi.models';
import { GiInitializationData } from '../../initializations/gi.initialization';
import { IAlertMessageContent, ICountries } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

import {
  ACTIVITY_DATA,
  API_COUNTRIES,
  BLOOD_GROUP,
  CIVIL_STATE,
  CLIENT_CATEGORY,
  CLIENT_TYPE,
  COMMUNE_PROVINCE_REGION,
  COMPANY_CATEGORY,
  DRIVER_LICENSE,
  EDUCATION_LEVEL,
  FORMAT_DATE,
  INTEREST_GROUP,
  PROFESSIONS
} from "../../constants/var";

import { FormatingRut, validateEmail, ValidateRut } from '../../functions/validators/index.validators';
import { httpExternalApi, getCompanyGIService, insertGIService, getOneGIService, editOneGIService } from "../../services";
import { MapGIToInsert } from '../../functions/mappers';

interface ICreateGiViewProps {
  onCloseModal: (value: string, message: string) => string | void
  type: string,
  _id?: string
}

const CreateGiView: FunctionComponent<ICreateGiViewProps> = ({
  onCloseModal,
  type,
  _id = ''
}) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { Column } = Table;
  const { Title } = Typography;

  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [disabledCancel, setDisabledCancel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [newGiData, setNewGiData] = useState<GiModel>(GiInitializationData);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [isRutOk, setIsRutOk] = useState<boolean>(true);
  const [isPrimaryEmailOk, setIsPrimaryEmailOk] = useState<boolean>(true);
  const [isSecondaryEmailOk, setIsSecondaryEmailOk] = useState<boolean>(true);
  const [countries, setCountries] = useState<ICountries[]>([]);
  const [organizationsBelonging, setOrganizationsBelonging] = useState<GiModel[]>([]);
  const [organizationBelongingSelected, setOrganizationBelongingSelected] = useState<GiModel>(GiInitializationData);
  const [contractoNumberToAdd, setContractoNumberToAdd] = useState<string>('');
  const [faenasToAdd, setFaenasToAdd] = useState<IFaena[]>([]);
  const [faenasSelected, setFaenasSelected] = useState<IFaena[]>([]);
  const [isEditContract, setIsEditContract] = useState<boolean>(false);
  const [indexContractToEdit, setIndexContractToEdit] = useState<number>(0);
  const [file, setFile] = useState<string | Blob | null>(null);

  const getFileUploaded = (e: any) => {
    e && setFile(e.file)
    e.onSuccess('ok');
  };

  const handleSetDataNewGI = (e: FormEvent<HTMLInputElement>) => {
    setNewGiData({
      ...newGiData,
      [e.currentTarget.name]: e.currentTarget.value
    });
    if (e.currentTarget.name === 'rut') {
      setNewGiData({
        ...newGiData,
        rut: FormatingRut(e.currentTarget.value)
      });
    }
  };

  const handlePrimaryActivity = (e: SelectValue) => {
    const aux = ACTIVITY_DATA.find((activity) => activity.codigo === e);
    if (!aux) return;
    //verificar que no se repitan las actividades
    if (newGiData.actividad_secundaria.codigo === e) {
      setMessageAlert({ message: 'No puede seleccionar la misma actividad primaria y secundaria', type: 'error', show: true });
    }
    setNewGiData({
      ...newGiData,
      actividad_principal: {
        ...aux
      },
      rubro_principal: aux.rubro || 'Sin información'
    });
  };

  const handleSecondaryActivity = (e: SelectValue) => {
    const aux = ACTIVITY_DATA.find((activity) => activity.codigo === e);
    if (!aux) return;
    //verificar que no se repitan las actividades
    if (newGiData.actividad_principal.codigo === e) {
      setMessageAlert({ message: 'No puede seleccionar la misma actividad primaria y secundaria', type: 'error', show: true });
      return
    }
    setNewGiData({
      ...newGiData,
      actividad_secundaria: {
        ...aux
      },
      rubro_secundario: aux.rubro || 'Sin información'
    });
  };

  const handleSetBirthDate = (e: Moment) => {
    const age = moment().diff(e, 'years', false)
    setNewGiData({ ...newGiData, fecha_inic_mac: e.format(FORMAT_DATE), edad_gi: age });
  };

  const handleValidateRut = (e: FormEvent<HTMLInputElement>) => {
    setIsRutOk(ValidateRut(e.currentTarget.value));
  };

  const handleValidateEmail = (e: FormEvent<HTMLInputElement>, type: string) => {
    if (type === 'primary') {
      setIsPrimaryEmailOk(validateEmail(e.currentTarget.value));
      setNewGiData({ ...newGiData, email_central: e.currentTarget.value })
      return;
    }
    setIsSecondaryEmailOk(validateEmail(e.currentTarget.value));
    setNewGiData({ ...newGiData, email_encargado: e.currentTarget.value })
  };

  const handleSetCommune = (e: SelectValue) => {
    const aux = COMMUNE_PROVINCE_REGION.find((item) => item.comuna === e);
    if (!aux) return;
    setNewGiData({ ...newGiData, comuna: e.toString(), provincia: aux.provincia, region: aux.region });
  };

  const handleSelectOrgBeloging = (id: string) => {
    const aux = organizationsBelonging.find((org) => org._id === id);
    if (!aux) return
    setNewGiData({
      ...newGiData,
      id_GI_org_perteneciente: aux._id || '',
      razon_social_org_perteneciente: aux.razon_social,
      contrato_faenas: [],
      nro_contrato: '',
      faena: ''
    });
    setOrganizationBelongingSelected(aux);
    setFaenasSelected([]);
  };

  const handleFaenasToAdd = (e: any) => {
    const aux: IFaena[] = e.map((faena: string) => { return { name: faena.toString() } });
    setFaenasToAdd(aux)
  };

  const handleAddContractFaenas = () => {
    if (contractoNumberToAdd === '' || faenasToAdd.length === 0) return
    const aux: IContract = { nro_contrato: contractoNumberToAdd, faenas: faenasToAdd }
    setNewGiData({ ...newGiData, contrato_faenas: [...newGiData.contrato_faenas, ...[aux]] });
    setContractoNumberToAdd('');
    setFaenasToAdd([]);
  };

  const handleEditContractFaena = (record: IContract, index: number) => {
    setContractoNumberToAdd(record.nro_contrato);
    setFaenasToAdd(record.faenas);
    setIndexContractToEdit(index);
    setIsEditContract(true)
  };

  const editContractFaenas = () => {
    const indexPosition = indexContractToEdit;
    const aux: IContract[] = newGiData.contrato_faenas.map((contract, index) => {
      if (index === indexPosition) {
        return {
          nro_contrato: contractoNumberToAdd,
          faenas: faenasToAdd
        }
      }
      else {
        return contract
      }
    });

    setNewGiData({ ...newGiData, contrato_faenas: aux });
    cancelEditContractFaenas();
  };

  const cancelEditContractFaenas = () => {
    setContractoNumberToAdd('');
    setFaenasToAdd([]);
    setIsEditContract(false);
  };

  const handleDeleteContractFaena = (index: number) => {
    const indexPosition = index;
    const aux: IContract[] = newGiData.contrato_faenas.filter((_, index) => index !== indexPosition)
    setNewGiData({ ...newGiData, contrato_faenas: aux });
  };

  const handleCalculateLicenseState = (e: Moment) => {
    // setNewGiData({ ...newGiData, fecha_venc_licencia: e.format(FORMAT_DATE) });
    const firstDate = moment(new Date());
    const secondDate = e;
    const aux = secondDate.diff(firstDate, 'days');
    setNewGiData({ ...newGiData, fecha_venc_licencia: e.format(FORMAT_DATE), estado_licencia: aux + 1 <= 0 ? 'No Vigente' : 'Vigente' });
  };

  const handleSetContractNumber = (e: SelectValue) => {
    setNewGiData({ ...newGiData, nro_contrato: e.toString() });
    const aux = organizationBelongingSelected.contrato_faenas.find((contract: IContract) => contract.nro_contrato === e);
    if (!aux) return
    setFaenasSelected(aux.faenas);
  };

  const handleInsertGI = async () => {
    setLoading(true);
    let formData = new FormData();
    const giToInsert = MapGIToInsert(newGiData)
    formData.append("data", JSON.stringify(giToInsert));
    file !== null && formData.append("archivo", file);
    const result: IResponseGI = await insertGIService(formData);
    if (result.err === null) {
      onCloseModal('reload', result.res)
    } else {
      if (result.err === 99)
        setLoading(false)
      return setMessageAlert({ message: result.res, type: 'error', show: true });
    }
  };

  const handleSaveGI = async () => {
    setLoading(true);
    let formData = new FormData();
    const giToEdit = MapGIToInsert(newGiData);
    formData.append("data", JSON.stringify(giToEdit));
    file !== null && formData.append("archivo", file);
    const result: IResponseGI = await editOneGIService(newGiData._id, formData);
    if (result.err === null) {
      onCloseModal('reload', result.res)
    } else {
      if (result.err === 98) return setMessageAlert({ message: result.res, type: 'error', show: true });
      return setMessageAlert({ message: result.err, type: 'error', show: true });
    }
  };

  async function getCountries() {
    const aux = await httpExternalApi(API_COUNTRIES);
    setCountries(aux.response);
  }

  async function getOrganizationBelonging() {
    const aux: IResponseGI = await getCompanyGIService();
    setOrganizationsBelonging(aux.res || []);
    type === 'insert' && setLoading(false);
    // setLoading(false)
  }

  async function getOneGI() {
    const aux: IResponseGI = await getOneGIService(_id);
    if (aux.err !== null) {
      setMessageAlert({ message: aux.err, type: 'error', show: true });
      return
    }
    const gi: GiModel = aux.res;
    const selected = organizationsBelonging.find((org) => org._id === gi.id_GI_org_perteneciente);
    setOrganizationBelongingSelected(selected || GiInitializationData);
    setNewGiData(gi);
    setLoading(false);
  }

  //------------------------ USEEFECT
  useEffect(() => {
    if (!!organizationBelongingSelected && !!newGiData.nro_contrato && type === 'edit') {
      const aux = organizationBelongingSelected.contrato_faenas.find((contract: IContract) => contract.nro_contrato === newGiData.nro_contrato);
      if (!aux) return
      setFaenasSelected(aux.faenas);
    }
  }, [organizationBelongingSelected, newGiData.nro_contrato])

  useEffect(() => {
    if (!!organizationsBelonging && !!organizationsBelonging.length && type === 'edit') {
      getOneGI();
    }
  }, [organizationsBelonging])

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 3000);
    }
  }, [messageAlert]);

  useEffect(() => {
    if (newGiData.categoria === 'Empresa/Organizacion') {
      setNewGiData({ ...newGiData, categoria_empresa: newGiData.categoria_empresa, nacionalidad: 'No Aplica' });
    }
    if (newGiData.categoria === 'Persona Natural') {
      setNewGiData({ ...newGiData, categoria_empresa: 'No Aplica', nacionalidad: 'Chilena' });
    }
    // eslint-disable-next-line
  }, [newGiData.categoria]);

  useEffect(() => {
    if (newGiData.grupo_interes === 'Empleados') return setNewGiData({ ...newGiData, categoria_cliente: 'No Aplica' });
    return setNewGiData({ ...newGiData, categoria_cliente: newGiData.categoria_cliente || 'Ocacional' });
  }, [newGiData.grupo_interes]);

  useEffect(() => {
    if (newGiData.credito === 'No') return setNewGiData({ ...newGiData, dias_credito: 0 });
  }, [newGiData.credito]);

  useEffect(() => {
    if (newGiData.rut !== ''
      && isRutOk
      && isPrimaryEmailOk
      && newGiData.categoria !== ''
      && newGiData.categoria_empresa !== ''
      && newGiData.categoria_cliente !== '') {

      if (newGiData.categoria === 'Persona Natural') {
        if (newGiData.id_GI_org_perteneciente !== '' && newGiData.razon_social_org_perteneciente !== '') return setDisabledConfirm(false)
        return setDisabledConfirm(true)
      } else {
        setDisabledConfirm(false)
        return
      }
    }
    // eslint-disable-next-line
  }, [newGiData.categoria_empresa, newGiData.categoria_cliente, isRutOk, isPrimaryEmailOk]);

  useEffect(() => {
    setLoading(true);
    getCountries();
    getOrganizationBelonging();
    // type === 'edit' && getOneGI();
    // eslint-disable-next-line
  }, []);

  console.log(organizationBelongingSelected);

  //---------RENDERS
  const renderTributaryInformation = () => {
    return (
      <Input.Group>
        <Form layout='vertical'>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                validateStatus={isRutOk ? 'success' : 'error'}
                help={isRutOk ? '' : 'Formato de rut incorrecto'}
                label='Rut'
              >
                <Input
                  aria-label='Rut'
                  placeholder="Rut"
                  name='rut'
                  onChange={(e) => handleSetDataNewGI(e)}
                  value={newGiData.rut}
                  onBlur={(e) => handleValidateRut(e)}
                  id='error'
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label='Razon social'
              >
                <Input
                  name='razon_social'
                  placeholder="Razon Social / Nombre"
                  onChange={(e) => handleSetDataNewGI(e)}
                  value={newGiData.razon_social}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Nombre fantasia'
              >
                <Input
                  name='nombre_fantasia'
                  placeholder="Nombre fantasía / Pseudónimo"
                  onChange={(e) => handleSetDataNewGI(e)}
                  value={newGiData.nombre_fantasia}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label='Actividad principal'
              >
                <Select
                  placeholder='Actividad Principal'
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => handlePrimaryActivity(e)}
                  value={newGiData.actividad_principal.actividad}
                >
                  {ACTIVITY_DATA.map((activity, index) => (
                    <Option key={index} value={activity.codigo}>{`${activity.codigo} - ${activity.actividad}`}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Rubro principal'
              >
                <Input
                  readOnly
                  value={newGiData.rubro_principal}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label='Actividad secundaria'
              >
                <Select
                  placeholder='Actividad secundaria'
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => handleSecondaryActivity(e)}
                  value={newGiData.actividad_secundaria.actividad}
                >
                  {ACTIVITY_DATA.map((activity, index) => (
                    <Option key={index} value={activity.codigo}>{`${activity.codigo} - ${activity.actividad}`}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Rubro secundario'
              >
                <Input
                  readOnly
                  value={newGiData.rubro_secundario}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Grupo interes'
              >
                <Select
                  placeholder='Grupo Interes'
                  style={{ width: '100%' }}
                  onChange={(e) => setNewGiData({ ...newGiData, grupo_interes: e.toString() })}
                  value={newGiData.grupo_interes}
                >
                  {INTEREST_GROUP.map((group, index) => (
                    <Option key={index} value={group}>{group}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Tipo cliente'
              >
                <Select
                  placeholder='Tipo Cliente'
                  style={{ width: '100%' }}
                  onChange={(e) => setNewGiData({ ...newGiData, categoria: e.toString() })}
                  value={newGiData.categoria}
                >
                  {CLIENT_TYPE.map((client, index) => (
                    <Option key={index} value={client}>{client}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Categoria empresa'
              >
                {(newGiData.categoria === 'Empresa/Organizacion' || newGiData.categoria === '') &&
                  <Select
                    placeholder='Categoria Empresa'
                    style={{ width: '100%' }}
                    onChange={(e) => setNewGiData({ ...newGiData, categoria_empresa: e.toString() })}
                    value={newGiData.categoria_empresa}
                  >
                    {COMPANY_CATEGORY.map((category, index) => (
                      <Option key={index} value={category}>{category}</Option>
                    ))}
                  </Select>
                }
                {newGiData.categoria === 'Persona Natural' && <Input
                  placeholder="Categoria Empresa"
                  readOnly
                  value='No Aplica'
                />}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Categoria cliente'
              >
                {newGiData.grupo_interes === 'Empleados' ? <Input
                  placeholder="Categoria Cliente"
                  readOnly
                  value='No Aplica'
                /> :
                  <Select
                    placeholder='Categoria Cliente'
                    style={{ width: '100%' }}
                    onChange={(e) => setNewGiData({ ...newGiData, categoria_cliente: e.toString() })}
                    value={newGiData.categoria_cliente}
                  >
                    {CLIENT_CATEGORY.map((client, index) => (
                      <Option key={index} value={client}>{client}</Option>
                    ))}
                  </Select>
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Fecha inicio / nacimiento'
              >
                <DatePicker
                  onSelect={(e) => handleSetBirthDate(e)}
                  format={FORMAT_DATE}
                  style={{ width: '100%' }}
                  value={newGiData.fecha_inic_mac !== '' ? moment(newGiData.fecha_inic_mac, FORMAT_DATE) : undefined}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Edad'
              >
                <Input
                  placeholder="Edad"
                  onChange={(e) => handleSetDataNewGI(e)}
                  readOnly
                  value={newGiData.edad_gi}
                />
              </Form.Item>
            </Col>
            {newGiData.categoria === 'Empresa/Organizacion' &&
              <>
                <Col span={6}>
                  <Form.Item
                    label='Crédito'
                  >
                    <Select
                      placeholder='Crédito'
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, credito: e.toString() })}
                      value={newGiData.credito}
                    >
                      <Option value="Si">Si</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {newGiData.credito === 'Si' &&
                  <Col span={6}>
                    <Form.Item
                      label='Dias crédito'
                    >
                      <Input
                        placeholder="Dias crédito"
                        type='number'
                        onChange={(e) => setNewGiData({ ...newGiData, dias_credito: parseInt(e.currentTarget.value) })}
                        value={newGiData.dias_credito}
                      />
                    </Form.Item>
                  </Col>
                }
              </>
            }
          </Row>
          {newGiData.categoria === 'Empresa/Organizacion' &&
            <>
              <Row gutter={8}>
                <Col span={6}>
                  <Form.Item
                    label='Orden de compra'
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, orden_compra: e.toString() })}
                      value={newGiData.orden_compra}
                    >
                      <Option value="Si">Si</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='Rol'
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, rol: e.toString() })}
                      value={newGiData.rol}
                    >
                      {INTEREST_GROUP.map((group, index) => (
                        <Option key={index} value={group}>{group}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          }
        </Form>
      </Input.Group>
    );
  };

  const renderContactInformaction = () => {
    return (
      <Input.Group>
        <Form layout='vertical'>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Contacto primario'
              >
                <Input
                  size="large"
                  placeholder="Contacto primario"
                  type='number'
                  onChange={(e) => setNewGiData({ ...newGiData, contacto: parseInt(e.currentTarget.value) })}
                  value={newGiData.contacto}
                  prefix={<PhoneOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Contacto secundario'
              >
                <Input
                  size="large"
                  placeholder="Contacto secundario"
                  type='number'
                  onChange={(e) => setNewGiData({ ...newGiData, contacto_2: parseInt(e.currentTarget.value) })}
                  value={newGiData.contacto_2}
                  prefix={<PhoneOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                validateStatus={isPrimaryEmailOk ? 'success' : 'error'}
                help={isPrimaryEmailOk ? '' : 'Formato de email incorrecto'}
                label='Email primario'
              >
                <Input
                  size="large"
                  placeholder="Email primario"
                  type='email'
                  onBlur={(e) => handleValidateEmail(e, 'primary')}
                  prefix={<MailOutlined />}
                  onChange={(e) => setNewGiData({ ...newGiData, email_central: e.currentTarget.value })}
                  value={newGiData.email_central}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                validateStatus={isSecondaryEmailOk ? 'success' : 'error'}
                help={isSecondaryEmailOk ? '' : 'Formato de email incorrecto'}
                label='Email secundario'
              >
                <Input
                  size="large"
                  placeholder="Email secundario"
                  type='email'
                  onBlur={(e) => handleValidateEmail(e, 'secondary')}
                  onChange={(e) => setNewGiData({ ...newGiData, email_encargado: e.currentTarget.value })}
                  prefix={<MailOutlined />}
                  value={newGiData.email_encargado}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label='Dirección'
              >
                <Input
                  placeholder="Dirección"
                  onChange={(e) => setNewGiData({ ...newGiData, direccion: e.currentTarget.value })}
                  value={newGiData.direccion}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Localidad'
              >
                <Input
                  placeholder="Localidad"
                  onChange={(e) => setNewGiData({ ...newGiData, localidad: e.currentTarget.value })}
                  value={newGiData.localidad}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Comuna'
              >
                <Select
                  placeholder='Comuna'
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => handleSetCommune(e)}
                  value={newGiData.comuna}
                >
                  {COMMUNE_PROVINCE_REGION.map((item, index) => (
                    <Option key={index} value={item.comuna}>{item.comuna}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Provincia'
              >
                <Input placeholder="Provincia" value={newGiData.provincia} readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Región'
              >
                <Input placeholder="Región" value={newGiData.region} readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Sector'
              >
                <Select
                  placeholder='Sector'
                  style={{ width: '100%' }}
                  onChange={(e) => setNewGiData({ ...newGiData, sector: e.toString() })}
                  value={newGiData.sector}
                >
                  <Option value="Urbano">Urbano</Option>
                  <Option value="Rural">Rural</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Nacionalidad'
              >
                <Input
                  readOnly={newGiData.categoria === 'Empresa/Organizacion' ? true : false}
                  value={newGiData.nacionalidad}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='País origen'
              >
                <Select
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => setNewGiData({ ...newGiData, pais_origen: e.toString() })}
                  value={newGiData.pais_origen ?? 'CHL'}
                >
                  <Option key={1} value={'CHL'}>
                    Chile
                  </Option>
                  {/* {countries.length > 0 && countries.map((country, index) => (
                    <Option key={index} value={country.alpha3Code}>{country.name}</Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Input.Group>
    );
  };

  const renderPersonalWorkingInformation = () => {
    return (
      <Input.Group>
        <Form layout='vertical'>
          {newGiData.categoria === 'Persona Natural' &&
            <>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label='Organización perteneciente'
                  >
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, optionOrgPert) =>
                        optionOrgPert?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      style={{ width: '100%' }}
                      onSelect={(e: SelectValue) => handleSelectOrgBeloging(e.toString())}
                      defaultValue={newGiData.razon_social_org_perteneciente || ''}
                    >
                      {organizationsBelonging.length > 0 && organizationsBelonging.map((org, index) => (
                        <Option key={index} value={org._id}>{org.razon_social}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Profesión u oficio'
                  >
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      optionFilterProp="children"
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, profesion_oficio: e.toString() })}
                      value={newGiData.profesion_oficio}
                    >
                      {PROFESSIONS.map((profession, index) => (
                        <Option key={index} value={profession}>{profession}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={8}>
                  <Form.Item
                    label='Cargo'
                  >
                    <Input
                      onChange={(e) => setNewGiData({ ...newGiData, cargo: e.currentTarget.value })}
                      value={newGiData.cargo}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label='Género'
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, genero: e.toString() })}
                      value={newGiData.genero}
                    >
                      <Option value="Masculino">Masculino</Option>
                      <Option value="Femenino">Femenino</Option>
                      <Option value="Otro">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label='Nivel educacional'
                  >
                    <Select
                      placeholder='Nivel educacional'
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, nivel_educacional: e.toString() })}
                      value={newGiData.nivel_educacional}
                    >
                      {EDUCATION_LEVEL.map((level, index) => (
                        <Option key={index} value={level}>{level}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={6}>
                  <Form.Item
                    label='Estado civil'
                  >
                    <Select
                      placeholder='Estado Civil'
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, estado_civil: e.toString() })}
                      value={newGiData.estado_civil}
                    >
                      {CIVIL_STATE.map((state, index) => (
                        <Option key={index} value={state}>{state}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='Grupo sanguineo'
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, grupo_sanguineo: e.toString() })}
                      value={newGiData.grupo_sanguineo}
                    >
                      {BLOOD_GROUP.map((group, index) => (
                        <Option key={index} value={group}>{group}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label='Lentes ópticos'
                  >
                    <Select
                      placeholder='Lentes Ópticos'
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, usa_lente_optico: e.toString() })}
                      value={newGiData.usa_lente_optico}
                    >
                      <Option value="Si">Si</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label='Lentes contacto'
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, usa_lente_contacto: e.toString() })}
                      value={newGiData.usa_lente_contacto}
                    >
                      <Option value="Si">Si</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label='Audífonos'
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, usa_audifonos: e.toString() })}
                      value={newGiData.usa_audifonos}
                    >
                      <Option value="Si">Si</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={8}>
                  <Form.Item
                    label='Fecha vencimiento CI'
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      onSelect={(e: Moment) => setNewGiData({ ...newGiData, fecha_vencimiento_ci: e.format(FORMAT_DATE) })}
                      format={FORMAT_DATE}
                      value={newGiData.fecha_vencimiento_ci ? moment(newGiData.fecha_vencimiento_ci, FORMAT_DATE) : undefined}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label='Usa PC'
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, usa_pc: e.toString() })}
                      value={newGiData.usa_pc}
                    >
                      <Option value="Si">Si</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={4}>
                  <Form.Item
                    label='Licencia de conducir'
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e) => setNewGiData({ ...newGiData, licencia_conduccion: e.toString() })}
                      value={newGiData.licencia_conduccion}
                    >
                      <Option value="Si">Si</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {newGiData.licencia_conduccion === 'Si' &&
                  <>
                    <Col span={6}>
                      <Form.Item
                        label='Tipo licencia'
                      >
                        <Select
                          style={{ width: '100%' }}
                          onChange={(e: any) => setNewGiData({ ...newGiData, clase_licencia: e })}
                          mode='multiple'
                          value={newGiData.clase_licencia}
                        >
                          {DRIVER_LICENSE.map((license, index) => (
                            <Option key={index} value={license}>{license}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        label='Ley aplicable'
                      >
                        <Input
                          type='text'
                          onChange={(e) => setNewGiData({ ...newGiData, ley_aplicable: e.currentTarget.value })}
                          value={newGiData.ley_aplicable}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label='Fecha vencimiento licencia'
                      >
                        <DatePicker
                          format={FORMAT_DATE}
                          placeholder=''
                          onSelect={(e: Moment) => handleCalculateLicenseState(e)}
                          style={{ width: '100%' }}
                          value={newGiData.fecha_venc_licencia !== '' ? moment(newGiData.fecha_venc_licencia, FORMAT_DATE) : undefined}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        label='Estado licencia'
                      >
                        <Input
                          readOnly
                          value={newGiData.estado_licencia}
                        />
                      </Form.Item>
                    </Col>
                  </>
                }
              </Row>
              <Row gutter={8}>
                <Col span={6}>
                  <Form.Item
                    label='Nro. contrato'
                  >
                    {(!!organizationBelongingSelected && organizationBelongingSelected?.contrato_faenas.length)
                      ? <Select
                        style={{ width: '100%' }}
                        onChange={(e) => handleSetContractNumber(e)}
                        value={newGiData.nro_contrato}
                      >
                        {
                          organizationBelongingSelected.contrato_faenas.map((contract, index) => (
                            <Option key={index} value={contract.nro_contrato}>{contract.nro_contrato}</Option>
                          ))
                        }
                      </Select> :
                      <Input
                        readOnly
                        disabled
                      />
                    }
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='Seleccione faena'
                  >
                    {(!!faenasSelected && !!faenasSelected.length) ?
                      <Select
                        style={{ width: '100%' }}
                        onChange={(e) => setNewGiData({ ...newGiData, faena: e.toString() })}
                        value={newGiData.faena}
                      >
                        {faenasSelected && faenasSelected.length > 0 && faenasSelected.map((faena, index) => (
                          <Option key={index} value={faena.name}>{faena.name}</Option>
                        ))
                        }
                      </Select> :
                      <Input
                        readOnly
                        disabled
                      />
                    }
                  </Form.Item>
                </Col>
                <Col span={12}>

                </Col>
              </Row>
            </>
          }
          {/* <br /> */}
          {newGiData.categoria === 'Empresa/Organizacion' &&
            <>
              <Row gutter={8}>
                <Col span={8}>
                  <Select
                    placeholder='Grado formalización'
                    style={{ width: '100%' }}
                    onChange={(e) => setNewGiData({ ...newGiData, grado_formalizacion: e.toString() })}
                  >
                    <Option value="formal">Formal</Option>
                    <Option value="informal">Informal</Option>
                  </Select>
                </Col>
              </Row>
              <br />
              <Row gutter={8}>
                <Col span={8}>
                  <Input
                    placeholder="Número de contrato"
                    onChange={(e: FormEvent<HTMLInputElement>) => setContractoNumberToAdd(e.currentTarget.value)}
                    value={contractoNumberToAdd}
                  />
                </Col>
                <Col span={8}>
                  <Select
                    placeholder='Faenas'
                    mode="tags"
                    style={{ width: '100%' }}
                    onChange={(e) => handleFaenasToAdd(e)}
                    tokenSeparators={[',']}
                    value={faenasToAdd.map((e: IFaena) => e.name)}
                  />
                </Col>
                <Col span={6}>
                  {isEditContract ?
                    <>
                      <Button
                        onClick={() => editContractFaenas()}
                        type='primary'
                        style={{ backgroundColor: '#F68923', borderColor: '#F68923', color: 'white' }}
                      >
                        Editar
                    </Button>
                      <Button
                        onClick={() => cancelEditContractFaenas()}
                        type='primary'
                        style={{ backgroundColor: 'dimgrey', borderColor: 'dimgrey', color: 'white' }}
                      >
                        Cancelar
                    </Button>
                    </>
                    :
                    <Button
                      onClick={() => handleAddContractFaenas()}
                      type='primary'
                      style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}
                    >
                      Agregar
                    </Button>
                  }
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={24}>
                  {newGiData.contrato_faenas && newGiData.contrato_faenas.length > 0 &&
                    <Table showHeader={true} dataSource={newGiData.contrato_faenas} pagination={false}>
                      <Column className='column-money' title="Nro. contrato" dataIndex="nro_contrato" key="nrocontrato" />
                      <Column
                        title="Faenas"
                        dataIndex="faenas"
                        key="faenas"
                        className='column-money'
                        render={faenas => (
                          <>
                            {faenas.map((faena: IFaena, index: number) => (
                              <Tag color="blue" key={index}>
                                {faena.name}
                              </Tag>
                            ))}
                          </>
                        )}
                      />
                      <Column
                        width='10%'
                        className='column-money'
                        title="Actions"
                        render={(_, record: IContract, index: number) => (
                          <>
                            <Button
                              onClick={() => handleDeleteContractFaena(index)}
                              style={{ backgroundColor: '#E6100D' }}
                              icon={<DeleteOutlined style={{ fontSize: '1.1rem', color: 'white' }} />}
                            />
                            <Button
                              onClick={() => handleEditContractFaena(record, index)}
                              style={{ backgroundColor: '#FC9410' }}
                              icon={<EditOutlined style={{ fontSize: '1.1rem', color: 'white' }} />}
                            />
                          </>
                        )}
                      />
                    </Table>
                  }
                </Col>
              </Row>
            </>
          }
        </Form>
      </Input.Group>
    );
  };

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {type === 'edit' && <Title level={4}>{newGiData.razon_social}</Title>}
      <Collapse accordion defaultActiveKey={['1']}>
        <Panel header="Datos Tributarios" key="1">
          {renderTributaryInformation()}
        </Panel>
        <Panel header="Datos de Contacto" key="2">
          {renderContactInformaction()}
        </Panel>
        <Panel header="Datos Personales / Laborales" key="3">
          {renderPersonalWorkingInformation()}
        </Panel>
      </Collapse>
      <br />
      <Row gutter={8}>
        <Col span={12}>
          <Form layout='vertical'>
            <Form.Item
              label={type === 'edit' ? 'Cambiar archivo adjunto' : 'Archivo Adjunto'}
              getValueFromEvent={getFileUploaded}
              valuePropName="fileData"
            >
              <Upload.Dragger
                name="file"
                customRequest={getFileUploaded}
                accept=''
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
          </Form>
        </Col>
      </Row>
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
          {type === 'insert' ?
            <Button
              onClick={() => handleInsertGI()}
              disabled={disabledConfirm}
              style={!disabledConfirm ?
                { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
            >
              Confirmar
            </Button> :
            <Button
              onClick={() => handleSaveGI()}
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

export default CreateGiView;
