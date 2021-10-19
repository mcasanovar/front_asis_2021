import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import CSS from 'csstype';

import { Tabs, Statistic, List, Badge, Switch, Select, Button, Row, Col, Typography } from 'antd';

import { getAllReportsServices } from '../../services/dashboard.services';

import SubBarComponent from "../../component/Subbar/SubBar";
import ChartComponent from '../../component/Charts/Chart';
import SkeletonComponent from '../../component/Skeleton/skeleton';
import { IAlertMessageContent, ICountries } from '../../models/index.models';
import AlertComponent from "../../component/Alert/Alert";

import { YEARS_CHARTS } from '../../constants/var';
import { MilesFormat } from '../../libs/formattedPesos';
import { IProduction, IResponseDashboard, IResportsResponse, ICashFlow } from '../../models/dashboard.models';
import { getObjectToLocalStorage, setObjectToLocalStorage } from '../../functions/getLocalStorage';
import calculateAcumulateArray from '../../functions/getAcumulatedArray';

import { COLORS_RANDOM } from '../../constants/var';

const { Title } = Typography;

const styleRow: CSS.Properties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "space-between",
  alignItems: 'center',
  paddingRight: '1rem',
  paddingLeft: '1rem'
}

const styleCol: CSS.Properties = {
  backgroundColor: 'white',
  padding: '0.8rem'
}

interface IDashboardScreenProps {
  authorized: boolean
}

