import React, { useState, useEffect } from 'react';
import { Collapse, Input, Row, Col, Button, Typography, Form, Spin, Table, Tag } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import { ICompanyInfo, InvoicesModel, IResponseInvoices } from '../../models/invoices.models';
import { downloadFilesService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";
import { MilesFormat } from '../../libs/formattedPesos';

interface IDetailsInvoicesViewProps {
  onCloseModal: (value: string, message: string) => string | void
  onDownloadOC: () => void
  company: ICompanyInfo | undefined
  invoiceSelected: InvoicesModel | undefined
}

const DetailsInvoicesView: React.FunctionComponent<IDetailsInvoicesViewProps> = ({
  onCloseModal,
  onDownloadOC,
  invoiceSelected,
  company
}) => {
  const { Panel } = Collapse;
  const { Paragraph, Title } = Typography;
  const { Column } = Table;

  const [loading, setLoading] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });

  const handleDownloadOC = () => {
    setLoading(true)
    downloadFile(invoiceSelected?._id || '', 'oc');
  };

  const handleGetOCState = () => {
    const aux = invoiceSelected?.observacion_oc[invoiceSelected?.observacion_oc.length - 1]
    return aux?.estado || '';
  };

  const handleGetInvoiceState = () => {
    const aux = invoiceSelected?.observacion_factura[invoiceSelected.observacion_factura.length - 1]
    return aux?.estado || '';
  };

  async function downloadFile(id: string, type: string) {
    const aux: IResponseInvoices = await downloadFilesService(id, type);
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

  console.log(invoiceSelected)

  //------RENDERS
  const renderInformationOC = () => {
    return (
      <Form layout='vertical'>
        <Row gutter={8}>
          <Col span={12}>
            <Input.Group>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label='Número OC'
                  >
                    <Input
                      readOnly
                      value={invoiceSelected?.nro_oc}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='Fecha OC'
                  >
                    <Input
                      readOnly
                      value={invoiceSelected?.fecha_oc}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='Hora OC'
                  >
                    <Input
                      readOnly
                      value={invoiceSelected?.hora_oc}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <br />
              {invoiceSelected?.archivo_oc !== '' &&
                <Row gutter={8}>
                  <Col span={16}>
                    <Button onClick={() => handleDownloadOC()} type="primary" icon={<DownloadOutlined />}>
                      Descargar OC
                    </Button>
                  </Col>
                </Row>
              }
            </Input.Group>
          </Col>
          <Col span={12} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingLeft: '1rem'
          }}>
            <Table style={{ width: '100%' }} showHeader={true} dataSource={invoiceSelected?.observacion_oc} pagination={false}>
              <Column width='20%' className='column-money' title="Fecha" dataIndex="fecha" key="fecha" />
              <Column width='60%' className='column-money' title="Observación" dataIndex="obs" key="obs" />
              <Column
                width='20%'
                title="Estado archivo"
                dataIndex="estado_archivo"
                key="estado_archivo"
                className='column-money'
                render={(_, record: any) => {
                  let color = 'grey';
                  if (record.estado === 'Cargado') {
                    color = '#2db7f5';
                  }
                  if (record.estado === 'Aprobado') {
                    color = '#4CAF50';
                  }
                  if (record.estado === 'Rechazado') {
                    color = '#E41B0E';
                  }
                  return <>
                    <Tag color={color}>
                      {record.estado}
                    </Tag>
                  </>
                }}
              />
            </Table>
          </Col>
        </Row>
      </Form>
    );
  };

  const renderValidationOC = () => {
    return (
      <Form layout='vertical'>
        <Row>
          <Col span={6}>
            <Input.Group>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label='Estado archivo'
                  >
                    <Input
                      readOnly
                      value={handleGetOCState() || ''}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Col>
          <Col span={18}>
            <Col span={24} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingLeft: '1rem'
            }}>
              <Table style={{ width: '100%' }} showHeader={true} dataSource={invoiceSelected?.observacion_oc} pagination={false}>
                <Column width='20%' className='column-money' title="Fecha" dataIndex="fecha" key="fecha" />
                <Column width='60%' className='column-money' title="Observación" dataIndex="obs" key="obs" />
                <Column
                  width='20%'
                  title="Estado archivo"
                  dataIndex="estado_archivo"
                  key="estado_archivo"
                  className='column-money'
                  render={(_, record: any) => {
                    let color = 'grey';
                    if (record.estado === 'Cargado') {
                      color = '#2db7f5';
                    }
                    if (record.estado === 'Aprobado') {
                      color = '#4CAF50';
                    }
                    if (record.estado === 'Rechazado') {
                      color = '#E41B0E';
                    }
                    return <>
                      <Tag color={color}>
                        {record.estado}
                      </Tag>
                    </>
                  }}
                />
              </Table>
            </Col>
          </Col>
        </Row>
      </Form>
    );
  };

  const renderInvoiceInformation = () => {
    return (
      <Form layout='vertical'>
        <Title level={5} style={{ textAlign: 'center' }}>Datos generales</Title>
        <Paragraph style={{ fontWeight: 'bold' }}>Cliente</Paragraph>
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item
              label='Código facturación'
            >
              <Input
                readOnly
                value={invoiceSelected?.codigo}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Sucursal'
            >
              <Input
                readOnly
                value={invoiceSelected?.sucursal}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Nombre servicio'
            >
              <Input
                readOnly
                value={invoiceSelected?.nombre_servicio}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            <Form.Item
              label='Rut CP'
            >
              <Input
                readOnly
                value={invoiceSelected?.rut_cp}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Razon social CP'
            >
              <Input
                readOnly
                value={invoiceSelected?.razon_social_cp}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Rut CS'
            >
              <Input
                readOnly
                value={invoiceSelected?.rut_cs}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Razon social CS'
            >
              <Input
                readOnly
                value={invoiceSelected?.razon_social_cs}
              />
            </Form.Item>
          </Col>
        </Row>
        <Paragraph style={{ fontWeight: 'bold' }}>Empresa</Paragraph>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label='Representante'
            >
              <Input
                readOnly
                value={invoiceSelected?.representante}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Razon social empresa'
            >
              <Input
                readOnly
                value={invoiceSelected?.razon_social_empresa}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label='Email empresa'
            >
              <Input
                readOnly
                value={invoiceSelected?.email_empresa}
              />
            </Form.Item>
          </Col>
        </Row>
        <Title level={5} style={{ textAlign: 'center' }}>Datos de facturación</Title>
        <Row gutter={8}>
          <Col span={16}>
            <Input.Group>
              <Row gutter={8}>
                <Col span={8}>
                  <Form.Item
                    label='Fecha factura'
                  >
                    <Input
                      readOnly
                      value={invoiceSelected?.fecha_facturacion}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label='Nro. factura'
                  >
                    <Input
                      readOnly
                      value={invoiceSelected?.nro_factura}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label='Orden de compra (OC)'
                  >
                    <Input
                      readOnly
                      value={invoiceSelected?.nro_oc}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                }}>
                  <Table style={{ width: '100%' }} showHeader={true} dataSource={invoiceSelected?.observacion_oc} pagination={false}>
                    <Column width='20%' className='column-money' title="Fecha" dataIndex="fecha" key="fecha" />
                    <Column width='60%' className='column-money' title="Observación" dataIndex="obs" key="obs" />
                    <Column
                      width='20%'
                      title="Estado archivo"
                      dataIndex="estado_archivo"
                      key="estado_archivo"
                      className='column-money'
                      render={(_, record: any) => {
                        let color = 'grey';
                        if (record.estado === 'Cargado') {
                          color = '#2db7f5';
                        }
                        if (record.estado === 'Aprobado') {
                          color = '#4CAF50';
                        }
                        if (record.estado === 'Rechazado') {
                          color = '#E41B0E';
                        }
                        return <>
                          <Tag color={color}>
                            {record.estado}
                          </Tag>
                        </>
                      }}
                    />
                  </Table>
                </Col>
              </Row>
            </Input.Group>
          </Col>
          <Col span={8}>
            <Input.Group>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label='Monto neto'
                  >
                    <Input
                      readOnly
                      value={`$ ${MilesFormat(invoiceSelected?.monto_neto || 0)}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label='Porcentaje impuesto'
                  >
                    <Input
                      readOnly
                      value={`${invoiceSelected?.porcentaje_impuesto}%`}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='IVA'
                  >
                    <Input
                      readOnly
                      value={`$ ${MilesFormat(invoiceSelected?.valor_impuesto || 0)}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label='Subtotal'
                  >
                    <Input
                      readOnly
                      value={`$ ${MilesFormat(invoiceSelected?.sub_total || 0)}`}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Exento'
                  >
                    <Input
                      readOnly
                      value={`$ ${MilesFormat(invoiceSelected?.exento || 0)}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label='Descuento'
                  >
                    <Input
                      readOnly
                      value={`$ ${MilesFormat(invoiceSelected?.descuento || 0)}`}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Total'
                  >
                    <Input
                      readOnly
                      value={`$ ${MilesFormat(invoiceSelected?.total || 0)}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Col>
        </Row>
      </Form>
    );
  };

  const renderValidationInvoice = () => {
    return (
      <Form layout='vertical'>
        <Row>
          <Col span={6}>
            <Input.Group>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label='Estado archivo'
                  >
                    <Input
                      readOnly
                      value={handleGetInvoiceState()}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Col>
          <Col span={18} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingLeft: '1rem'
          }}>
            <Table style={{ width: '100%' }} showHeader={true} dataSource={invoiceSelected?.observacion_factura} pagination={false}>
              <Column width='20%' className='column-money' title="Fecha" dataIndex="fecha" key="fecha" />
              <Column width='60%' className='column-money' title="Observación" dataIndex="obs" key="obs" />
              <Column
                width='20%'
                title="Estado archivo"
                dataIndex="estado_archivo"
                key="estado_archivo"
                className='column-money'
                render={(_, record: any) => {
                  let color = 'grey';
                  if (record.estado === 'Cargado') {
                    color = '#2db7f5';
                  }
                  if (record.estado === 'Aprobado') {
                    color = '#4CAF50';
                  }
                  if (record.estado === 'Rechazado') {
                    color = '#E41B0E';
                  }
                  return <>
                    <Tag color={color}>
                      {record.estado}
                    </Tag>
                  </>
                }}
              />
            </Table>
          </Col>
        </Row>
      </Form>
    );
  };

  //---------------------------------------USEEFFECT
  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 3000);
    }
  }, [messageAlert]);

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`${invoiceSelected?.nombre_servicio} - ${invoiceSelected?.codigo}`}</Title>}
      <br />
      <Collapse accordion defaultActiveKey={['1']}>
        <Panel header="Carga OC" key="1">
          {renderInformationOC()}
        </Panel>
        <Panel header="Validación OC" key="2">
          {renderValidationOC()}
        </Panel>
        <Panel header="Carga Factura" key="3">
          {renderInvoiceInformation()}
        </Panel>
        <Panel header="Validación factura" key="4">
          {renderValidationInvoice()}
        </Panel>
      </Collapse>
      <br/>
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

export default DetailsInvoicesView;
