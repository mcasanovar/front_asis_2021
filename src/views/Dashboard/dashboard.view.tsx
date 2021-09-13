import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Tabs, Statistic, List, Badge, Switch, Select } from 'antd';

import {
  dataRankingBilling,
  dataRankingDebts,
  dataProductionRequests,
  dataMonthyBilling,
  dataCashFlow,
  dataProductionRequestsAcum,
  dataMonthyBillingAcum,
  dataCashFlowAcum
} from './fakedata';

import SubBarComponent from "../../component/Subbar/SubBar";
import ChartComponent from '../../component/Charts/Chart';
import { YEARS_CHARTS } from '../../constants/var';
import moment from 'moment';

interface IDashboardScreenProps {
  authorized: boolean
}

const DashboardScreen: React.FunctionComponent<IDashboardScreenProps> = ({ authorized }) => {
  const { TabPane } = Tabs;
  const { Option } = Select;

  const [monthAcumChecked, setMonthAcumChecked] = useState<{ monthChecked: boolean, acumChecked: boolean }>(
    { monthChecked: true, acumChecked: false }
  )

  if (!authorized) {
    return <Redirect to='./login' />
  }

  //------------------------------------------------renders
  const renderFirstCards = () => {
    return (
      <div className='container-first-row'>
        <div className='container-simple-card-first'>
          <Statistic
            title="Grupo de interés activos"
            value={1234}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
          />
        </div>
        <div className='container-simple-card-first'>
          <Statistic
            title="Solicitudes Totales"
            value={10456}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
          />
        </div>
        <div className='container-simple-card-first'>
          <Statistic
            title="Resultados Totales"
            value={10456}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
          />
        </div>
      </div>
    )
  };

  const renderEvolutionAndRankingMonth = () => {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Producción" key="1">
          <ChartComponent
            width={600}
            height={376}
            data={{
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: [{
                label: 'Solicitudes',
                data: dataProductionRequests.find((element) => element.type === 'solicitudes')?.data || [],
                backgroundColor: 'rgb(51, 102, 204)',
                borderColor: 'rgb(51, 102, 204)'
              },
              {
                label: 'Reservas',
                data: dataProductionRequests.find((element) => element.type === 'reservas')?.data || [],
                backgroundColor: 'rgb(190, 25, 25)',
                borderColor: 'rgb(190, 25, 25)'
              },
              {
                label: 'Evaluaciones',
                data: dataProductionRequests.find((element) => element.type === 'evaluaciones')?.data || [],
                backgroundColor: 'rgba(255, 205, 86, 1)',
                borderColor: 'rgb(255, 205, 86)'
              },
              {
                label: 'Resultados',
                data: dataProductionRequests.find((element) => element.type === 'resultados')?.data || [],
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgb(75, 192, 192)'
              },
              {
                label: 'Facturaciones',
                data: dataProductionRequests.find((element) => element.type === 'facturaciones')?.data || [],
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgb(54, 162, 235)'
              },
              {
                label: 'Pagos',
                data: dataProductionRequests.find((element) => element.type === 'pagos')?.data || [],
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgb(153, 102, 255)'
              },
              {
                label: 'Cobranzas',
                data: dataProductionRequests.find((element) => element.type === 'pagos')?.data || [],
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
        </TabPane>
        <TabPane tab="Facturación" key="2">
          <ChartComponent
            width={600}
            height={376}
            data={{
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: [{
                label: 'Meses',
                data: dataMonthyBilling,
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
        </TabPane>
        <TabPane tab="Flujo Caja" key="3">
          <ChartComponent
            width={600}
            height={376}
            data={{
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: [{
                label: 'Ingresos',
                data: dataCashFlow.find((element) => element.type === 'ingresos')?.data || [],
                backgroundColor: 'rgb(11, 163, 29)',
                borderColor: 'rgb(11, 163, 29)'
              },
              {
                label: 'Egresos',
                data: dataCashFlow.find((element) => element.type === 'egresos')?.data || [],
                backgroundColor: 'rgb(191, 28, 28)',
                borderColor: 'rgb(191, 28, 28)'
              },
              {
                label: 'Saldo',
                data: dataCashFlow.find((element) => element.type === 'saldo')?.data || [],
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
        </TabPane>
      </Tabs>
    );
  };

  const renderEvolutionAndRankingAcum = () => {
    return (
      <Tabs>
        <TabPane tab="Producción" key="1">
          <ChartComponent
            type='line'
            width={600}
            height={376}
            data={{
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: [{
                label: 'Solicitudes',
                data: dataProductionRequestsAcum.find((element) => element.type === 'solicitudes')?.data || [],
                backgroundColor: 'rgb(51, 102, 204)',
                borderColor: 'rgb(51, 102, 204)'
              },
              {
                label: 'Reservas',
                data: dataProductionRequestsAcum.find((element) => element.type === 'reservas')?.data || [],
                backgroundColor: 'rgb(190, 25, 25)',
                borderColor: 'rgb(190, 25, 25)'
              },
              {
                label: 'Evaluaciones',
                data: dataProductionRequestsAcum.find((element) => element.type === 'evaluaciones')?.data || [],
                backgroundColor: 'rgba(255, 205, 86, 1)',
                borderColor: 'rgb(255, 205, 86)'
              },
              {
                label: 'Resultados',
                data: dataProductionRequestsAcum.find((element) => element.type === 'resultados')?.data || [],
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgb(75, 192, 192)'
              },
              {
                label: 'Facturaciones',
                data: dataProductionRequestsAcum.find((element) => element.type === 'facturaciones')?.data || [],
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgb(54, 162, 235)'
              },
              {
                label: 'Pagos',
                data: dataProductionRequestsAcum.find((element) => element.type === 'pagos')?.data || [],
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgb(153, 102, 255)'
              },
              {
                label: 'Cobranzas',
                data: dataProductionRequestsAcum.find((element) => element.type === 'pagos')?.data || [],
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
        </TabPane>
        <TabPane tab="Facturación" key="2">
          <ChartComponent
            type='line'
            width={600}
            height={376}
            data={{
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: [{
                label: 'Meses',
                data: dataMonthyBillingAcum,
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
        </TabPane>
        <TabPane tab="Flujo Caja" key="3">
          <ChartComponent
            type='line'
            width={600}
            height={376}
            data={{
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: [{
                label: 'Ingresos',
                data: dataCashFlowAcum.find((element) => element.type === 'ingresos')?.data || [],
                backgroundColor: 'rgb(11, 163, 29)',
                borderColor: 'rgb(11, 163, 29)'
              },
              {
                label: 'Egresos',
                data: dataCashFlowAcum.find((element) => element.type === 'egresos')?.data || [],
                backgroundColor: 'rgb(191, 28, 28)',
                borderColor: 'rgb(191, 28, 28)'
              },
              {
                label: 'Saldo',
                data: dataCashFlowAcum.find((element) => element.type === 'saldo')?.data || [],
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
              <List
                size="small"
                dataSource={dataRankingBilling}
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
            </TabPane>
            <TabPane tab="Deudas" key="2">
              <List
                size="small"
                dataSource={dataRankingDebts}
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
          <ChartComponent
            type='pie'
            width={600}
            height={300}
            data={{
              labels: ['Oficina Illapel', 'Oficina Salamanca', 'Oficina La Serena'],
              datasets: [{
                label: 'Data 1',
                data: [100, 70, 50],
                backgroundColor: ['rgb(51, 102, 204)', 'rgb(190, 25, 25)', 'rgba(255, 205, 86, 1)'],
                borderColor: ['rgb(51, 102, 204)', 'rgb(190, 25, 25)', 'rgba(255, 205, 86, 1)']
              }]
            }}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className='container-simple-card-second'>
          <h4 className='simple-card-text'>Sucursal</h4>
        </div>
      </div>
    );
  }

  return (
    <div className='container-dashboard'>
      <SubBarComponent title='Dashboard' />
      <br />
      <div className='container-dropdown-year'>
        <h4></h4>
        <div className='dropdown-year'>
          <h4>Año</h4>
          <Select
            defaultValue={moment().format('YYYY')}
            style={{ width: 120 }}
            onChange={() => { }}
          >
            {YEARS_CHARTS.map((year, index) => (
              <Option value={year} key={index}>{year}</Option>
            ))}
          </Select>
        </div>
      </div>
      <br />
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
