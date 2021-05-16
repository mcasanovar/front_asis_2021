import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Input, Row, Col, Select, Table, Tag, Button, Form, Typography, Spin } from "antd";

import { EvaluationModel, IResponseEvaluation } from '../../models/evaluations.models';
import { EvaluationInitialization } from '../../initializations/evaluation.initialization';
import { FORMAT_DATE } from '../../constants/var';
import { confirmExamService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

interface IConfirmExamViewProps {
  onCloseModal: (value: string, message: string) => string | void
  evaluationSelected: EvaluationModel | undefined
}

const ConfirmExamView: React.FunctionComponent<IConfirmExamViewProps> = ({
  onCloseModal,
  evaluationSelected
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const { Column } = Table;
  const { Title } = Typography;

  const [loading, setLoading] = useState<boolean>(false);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [newDataEvaluation, setNewDataEvaluation] = useState<EvaluationModel>(evaluationSelected || EvaluationInitialization);
  const [observation, setObservation] = useState<string>('');
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });

  const handleConfirmEvaluation = async () => {
    setLoading(true);
    const aux: IResponseEvaluation = await confirmExamService(
      newDataEvaluation._id,
      newDataEvaluation.estado_archivo,
      moment().format(FORMAT_DATE),
      moment().format('HH:mm'),
      observation
    );
    if (aux.err === null) {
      return onCloseModal('reload', aux.msg);
    }
    return setMessageAlert({ message: aux.err, type: 'error', show: true });
  };

  //------------------------ USEEFECT
  useEffect(() => {
    if (newDataEvaluation.estado_archivo !== 'Cargado') return setDisabledConfirm(false)
    return setDisabledConfirm(true);
  }, [newDataEvaluation.estado_archivo]);

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`${newDataEvaluation.nombre_servicio} - ${newDataEvaluation.codigo}`}</Title>}
      <Form layout='vertical'>
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                validateStatus={newDataEvaluation.estado_archivo !== 'Cargado' ? 'success' : 'error'}
                help={newDataEvaluation.estado_archivo !== 'Cargado' ? '' : 'Seleccione'}
                label='Estado'
              >
                <Select
                  style={{ width: '100%' }}
                  onSelect={(e) => setNewDataEvaluation({ ...newDataEvaluation, estado_archivo: e.toString() })}
                  id='error'
                >
                  <Option value="Aprobado">Aprobado</Option>
                  <Option value="Rechazado">Rechazado</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Fecha evaluación'
              >
                <Input
                  readOnly
                  value={moment(newDataEvaluation.fecha_evaluacion, FORMAT_DATE).format(FORMAT_DATE)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Hora evaluación'
              >
                <Input
                  readOnly
                  value={newDataEvaluation.hora_inicio_evaluacion}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Form.Item
                label='Observaciones'
              >
                <TextArea
                  rows={4}
                  onChange={(e) => setObservation(e.currentTarget.value)}
                  value={observation}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={24} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
            }}>
              <Table style={{ width: '100%' }} showHeader={true} dataSource={evaluationSelected?.observaciones} pagination={false}>
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
              span={6}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                onClick={() => onCloseModal('', '')}
                style={{ backgroundColor: '#E10D17', color: 'white' }}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => handleConfirmEvaluation()}
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

export default ConfirmExamView;
