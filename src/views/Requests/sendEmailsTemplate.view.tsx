import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Form, Button, Spin, Typography, Tag } from 'antd'
import { validateEmail } from '../../functions/validators/index.validators'
import { IResponseRequest, RequestModel } from '../../models/request.models'
import { IAlertMessageContent } from '../../models/index.models'

import AlertComponent from '../../component/Alert/Alert'
import {
    IResponseReservation,
    ReservationModel,
} from '../../models/reservation.models'
import { sendMailsTemplateReservationsService } from '../../services/reservation.services'
import {
    sendMailsTemplateService,
    sendMailsTemplatResultService,
    sendMailsTemplatRequestPaymentService,
} from '../../services'
import { IResponseResults, ResultModel } from '../../models/results.model'
import {
    IResponseRequestPayment,
    RequestPaymentModel,
} from '../../models/requestpayment.models'

interface ISendEmailsTemplateViewProps {
    onCloseModal: (value: string, message: string) => string | void
    request:
        | RequestModel
        | ReservationModel
        | ResultModel
        | RequestPaymentModel
        | undefined
    type: string
}

const SendEmailsTemplateView: React.FunctionComponent<
    ISendEmailsTemplateViewProps
> = ({ onCloseModal, request, type }) => {
    const { Title } = Typography

    const [loading, setLoading] = useState<boolean>(false)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [emails, setEmails] = useState<string>('')
    const [isValidEmails, setIsValidEmails] = useState<boolean>(false)
    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)

    const handleValidEmails = (emailsString: string) => {
        setEmails(emailsString)
        if (!emailsString) return setIsValidEmails(false)
        if (emailsString.includes(',')) {
            const aux = emailsString.split(',')
            const isValid = aux.some(element => !validateEmail(element))
            return isValid ? setIsValidEmails(false) : setIsValidEmails(true)
        }
        if (!emailsString.includes(',')) {
            if (!validateEmail(emailsString)) return setIsValidEmails(false)
            return setIsValidEmails(true)
        }
    }

    const handleSelecctionMail = (selection: string) => {
        if (selection === 'Solicitud') {
            handleSendEmails()
            return
        }
        if (selection === 'Reserva') {
            handleSendEmailsReservation()
            return
        }
        if (selection === 'Resultado') {
            handleSendEmailsResult()
            return
        }
        if (selection === 'Cobranza') {
            handleSendEmailsRequestPayment()
            return
        }
    }

    const handleSendEmails = async () => {
        setLoading(true)
        let arrayEmails = []
        if (!emails.includes(',')) {
            arrayEmails.push({
                email: emails.trim(),
                name: emails.trim(),
            })
        }
        if (emails.includes(',')) {
            const aux = emails.split(',')
            arrayEmails = aux.map(mail => {
                return {
                    email: mail.trim(),
                    name: mail.trim(),
                }
            })
        }
        const aux: IResponseRequest = await sendMailsTemplateService({
            ...request,
            emailsArray: arrayEmails,
            estado: request?.estado,
        })
        if (!aux.err) {
            onCloseModal('sended', aux.msg)
            return
        }
        setMessageAlert({ message: aux.err, type: 'error', show: true })
        setLoading(false)
        return
    }

    const handleSendEmailsReservation = async () => {
        setLoading(true)
        let arrayEmails = []
        if (!emails.includes(',')) {
            arrayEmails.push({
                email: emails.trim(),
                name: emails.trim(),
            })
        }
        if (emails.includes(',')) {
            const aux = emails.split(',')
            arrayEmails = aux.map(mail => {
                return {
                    email: mail.trim(),
                    name: mail.trim(),
                }
            })
        }
        const result: IResponseReservation =
            await sendMailsTemplateReservationsService({
                ...request,
                emailsArray: arrayEmails,
            })
        if (!result.err) {
            onCloseModal('sended', result.msg)
            return
        }
        setMessageAlert({ message: result.err, type: 'error', show: true })
        setLoading(false)
        return
    }

    const handleSendEmailsResult = async () => {
        setLoading(true)
        let arrayEmails = []
        if (!emails.includes(',')) {
            arrayEmails.push({
                email: emails.trim(),
                name: emails.trim(),
            })
        }
        if (emails.includes(',')) {
            const aux = emails.split(',')
            arrayEmails = aux.map(mail => {
                return {
                    email: mail.trim(),
                    name: mail.trim(),
                }
            })
        }

        const result: IResponseResults = await sendMailsTemplatResultService(
            request?._id || '',
            { emailsArray: arrayEmails }
        )
        if (result.err === 98) {
            setMessageAlert({ message: result.msg, type: 'error', show: true })
            setLoading(false)
            return
        }
        if (!!result.err) {
            setMessageAlert({ message: result.err, type: 'error', show: true })
            setLoading(false)
            return
        }

        onCloseModal('sended', result.msg)
        return
    }

    const handleSendEmailsRequestPayment = async () => {
        setLoading(true)
        let arrayEmails = []
        if (!emails.includes(',')) {
            arrayEmails.push({
                email: emails.trim(),
                name: emails.trim(),
            })
        }
        if (emails.includes(',')) {
            const aux = emails.split(',')
            arrayEmails = aux.map(mail => {
                return {
                    email: mail.trim(),
                    name: mail.trim(),
                }
            })
        }

        const result: IResponseRequestPayment =
            await sendMailsTemplatRequestPaymentService(request?._id || '', {
                emailsArray: arrayEmails,
            })
        if (result.err === 98) {
            setMessageAlert({ message: result.msg, type: 'error', show: true })
            setLoading(false)
            return
        }
        if (!!result.err) {
            setMessageAlert({ message: result.err, type: 'error', show: true })
            setLoading(false)
            return
        }

        onCloseModal('sended', result.msg)
        return
    }

    //--------------------------USEEFFECT
    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 3000)
        }
    }, [messageAlert])

    useEffect(() => {
        if (!emails) return setDisabledConfirm(true)
        if (isValidEmails) return setDisabledConfirm(false)
        return setDisabledConfirm(true)
    }, [isValidEmails, emails])

    return (
        <Spin spinning={loading} size="large" tip="Enviando...">
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            <Row gutter={8}>
                <Col span="22">
                    {<Title level={4}>{`${type} ${request?.codigo}`}</Title>}
                </Col>
                <Col span="2">
                    <Tag
                        color={
                            request?.estado === 'Ingresado'
                                ? '#2db7f5'
                                : request?.estado === 'Vencido'
                                ? '#E41B0E'
                                : '#4CAF50'
                        }
                    >
                        {request?.estado}
                    </Tag>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span="22">
                    {
                        <Title level={5}>
                            {request?.estado === 'Ingresado'
                                ? `Envio de correo para aviso de INGRESO de ${type.toLowerCase()} seleccionada`
                                : request?.estado === 'Confirmado'
                                ? `Envio de correo para aviso de CONFIRMACION de ${type.toLowerCase()} seleccionada`
                                : `Envío de ${type.toUpperCase()} seleccionado`}
                        </Title>
                    }
                </Col>
            </Row>
            <br />
            <Form layout="vertical">
                <Row gutter={8}>
                    <Col span="24">
                        <Form.Item
                            label="Para enviar multiples correos, puede separarlos por coma (,)."
                            validateStatus={isValidEmails ? 'success' : 'error'}
                            help={
                                isValidEmails
                                    ? ''
                                    : 'El correo o los correos ingresados no contienen el formato correcto.'
                            }
                        >
                            <Input
                                placeholder="Ingrese los correos electrónicos"
                                onChange={e =>
                                    handleValidEmails(e.currentTarget.value)
                                }
                                value={emails}
                                id="error"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <br />
                <Row
                    gutter={8}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}
                >
                    <Col
                        span={4}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            onClick={() => onCloseModal('', '')}
                            style={{
                                backgroundColor: '#E10D17',
                                color: 'white',
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleSelecctionMail(type)}
                            disabled={disabledConfirm}
                            style={
                                !disabledConfirm
                                    ? {
                                          backgroundColor: 'green',
                                          borderColor: 'green',
                                          color: 'white',
                                      }
                                    : {
                                          backgroundColor: 'grey',
                                          borderColor: 'grey',
                                          color: 'white',
                                      }
                            }
                        >
                            Confirmar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Spin>
    )
}

export default SendEmailsTemplateView
