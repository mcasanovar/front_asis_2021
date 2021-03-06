import React, { useState, useEffect } from 'react';
import { Col, Input, Row, Select, TimePicker, Upload, Form, DatePicker, Button, Spin, Tag } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { CANCEL, CONFIRM, FORMAT_DATE, RAZON_AUSENCES } from '../../constants/var';

import CalendarComponent from "../../component/Calendar/Calendar";
import ModalComponent from "../../component/Modal/Modal";
import moment, { Moment } from 'moment';
import { AusencesModel, IResponseAusences } from '../../models/ausences.models';
import { ausencesInitialization } from '../../initializations/ausences.initialization';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import { MapAbsenseToInsert } from '../../functions/mappers';
import { getAbsensesByIdAndDateService, insertAbsenseService } from '../../services';
import { IAlertMessageContent } from '../../models/index.models';

interface IAbsensesEmployeeViewProps {
  onCloseModal: (value: string, message: string) => string | void,
  idEmployee: string
}

const AbsensesEmployeeView: React.FunctionComponent<IAbsensesEmployeeViewProps> = ({
  onCloseModal,
  idEmployee
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const [loading, setLoading] = useState<boolean>(false);
  const [absenses, setAbsenses] = useState<AusencesModel[]>([]);
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true);
  const [openNewAbsense, setOpenNewAbsense] = useState<boolean>(false);
  const [dates, setDates] = useState<any>([]);
  const [hackValue, setHackValue] = useState<any>([]);
  const [value, setValue] = useState<any>();
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [newDataAusence, setNewDataAusence] = useState<AusencesModel>(ausencesInitialization);
  const [file, setFile] = useState<string | Blob | null>(null);

  const getFileUploaded = (e: any) => {
    e && setFile(e.file)
    e.onSuccess('ok');
  };

  const handleSelectedDate = (date: Moment, type?: string) => {
    setHackValue(undefined);
    setValue([date, date]);
    setOpenNewAbsense(true);
  };

  const handleSelectedHours = (abreviation: string) => {
    const aux = RAZON_AUSENCES.find((razon) => razon.abrev === abreviation);
    if (!aux) {
      setNewDataAusence({
        ...newDataAusence,
        hora_inicio_ausencia: "08:30",
        hora_fin_ausencia: "18:30"
      });
      return
    };
    setNewDataAusence({
      ...newDataAusence,
      hora_inicio_ausencia: aux.hora_inicio,
      hora_fin_ausencia: aux.hora_fin,
      tipo_ausencia: aux.fullName,
      abrev_ausencia: aux.abrev,
      color_ausencia: aux.color
    });
  };

  const disabledDate = (current: Moment) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    // const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return tooEarly;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };

  const handleInsertAbsense = async () => {
    setLoading(true);
    let formData = new FormData();
    const absenseMapped = MapAbsenseToInsert(newDataAusence, idEmployee, value[0], value[1]);
    formData.append("data", JSON.stringify(absenseMapped));
    file !== null && formData.append("archivo", file);
    const aux: IResponseAusences = await insertAbsenseService(formData);
    if (aux.err === null) {
      setLoading(false);
      setNewDataAusence(ausencesInitialization);
      setOpenNewAbsense(false);
      getAbsenses();
      return
    }
    if (aux.err === 98 || aux.res !== '') {
      setLoading(false);
      setMessageAlert({ message: aux.msg, type: 'error', show: true });
      return
    }
  };

  const handleDataRenderDates = (value: Moment) => {
    const aux = absenses.filter((absense) => absense.fecha_inicio_ausencia === value.format(FORMAT_DATE));
    if (aux) {
      return (
        <ul className="events">
          {aux.map(item => (
            <li key={item._id}>
              {/* <Badge color={item.color_ausencia} text={item.tipo_ausencia} /> */}
              <Tag color={item.color_ausencia} style={{fontWeight: 'bold'}}>{item.tipo_ausencia}</Tag>
            </li>
          ))}
        </ul>
      );
    }
  };

  async function getAbsenses() {
    setLoading(true)
    const aux: IResponseAusences = await getAbsensesByIdAndDateService(idEmployee, moment().format('MMMM'), moment().format('YYYY'));
    if (aux.err === null) {
      setAbsenses(aux.res);
      setLoading(false);
      return
    };
    setMessageAlert({ message: aux.err, type: 'error', show: true });
    setLoading(false)
  };

  //----------------------------------------USEEFECT
  useEffect(() => {
    setLoading(true)
    getAbsenses();
  }, []);

  useEffect(() => {
    if (newDataAusence.tipo_ausencia !== '' && file !== null) {
      setDisabledConfirm(false);
    }
  }, [newDataAusence.tipo_ausencia, file]);

  useEffect(() => {
    if (!openNewAbsense) {
      setFile(null);
    }
  }, [openNewAbsense]);

  useEffect(() => {
    if (messageAlert.show) {
      setTimeout(() => {
        setMessageAlert({ ...messageAlert, show: false });
      }, 2500);
    }
  }, [messageAlert]);

  return (
    <>
      <CalendarComponent
        onSelect={(e: Moment) => handleSelectedDate(e)}
        onPanelChange={(e: Moment, type: string) => { }}
        dateCellRender={handleDataRenderDates}
      />
      <ModalComponent
        visible={openNewAbsense}
        title='Ingreso de Ausencias'
        width={800}
        onClose={() => setOpenNewAbsense(false)}
        onClickConfirm={(id) => { }}
        showButtons={[{ _id: CANCEL }, { _id: CONFIRM }]}
      >
        <Spin spinning={loading} size='large' tip='Cargando...'>
          <Form layout='vertical'>
            <Input.Group>
              <Row gutter={8}>
                <Col span={10}>
                  <Form.Item
                    label='Razon'
                    validateStatus={newDataAusence.tipo_ausencia !== '' ? 'success' : 'error'}
                    help={newDataAusence.tipo_ausencia !== '' ? '' : 'Seleccione'}
                  >
                    <Select
                      style={{ width: '100%' }}
                      onSelect={(e) => handleSelectedHours(e.toString())}
                    >
                      {RAZON_AUSENCES.map((razon) => (
                        <Option key={razon.abrev} value={razon.abrev}>{razon.fullName}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    label='Hora inicio'
                  >
                    <TimePicker
                      format='HH:mm'
                      defaultValue={moment(newDataAusence.hora_inicio_ausencia, 'HH:mm')}
                      style={{ width: '100%' }}
                      value={moment(newDataAusence.hora_inicio_ausencia, 'HH:mm')}
                      onChange={(e) => setNewDataAusence({ ...newDataAusence, hora_inicio_ausencia: e?.format('HH:mm') || '' })}
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    label='Hora fin'
                  >
                    <TimePicker
                      format='HH:mm'
                      defaultValue={moment(newDataAusence.hora_fin_ausencia, 'HH:mm')}
                      style={{ width: '100%' }}
                      value={moment(newDataAusence.hora_fin_ausencia, 'HH:mm')}
                      onChange={(e) => setNewDataAusence({ ...newDataAusence, hora_fin_ausencia: e?.format('HH:mm') || '' })}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label='Seleccionar rango de fecha'
                  >
                    <RangePicker
                      value={hackValue || value}
                      disabledDate={disabledDate}
                      onCalendarChange={val => setDates(val)}
                      onChange={val => setValue(val)}
                      onOpenChange={onOpenChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label='Descripci??n'
                  >
                    <TextArea
                      rows={4}
                      onChange={(e) => setNewDataAusence({ ...newDataAusence, descripcion: e.currentTarget.value })}
                    />
                  </Form.Item>
                </Col>
              </Row>
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
            </Input.Group>
          </Form>
          <Row gutter={8} style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}>
            <Col
              span={7}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                onClick={() => setOpenNewAbsense(false)}
                style={{ backgroundColor: '#E10D17', color: 'white' }}
              >
                Cancelar
            </Button>
              <Button
                onClick={() => handleInsertAbsense()}
                disabled={disabledConfirm}
                style={!disabledConfirm ?
                  { backgroundColor: 'green', borderColor: 'green', color: 'white' } :
                  { backgroundColor: 'grey', borderColor: 'grey', color: 'white' }}
              >
                Confirmar
            </Button>
            </Col>
          </Row>
        </Spin>
      </ModalComponent>
    </>
  );
};

export default AbsensesEmployeeView;
