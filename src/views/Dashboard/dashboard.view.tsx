import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import { Tabs, Statistic, List, Badge, Switch, Select, Button } from 'antd';

import { getAllReportsServices } from '../../services/dashboard.services';

import SubBarComponent from "../../component/Subbar/SubBar";
import ChartComponent from '../../component/Charts/Chart';
import SkeletonComponent from '../../component/Skeleton/skeleton';
import { IAlertMessageContent, ICountries } from '../../models/index.models';
import AlertComponent from "../../component/Alert/Alert";

import { YEARS_CHARTS } from '../../constants/var';
import { MilesFormat } from '../../libs/formattedPesos';
import { IResponseDashboard, IResportsResponse } from '../../models/dashboard.models';
import { getObjectToLocalStorage, setObjectToLocalStorage } from '../../functions/getLocalStorage';

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

  const handleGetAllResports = async () => {
    const result: IResponseDashboard = await getAllReportsServices(actualYear);
    if (result.err) {
      setMessageAlert({ message: 'No puede seleccionar la misma actividad primaria y secundaria', type: 'error', show: true });
      setloading(false)
    }
    else {
      setObjectToLocalStorage('reports', result.res);
      setdataDashboard(result.res);
    }
  };

  const handleReloadReports = () => {
    setloading(true)
    handleGetAllResports();
  }

  //------------------------------------------------renders
  const renderFirstCards = () => {
    return (
      <div className='container-first-row'>
        <div className='container-simple-card-first'>
          {loading ? <SkeletonComponent active={true} rows={1} loading={loading} /> :
            <Statistic
              title="Grupo de interés activos"
              value={dataDashboard?.activeGIs || 0}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          }
        </div>
        <div className='container-simple-card-first'>
          {loading ? <SkeletonComponent active={true} rows={1} loading={loading} /> :
            <Statistic
              title="Solicitudes Totales"
              value={dataDashboard?.countRequests || 1}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          }
        </div>
        <div className='container-simple-card-first'>
          {loading ? <SkeletonComponent active={true} rows={1} loading={loading} /> :
            <Statistic
              title="Resultados Totales"
              value={dataDashboard?.countResults || 1}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          }
        </div>
      </div>
    )
  };

  const renderEvolutionAndRankingMonth = () => {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Producción" key="1">
          {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
            <ChartComponent
              width={600}
              height={376}
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
                maintainAspectRatio: false,
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
              width={600}
              height={376}
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
                maintainAspectRatio: false,
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
              width={600}
              height={376}
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
                maintainAspectRatio: false,
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
    );
  };

  const renderEvolutionAndRankingAcum = () => {
    return (
      <Tabs>
        <TabPane tab="Producción" key="1">
          {loading ? <SkeletonComponent active={true} rows={9} loading={loading} /> :
            <ChartComponent
              type='line'
              width={600}
              height={376}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Solicitudes',
                  // data: dataProductionRequestsAcum.find((element) => element.type === 'solicitudes')?.data || [],
                  data: [],
                  backgroundColor: 'rgb(51, 102, 204)',
                  borderColor: 'rgb(51, 102, 204)'
                },
                {
                  label: 'Reservas',
                  // data: dataProductionRequestsAcum.find((element) => element.type === 'reservas')?.data || [],
                  data: [],
                  backgroundColor: 'rgb(190, 25, 25)',
                  borderColor: 'rgb(190, 25, 25)'
                },
                {
                  label: 'Evaluaciones',
                  // data: dataProductionRequestsAcum.find((element) => element.type === 'evaluaciones')?.data || [],
                  data: [],
                  backgroundColor: 'rgba(255, 205, 86, 1)',
                  borderColor: 'rgb(255, 205, 86)'
                },
                {
                  label: 'Resultados',
                  // data: dataProductionRequestsAcum.find((element) => element.type === 'resultados')?.data || [],
                  data: [],
                  backgroundColor: 'rgba(75, 192, 192, 1)',
                  borderColor: 'rgb(75, 192, 192)'
                },
                {
                  label: 'Facturaciones',
                  // data: dataProductionRequestsAcum.find((element) => element.type === 'facturaciones')?.data || [],
                  data: [],
                  backgroundColor: 'rgba(54, 162, 235, 1)',
                  borderColor: 'rgb(54, 162, 235)'
                },
                {
                  label: 'Pagos',
                  // data: dataProductionRequestsAcum.find((element) => element.type === 'pagos')?.data || [],
                  data: [],
                  backgroundColor: 'rgba(153, 102, 255, 1)',
                  borderColor: 'rgb(153, 102, 255)'
                },
                {
                  label: 'Cobranzas',
                  // data: dataProductionRequestsAcum.find((element) => element.type === 'pagos')?.data || [],
                  data: [],
                  backgroundColor: 'rgba(201, 203, 207, 1)',
                  borderColor: 'rgb(201, 203, 207)'
                }]
              }}
              options={{
                maintainAspectRatio: false,
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
              width={600}
              height={376}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Meses',
                  // data: dataMonthyBillingAcum,
                  data: [],
                  backgroundColor: 'rgb(51, 102, 204)',
                  borderColor: 'rgb(51, 102, 204)'
                }]
              }}
              options={{
                maintainAspectRatio: false,
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
              width={600}
              height={376}
              data={{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Ingresos',
                  // data: dataCashFlowAcum.find((element) => element.type === 'ingresos')?.data || [],
                  data: [],
                  backgroundColor: 'rgb(11, 163, 29)',
                  borderColor: 'rgb(11, 163, 29)'
                },
                {
                  label: 'Egresos',
                  // data: dataCashFlowAcum.find((element) => element.type === 'egresos')?.data || [],
                  data: [],
                  backgroundColor: 'rgb(191, 28, 28)',
                  borderColor: 'rgb(191, 28, 28)'
                },
                {
                  label: 'Saldo',
                  // data: dataCashFlowAcum.find((element) => element.type === 'saldo')?.data || [],
                  data: [],
                  backgroundColor: 'rgb(21, 40, 196)',
                  borderColor: 'rgb(21, 40, 196)'
                }]
              }}
              options={{
                maintainAspectRatio: false,
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
      <div className='container-first-row'>
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
        <div className='container-simple-card-ranking'>
          <h4 className='simple-card-text'>Ranking Clientes</h4>
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
                      <h3 className='simple-card-text'>{item.quantity}</h3>
                    </List.Item>}
                />
              }
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  };

  const renderTotalRegisters = () => {
    return (
      <div className='container-first-row'>
        <div className='container-simple-card-first'>
          <h4 className='simple-card-text'>Sucursal</h4>
          {loading ? <SkeletonComponent active={true} rows={7} loading={loading} /> :
            <ChartComponent
              type='pie'
              width={500}
              height={200}
              data={{
                labels: dataDashboard?.totalOffices[0].type || [],
                datasets: [{
                  label: 'Data 1',
                  data: dataDashboard?.totalOffices[0].data || [],
                  backgroundColor: [
                    'rgb(51, 102, 204)', 
                    'rgb(44, 44, 44)', 
                    'rgba(255, 205, 86, 1)',
                    'rgba(88, 24, 69, 1)',
                    'rgba(199, 0, 57, 1)',
                    'rgba(255, 87, 51, 1)',
                    'rgba(29, 142, 16, 1)'
                  ],
                  borderColor: [
                    'rgb(51, 102, 204)', 
                    'rgb(44, 44, 44)', 
                    'rgba(255, 205, 86, 1)',
                    'rgba(88, 24, 69, 1)',
                    'rgba(199, 0, 57, 1)',
                    'rgba(255, 87, 51, 1)',
                    'rgba(29, 142, 16, 1)'
                  ]
                }]
              }}
              options={{
                maintainAspectRatio: false,
              }}
            />
          }
        </div>
        <div className='container-simple-card-second'>
          <h4 className='simple-card-text'>Sucursal</h4>
        </div>
      </div>
    );
  };

  console.log(dataDashboard)

  //------------------------------------------- USEEFFECTS
  useEffect(() => {
    setloading(true)
    const reportsFormStorage = getObjectToLocalStorage('reports');
    if(!!reportsFormStorage){
      setdataDashboard(reportsFormStorage);
      return
    }
    else{
      handleGetAllResports();
    }
  }, []);

  useEffect(() => {
    if(dataDashboard){
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
        <h4></h4>
        <div className='dropdown-year'>
          <Button 
            type="primary" 
            style={{ marginRight: '1rem' }}
            onClick={() => handleReloadReports()}
          >
            Recargar
          </Button>
          <Select
            defaultValue={actualYear}
            disabled={loading}
            style={{ width: 120 }}
            onChange={(value) => setactualYear(value)}
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