const DashboardScreen: React.FunctionComponent<IDashboardScreenProps> = ({ authorized }) => {
  const { TabPane } = Tabs;
  const { Option } = Select;

  const [monthAcumChecked, setMonthAcumChecked] = useState<{ monthChecked: boolean, acumChecked: boolean }>(
    { monthChecked: true, acumChecked: false }
  );
  const [loading, setloading] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });
  const [actualYear, setactualYear] = useState<string>(moment().format('YYYY'))
  const [dataDashboard, setdataDashboard] = useState<IResportsResponse>();
  const [productionAcc, setproductionAcc] = useState<IProduction[] | []>([]);
  const [invoicesAcc, setinvoicesAcc] = useState<number[] | []>([]);
  const [cashflowAcc, setcashflowAcc] = useState<ICashFlow[] | []>([]);

  const handleGetAllResports = async (year: string = actualYear) => {
    const result: IResponseDashboard = await getAllReportsServices(year);
    if (result.err) {
      setMessageAlert({ message: 'Se ha producido un error al cargar los datos. Por favor, intente mas tarde', type: 'error', show: true });
      setloading(false)
    }
    else {
      setObjectToLocalStorage('reports', result.res);
      setObjectToLocalStorage('actual-year', { year });
      setdataDashboard(result.res);
    }
  };

  const handleReloadReports = () => {
    setloading(true)
    handleGetAllResports();
  }

  const handleChangeYear = (value: string) => {
    setloading(true)
    setactualYear(value);
    handleGetAllResports(value);
  };

  const calculateAcumulate = () => {
    let auxProduction: IProduction[] = [];
    let auxCashFlow: ICashFlow[] = [];

    dataDashboard?.production.forEach(productionData => {
      const acumArray: number[] = calculateAcumulateArray(productionData.data);
      auxProduction.push({ type: productionData.type, data: acumArray });
    });

    const auxInvoices: number[] = calculateAcumulateArray(dataDashboard?.invoices || []);

    dataDashboard?.cashFlow.forEach(cashflowData => {
      const acumArrayCashflow: number[] = calculateAcumulateArray(cashflowData.data);
      auxCashFlow.push({ type: cashflowData.type, data: acumArrayCashflow });
    });

    setproductionAcc(auxProduction);
    setinvoicesAcc(auxInvoices);
    setcashflowAcc(auxCashFlow);
  }

  //------------------------------------------------renders
  const renderFirstCards = () => {
    return (
      <>
        <br />
        <Row gutter={8} style={styleRow}>
          <Col xs={24} sm={24} md={12} lg={7} xl={8} style={styleCol}>
            {loading ? <SkeletonComponent active={true} rows={1} loading={loading} /> :
              <Statistic
                title="Grupo de interés activos"
                value={dataDashboard?.activeGIs || 0}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
              />
            }
          </Col>
          <Col xs={24} sm={24} md={12} lg={7} xl={7} style={styleCol}>
            {loading ? <SkeletonComponent active={true} rows={1} loading={loading} /> :
              <Statistic
                title="Solicitudes Totales"
                value={dataDashboard?.countRequests || 1}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
              />
            }
          </Col>
          <Col xs={24} sm={24} md={12} lg={7} xl={8} style={styleCol}>
            {loading ? <SkeletonComponent active={true} rows={1} loading={loading} /> :
              <Statistic
                title="Resultados Totales"
                value={dataDashboard?.countResults || 1}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
              />
            }
          </Col>
        </Row>
        <br />
      </>
    )
  };

  const renderEvolutionAndRankingMonth = () => {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Producción" key="1">
          {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
            <ChartComponent
              width={500}
              height={115}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Solicitudes',
                  data: dataDashboard?.production.find((element) => element.type === 'solicitudes')?.data || [],
                  backgroundColor: 'rgb(51, 102, 204)',
                  borderColor: 'rgb(51, 102, 204)'
                },
                {
                  label: 'Reservas',
                  data: dataDashboard?.production.find((element) => element.type === 'reservas')?.data || [],
                  backgroundColor: 'rgb(190, 25, 25)',
                  borderColor: 'rgb(190, 25, 25)'
                },
                {
                  label: 'Evaluaciones',
                  data: dataDashboard?.production.find((element) => element.type === 'evaluaciones')?.data || [],
                  backgroundColor: 'rgba(255, 205, 86, 1)',
                  borderColor: 'rgb(255, 205, 86)'
                },
                {
                  label: 'Resultados',
                  data: dataDashboard?.production.find((element) => element.type === 'resultados')?.data || [],
                  backgroundColor: 'rgba(75, 192, 192, 1)',
                  borderColor: 'rgb(75, 192, 192)'
                },
                {
                  label: 'Facturaciones',
                  data: dataDashboard?.production.find((element) => element.type === 'facturaciones')?.data || [],
                  backgroundColor: 'rgba(54, 162, 235, 1)',
                  borderColor: 'rgb(54, 162, 235)'
                },
                {
                  label: 'Pagos',
                  data: dataDashboard?.production.find((element) => element.type === 'pagos')?.data || [],
                  backgroundColor: 'rgba(153, 102, 255, 1)',
                  borderColor: 'rgb(153, 102, 255)'
                },
                {
                  label: 'Cobranzas',
                  data: dataDashboard?.production.find((element) => element.type === 'pagos')?.data || [],
                  backgroundColor: 'rgba(201, 203, 207, 1)',
                  borderColor: 'rgb(201, 203, 207)'
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          }
        </TabPane>
        <TabPane tab="Facturación" key="2">
          {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
            <ChartComponent
              width={500}
              height={115}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Meses',
                  data: dataDashboard?.invoices || [],
                  backgroundColor: 'rgb(51, 102, 204)',
                  borderColor: 'rgb(51, 102, 204)'
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    callback: function (value: any, index: number, values: any) {
                      if (parseInt(value) >= 0) {
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      } else {
                        return '$' + value;
                      }
                    }
                  }
                }
              }}
            />
          }
        </TabPane>
        <TabPane tab="Flujo Caja" key="3">
          {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
            <ChartComponent
              width={500}
              height={115}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Ingresos',
                  data: dataDashboard?.cashFlow.find((element) => element.type === 'ingresos')?.data || [],
                  backgroundColor: 'rgb(11, 163, 29)',
                  borderColor: 'rgb(11, 163, 29)'
                },
                {
                  label: 'Egresos',
                  data: dataDashboard?.cashFlow.find((element) => element.type === 'egresos')?.data || [],
                  backgroundColor: 'rgb(191, 28, 28)',
                  borderColor: 'rgb(191, 28, 28)'
                },
                {
                  label: 'Saldo',
                  data: dataDashboard?.cashFlow.find((element) => element.type === 'saldo')?.data || [],
                  backgroundColor: 'rgb(21, 40, 196)',
                  borderColor: 'rgb(21, 40, 196)'
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          }
        </TabPane>
      </Tabs>
    );
  };

  const renderEvolutionAndRankingAcum = () => {
    return (
      <Tabs>
        <TabPane tab="Producción" key="1">
          {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
            <ChartComponent
              type='line'
              width={500}
              height={115}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Solicitudes',
                  data: productionAcc.find((element) => element.type === 'solicitudes')?.data || [],
                  backgroundColor: 'rgb(51, 102, 204)',
                  borderColor: 'rgb(51, 102, 204)'
                },
                {
                  label: 'Reservas',
                  data: productionAcc.find((element) => element.type === 'reservas')?.data || [],
                  backgroundColor: 'rgb(190, 25, 25)',
                  borderColor: 'rgb(190, 25, 25)'
                },
                {
                  label: 'Evaluaciones',
                  data: productionAcc.find((element) => element.type === 'evaluaciones')?.data || [],
                  backgroundColor: 'rgba(255, 205, 86, 1)',
                  borderColor: 'rgb(255, 205, 86)'
                },
                {
                  label: 'Resultados',
                  data: productionAcc.find((element) => element.type === 'resultados')?.data || [],
                  backgroundColor: 'rgba(75, 192, 192, 1)',
                  borderColor: 'rgb(75, 192, 192)'
                },
                {
                  label: 'Facturaciones',
                  data: productionAcc.find((element) => element.type === 'facturaciones')?.data || [],
                  backgroundColor: 'rgba(54, 162, 235, 1)',
                  borderColor: 'rgb(54, 162, 235)'
                },
                {
                  label: 'Pagos',
                  data: productionAcc.find((element) => element.type === 'pagos')?.data || [],
                  backgroundColor: 'rgba(153, 102, 255, 1)',
                  borderColor: 'rgb(153, 102, 255)'
                },
                {
                  label: 'Cobranzas',
                  data: productionAcc.find((element) => element.type === 'pagos')?.data || [],
                  backgroundColor: 'rgba(201, 203, 207, 1)',
                  borderColor: 'rgb(201, 203, 207)'
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          }
        </TabPane>
        <TabPane tab="Facturación" key="2">
          {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
            <ChartComponent
              type='line'
              width={500}
              height={115}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Meses',
                  data: invoicesAcc || [],
                  backgroundColor: 'rgb(51, 102, 204)',
                  borderColor: 'rgb(51, 102, 204)'
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    callback: function (value: any, index: number, values: any) {
                      if (parseInt(value) >= 1000) {
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      } else {
                        return '$' + value;
                      }
                    }
                  }
                }
              }}
            />
          }
        </TabPane>
        <TabPane tab="Flujo Caja" key="3">
          {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
            <ChartComponent
              type='line'
              width={500}
              height={115}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Ingresos',
                  data: cashflowAcc.find((element) => element.type === 'ingresos')?.data || [],
                  backgroundColor: 'rgb(11, 163, 29)',
                  borderColor: 'rgb(11, 163, 29)'
                },
                {
                  label: 'Egresos',
                  data: cashflowAcc.find((element) => element.type === 'egresos')?.data || [],
                  backgroundColor: 'rgb(191, 28, 28)',
                  borderColor: 'rgb(191, 28, 28)'
                },
                {
                  label: 'Saldo',
                  data: cashflowAcc.find((element) => element.type === 'saldo')?.data || [],
                  backgroundColor: 'rgb(21, 40, 196)',
                  borderColor: 'rgb(21, 40, 196)'
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    callback: function (value: any, index: number, values: any) {
                      if (parseInt(value) >= 1000) {
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      } else {
                        return '$' + value;
                      }
                    }
                  }
                }
              }}
            />
          }
        </TabPane>
      </Tabs>
    )
  }

  const renderEvolutionAndRanking = () => {
    return (
      <Row gutter={8} style={styleRow}>
        <Col xs={24} sm={24} md={12} lg={16} xl={17} style={styleCol}>
          <div className='container-simple-card-second'>
            <div className='container-simple-card-second-title-and-switch'>
              <h4 className='simple-card-text'>Solicitudes(Evolución)</h4>
              <Switch
                checkedChildren="Mensual"
                unCheckedChildren="Acum"
                defaultChecked
                style={{ backgroundColor: '#33CD38' }}
                onChange={() => setMonthAcumChecked({ monthChecked: !monthAcumChecked.monthChecked, acumChecked: !monthAcumChecked.acumChecked })}
              />
            </div>
            {monthAcumChecked.monthChecked && renderEvolutionAndRankingMonth()}
            {monthAcumChecked.acumChecked && renderEvolutionAndRankingAcum()}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} style={styleCol}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Facturación" key="1">
              {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
                <List
                  size="small"
                  dataSource={dataDashboard?.rankingInvoices || []}
                  renderItem={(item, index) =>
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge
                            className="site-badge-count-109"
                            overflowCount={9999999}
                            count={index + 1}
                            style={index < 3 ? { backgroundColor: '#001529' } : { backgroundColor: '#B3B4B3' }}
                          />
                        }
                        title={item.name}
                      />
                      <h3 className='simple-card-text'>{`$ ${MilesFormat(item.quantity)}`}</h3>
                    </List.Item>}
                />
              }
            </TabPane>
            <TabPane tab="Deudas" key="2">
              {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
                <List
                  size="small"
                  dataSource={dataDashboard?.rankingPayments}
                  renderItem={(item, index) =>
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge
                            className="site-badge-count-109"
                            overflowCount={9999999}
                            count={index + 1}
                            style={index < 3 ? { backgroundColor: '#001529' } : { backgroundColor: '#B3B4B3' }}
                          />
                        }
                        title={item.name}
                      />
                      <h3 className='simple-card-text'>{`$ ${MilesFormat(item.quantity)}`}</h3>
                    </List.Item>}
                />
              }
            </TabPane>
          </Tabs>
        </Col>
      </Row>

      // <div className='container-first-row'>
      //   <div className='container-simple-card-second'>
      //     <div className='container-simple-card-second-title-and-switch'>
      //       <h4 className='simple-card-text'>Solicitudes(Evolución)</h4>
      //       <Switch
      //         checkedChildren="Mensual"
      //         unCheckedChildren="Acum"
      //         defaultChecked
      //         style={{ backgroundColor: '#33CD38' }}
      //         onChange={() => setMonthAcumChecked({ monthChecked: !monthAcumChecked.monthChecked, acumChecked: !monthAcumChecked.acumChecked })}
      //       />
      //     </div>
      //     {monthAcumChecked.monthChecked && renderEvolutionAndRankingMonth()}
      //     {monthAcumChecked.acumChecked && renderEvolutionAndRankingAcum()}
      //   </div>
      //   <div className='container-simple-card-ranking'>
      //     <h4 className='simple-card-text'>Ranking Clientes</h4>
      //     <Tabs defaultActiveKey="1">
      //       <TabPane tab="Facturación" key="1">
      //         {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
      //           <List
      //             size="small"
      //             dataSource={dataDashboard?.rankingInvoices || []}
      //             renderItem={(item, index) =>
      //               <List.Item>
      //                 <List.Item.Meta
      //                   avatar={
      //                     <Badge
      //                       className="site-badge-count-109"
      //                       overflowCount={9999999}
      //                       count={index + 1}
      //                       style={index < 3 ? { backgroundColor: '#001529' } : { backgroundColor: '#B3B4B3' }}
      //                     />
      //                   }
      //                   title={item.name}
      //                 />
      //                 <h3 className='simple-card-text'>{`$ ${MilesFormat(item.quantity)}`}</h3>
      //               </List.Item>}
      //           />
      //         }
      //       </TabPane>
      //       <TabPane tab="Deudas" key="2">
      //         {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
      //           <List
      //             size="small"
      //             dataSource={dataDashboard?.rankingPayments}
      //             renderItem={(item, index) =>
      //               <List.Item>
      //                 <List.Item.Meta
      //                   avatar={
      //                     <Badge
      //                       className="site-badge-count-109"
      //                       overflowCount={9999999}
      //                       count={index + 1}
      //                       style={index < 3 ? { backgroundColor: '#001529' } : { backgroundColor: '#B3B4B3' }}
      //                     />
      //                   }
      //                   title={item.name}
      //                 />
      //                 <h3 className='simple-card-text'>{item.quantity}</h3>
      //               </List.Item>}
      //           />
      //         }
      //       </TabPane>
      //     </Tabs>
      //   </div>
      // </div>
    )
  };

  const renderTotalRegisters = () => {
    return (
      <>
        <br />
        <Row gutter={8} style={styleRow}>
          <Col xs={24} sm={24} md={12} lg={16} xl={17} style={styleCol}>
            <div className='container-simple-card-third-2'>
              <h4 className='simple-card-text'>Categorias</h4>
              <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                <TabPane tab='Categoria 1' key='1'>
                  {loading ? <SkeletonComponent active={true} rows={5} loading={loading} /> :
                    <ChartComponent
                      width={500}
                      height={115}
                      data={{
                        labels: dataDashboard?.categories?.category1.type || '',
                        datasets: [{
                          label: '',
                          data: dataDashboard?.categories?.category1.data || [],
                          backgroundColor: COLORS_RANDOM,
                          borderColor: COLORS_RANDOM
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                          y: {
                            beginAtZero: true,
                          }
                        }
                      }}
                    />
                  }
                </TabPane>
                <TabPane tab='Categoria 3' key='2'>
                  {loading ? <SkeletonComponent active={true} rows={5} loading={loading} /> :
                    <ChartComponent
                      width={500}
                      height={115}
                      data={{
                        labels: dataDashboard?.categories?.category3.type || '',
                        datasets: [{
                          label: '',
                          data: dataDashboard?.categories?.category3.data || [],
                          backgroundColor: COLORS_RANDOM,
                          borderColor: COLORS_RANDOM
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                          y: {
                            beginAtZero: true,
                          }
                        }
                      }}
                    />
                  }
                </TabPane>
                <TabPane tab='Nombre Servicio' key='3'>
                  {loading ? <SkeletonComponent active={true} rows={5} loading={loading} /> :
                    <ChartComponent
                      width={500}
                      height={115}
                      data={{
                        labels: dataDashboard?.categories?.services.type || '',
                        datasets: [{
                          label: '',
                          data: dataDashboard?.categories?.services.data || [],
                          backgroundColor: COLORS_RANDOM,
                          borderColor: COLORS_RANDOM
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                          y: {
                            beginAtZero: true,
                          }
                        }
                      }}
                    />
                  }
                </TabPane>
                <TabPane tab='Tipo Servicio' key='4'>
                  {loading ? <SkeletonComponent active={true} rows={5} loading={loading} /> :
                    <ChartComponent
                      width={500}
                      height={115}
                      data={{
                        labels: dataDashboard?.categories?.typeServices.type || '',
                        datasets: [{
                          label: '',
                          data: dataDashboard?.categories?.typeServices.data || [],
                          backgroundColor: COLORS_RANDOM,
                          borderColor: COLORS_RANDOM
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                          y: {
                            beginAtZero: true,
                          }
                        }
                      }}
                    />
                  }
                </TabPane>
                <TabPane tab='Sucursal' key='5'>
                  {loading ? <SkeletonComponent active={true} rows={5} loading={loading} /> :
                    <ChartComponent
                      width={500}
                      height={115}
                      data={{
                        labels: dataDashboard?.categories?.workplaces.type || '',
                        datasets: [{
                          label: '',
                          data: dataDashboard?.categories?.workplaces.data || [],
                          backgroundColor: COLORS_RANDOM,
                          borderColor: COLORS_RANDOM
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                          y: {
                            beginAtZero: true,
                          }
                        }
                      }}
                    />
                  }
                </TabPane>
              </Tabs>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} style={styleCol}>
            <div className='container-third-row'>
              <div className='container-simple-card-third'>
                <h4 className='simple-card-text'>Sucursal</h4>
                {loading ? <SkeletonComponent active={true} rows={7} loading={loading} /> :
                  <ChartComponent
                    type='pie'
                    width={500}
                    height={115}
                    data={{
                      labels: dataDashboard?.totalOffices[0].type || [],
                      datasets: [{
                        label: 'Data 1',
                        data: dataDashboard?.totalOffices[0].data || [],
                        backgroundColor: COLORS_RANDOM,
                        borderColor: COLORS_RANDOM
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                    }}
                  />
                }
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  console.log(dataDashboard)

  //------------------------------------------- USEEFFECTS
  useEffect(() => {
    setloading(true)
    const reportsFormStorage = getObjectToLocalStorage('reports');
    if (!!reportsFormStorage) {
      const localyear = getObjectToLocalStorage('actual-year')
      setdataDashboard(reportsFormStorage);
      if (!!localyear) {
        setactualYear(localyear.year.toString());
      }
      else {
        setObjectToLocalStorage('actual-year', { year: actualYear });
      }
    }
    else {
      handleGetAllResports();
    }
  }, []);

  useEffect(() => {
    if (dataDashboard) {
      calculateAcumulate();
      setloading(false)
    }
  }, [dataDashboard])

  if (!authorized) {
    return <Redirect to='./login' />
  }

  return (
    <div className='container-dashboard'>
      <SubBarComponent title='Dashboard' />
      <br />
      <div className='container-dropdown-year'>
        {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
        {loading ? <Title level={4}>Recargando datos...Esto puede tardar hasta 50 segundos...</Title> :
          <h4></h4>
        }
        <div className='dropdown-year'>
          <Button
            type="primary"
            style={{ marginRight: '1rem' }}
            onClick={() => handleReloadReports()}
            disabled={loading}
          >
            Recargar
          </Button>
          <Select
            defaultValue={actualYear}
            disabled={loading}
            style={{ width: 120 }}
            onChange={(value) => handleChangeYear(value)}
            value={actualYear}
          >
            {YEARS_CHARTS.map((year, index) => (
              <Option value={year} key={index}>{year}</Option>
            ))}
          </Select>
        </div>
      </div>
      {/* card first info */}
      {renderFirstCards()}
      {/* second info */}
      {renderEvolutionAndRanking()}
      {/* third info */}
      {renderTotalRegisters()}
    </div>
  );
};

export default DashboardScreen;
