import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, DatePicker, TimePicker, Form, Spin, Typography, Table, Tag, Button } from "antd";

import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";
import { IResponseResults, ResultModel } from '../../models/results.model';
import { ResultsInitalization } from '../../initializations/results.initialization';
import { FORMAT_DATE } from '../../constants/var';
import { confirmResultService } from '../../services';
import moment from 'moment';
import { date } from 'faker';

interface IConfirmResultViewProps {
  onCloseModal: (value: string, message: string) => string | void
  resultSelected?: ResultModel | undefined
}

const ConfirmResultView: React.FunctionComponent<IConfirmResultViewProps> = ({
  onCloseModal,
  resultSelected
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const { Title } = Typography;
  const { Column } = Table;

  const [loading, setLoading] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [newDataResult, setNewDataResult] = useState<ResultModel>(resultSelected || ResultsInitalization);
  const [observation, setObservation] = useState<string>('');
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);

  const handleConfirmResult = async () => {
    setLoading(true);
    const aux: IResponseResults = await confirmResultService(newDataResult._id, {
      ...newDataResult,
      observaciones: observation
    });
    if (aux.err === null) {
      return onCloseModal('reload', aux.msg);
    }
    return setMessageAlert({ message: aux.err, type: 'error', show: true });
  };

  //------------------------ USEEFECT
  useEffect(() => {
    if (newDataResult.estado_archivo !== '') {
      if (newDataResult.estado_archivo === 'Rechazado') {
        setDisabledConfirm(false);
        return
      }
      if (!!newDataResult.estado_resultado 
        && !!newDataResult.vigencia_examen
        && !!newDataResult?.fecha_resultado
        && !!newDataResult?.hora_resultado){
        return setDisabledConfirm(false);
      }
    }
    return setDisabledConfirm(true);
  }, [newDataResult]);

  useEffect(() => {
    setNewDataResult({
      ...newDataResult,
      fecha_resultado: moment().format(FORMAT_DATE),
      hora_resultado: moment().format('HH:mm')
    })
  }, []);
  //--------------------------------

  console.log(newDataResult)

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`Evaluación ${resultSelected?.codigo}`}</Title>}
      <Form layout='vertical'>
        <Input.Group>
          <Row>
            <Col span={12}>
              <Input.Group>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      label='Estado archivo'
                    >
                      <Select
                        style={{ width: '100%' }}
                        onSelect={(e) => setNewDataResult({ ...newDataResult, estado_archivo: e.toString(), estado_resultado: '' })}
                      >
                        <Option value="Aprobado">Aprobado</Option>
                        <Option value="Rechazado">Rechazado</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {newDataResult.estado_archivo === 'Aprobado' &&
                    <Col span={12}>
                      <Form.Item
                        label='Estado resultado'
                        validateStatus={newDataResult.estado_resultado !== '' ? 'success' : 'error'}
                        help={newDataResult.estado_resultado !== '' ? '' : 'Seleccione resultado'}
                      >
                        <Select
                          style={{ width: '100%' }}
                          onSelect={(e) => setNewDataResult({ ...newDataResult, estado_resultado: e.toString() })}
                        >
                          <Option value="Aprobado">Aprobado</Option>
                          <Option value="Aprobado con obs">Aprobado con obs</Option>
                          <Option value="Pendiente">Pendiente</Option>
                          <Option value="Rechazado">Rechazado</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  }
                </Row>
                {newDataResult.estado_archivo === 'Aprobado' &&
                  <Row gutter={8}>
                    <Col span={8}>
                      <Form.Item
                        label='Vigencia examen'
                        validateStatus={!!newDataResult.vigencia_examen ? 'success' : 'error'}
                        help={!!newDataResult.vigencia_examen ? '' : 'Seleccione vigencia'}
                      >
                        <Select
                          style={{ width: '100%' }}
                          onSelect={(e) => setNewDataResult({ ...newDataResult, vigencia_examen: parseInt(e.toString()) })}
                        >
                          <Option value="1">1</Option>
                          <Option value="3">3</Option>
                          <Option value="6">6</Option>
                          <Option value="12">12</Option>
                          <Option value="24">24</Option>
                          <Option value="36">36</Option>
                          <Option value="48">48</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label='Fecha resultado'
                        validateStatus={newDataResult?.fecha_resultado && newDataResult.fecha_resultado !== 'En Revisión' ? 'success' : 'error'}
                        help={newDataResult?.fecha_resultado && newDataResult.fecha_resultado !== 'En Revisión' ? '' : 'Seleccione vigencia'}
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          onChange={(e) => setNewDataResult({ ...newDataResult, fecha_resultado: e?.format(FORMAT_DATE) })}
                          value={!newDataResult.fecha_resultado ? moment(new Date(), FORMAT_DATE) : moment(newDataResult.fecha_resultado, FORMAT_DATE)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label='Hora resultado'
                        validateStatus={newDataResult?.hora_resultado ? 'success' : 'error'}
                        help={newDataResult?.hora_resultado ? '' : 'Seleccione vigencia'}
                      >
                        <TimePicker
                          format='HH:mm'
                          style={{ width: '100%' }}
                          onChange={(e) => setNewDataResult({ ...newDataResult, hora_resultado: e?.format('HH:mm') })}
                          defaultValue={moment(new Date(), 'HH:mm')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                }
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label='Observaciones'
                    >
                      <TextArea
                        rows={4}
                        onChange={(e) => setObservation(e.currentTarget.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label='Condicionantes'
                    >
                      <Select
                        mode="tags"
                        onChange={(e: any) => setNewDataResult({ ...newDataResult, condicionantes: e })}
                        style={{ width: '100%' }}
                      >
                        <Option value="lentes" key='1'>Uso lentes</Option>
                        <Option value="audifonos" key='2'>Uso audífonos</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
            }}>
              <Table style={{ width: '100%' }} showHeader={true} dataSource={resultSelected?.observaciones} pagination={false}>
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
                onClick={() => handleConfirmResult()}
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

export default ConfirmResultView;
