import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { IAlertMessageContent, IButtonsProps } from '../../models/index.models'
import {
    CANCEL,
    CONFIRM,
    FILTERS_PAYMENTS,
    N_PER_PAGE,
    OK,
    PAYMENTS_COLUMNS_TABLE,
    PERMISSIONS,
} from '../../constants/var'
import {
    IResponseAllPayments,
    IResponsePayment,
    PaymentModel,
} from '../../models/payments.models'
import {
    filterPaymentsService,
    getAllPaymentsService,
    deleteGeneralPaymentService,
} from '../../services'

import SubBarComponent from '../../component/Subbar/SubBar'
import HeaderTableComponent from '../../component/HeaderTable/HeaderTable'
import ModalComponent from '../../component/Modal/Modal'
import TableComponent from '../../component/Table/Table'
import PaginationComponent from '../../component/Pagination/Pagination'

import DetailsPaymentView from './detailsPayment.view'
import ManagePaymentView from './managePayment.view'
import GeneratePaymentView from './generatepayment.view'
import GenerateGroupPaymentView from './grupal/generategrupalpayment.view'

import AlertComponent from '../../component/Alert/Alert'

import { MilesFormat } from '../../libs/formattedPesos'
import { getUserFromLocalStorage } from '../../functions/getLocalStorage'

interface IPaymentsViewProps {
    authorized: boolean
}

interface IFilterSelected {
    headerFilter: string
    filter: string
}

