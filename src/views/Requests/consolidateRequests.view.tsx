import React, { useState, useEffect } from 'react'
import { Input, Spin, Row, Col, Form, Select, Button } from 'antd'
import { IAlertMessageContent } from '../../models/index.models'
import AlertComponent from '../../component/Alert/Alert'
import { MONTHS, YEARS_CHARTS } from '../../constants/var'
import { SelectValue } from 'antd/lib/select'
import { validateEmail } from '../../functions/validators/index.validators'
import { IResponseRequest } from '../../models/request.models'
import { consolidateResquestService } from '../../services'

interface IConsolidateRequestsViewProps {
    onCloseModal: (value: string, message: string) => string | void
}

const ConsolidateRequestsView: React.FunctionComponent<
    IConsolidateRequestsViewProps
> = ({ onCloseModal }) => {
    const { Option } = Select

    const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
    const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({
        message: '',
        type: 'success',
        show: false,
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [year, setyear] = useState<string>('')
    const [month, setmonth] = useState<string>('')
    const [isValidEmails, setIsValidEmails] = useState<boolean>(false)
    const [emails, setEmails] = useState<string>('')

    const handleGenerateReport = async () => {
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

        const aux: IResponseRequest = await consolidateResquestService(
            month,
            year,
            { emails: arrayEmails }
        )
        if (!aux.err) {
            onCloseModal('sended', aux.msg)
            return
        }
        setMessageAlert({ message: aux.err, type: 'error', show: true })
        setLoading(false)
        return
    }

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

    //---------------------------------------USEEFFECTS
    useEffect(() => {
        if (messageAlert.show) {
            setTimeout(() => {
                setMessageAlert({ ...messageAlert, show: false })
            }, 3000)
        }
    }, [messageAlert])

    useEffect(() => {
        if (!emails) return setDisabledConfirm(true)
        if (!isValidEmails) return setDisabledConfirm(true)
        if (!year || !month) return setDisabledConfirm(true)
        return setDisabledConfirm(false)
    }, [isValidEmails, emails, year, month])

    return (
        <Spin
            spinning={loading}
            size="large"
            tip="Cargando...Esto puede llegar a tardar hasta 1 minuto..."
        >
            {messageAlert.show && (
                <AlertComponent
                    message={messageAlert.message}
                    type={messageAlert.type}
                />
            )}
            <Input.Group>
                <Form layout="vertical">
                    <Row gutter={8}>
                        <Col span={4}>
                            <Form.Item
                                label="Mes"
                                validateStatus={!!month ? 'success' : 'error'}
                                help={!!month ? '' : 'Seleccione mes'}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setmonth(e.toString())
                                    }
                                >
                                    {MONTHS.map((month, index) => (
                                        <Option key={index} value={month}>
                                            {month}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Año"
                                validateStatus={!!year ? 'success' : 'error'}
                                help={!!year ? '' : 'Seleccione año'}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    onSelect={(e: SelectValue) =>
                                        setyear(e.toString())
                                    }
                                >
                                    {YEARS_CHARTS.map((year, index) => (
                                        <Option key={index} value={year}>
                                            {year}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Input.Group>
            <br />
            <Row>
                <Col span={24}>
                    <Form layout="vertical">
                        <Row gutter={8}>
                            <Col span="24">
                                <Form.Item
                                    label="Para enviar multiples correos, puede separarlos por coma (,)."
                                    validateStatus={
                                        isValidEmails ? 'success' : 'error'
                                    }
                                    help={
                                        isValidEmails
                                            ? ''
                                            : 'El correo o los correos ingresados no contienen el formato correcto.'
                                    }
                                >
                                    <Input
                                        placeholder="Ingrese los correos electrónicos"
                                        onChange={e =>
                                            handleValidEmails(
                                                e.currentTarget.value
                                            )
                                        }
                                        value={emails}
                                        id="error"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <br />
            <Row
                gutter={8}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '98%',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}
            >
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
                        onClick={() => handleGenerateReport()}
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
                        Generar Informe
                    </Button>
                </Col>
            </Row>
        </Spin>
    )
}

export default ConsolidateRequestsView
