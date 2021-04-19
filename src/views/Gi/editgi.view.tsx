import React, { useState } from 'react';
import { Spin, Collapse, Row, Col, Button } from 'antd';

import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

interface IEditGiViewProps {
  onCloseModal: (atrr: string) => string | void
}

const EditGiView: React.FunctionComponent<IEditGiViewProps> = ({
  onCloseModal
}) => {
  const { Panel } = Collapse;

  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [disabledSave, setDisabledSave] = useState<boolean>(true);
  const [disabledCancel, setDisabledCancel] = useState<boolean>(false);

  return (
    <>
      <Spin>
        {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
        <br />
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel header="Datos Tributarios" key="1">
            {/* {renderTributaryInformation()} */}
          </Panel>
          <Panel header="Datos de Contacto" key="2">
            {/* {renderContactInformaction()} */}
          </Panel>
          <Panel header="Datos Personales / Laborales" key="3">
            {/* {renderPersonalWorkingInformation()} */}
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
              onClick={() => onCloseModal('')}
              disabled={disabledCancel}
              style={!disabledCancel ? {
                backgroundColor: '#E10D17', color: 'white'
              } : { backgroundColor: 'grey', color: 'white' }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {}}
              disabled={disabledSave}
              style={!disabledSave ?
                { backgroundColor: 'orange', borderColor: 'orange', color: 'white' } :
                { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default EditGiView;
