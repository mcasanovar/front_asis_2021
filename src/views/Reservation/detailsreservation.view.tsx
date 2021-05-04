import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Button, Spin, Typography, Form } from "antd";

import { IResponseReservation, ReservationModel } from '../../models/reservation.models';
import { getWorkersGIService } from '../../services';
import { GiModel, IResponseGI } from '../../models/gi.models';
import { getOneReservationService } from '../../services/reservation.services';
import { IAlertMessageContent } from '../../models/index.models';
import { ReservationInitialization } from '../../initializations/reservation.initialization';

import AlertComponent from "../../component/Alert/Alert";

interface IEditReservationViewProps {
  onCloseModal: (value: string, message: string) => string | void
  _id?: string
}

const EditReservationView: React.FunctionComponent<IEditReservationViewProps> = ({
  onCloseModal,
  _id = ''
}) => {
  const { Title } = Typography;

  const [loading, setLoading] = useState<boolean>(false);
  const [workers, setWorkers] = useState<GiModel[]>([]);
  const [newReservationData, setNewReservationData] = useState<ReservationModel>(ReservationInitialization);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [assignProfessional, setAssignProfessional] = useState<GiModel>();

  //----------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true)

    async function getWorkers() {
      const aux: IResponseGI = await getWorkersGIService();
      aux.err === null && setWorkers(aux.res || [])
    }

    async function getOneReservations() {
      const aux: IResponseReservation = await getOneReservationService(_id);
      if (aux.err !== null) {
        setMessageAlert({ message: aux.err, type: 'error', show: true });
        return
      }
      const reservation: ReservationModel = aux.res;
      setNewReservationData(reservation);
    }

    getWorkers();
    getOneReservations();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (newReservationData._id !== '' && workers.length > 0) {
      const aux = workers.find((worker) => worker._id === newReservationData.id_GI_personalAsignado)
      if (aux) { setAssignProfessional(aux) }
      setLoading(false)
    }
    //eslint-disable-next-line
  }, [newReservationData._id, workers]);

  console.log('detalle', newReservationData)

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`Reserva ${newReservationData.codigo}`}</Title>}
      <Input.Group>
        <Form layout='vertical'>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label='Código reserva'
              >
                <Input
                  readOnly
                  value={newReservationData.codigo}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Profesional Asignado'
              >
                <Input
                  readOnly
                  value={assignProfessional?.razon_social && `${assignProfessional.rut} - ${assignProfessional.razon_social}`}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Fecha inicio'
              >
                <Input
                  readOnly
                  value={newReservationData.fecha_reserva}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Hora inicio'
              >
                <Input
                  readOnly
                  value={newReservationData.hora_reserva}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Fecha término'
              >
                <Input
                  readOnly
                  value={newReservationData.fecha_reserva_fin}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Hora término'
              >
                <Input
                  readOnly
                  value={newReservationData.hora_reserva_fin}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label='Sucursal'
              >
                <Input
                  readOnly
                  value={newReservationData.sucursal}
                />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
                <p className="ant-upload-hint">10mb max.</p>
              </Upload.Dragger>
            </Col> */}
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label='Observacion'
              >
                {newReservationData.observacion.length > 0 && newReservationData.observacion.map((obs, index) => (
                  <Input
                    key={index}
                    readOnly
                    value={obs.obs || ''}
                  />
                ))}
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <TableComponent
                onClickAction={() => { }}
                onClickDelete={() => { }}
                useStyle={false}
                enablePagination={false}
              />
            </Col> */}
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
        </Form>
      </Input.Group>
    </Spin>
  );
};

export default EditReservationView;
