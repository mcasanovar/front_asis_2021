import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { PieChartOutlined, AppstoreOutlined, MailOutlined } from "@ant-design/icons";

import GiView from "./views/Gi/gi.view";
import RequestsView from "./views/Requests/requests.view";
import EmployeesView from "./views/Employees/employees.view";
import ReservationView from "./views/Reservation/reservation.view";
import EvaluationView from "./views/Evaluations/evaluations.view";
import ResultsView from "./views/Results/results.view";
import InvoicesView from "./views/Invoices/invoices.view";
import PaymentsView from "./views/Payments/payments.view";
import RequestsPaymentView from "./views/RequestsPayment/requestsPayments";
import ExpensesInputsView from "./views/ExpensesInputs/expensesInputs";
import OutputsView from "./views/outputs/outputs.view";
import ExistenceView from "./views/Existence/existence.view";

import TopBarComponent from "./component/TopBar/TopBar";

function App(): JSX.Element {
  const [OpenDrawer, setOpenDrawer] = useState<boolean>(false);

  const { SubMenu } = Menu;

  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <h2>Home</h2>
    },
    {
      path: "/gi",
      sidebar: () => <div>Grupo de Interes</div>,
      main: () => <GiView />
    },
    {
      path: "/employees",
      sidebar: () => <div>Empleados</div>,
      main: () => <EmployeesView />
    },
    {
      path: "/solicitudes",
      sidebar: () => <div>Solicitudes</div>,
      main: () => <RequestsView />
    },
    {
      path: "/reservas",
      sidebar: () => <div>Reservas</div>,
      main: () => <ReservationView />
    },
    {
      path: "/evaluaciones",
      sidebar: () => <div>Evaluaciones</div>,
      main: () => <EvaluationView />
    },
    {
      path: "/resultados",
      sidebar: () => <div>Resultados</div>,
      main: () => <ResultsView />
    },
    {
      path: "/facturaciones",
      sidebar: () => <div>Facturaciones</div>,
      main: () => <InvoicesView />
    },
    {
      path: "/pagos",
      sidebar: () => <div>Pagos</div>,
      main: () => <PaymentsView />
    },
    {
      path: "/cobranzas",
      sidebar: () => <div>Cobranzas</div>,
      main: () => <RequestsPaymentView />
    },
    {
      path: "/gastos_entradas",
      sidebar: () => <div>Gastos/Entradas</div>,
      main: () => <ExpensesInputsView/>
    },
    {
      path: "/salidas",
      sidebar: () => <div>Salidas</div>,
      main: () => <OutputsView/>
    },
    {
      path: "/existencia",
      sidebar: () => <div>Existencia</div>,
      main: () => <ExistenceView/>
    },
  ];

  return (
    <div className="mainContainer">
      <TopBarComponent
        onClick={() => setOpenDrawer(!OpenDrawer)}
      />
      <Router>
        <div className="mainContainer-modules">
          <div style={{ width: 256, position: 'absolute', zIndex: 10 }}>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={OpenDrawer}
              style={{ height: '95.9vh' }}
              onClick={(e) => { }}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to='/'>Dashboard</Link>
              </Menu.Item>
              <SubMenu key="2" icon={<MailOutlined />} title="Administración">
                <Menu.Item key="gi">
                  <Link to='/gi'>Grupo de Interes</Link>
                </Menu.Item>
                <Menu.Item key="empleados">
                  <Link to='/employees'>Empleados</Link>
                </Menu.Item>
                <Menu.Item key="calendario">Calendario</Menu.Item>
              </SubMenu>
              <SubMenu key="3" icon={<AppstoreOutlined />} title="Operaciones">
                <Menu.Item key="solicitudes">
                  <Link to='/solicitudes'>Solicitudes</Link>
                </Menu.Item>
                <Menu.Item key="reservas">
                  <Link to='/reservas'>Reservas</Link>
                </Menu.Item>
                <Menu.Item key="evaluaciones">
                  <Link to='/evaluaciones'>Evaluaciones</Link>
                </Menu.Item>
                <Menu.Item key="resultados">
                  <Link to='/resultados'>Resultados</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="4" icon={<AppstoreOutlined />} title="Finanzas">
                <SubMenu key="sub8" title="Ingresos">
                  <Menu.Item key="facturaciones">
                    <Link to='/facturaciones'>Facturaciones</Link>
                  </Menu.Item>
                  <Menu.Item key="pagos">
                    <Link to='/pagos'>Pagos</Link>
                  </Menu.Item>
                  <Menu.Item key="cobranza">
                    <Link to='/cobranzas'>Cobranza</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub9" title="Egresos">
                  <Menu.Item key="gas_ent">
                    <Link to='/gastos_entradas'>Gastos / Entradas</Link>
                  </Menu.Item>
                  <Menu.Item key="salidas">
                    <Link to='/salidas'>Salidas</Link>
                  </Menu.Item>
                  <Menu.Item key="existencia">
                    <Link to='/existencia'>Existencia</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className='modules'>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
