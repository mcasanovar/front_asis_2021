import React, { useState, useEffect, FormEvent } from 'react';
import { Col, Input, Row, DatePicker, Upload, Table, Form, InputNumber, Button, Select, Spin } from 'antd';
import { DollarOutlined, PercentageOutlined, InboxOutlined } from "@ant-design/icons";

import TableComponent from "../../../component/Table/Table";
import { ICompanyInfo, IGroupUploadInvoices, InvoicesModel, IResponseInvoices } from '../../../models/invoices.models';
import { MilesFormat } from '../../../libs/formattedPesos';
import { IGroupUploadInvoicesInitialization } from '../../../initializations/invoices.initialization';
import { DEFAULT_PERCENTAGE_IVA, FORMAT_DATE } from '../../../constants/var';
import moment, { Moment } from 'moment';
import { CalculateIVA } from '../../../libs/calculateIVA';
import { getGroupInvoiceToUploadService, getResultsByDateService, uploadGroupInvoicesService } from '../../../services';
import { IAlertMessageContent } from '../../../models/index.models';
import { MapGroupInvoiceToUpload } from '../../../functions/mappers';
import AlertComponent from '../../../component/Alert/Alert';
import { FormatingRut } from '../../../functions/validators/index.validators';
import { IResponseResults } from '../../../models/results.model';
import getFilteredInvoicesByResults from '../../../functions/getFilteredInvoicesByResults';
import sortingObjects from '../../../functions/sortingObjects';

interface IUploadGroupInvoicesViewProps {
  onCloseModal: (value: string, message: string) => string | void
  company: ICompanyInfo | undefined
}

