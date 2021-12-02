import React, { useState, useEffect, FormEvent } from 'react';
import { Input, Row, Col, Upload, DatePicker, TimePicker, Spin, Form, Table, Button, Checkbox } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { IGroupUploadOC, InvoicesModel, IResponseInvoices } from '../../../models/invoices.models';
import { IGroupUploadOCInitialization } from '../../../initializations/invoices.initialization';
import { FORMAT_DATE } from '../../../constants/var';
import moment, { Moment } from 'moment';
import { getGroupOCService, getResultsByDateService, uploadGroupOCService } from '../../../services';
import { IAlertMessageContent } from '../../../models/index.models';
import { MilesFormat } from '../../../libs/formattedPesos';
import { MapGroupInvoiceToUploadOC } from '../../../functions/mappers';

import AlertComponent from "../../../component/Alert/Alert";
import { FormatingRut } from '../../../functions/validators/index.validators';
import { IResponseResults, ResultModel } from '../../../models/results.model';
import getFilteredInvoicesByResults from '../../../functions/getFilteredInvoicesByResults';
import sortingObjects from '../../../functions/sortingObjects';

interface IUploadGrupalOCViewProps {
  onCloseModal: (value: string, message: string) => string | void
}

const UploadGrupalOCView: React.FunctionComponent<IUploadGrupalOCViewProps> = ({
  onCloseModal
}) => {
  const { TextArea, Search } = Input;
  const { Column } = Table;
  const { RangePicker } = DatePicker;

  const [dataConfirmation, setDataConfirmation] = useState<IGroupUploadOC>(IGroupUploadOCInitialization);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<string | Blob | null>(null);
  const [invoices, setInvoices] = useState<InvoicesModel[]>();
  const [results, setResults] = useState<ResultModel[]>([]);
  const [invoicesFiltered, setInvoicesFiltered] = useState<InvoicesModel[]>();
  const [selectedInvoices, setSelectedInvoices] = useState<React.Key[]>([]);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [rutSearchInput, setRutSearchInput] = useState<string>('');
  const [dateResultFilter, setDateResultFilter] = useState<any>(null);
  //filters
  const [checkRutFilter, setCheckRutFilter] = useState<boolean>(false);
  const [checkRangeDateFilter, setCheckRangeDateFilter] = useState<boolean>(false);

  const getFileUploaded = (e: any) => {
    e && setFile(e.file)
    e.onSuccess('ok');
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedInvoices(selectedRowKeys);
    },
  };

  const handleGroupUploadOC = async () => {
    setLoading(true);
    let formData = new FormData();
    const dataMapped = MapGroupInvoiceToUploadOC(dataConfirmation, selectedInvoices);
    formData.append("data", JSON.stringify(dataMapped));
    file !== null && formData.append("archivo", file);
    const aux: IResponseInvoices = await uploadGroupOCService(formData);
    if (!aux.err) {
      return onCloseModal('reload', aux.msg)
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    console.log(aux.err)
    setLoading(false)
  };

  const handleFormatingRut = (e: FormEvent<HTMLInputElement>) => {
    setRutSearchInput(FormatingRut(e.currentTarget.value));
  };

  const handleSearchInput = () => {
    let aux: InvoicesModel[] | undefined = invoices?.filter((invoice) => invoice.rut_cp === rutSearchInput);

    setLoading(true);

    if (!checkRangeDateFilter) {
      if (aux) {
        setTimeout(() => {
          setInvoicesFiltered(aux);
          setLoading(false);
          return
        }, 2000);
      }
    }

    if (checkRangeDateFilter && !!dateResultFilter) {
      const filteredInvoicesByRutCP = !!invoicesFiltered?.length ?
        invoicesFiltered.filter(invoice => invoice.rut_cp === rutSearchInput) : [];

      setTimeout(() => {
        setInvoicesFiltered(filteredInvoicesByRutCP);
        setLoading(false);
        return
      }, 2000);
    }
  };

  const handleFilterByDate = async (date: any) => {
    if (!date) return;
    setLoading(true);
    setDateResultFilter(date)

    let aux: IResponseResults = await getResultsByDateService(
      moment(date[0]).format(FORMAT_DATE),
      moment(date[1]).format(FORMAT_DATE)
    );

    if (aux.err) {
      setLoading(false)
      setMessageAlert({ message: aux.msg, type: 'error', show: true });
      return
    }

    let invoicesRes = getFilteredInvoicesByResults(aux.res, invoices || []);
    let invoicesResFiltered = sortingObjects(invoicesRes, 'codigo', 'desc');

    if(!checkRutFilter){
      setInvoicesFiltered(invoicesResFiltered)
      setLoading(false)
      return
    }

    if(checkRutFilter && !!rutSearchInput){
      const filteredInvoicesByRutCP = invoicesResFiltered.filter((invoice: any) => invoice.rut_cp === rutSearchInput);
      setInvoicesFiltered(sortingObjects(filteredInvoicesByRutCP, 'codigo', 'desc'))
      setLoading(false)
      return
    }
  };

  async function getInvoicesWithOC() {
    const aux: IResponseInvoices = await getGroupOCService();
    if (!aux.err) {
      const filteredAux = sortingObjects(aux.res, 'codigo', 'desc')
      setInvoices(filteredAux);
      setInvoicesFiltered(filteredAux);
      setDataConfirmation({
        ...dataConfirmation,
        fecha_oc: moment().format(FORMAT_DATE),
        hora_oc: moment().format('HH:mm')
      })
      setLoading(false);
      return
    }
    setMessageAlert({ message: aux.msg, type: 'error', show: true });
    setLoading(false)
  };

  const handleCleanDateResult = () => {
    setDateResultFilter(undefined);
    if(checkRutFilter && !!rutSearchInput){
      handleSearchInput();
    }
    else{
      setInvoicesFiltered(invoices)
    }
  }

  //--------------------------------USEEFECT
  useEffect(() => {
    setLoading(true);
    getInvoicesWithOC();
  }, []);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  useEffect(() => {
    if (!!dataConfirmation.nro_oc && !!file && !!selectedInvoices.length) {
      setDisabledConfirm(false)
      return
    }
    setDisabledConfirm(true);
  }, [dataConfirmation, file, selectedInvoices]);

  useEffect(() => {
    if (!rutSearchInput) {
      setInvoicesFiltered(invoices)
    }
  }, [rutSearchInput]);

  useEffect(() => {
    if(!checkRangeDateFilter){
      handleCleanDateResult();
    }
  }, [checkRangeDateFilter])

  useEffect(() => {
    if(!checkRangeDateFilter && !checkRutFilter){
      if(!checkRutFilter){
        setRutSearchInput('')
      }
      setInvoicesFiltered(invoices);
    }
  }, [checkRutFilter, checkRangeDateFilter])

  //--------------------------------------------RENDERS
  const renderInformation = () => {
    return (
      <Input.Group>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label='Numero OC'
              validateStatus={!!dataConfirmation.nro_oc ? 'success' : 'error'}
              help={!!dataConfirmation.nro_oc ? '' : 'Seleccione medio de confirmación'}
            >
              <Input
                onChange={(e) => setDataConfirmation({ ...dataConfirmation, nro_oc: e.currentTarget.value })}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Fecha subida OC'
            >
              <DatePicker
                style={{ width: '100%' }}
                format={FORMAT_DATE}
                defaultValue={moment(new Date(), FORMAT_DATE)}
                onChange={(e) => setDataConfirmation({ ...dataConfirmation, fecha_oc: e?.format(FORMAT_DATE) || '' })}
              // value={dataConfirmation.fecha_solicitud !== '' ? moment(dataConfirmation.fecha_solicitud, FORMAT_DATE) : undefined}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Hora subida OC'
            >
              <TimePicker
                style={{ width: '100%' }}
                format="HH:mm"
                defaultValue={moment(new Date(), 'HH:mm')}
                onChange={(e) => setDataConfirmation({ ...dataConfirmation, hora_oc: e?.format('HH:mm') || '' })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label='Observaciones'
            >
              <TextArea
                rows={6}
                onChange={(e) => setDataConfirmation({ ...dataConfirmation, observacion_oc: e.currentTarget.value })}
                value={dataConfirmation.observacion_oc}
              />
            </Form.Item>
          </Col>
          <Col span='12'>
            <Form.Item
              label='Examen'
              getValueFromEvent={getFileUploaded}
              valuePropName="fileData"
              validateStatus={file !== null ? 'success' : 'error'}
              help={file !== null ? '' : 'Seleccionar'}
            >
              <Upload.Dragger
                name="file"
                customRequest={getFileUploaded}
                accept='*'
                id='error_4'
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
        rowKey={record => record._id}
        pagination={{ position: ['bottomCenter'] }}
      >
        <Column className='column-money' title="Código" dataIndex="codigo" key="codigo" />
        <Column className='column-money' title="Rut (CP)" dataIndex="rut_cp" key="rut_cp" />
        <Column className='column-money' title="Razon Social (CP)" dataIndex="razon_social_cp" key="razon_social_cp" />
        <Column className='column-money' title="Rut (CS)" dataIndex="rut_cs" key="rut_cs" />
        <Column className='column-money' title="Razon Social (CS)" dataIndex="razon_social_cs" key="razon_social_cs" />
        <Column className='column-money' title="Nombre Servicio" dataIndex="nombre_servicio" key="nombre_servicio" />
        {!!dateResultFilter &&
          <Column className='column-money' title="Fecha Resultado" dataIndex="fecha_resultado" key="fecha_resultado" />
        }
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
        <Row>
          <Col span='24'>
            {renderInformation()}
          </Col>
        </Row>
        <br />
        <Row gutter={2} style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Checkbox
              style={{ marginRight: '10px' }}
              onChange={() => setCheckRutFilter(!checkRutFilter)}
              value={checkRutFilter}
            />
            <Form.Item
              label="Buscar por Rut CP"
              style={{ width: '100%' }}
            >
              <Search
                placeholder="Rut CP"
                allowClear
                enterButton="Buscar"
                size="large"
                disabled={checkRutFilter ? false : true}
                onChange={(e) => handleFormatingRut(e)}
                onSearch={handleSearchInput}
                value={rutSearchInput}
              />
            </Form.Item>
          </Col>
          <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Checkbox
              style={{ marginRight: '10px' }}
              onChange={() => setCheckRangeDateFilter(!checkRangeDateFilter)}
              value={checkRangeDateFilter}
            />
            <Form.Item
              label="Buscar por Fecha Resultado"
            >
              <RangePicker
                onChange={(e) => handleFilterByDate(e)}
                format={FORMAT_DATE}
                value={dateResultFilter}
                disabled={checkRangeDateFilter ? false : true}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item
              label="."
            >
              <Button
                onClick={() => handleCleanDateResult()}
                style={{ backgroundColor: checkRangeDateFilter ? '#E10D17' : 'gray', color: 'white' }}
                disabled={checkRangeDateFilter ? false : true}
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
              onClick={() => handleGroupUploadOC()}
              disabled={disabledConfirm}
              style={!disabledConfirm ?
                { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
            >
              Confirmar
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default UploadGrupalOCView;