const PaymentsView: React.FunctionComponent<IPaymentsViewProps> = ({
    authorized,
}) => {
    const buttons: IButtonsProps[] = [
        {
            _id: 'grouppayment',
            title: 'PAGO GRUPAL',
            size: 'large',
            widthModal: 1400,
            showButtons: [{ _id: CANCEL }, { _id: CONFIRM }],
            permission: PERMISSIONS.PAYMENT_GROUP,
            icon: 'group',
            tooltipText: 'Pago grupal',
            customStyle: { width: '50px' },
        },
    ]

    const [permissions, setPermissions] = useState<string[]>([])
    const [ActualModal, setActualModal] = useState<IButtonsProps>(buttons[0])
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [payments, setPayments] = useState<PaymentModel[]>([])
    const [idSelectedPayment, setIdSelectedPayment] = useState<string>('')
    const [paymentSelected, setPaymentSelected] = useState<PaymentModel>()
    const [filterText, setFilterText] = useState<string>('')
    const [optionFilter, setOptionFilter] = useState<number>(0)
    const [actualPage, setActualPage] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(1)
    const [filterMode, setFilterMode] = useState<boolean>(false)
    const [filterObjectSelected, setFilterObjectSelected] =
        useState<IFilterSelected | null>()

    const handleClickButton = (button: IButtonsProps) => {
        setActualModal(button)
        setOpenModal(true)
    }

    const handleCLickActionTable = (
        id: string,
        idregister: string | undefined
    ) => {
        switch (id) {
            case 'details':
                setActualModal({
                    _id: id,
                    title: 'Detalle de pago',
                    size: 'small',
                    widthModal: 900,
                    showButtons: [{ _id: OK }],
                })
                idregister &&
                    setPaymentSelected(
                        payments.find(payment => payment._id === idregister)
                    )
                setOpenModal(true)
                break
            case 'managepayment':
                setActualModal({
                    _id: id,
                    title: 'Gestion de pagos',
                    size: 'small',
                    widthModal: 1000,
                    showButtons: [{ _id: OK }],
                })
                idregister &&
                    setPaymentSelected(
                        payments.find(payment => payment._id === idregister)
                    )
                setOpenModal(true)
                break
            case 'generatepayment':
                setActualModal({
                    _id: id,
                    title: 'Generar pago',
                    size: 'small',
                    widthModal: 900,
                    showButtons: [{ _id: CANCEL }, { _id: CONFIRM }],
                })
                idregister &&
                    setPaymentSelected(
                        payments.find(payment => payment._id === idregister)
                    )
                setOpenModal(true)
                break
            case 'delete':
                idregister && setIdSelectedPayment(idregister)
                setActualModal({
                    _id: id,
                    title: '',
                    size: 'small',
                    widthModal: 0,
                    showButtons: [],
                })
                break
            default:
                break
        }
    }

    const handleChangePagination = (newpage: number) => {
        setLoading(true)
        if (filterMode) {
            filterPayments(
                filterObjectSelected?.filter || '',
                filterObjectSelected?.headerFilter || '',
                newpage
            )
            return
        }
        if (!filterMode) {
            getPayments(newpage)
            return
        }
    }

    const handleCloseModal = (value: string, message: string) => {
        setOpenModal(false)
        if (value === '') return
        setMessageAlert({ message, type: 'success', show: true })
        if (value === 'reload') {
            getPayments(1)
        }
    }

    const handleTransformValues = (payments: PaymentModel[]) => {
        const aux = payments.map(payment => {
            return {
                ...payment,
                valor_cancelado_string: `$ ${MilesFormat(
                    payment.valor_cancelado
                )}`,
                valor_servicio_string: `$ ${MilesFormat(
                    payment.valor_servicio
                )}`,
            }
        })
        return aux
    }

    const handleClickSearch = async () => {
        setLoading(true)
        const headfilter = FILTERS_PAYMENTS.find(
            element => element.key === optionFilter
        )
        if (!headfilter) return
        setFilterMode(true)
        setFilterObjectSelected({
            headerFilter: headfilter.name,
            filter: filterText,
        })
        filterPayments(filterText, headfilter.name)
    }

    async function hanbleDeleteGeneralPayment(id: string) {
        const aux: IResponsePayment = await deleteGeneralPaymentService(id)
        if (aux.err === null) {
            setMessageAlert({ message: aux.msg, type: 'success', show: true })
            getPayments(1)
            return setLoading(false)
        }
        return setMessageAlert({ message: aux.res, type: 'error', show: true })
    }

    async function filterPayments(
        date: string,
        headFilter: string,
        pageNumber: number = 1
    ) {
        const aux: IResponseAllPayments = await filterPaymentsService(
            2,
            date,
            headFilter,
            pageNumber,
            N_PER_PAGE
        )

        if (!aux.err) {
            setPayments(aux.pagos)
            setActualPage(aux.pagina_actual)
            setTotalItems(aux.total_items)
            setLoading(false)
            return
        }
        if (aux.err) {
            setMessageAlert({ message: aux.err, type: 'error', show: true })
            setLoading(false)
            return
        }
    }

    async function getPayments(pagenumber: number) {
        setLoading(true)
        const aux: IResponseAllPayments = await getAllPaymentsService(
            pagenumber,
            N_PER_PAGE
        )
        if (!aux.err) {
            setPayments(aux.pagos)
            setActualPage(aux.pagina_actual)
            setTotalItems(aux.total_items)
            setLoading(false)
            return
        }
        setLoading(false)
        return setMessageAlert({
            message: 'No se ha podido cargar los pagos',
            type: 'error',
            show: true,
        })
    }

    const handleClickClean = () => {
        setLoading(true)
        setFilterMode(false)
        setFilterText('')
        setFilterObjectSelected(null)
        getPayments(1)
    }

    //--------------USEEFECT
    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 2500)
        }
    }, [messageAlert])

    useEffect(() => {
        if (ActualModal && ActualModal._id === 'delete') {
            setLoading(true)
            hanbleDeleteGeneralPayment(idSelectedPayment)
            return
        }
    }, [ActualModal])

    useEffect(() => {
        setLoading(true)
        const auxPermissions = getUserFromLocalStorage()
        if (!!auxPermissions && auxPermissions?.permisos.length) {
            setPermissions(auxPermissions.permisos)
        }
        getPayments(1)
    }, [])

    if (!authorized) {
        return <Redirect to="./login" />
    }

    return (
        <div className="container-gi">
            <SubBarComponent title="Pagos" />
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                    customStyle={{
                        width: '60%',
                        height: 50,
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}
                    showIcon
                />
            )}
            <HeaderTableComponent
                title="Pagos ASIS"
                subtitle="Tabla de información"
                buttons={buttons || []}
                dataFilter={FILTERS_PAYMENTS}
                onClick={button => handleClickButton(button)}
                onClickGrupal={() => {}}
                onClickDateFilter={() => {}}
                filterText={filterText}
                setFilterText={setFilterText}
                onClickSearch={() => handleClickSearch()}
                setOptionFilter={setOptionFilter}
                onClickClean={() => handleClickClean()}
                userPermissions={permissions}
            />
            <TableComponent
                onClickAction={(id: string, _id?: string) =>
                    handleCLickActionTable(id, _id)
                }
                onClickDelete={(id, _id) => handleCLickActionTable(id, _id)}
                columns={PAYMENTS_COLUMNS_TABLE}
                data={handleTransformValues(payments)}
                loading={loading}
                showProcessState
                showDetails
                showManagmentPayments
                showGeneratePayment
                showDelete
                enablePagination={false}
                userPermissions={permissions}
                typeModule="payments"
            />
            <br />
            <PaginationComponent
                actualPage={actualPage}
                onChange={(newpage: number) => handleChangePagination(newpage)}
                totalItems={totalItems}
                pageSize={N_PER_PAGE}
            />
            {/* modal */}
            {ActualModal && (
                <ModalComponent
                    visible={OpenModal}
                    title={ActualModal.title}
                    width={ActualModal.widthModal || 500}
                    onClose={() => setOpenModal(false)}
                    onClickConfirm={id => {}}
                    showButtons={ActualModal.showButtons || []}
                >
                    {ActualModal._id === 'details' && (
                        <DetailsPaymentView
                            onCloseModal={(value, message) =>
                                handleCloseModal(value, message)
                            }
                            paymentSelected={paymentSelected}
                        />
                    )}
                    {ActualModal._id === 'managepayment' && (
                        <ManagePaymentView
                            onCloseModal={(value, message) =>
                                handleCloseModal(value, message)
                            }
                            paymentSelected={paymentSelected}
                        />
                    )}
                    {ActualModal._id === 'generatepayment' && (
                        <GeneratePaymentView
                            onCloseModal={(value, message) =>
                                handleCloseModal(value, message)
                            }
                            paymentSelected={paymentSelected}
                        />
                    )}
                    {ActualModal._id === 'grouppayment' && (
                        <GenerateGroupPaymentView
                            onCloseModal={(value, message) =>
                                handleCloseModal(value, message)
                            }
                        />
                    )}
                </ModalComponent>
            )}
        </div>
    )
}

export default PaymentsView
