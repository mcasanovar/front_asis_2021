import React, { useState, useEffect } from 'react'
import {
    Spin,
    Typography,
    Form,
    Collapse,
    Input,
    Row,
    Col,
    Button,
    Select,
    Tag,
    InputNumber,
    Table,
    Popover,
} from 'antd'
import {
    IAlertMessageContent,
    ITableDeleteObject,
} from '../../models/index.models'
import { DeleteOutlined } from '@ant-design/icons'

import AlertComponent from '../../component/Alert/Alert'

import {
    ExpensesModel,
    IEntries,
    IResponseExpenses,
} from '../../models/expenses.models'
import { EntriesInitialization } from '../../initializations/expenses.initialization'
import { CATEGORIES_EXPENSES } from '../../constants/var'
import { MilesFormat } from '../../libs/formattedPesos'
import { CalculateIVA } from '../../libs/calculateIVA'
import TextArea from 'antd/lib/input/TextArea'

import { v4 as uuidv4 } from 'uuid'
import { insertEntriesService } from '../../services'
import { SelectValue } from 'antd/lib/select'

type IEntriesViewProps = {
    onCloseModal: (value: string, message: string) => string | void
    expenseSelected: ExpensesModel | undefined
}

const EntriesView: React.FunctionComponent<IEntriesViewProps> = ({
    onCloseModal,
    expenseSelected,
}) => {
    const { Title } = Typography
    const { Panel } = Collapse
    const { Option } = Select
    const { Column } = Table

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [newDataEntry, setNewDataEntry] = useState<IEntries>(
        EntriesInitialization
    )
    const [entries, setEntries] = useState<IEntries[]>(
        expenseSelected?.entradas || []
    )
    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [disabledAdd, setDisabledAdd] = useState<boolean>(true)
    const [reloadTable, setReloadTable] = useState<boolean>(true)
    const [subCategoryThree, setSubCategoryThree] = useState<{
        codigo: string
        subcategoria_tres: string
    }>({ codigo: '', subcategoria_tres: '' })
    const [deleteConfirmation, setDeleteConfirmation] =
        useState<ITableDeleteObject>({ _id: '', show: false })
    const [defaultActiveKey, setDefaultActiveKey] = useState<string>('1')

    const handleGetSubcategoryThree = () => {
        const category = CATEGORIES_EXPENSES.find(
            category =>
                category.categoria_general ===
                expenseSelected?.categoria_general
        )
        if (!category) return []

        const subCagegoryOne = category.subcategoria_uno.find(
            subone =>
                subone.subcategoria_uno === expenseSelected?.subcategoria_uno
        )
        if (!subCagegoryOne) return []

        const subCategoryTwo = subCagegoryOne.subcategoria_dos.find(
            subtwo =>
                subtwo.subcategoria_dos === expenseSelected?.subcategoria_dos
        )
        if (!subCategoryTwo) return []

        return subCategoryTwo.sub_cat_tres
    }

    const handleAssignSubcategoryThree = (code: string) => {
        const category = CATEGORIES_EXPENSES.find(
            category =>
                category.categoria_general ===
                expenseSelected?.categoria_general
        )
        if (!category) return

        const subCagegoryOne = category.subcategoria_uno.find(
            subone =>
                subone.subcategoria_uno === expenseSelected?.subcategoria_uno
        )
        if (!subCagegoryOne) return

        const subCategoryTwo = subCagegoryOne.subcategoria_dos.find(
            subtwo =>
                subtwo.subcategoria_dos === expenseSelected?.subcategoria_dos
        )
        if (!subCategoryTwo) return

        const aux = subCategoryTwo.sub_cat_tres.find(
            subthree => subthree.codigo === code
        )
        if (!aux) return

        setSubCategoryThree(aux)
    }

    const handleCalculateTotalEntries = () => {
        const aux = entries.reduce(
            (acc, current) => acc + current.costo_total,
            0
        )
        return aux || 0
    }

    const handleCalculatePendingAmmountEntries = () => {
        const payed =
            entries.reduce((acc, current) => acc + current.costo_total, 0) || 0
        const total = expenseSelected?.total || 0
        return total - payed
    }

    const handleCalculateTotal = (cant = 0, price = 0, percentage = 0) => {
        const primaryValue = cant * price
        const IVA = CalculateIVA(primaryValue, percentage)

        const totalPrice = primaryValue + IVA

        setNewDataEntry({
            ...newDataEntry,
            cantidad: cant,
            costo_unitario: price,
            porcentaje_impuesto: percentage,
            valor_impuesto: IVA,
            costo_total: totalPrice,
        })
    }

    const handleAddEntry = () => {
        setLoadingButton(true)

        setTimeout(() => {
            setLoadingButton(false)
            setReloadTable(false)
            const aux = entries
            aux.push({
                ...newDataEntry,
                _id: uuidv4(),
                categoria_general: expenseSelected?.categoria_general || '',
                subcategoria_uno: expenseSelected?.subcategoria_uno || '',
                subcategoria_dos: expenseSelected?.subcategoria_dos || '',
                subcategoria_tres: subCategoryThree.subcategoria_tres,
                codigo_categoria_tres: subCategoryThree.codigo,
                nombre_proveedor: expenseSelected?.razon_social_proveedor || '',
            })
            setEntries(aux)
            setNewDataEntry(EntriesInitialization)
            setDisabledAdd(true)
            setSubCategoryThree({ codigo: '', subcategoria_tres: '' })
            setDefaultActiveKey('0')
            setMessageAlert({
                message: 'Entrada cargada en tabla',
                type: 'success',
                show: true,
            })
        }, 2000)

        setTimeout(() => {
            handleInsertEntries()
        }, 2500)
    }

    const handleDeleteEntry = (id: string) => {
        const aux = entries.filter(entry => entry._id !== id)
        setEntries(aux)
        setDefaultActiveKey('0')
        setMessageAlert({
            message: 'Entrada cargada en tabla',
            type: 'success',
            show: true,
        })
    }

    const handleInsertEntries = async () => {
        setLoading(true)
        const aux: IResponseExpenses = await insertEntriesService(
            expenseSelected?._id || '',
            entries
        )
        if (aux.err === null) {
            setMessageAlert({
                message: 'Información guardada correctamente',
                type: 'success',
                show: true,
            })
            setLoading(false)
            return
        }
        setMessageAlert({ message: aux.err, type: 'error', show: true })
        setLoading(false)
        return
    }

    //-----------------------------RENDERS
    const renderFormEntry = () => {
        return (
            <Input.Group>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item label="Categoria general">
                            <Input
                                readOnly
                                value={expenseSelected?.categoria_general}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Sub-categoria 1">
                            <Input
                                readOnly
                                value={expenseSelected?.subcategoria_uno}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Sub-categoria 2">
                            <Input
                                readOnly
                                value={expenseSelected?.subcategoria_dos}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={6}>
                        <Form.Item
                            validateStatus={
                                !!subCategoryThree.codigo ? 'success' : 'error'
                            }
                            help={!!subCategoryThree.codigo ? '' : 'Seleccione'}
                            label="Sub-categoria 3"
                        >
                            <Select
                                style={{ width: '100%' }}
                                onSelect={(e: SelectValue) =>
                                    handleAssignSubcategoryThree(
                                        !!e ? e.toString() : ''
                                    )
                                }
                                value={`${subCategoryThree?.codigo} - ${subCategoryThree?.subcategoria_tres}`}
                            >
                                {handleGetSubcategoryThree().map(
                                    (subthree, index) => (
                                        <Option
                                            key={index}
                                            value={subthree.codigo}
                                        >{`${subthree.codigo} - ${subthree.subcategoria_tres}`}</Option>
                                    )
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={4}>
                        <Form.Item
                            label="Cantidad"
                            validateStatus={
                                newDataEntry.cantidad !== 0
                                    ? 'success'
                                    : 'error'
                            }
                            help={
                                newDataEntry.cantidad !== 0
                                    ? ''
                                    : 'ingrese valor'
                            }
                        >
                            <Input
                                type="number"
                                style={{ width: '100%' }}
                                onChange={e =>
                                    handleCalculateTotal(
                                        parseInt(e.currentTarget.value),
                                        newDataEntry.costo_unitario,
                                        newDataEntry.porcentaje_impuesto
                                    )
                                }
                                value={newDataEntry.cantidad}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            label="Precio unitario"
                            validateStatus={
                                newDataEntry.costo_unitario !== 0
                                    ? 'success'
                                    : 'error'
                            }
                            help={
                                newDataEntry.costo_unitario !== 0
                                    ? ''
                                    : 'ingrese valor'
                            }
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={value =>
                                    `$ ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                    )
                                }
                                parser={value =>
                                    parseInt(
                                        value?.replace(/\$\s?|(,*)/g, '') || ''
                                    )
                                }
                                onChange={e =>
                                    handleCalculateTotal(
                                        newDataEntry.cantidad,
                                        parseInt(e.toString()),
                                        newDataEntry.porcentaje_impuesto
                                    )
                                }
                                value={newDataEntry.costo_unitario}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Porcentaje IVA">
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={value => `${value}%`}
                                parser={value =>
                                    parseInt(value?.replace('%', '') || '0')
                                }
                                maxLength={3}
                                onChange={e =>
                                    handleCalculateTotal(
                                        newDataEntry.cantidad,
                                        newDataEntry.costo_unitario,
                                        parseInt(e.toString())
                                    )
                                }
                                value={newDataEntry.porcentaje_impuesto}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Valor IVA">
                            <InputNumber
                                style={{ width: '100%' }}
                                readOnly
                                formatter={value =>
                                    `$ ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                    )
                                }
                                parser={value =>
                                    parseInt(
                                        value?.replace(/\$\s?|(,*)/g, '') || ''
                                    )
                                }
                                value={newDataEntry.valor_impuesto}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            validateStatus={
                                newDataEntry.costo_total <=
                                handleCalculatePendingAmmountEntries()
                                    ? 'success'
                                    : 'error'
                            }
                            help={
                                newDataEntry.costo_total <=
                                handleCalculatePendingAmmountEntries()
                                    ? ''
                                    : 'Valor excede el monto pendiente'
                            }
                            label="Costo total"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                readOnly
                                formatter={value =>
                                    `$ ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                    )
                                }
                                parser={value =>
                                    parseInt(
                                        value?.replace(/\$\s?|(,*)/g, '') || ''
                                    )
                                }
                                value={newDataEntry.costo_total}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Form.Item label="Detalle">
                            <TextArea
                                rows={2}
                                onChange={e =>
                                    setNewDataEntry({
                                        ...newDataEntry,
                                        detalle: e.currentTarget.value,
                                    })
                                }
                                value={newDataEntry.detalle}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}
                >
                    <Button
                        onClick={() => handleAddEntry()}
                        disabled={disabledAdd}
                        loading={loadingButton}
                        style={
                            !disabledAdd
                                ? {
                                      backgroundColor: 'green',
                                      borderColor: 'green',
                                      color: 'white',
                                      width: '10%',
                                      height: '100%',
                                  }
                                : {
                                      backgroundColor: 'grey',
                                      borderColor: 'grey',
                                      color: 'white',
                                      width: '10%',
                                      height: '100%',
                                  }
                        }
                    >
                        Agregar
                    </Button>
                </Row>
            </Input.Group>
        )
    }

    console.log([
        newDataEntry.cantidad,
        newDataEntry.costo_unitario,
        subCategoryThree,
        newDataEntry.costo_total,
        handleCalculatePendingAmmountEntries(),
    ])

    //-----------------------------------USEEFECT
    useEffect(() => {
        if (
            !!newDataEntry.cantidad &&
            !!newDataEntry.costo_unitario &&
            !!subCategoryThree &&
            newDataEntry.costo_total <= handleCalculatePendingAmmountEntries()
        ) {
            return setDisabledAdd(false)
        }
        return setDisabledAdd(true)
    }, [subCategoryThree, newDataEntry.cantidad, newDataEntry.costo_unitario])

    useEffect(() => {
        setReloadTable(true)
    }, [entries.length])

    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2500)
        }
    }, [messageAlert])

    return (
        <Spin spinning={loading} size="large" tip="Cargando...">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            {<Title level={4}>{`Código : ${expenseSelected?.codigo}`}</Title>}
            {
                <Title
                    level={4}
                >{`Proveedor : ${expenseSelected?.razon_social_proveedor}`}</Title>
            }
            <Form layout="vertical">
                <Row gutter={8}>
                    <Col span={6}>
                        <Tag
                            color="#1976D2"
                            style={{
                                width: '100%',
                                height: 40,
                                fontSize: 14,
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 22,
                            }}
                        >
                            {`Gasto total : $ ${MilesFormat(
                                expenseSelected?.total || 0
                            )}`}
                        </Tag>
                    </Col>
                    <Col span={6}>
                        <Tag
                            color="#388E3C"
                            style={{
                                width: '100%',
                                height: 40,
                                fontSize: 14,
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 22,
                            }}
                        >
                            {`Gasto pagado : $ ${MilesFormat(
                                handleCalculateTotalEntries()
                            )}`}
                        </Tag>
                    </Col>
                    <Col span={6}>
                        <Tag
                            color="#F57C00"
                            style={{
                                width: '100%',
                                height: 40,
                                fontSize: 14,
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 22,
                            }}
                        >
                            {`Gasto pendiente : $ ${MilesFormat(
                                handleCalculatePendingAmmountEntries()
                            )}`}
                        </Tag>
                    </Col>
                </Row>
                <br />
                <Collapse accordion defaultActiveKey={[defaultActiveKey]}>
                    <Panel header="Formulario" key={defaultActiveKey}>
                        {renderFormEntry()}
                    </Panel>
                </Collapse>
                <br />
                <Row>
                    <Col
                        span={24}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            width: '100%',
                        }}
                    >
                        {reloadTable && (
                            <Table
                                style={{ width: '100%' }}
                                showHeader={true}
                                dataSource={entries}
                                pagination={false}
                            >
                                <Column
                                    className="column-money"
                                    title="Categoria general"
                                    dataIndex="categoria_general"
                                    key="categoria_general"
                                />
                                <Column
                                    className="column-money"
                                    title="Sub-categoria 3"
                                    dataIndex="subcategoria_tres"
                                    key="subcategoria_tres"
                                />
                                <Column
                                    className="column-money"
                                    title="Sub-categoria 3"
                                    dataIndex="codigo_categoria_tres"
                                    key="codigo_categoria_tres"
                                />
                                <Column
                                    className="column-money"
                                    title="Cantidad"
                                    dataIndex="cantidad"
                                    key="cantidad"
                                />
                                <Column
                                    className="column-money"
                                    title="Costo unitario"
                                    dataIndex="costo_unitario"
                                    key="costo_unitario"
                                    render={(_, record: any) => (
                                        <>{`$ ${MilesFormat(
                                            record.costo_unitario
                                        )}`}</>
                                    )}
                                />
                                <Column
                                    className="column-money"
                                    title="Impuesto"
                                    dataIndex="porcentaje_impuesto"
                                    key="porcentaje_impuesto"
                                    render={(_, record: any) => (
                                        <>{`${record.porcentaje_impuesto}%`}</>
                                    )}
                                />
                                <Column
                                    className="column-money"
                                    title="Valor impuesto"
                                    dataIndex="valor_impuesto"
                                    key="valor_impuesto"
                                    render={(_, record: any) => (
                                        <>{`$ ${MilesFormat(
                                            record.valor_impuesto
                                        )}`}</>
                                    )}
                                />
                                <Column
                                    className="column-money"
                                    title="Costo total"
                                    dataIndex="costo_total"
                                    key="costo_total"
                                    render={(_, record: any) => (
                                        <>{`$ ${MilesFormat(
                                            record.costo_total
                                        )}`}</>
                                    )}
                                />
                                <Column
                                    title="Actions"
                                    dataIndex="actions"
                                    key="actions"
                                    className="column-money"
                                    render={(__, record: any, index) => (
                                        <>
                                            <Popover
                                                content={
                                                    <Button
                                                        style={{
                                                            backgroundColor:
                                                                '#E6100D',
                                                            color: 'white',
                                                        }}
                                                        onClick={() =>
                                                            handleDeleteEntry(
                                                                record._id
                                                            )
                                                        }
                                                    >
                                                        Confirmar anulación
                                                    </Button>
                                                }
                                                title="¿Seguro que desea anular este registro?"
                                                trigger="click"
                                                visible={
                                                    deleteConfirmation._id ===
                                                        record._id &&
                                                    deleteConfirmation.show ===
                                                        true
                                                        ? true
                                                        : false
                                                }
                                                onVisibleChange={() =>
                                                    setDeleteConfirmation({
                                                        _id: record._id,
                                                        show: !deleteConfirmation.show,
                                                    })
                                                }
                                            >
                                                <Button
                                                    style={{
                                                        backgroundColor:
                                                            '#E6100D',
                                                    }}
                                                    icon={
                                                        <DeleteOutlined
                                                            style={{
                                                                fontSize:
                                                                    '1.1rem',
                                                                color: 'white',
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Popover>
                                        </>
                                    )}
                                />
                            </Table>
                        )}
                    </Col>
                </Row>
            </Form>
            <br />
            {/* <Row gutter={8} style={{
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
            onClick={() => handleInsertEntries()}
            style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}
          >
            Confirmar
          </Button>
        </Col>
      </Row> */}
        </Spin>
    )
}

export default EntriesView
