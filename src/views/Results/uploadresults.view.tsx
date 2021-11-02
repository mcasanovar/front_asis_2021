import React, { useState, FunctionComponent } from 'react';
import { Input, Row, Col, Upload, Table, Tag, Spin, Typography, Form, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { IAlertMessageContent } from '../../models/index.models';
import { ResultModel, IResponseResults } from '../../models/results.model';

import AlertComponent from "../../component/Alert/Alert";
import { MapResult } from '../../functions/mappers';
import { ResultsInitalization } from '../../initializations/results.initialization';
import { uploadResultService } from '../../services';

interface IUploadResultsViewProps {
  onCloseModal: (value: string, message: string) => string | void
  resultSelected: ResultModel | undefined
}

const UploadResultsView: FunctionComponent<IUploadResultsViewProps> = ({
  onCloseModal,
  resultSelected
}) => {
  const { TextArea } = Input;
  const { Column } = Table;
  const { Title } = Typography;

  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [observation, setObservation] = useState<string>('');
  const [file, setFile] = useState<string | Blob | null>(null);

  const getFileUploaded = (e: any) => {
    e && setFile(e.file)
    e.onSuccess('ok');
  };

  const handleLoadResult = async () => {
    setLoading(true);
    let formData = new FormData();
    const resultMapped = MapResult(resultSelected || ResultsInitalization, observation);
    formData.append("data", JSON.stringify(resultMapped));
    file !== null && formData.append("archivo", file);
    const result: IResponseResults = await uploadResultService(resultSelected?._id || '', formData);
    if (result.err === null) {
      onCloseModal('reload', result.msg)
    } else {
      return setMessageAlert({ message: result.err, type: 'error', show: true });
    }
  };

  return (
    <Spin spinning={loading} size='large' tip='Cargando...'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`${resultSelected?.nombre_servicio} - ${resultSelected?.codigo}`}</Title>}
      <Row>
        <Col span={24}>
          <Form layout='vertical'>
            <Input.Group>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label='Observaciones'
                  >
                    <TextArea
                      rows={6}
                      onChange={(e) => setObservation(e.currentTarget.value)}
                      value={observation}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Examen'
                    getValueFromEvent={getFileUploaded}
                    valuePropName="fileData"
                    validateStatus={file !== null ? 'success' : 'error'}
                    help={file !== null ? '' : 'seleccione archivo'}
                  >
                    <Upload.Dragger
                      name="file"
                      customRequest={getFileUploaded}
                      accept='*'
                      maxCount={1}
                      beforeUpload={file =>{
                        if(file.type !== 'application/pdf'){
                          message.error("Solo se permiten archivo con extensión .pdf")
                        }
                        return file.type === 'application/pdf' ? true : Upload.LIST_IGNORE
                      }}
                      onRemove={() => setFile(null)}
                      id='error'
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
            </Input.Group>
          </Form>
        </Col>
        <Col span={24} style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          paddingLeft: '1rem'
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
            onClick={() => handleLoadResult()}
            disabled={file === null}
            style={file !== null ?
              { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
              { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
          >
            Confirmar
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};

export default UploadResultsView;