const UploadGroupInvoicesView: React.FunctionComponent<IUploadGroupInvoicesViewProps> = ({
  onCloseModal,
  company
}) => {
  const { TextArea, Search } = Input;
  const { Column } = Table;
  const { Option } = Select;

  const [dataConfirmation, setDataConfirmation] = useState<IGroupUploadInvoices>(IGroupUploadInvoicesInitialization);
  const [loading, setLoading] = useState<boolean>(false);
  const [companyBusinessName, setCompanyBusinessName] = useState<string>('');
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [invoices, setInvoices] = useState<InvoicesModel[]>();
  const [invoicesFiltered, setInvoicesFiltered] = useState<InvoicesModel[]>();
  const [selectedInvoices, setSelectedInvoices] = useState<React.Key[]>([]);
  const [file, setFile] = useState<string | Blob | null>(null);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [rutSearchInput, setRutSearchInput] = useState<string>('');
  const [dateResultFilter, setDateResultFilter] = useState<Moment | undefined>();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedInvoices(selectedRowKeys);
    }
  };

  const getFileUploaded = (e: any) => {
    e && setFile(e.file)
    e.onSuccess('ok');
  };

  const calculateSubTotal = (ammount: number, iva: number) => {
    const aux = ammount + iva;
    return aux;
  };

  const calculateTotalIVA = (iva: number) => {
    const aux = CalculateIVA(dataConfirmation.monto_neto, iva);
    console.log(aux)
    setDataConfirmation({
      ...dataConfirmation,
      valor_impuesto: aux,
      porcentaje_impuesto: iva,
      sub_total: calculateSubTotal(dataConfirmation.monto_neto, aux)
    });
  };

  const handleSumExentoAndDcto = (exento: number, dcto: number) => {
    setDataConfirmation({
      ...dataConfirmation,
      exento,
      descuento: dcto,
      total: (dataConfirmation.sub_total + exento) - dcto
    });
  };

  const handleGroupUploadInvoices = async () => {
    setLoading(true);
    let formData = new FormData();
    const dataMapped = MapGroupInvoiceToUpload(dataConfirmation, selectedInvoices, company, companyBusinessName);
    formData.append("data", JSON.stringify(dataMapped));
    file !== null && formData.append("archivo", file);
    const aux: IResponseInvoices = await uploadGroupInvoicesService(formData);
    if (!aux.err) {
      onCloseModal('reload', aux.msg)
      return
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    setLoading(false)
  };

  const handleFormatingRut = (e: FormEvent<HTMLInputElement>) => {
    setRutSearchInput(FormatingRut(e.currentTarget.value));
  };

  const handleSearchInput = () => {
    const aux: InvoicesModel[] | undefined = invoices?.filter((invoice) => invoice.rut_cp === rutSearchInput);
    if (aux) {
      setLoading(true);
      setTimeout(() => {
        setInvoicesFiltered(aux);
        setLoading(false);
      }, 2000);
    }
  };

  async function getInvoicesToUpload() {
    const aux: IResponseInvoices = await getGroupInvoiceToUploadService();
    console.log('invoices to grupal upload', aux)
    if (!aux.err) {
      const filteredInvoices = aux.res.filter((invoice: InvoicesModel) =>
        invoice.estado_archivo === 'Aprobado' || invoice.estado_archivo === 'Rechazado' || invoice.estado_archivo === 'Sin Documento');
      const filteredAux = sortingObjects(filteredInvoices, 'codigo', 'desc')
      setInvoices(filteredAux);
      setInvoicesFiltered(filteredAux);
      setLoading(false);
      return
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    console.log(aux.err)
    setLoading(false)
  };

  const handleFilterByDate = async (date: Moment) => {
    setLoading(true);
    setDateResultFilter(date)
    const aux: IResponseResults = await getResultsByDateService(moment(date).format(FORMAT_DATE));
    if (aux.err) {
      setLoading(false)
      setMessageAlert({ message: aux.msg, type: 'error', show: true });
      return
    }
    const invoicesRes = getFilteredInvoicesByResults(aux.res, invoices || []);
    const invoicesResFiltered = sortingObjects(invoicesRes, 'codigo', 'desc');

    setInvoicesFiltered(invoicesResFiltered)
    setLoading(false)
  };

  const handleCleanDateResult = () => {
    setDateResultFilter(undefined);
    setInvoicesFiltered(invoices)
  }

  //-------------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true);
    getInvoicesToUpload();
  }, []);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  useEffect(() => {
    setDataConfirmation({
      ...dataConfirmation,
      porcentaje_impuesto: DEFAULT_PERCENTAGE_IVA,
      valor_impuesto: CalculateIVA(dataConfirmation.monto_neto, DEFAULT_PERCENTAGE_IVA),
      sub_total: calculateSubTotal(
        dataConfirmation.monto_neto,
        CalculateIVA(dataConfirmation.monto_neto, DEFAULT_PERCENTAGE_IVA)
      ),
      total: calculateSubTotal(
        dataConfirmation.monto_neto,
        CalculateIVA(dataConfirmation.monto_neto, DEFAULT_PERCENTAGE_IVA)
      )
    });
  }, [dataConfirmation.monto_neto]);

  useEffect(() => {
    if (!!dataConfirmation.fecha_facturacion
      && !!dataConfirmation.nro_factura
      && !!companyBusinessName
      && !!file
      && !!selectedInvoices.length) {
      return setDisabledConfirm(false)
    }
    return setDisabledConfirm(true)
  }, [dataConfirmation, companyBusinessName, file, selectedInvoices]);

  useEffect(() => {
    if (!rutSearchInput) {
      setInvoicesFiltered(invoices)
    }
  }, [rutSearchInput]);

  //------------------------------------------RENDERS
  const renderInformation = () => {
    return (
      <>
        <Col span={12}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label='Fecha factura'
                validateStatus={!!dataConfirmation.fecha_facturacion ? 'success' : 'error'}
                help={!!dataConfirmation.fecha_facturacion ? '' : 'Seleccione'}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format={FORMAT_DATE}
                  onChange={(e) => setDataConfirmation({ ...dataConfirmation, fecha_facturacion: e?.format(FORMAT_DATE) || '' })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Número factura'
                validateStatus={!!dataConfirmation.nro_factura ? 'success' : 'error'}
                help={!!dataConfirmation.nro_factura ? '' : 'Seleccione'}
              >
                <Input
                  onChange={(e) => setDataConfirmation({ ...dataConfirmation, nro_factura: e.currentTarget.value })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span='24'>
              <Form.Item
                validateStatus={!!companyBusinessName ? 'success' : 'error'}
                help={!!companyBusinessName ? '' : 'Seleccione'}
                label='Razon social Empresa'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setCompanyBusinessName(e.toString())}
                >
                  {company?.razon_social.map((razon, index) => (
                    <Option key={index} value={razon.razon}>{`${razon.rut} - ${razon.razon}`}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label='Observaciones'
              >
                <TextArea
                  rows={1}
                  onChange={(e) => setDataConfirmation({ ...dataConfirmation, observacion_factura: e.currentTarget.value })}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          {/* <Row>
            <Col span={24}>
              <Form.Item
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
          </Row> */}
        </Col>
        <Col span={12} style={{ paddingTop: '1.70rem' }}>
          <Form.Item
            getValueFromEvent={getFileUploaded}
            valuePropName="fileData"
            validateStatus={file !== null ? 'success' : 'error'}
            help={file !== null ? '' : 'Seleccione'}
          >
            <Upload.Dragger
              name="file"
              customRequest={getFileUploaded}
              accept='*'
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
      </>
    );
  };

  const renderValuesInformation = () => {
    return (
      <Col span={12}>
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Monto neto'
                validateStatus={!!dataConfirmation.monto_neto ? 'success' : 'error'}
                help={!!dataConfirmation.monto_neto ? '' : 'Seleccione'}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  onChange={(e) => setDataConfirmation({ ...dataConfirmation, monto_neto: parseInt(e.toString()) })}
                  value={dataConfirmation.monto_neto}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Porcentaje IVA'
                validateStatus={!!dataConfirmation.porcentaje_impuesto ? 'success' : 'error'}
                help={!!dataConfirmation.porcentaje_impuesto ? '' : 'Seleccione'}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}%`}
                  parser={value => parseInt(value?.replace('%', '') || '0')}
                  maxLength={3}
                  onChange={(e) => calculateTotalIVA(parseInt(e.toString()))}
                  value={dataConfirmation.porcentaje_impuesto}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Total IVA'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  readOnly
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
                  value={dataConfirmation.valor_impuesto}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label='Subtotal'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  readOnly
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
                  value={dataConfirmation.sub_total}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Exento'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  onChange={(e) => handleSumExentoAndDcto(parseInt(e.toString()), dataConfirmation.descuento)}
                  value={dataConfirmation.exento}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Descuento'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                  onChange={(e) => handleSumExentoAndDcto(dataConfirmation.exento, parseInt(e.toString()))}
                  value={dataConfirmation.descuento}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label='Total'
              >
                <InputNumber
                  style={{ width: '100%' }}
                  readOnly
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
                  onChange={(e) => { }}
                  value={dataConfirmation.total}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
      </Col>
    );
  };

  const renderListInvoices = () => {
    return (
      <Table
        style={{ width: '100%' }}
        showHeader={true}
        dataSource={invoicesFiltered || []}
        // columns={columns}
        loading={loading}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        rowKey={record => record.codigo}
        pagination={{ position: ['bottomCenter'] }}
      >
        <Column className='column-money' title="Código" dataIndex="codigo" key="codigo" />
        <Column className='column-money' title="Rut (CP)" dataIndex="rut_cp" key="rut_cp" />
        <Column className='column-money' title="Razon Social (CP)" dataIndex="razon_social_cp" key="razon_social_cp" />
        <Column className='column-money' title="Rut (CS)" dataIndex="rut_cs" key="rut_cs" />
        <Column className='column-money' title="Razon Social (CS)" dataIndex="razon_social_cs" key="razon_social_cs" />
        <Column className='column-money' title="Nombre Servicio" dataIndex="nombre_servicio" key="nombre_servicio" />
        <Column
          className='column-money'
          title="Total"
          dataIndex="valor_servicio"
          key="valor_servicio"
          render={(text) => `$${MilesFormat(text)}`}
        />
      </Table>
    );
  };

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            {renderInformation()}
            {/* {renderValuesInformation()} */}
          </Row>
          <br />
          <Row gutter={8} style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <Col span={12}>
              <Form.Item
                label="Buscar por Rut CP"
                style={{ width: '100%' }}
              >
                <Search
                  placeholder="Rut CP"
                  allowClear
                  enterButton="Buscar"
                  size="large"
                  onChange={(e) => handleFormatingRut(e)}
                  onSearch={handleSearchInput}
                  value={rutSearchInput}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Buscar por Fecha Resultado"
              >
                <DatePicker
                  style={{ width: '100%', marginRight: '10px', height: '100%' }}
                  onSelect={(e) => handleFilterByDate(e)}
                  format={FORMAT_DATE}
                  value={dateResultFilter}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                label="."
              >
                <Button
                  onClick={() => handleCleanDateResult()}
                  style={{ backgroundColor: '#E10D17', color: 'white' }}
                >
                  Limpiar
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingLeft: '1rem'
            }}>
              {renderListInvoices()}
            </Col>
          </Row>
          <Row gutter={8} style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}>
            <Col
              span={5}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                onClick={() => onCloseModal('', '')}
                style={{ backgroundColor: '#E10D17', color: 'white' }}
              >
                Cancelar
            </Button>
              <Button
                onClick={() => handleGroupUploadInvoices()}
                disabled={disabledConfirm}
                style={!disabledConfirm ?
                  { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                  { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
              >
                Confirmar
            </Button>
            </Col>
          </Row>
        </Input.Group>
      </Form>
    </Spin>
  );
};

export default UploadGroupInvoicesView;
