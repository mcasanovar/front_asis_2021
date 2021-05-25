import React, { useState, useEffect } from 'react';
import { DatePicker, Input, Row, Col, Select, Typography, Upload, Spin, Form, Table, Tag, Collapse, Button, InputNumber } from "antd";
import { DollarOutlined, PercentageOutlined, InboxOutlined } from "@ant-design/icons";

import { IAlertMessageContent } from '../../models/index.models';
import { ICompanyInfo, InvoicesModel, IResponseInvoices } from '../../models/invoices.models';

import AlertComponent from "../../component/Alert/Alert";

import { InvoicesInitialization } from '../../initializations/invoices.initialization';
import { DEFAULT_PERCENTAGE_IVA, FORMAT_DATE } from '../../constants/var';
import { CalculateIVA } from '../../libs/calculateIVA';
import { MapInvoiceToGenerate } from '../../functions/mappers';
import { generateInvoiceService } from '../../services';
import moment from 'moment';

interface IGenerateInvoiceProps {
	onCloseModal: (value: string, message: string) => string | void
	invoiceSelected: InvoicesModel | undefined,
	company: ICompanyInfo | undefined
}

const GenerateInvoice: React.FunctionComponent<IGenerateInvoiceProps> = ({
	onCloseModal,
	invoiceSelected,
	company
}) => {
	const { Option } = Select;
	const { Paragraph, Title } = Typography;
	const { Column } = Table;
	const { Panel } = Collapse;
	const { TextArea } = Input;

	const [loading, setLoading] = useState<boolean>(false);
	const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
	const [newDataInvoice, setNewDataInvoice] = useState<InvoicesModel>(invoiceSelected || InvoicesInitialization);
	const [companyBusinessName, setCompanyBusinessName] = useState<string>('');
	const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
	const [observation, setObservation] = useState<string>('');
	const [file, setFile] = useState<string | Blob | null>(null);

	const handleGenerateInvoice = async () => {
		setLoading(true);
		let formData = new FormData();
		const invoiceMapped = MapInvoiceToGenerate(newDataInvoice, observation, companyBusinessName, company);
		formData.append("data", JSON.stringify(invoiceMapped));
		file !== null && formData.append("archivo", file);
		const result: IResponseInvoices = await generateInvoiceService(newDataInvoice._id, formData);
		if (result.err === null) {
		  onCloseModal('reload', result.msg)
		} else {
		  return setMessageAlert({ message: result.err, type: 'error', show: true });
		}
	};

	const getFileUploaded = (e: any) => {
		e && setFile(e.file)
		e.onSuccess('ok');
	};

	const calculateTotalIVA = (iva: number) => {
		const aux = CalculateIVA(newDataInvoice.monto_neto, iva);
		console.log(aux)
		setNewDataInvoice({
			...newDataInvoice,
			valor_impuesto: aux,
			porcentaje_impuesto: iva,
			sub_total: calculateSubTotal(newDataInvoice.monto_neto, aux)
		});
	};

	const calculateSubTotal = (ammount: number, iva: number) => {
		const aux = ammount + iva;
		return aux;
	};

	const handleSumExentoAndDcto = (exento: number, dcto: number) => {
		setNewDataInvoice({
			...newDataInvoice,
			exento,
			descuento: dcto,
			total: (newDataInvoice.sub_total + exento) - dcto
		});
	};

	//--------------------------------USEEFECT
	useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
	}, [messageAlert]);
	
	useEffect(() => {
		if (newDataInvoice.monto_neto === 0) {
			setNewDataInvoice({
				...newDataInvoice,
				monto_neto: newDataInvoice.valor_servicio,
				porcentaje_impuesto: DEFAULT_PERCENTAGE_IVA,
				valor_impuesto: CalculateIVA(newDataInvoice.valor_servicio, DEFAULT_PERCENTAGE_IVA),
				sub_total: calculateSubTotal(
					newDataInvoice.valor_servicio,
					CalculateIVA(newDataInvoice.valor_servicio, DEFAULT_PERCENTAGE_IVA)
				),
				total: calculateSubTotal(
					newDataInvoice.valor_servicio,
					CalculateIVA(newDataInvoice.valor_servicio, DEFAULT_PERCENTAGE_IVA)
				)
			});
		}
	}, [newDataInvoice]);

	useEffect(() => {
		if(!!newDataInvoice._id){
			setNewDataInvoice({
				...newDataInvoice,
				fecha_facturacion: moment().format(FORMAT_DATE)
			})
		}
	}, [newDataInvoice._id]);

	useEffect(() => {
		if (!!companyBusinessName &&
			!!newDataInvoice.fecha_facturacion &&
			!!file) {
			return setDisabledConfirm(false)
		}
		return setDisabledConfirm(true);
	}, [newDataInvoice.fecha_facturacion, file, companyBusinessName]);

	console.log(invoiceSelected)

	//----------------------------RENDERS
	const renderGeneralInvoiceInfo = () => {
		return (
			<>
				<Paragraph style={{ fontWeight: 'bold' }}>Cliente</Paragraph>
				<Row gutter={8}>
					<Col span={6}>
						<Form.Item
							label='Código'
						>
							<Input
								readOnly
								value={newDataInvoice.codigo}
							/>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item
							label='Sucursal'
						>
							<Input
								readOnly
								value={newDataInvoice.sucursal}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label='Nombre servicio'
						>
							<Input
								readOnly
								value={newDataInvoice.nombre_servicio}
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
								value={newDataInvoice.rut_cp}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Razon social CP'
						>
							<Input
								readOnly
								value={newDataInvoice.razon_social_cp}
							/>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item
							label='Rut CS'
						>
							<Input
								readOnly
								value={newDataInvoice.rut_cs}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Razon social CS'
						>
							<Input
								readOnly
								value={newDataInvoice.razon_social_cs}
							/>
						</Form.Item>
					</Col>
				</Row>
				<br />
				<Paragraph style={{ fontWeight: 'bold' }}>Empresa</Paragraph>
				<Row gutter={8}>
					<Col span={12}>
						<Form.Item
							label='Representante'
						>
							<Input
								readOnly
								value={company?.nombre}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							validateStatus={companyBusinessName !== '' ? 'success' : 'error'}
							help={companyBusinessName !== '' ? '' : 'Seleccione'}
							label='Razon social'
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
					<Col span={12}>
						<Form.Item
							label='Email'
						>
							<Input
								readOnly
								value={company?.email}
							/>
						</Form.Item>
					</Col>
				</Row>
			</>
		);
	};

	const renderInvoicesInfo = () => {
		return (
			<>
				<Row gutter={8}>
					<Col span={10}>
						<Input.Group>
							<Row gutter={8}>
								<Col span={8}>
									<Form.Item
										// validateStatus={newDataInvoice.fecha_facturacion !== '' ? 'success' : 'error'}
										// help={newDataInvoice.fecha_facturacion !== '' ? '' : 'Seleccione'}
										label='Fecha factura'
									>
										<DatePicker
											style={{ width: '100%' }}
											format={FORMAT_DATE}
											onChange={(e) => setNewDataInvoice({ ...newDataInvoice, fecha_facturacion: e?.format(FORMAT_DATE) || '' })}
											value={!newDataInvoice.fecha_facturacion ? moment(new Date(), FORMAT_DATE) : moment(newDataInvoice.fecha_facturacion, FORMAT_DATE)}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item
										// validateStatus={newDataInvoice.nro_factura !== '' ? 'success' : 'error'}
										// help={newDataInvoice.nro_factura !== '' ? '' : 'Seleccione'}
										label='Nro. factura'
									>
										<Input
											onChange={(e) => setNewDataInvoice({ ...newDataInvoice, nro_factura: e.currentTarget.value })}
											value={newDataInvoice.nro_factura}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item
										label='Orden de compra'
									>
										<Input
											readOnly
											value={newDataInvoice.nro_oc}
										/>
									</Form.Item>
								</Col>
							</Row>
							<br />
							<Row>
								<Col span={12}>
									<Form.Item
										label='Monto neto'
									>
										<InputNumber
											style={{ width: '100%' }}
											readOnly
											formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
											value={newDataInvoice.monto_neto}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={12}>
									<Form.Item
										label='Porcentaje IVA'
									>
										<InputNumber
											style={{ width: '100%' }}
											formatter={value => `${value}%`}
											parser={value => parseInt(value?.replace('%', '') || '0')}
											maxLength={3}
											onChange={(e) => calculateTotalIVA(parseInt(e.toString()))}
											value={newDataInvoice.porcentaje_impuesto}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										label='Total IVA'
									>
										<InputNumber
											style={{ width: '100%' }}
											readOnly
											formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
											value={newDataInvoice.valor_impuesto}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={12}>
									<Form.Item
										label='Subtotal'
									>
										<InputNumber
											style={{ width: '100%' }}
											readOnly
											formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
											value={newDataInvoice.sub_total}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										label='Exento'
									>
										<InputNumber
											style={{ width: '100%' }}
											formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
											onChange={(e) => handleSumExentoAndDcto(parseInt(e.toString()), newDataInvoice.descuento)}
											value={newDataInvoice.exento}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={12}>
									<Form.Item
										label='Descuento'
									>
										<InputNumber
											style={{ width: '100%' }}
											formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '0')}
											onChange={(e) => handleSumExentoAndDcto(newDataInvoice.exento, parseInt(e.toString()))}
											value={newDataInvoice.descuento}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										label='Total'
									>
										<InputNumber
											style={{ width: '100%' }}
											readOnly
											formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') || '')}
											onChange={(e) => { }}
											value={newDataInvoice.total}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Input.Group>
					</Col>
					<Col span={14}>
						<br />
						<Row>
							<Col span={24} style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'flex-start',
								width: '100%',
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
						<br />
						<Row>
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
						</Row>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Form.Item
							label='Observaciones'
						>
							<TextArea
								rows={3}
								onChange={(e) => setObservation(e.currentTarget.value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</>
		);
	};

	return (
		<Spin spinning={loading} size='large' tip='Cargando...'>
			{messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
			{<Title level={4}>{`${newDataInvoice.nombre_servicio} - ${newDataInvoice.codigo}`}</Title>}
			<Form layout='vertical'>
				<Collapse accordion defaultActiveKey={['1']}>
					<Panel header="Formulario general" key="1">
						{renderGeneralInvoiceInfo()}
					</Panel>
					<Panel header="Formulario de factura" key="2">
						{renderInvoicesInfo()}
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
							onClick={() => handleGenerateInvoice()}
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

export default GenerateInvoice;
