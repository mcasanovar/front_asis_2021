import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import DrawerComponent from './component/Drawer/Drawer';

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

import LoginView from './views/Login/Login';

import TopBarComponent from "./component/TopBar/TopBar";

function App(): JSX.Element {
  const [authorized] = useState<boolean>(true);

  //---------------------------------------------------USEEFEECT
  // useEffect(() => {
  //   if (localStorage.getItem('userLogged') !== null) {
  //     setAuthorized(true);
  //     return
  //   }
  //   setAuthorized(false);
  //   return
  // }, []);

  // if(localStorage.getItem('authorizated') === null){
  //   window.location.href = './login';
  // }

  return (
    <Router>
      {localStorage.getItem('authorizated') !== null ?
        <>
          <TopBarComponent
            onClick={() => { }}
          />
          <div className="mainContainer-modules">
            <DrawerComponent />
            <Switch>
              <Route exact path='/' component={() => <GiView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/login' component={() => <LoginView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/gi' component={() => <GiView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/employees' component={() => <EmployeesView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/solicitudes' component={() => <RequestsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/reservas' component={() => <ReservationView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/evaluaciones' component={() => <EvaluationView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/resultados' component={() => <ResultsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/facturaciones' component={() => <InvoicesView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/pagos' component={() => <PaymentsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/cobranzas' component={() => <RequestsPaymentView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />

              <Route exact path='/gastos_entradas' component={() => <ExpensesInputsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/salidas' component={() => <OutputsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
              <Route exact path='/existencia' component={() => <ExistenceView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
            </Switch>
          </div>
        </> :
        <Switch>
          <Route exact path='/' component={() => <LoginView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/login' component={() => <LoginView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/gi' component={() => <GiView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/solicitudes' component={() => <RequestsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/reservas' component={() => <ReservationView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/evaluaciones' component={() => <EvaluationView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/resultados' component={() => <ResultsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/facturaciones' component={() => <InvoicesView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/pagos' component={() => <PaymentsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/cobranzas' component={() => <RequestsPaymentView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/gastos_entradas' component={() => <ExpensesInputsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/salidas' component={() => <OutputsView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />
          <Route exact path='/existencia' component={() => <ExistenceView authorized={localStorage.getItem('authorizated') !== null ? authorized : false} />} />

        </Switch>
      }
    </Router>
  );

  // return (
  //   <div className="mainContainer">
  //     <TopBarComponent
  //       onClick={() => setOpenDrawer(!OpenDrawer)}
  //     />
  //     <Router>
  //       <div className="mainContainer-modules">
  //         <div style={{ width: 256, position: 'absolute', zIndex: 10 }}>
  //           <Menu
  //             defaultSelectedKeys={['1']}
  //             defaultOpenKeys={['sub1']}
  //             mode="inline"
  //             theme="dark"
  //             inlineCollapsed={OpenDrawer}
  //             style={{ height: '95.9vh' }}
  //             onClick={(e) => { }}
  //           >
  //             <Menu.Item key="1" icon={<PieChartOutlined />}>
  //               <Link to='/dashboard'>Dashboard</Link>
  //             </Menu.Item>
  //             <SubMenu key="2" icon={<MailOutlined />} title="Administraci??n">
  //               <Menu.Item key="gi">
  //                 <Link to='/gi'>Grupo de Interes</Link>
  //               </Menu.Item>
  //               <Menu.Item key="empleados">
  //                 <Link to='/employees'>Empleados</Link>
  //               </Menu.Item>
  //               <Menu.Item key="calendario">Calendario</Menu.Item>
  //             </SubMenu>
  //             <SubMenu key="3" icon={<AppstoreOutlined />} title="Operaciones">
  //               <Menu.Item key="solicitudes">
  //                 <Link to='/solicitudes'>Solicitudes</Link>
  //               </Menu.Item>
  //               <Menu.Item key="reservas">
  //                 <Link to='/reservas'>Reservas</Link>
  //               </Menu.Item>
  //               <Menu.Item key="evaluaciones">
  //                 <Link to='/evaluaciones'>Evaluaciones</Link>
  //               </Menu.Item>
  //               <Menu.Item key="resultados">
  //                 <Link to='/resultados'>Resultados</Link>
  //               </Menu.Item>
  //             </SubMenu>
  //             <SubMenu key="4" icon={<AppstoreOutlined />} title="Finanzas">
  //               <SubMenu key="sub8" title="Ingresos">
  //                 <Menu.Item key="facturaciones">
  //                   <Link to='/facturaciones'>Facturaciones</Link>
  //                 </Menu.Item>
  //                 <Menu.Item key="pagos">
  //                   <Link to='/pagos'>Pagos</Link>
  //                 </Menu.Item>
  //                 <Menu.Item key="cobranza">
  //                   <Link to='/cobranzas'>Cobranza</Link>
  //                 </Menu.Item>
  //               </SubMenu>
  //               <SubMenu key="sub9" title="Egresos">
  //                 <Menu.Item key="gas_ent">
  //                   <Link to='/gastos_entradas'>Gastos / Entradas</Link>
  //                 </Menu.Item>
  //                 <Menu.Item key="salidas">
  //                   <Link to='/salidas'>Salidas</Link>
  //                 </Menu.Item>
  //                 <Menu.Item key="existencia">
  //                   <Link to='/existencia'>Existencia</Link>
  //                 </Menu.Item>
  //               </SubMenu>
  //             </SubMenu>
  //           </Menu>
  //         </div>
  //       </div>
  //       <div className='modules'>
  //         <Switch>
  //           <Route exact path='/gi' component={() => <GiView authorized={false} />} />
  //           <Route exact path='/login' component={LoginView} />
  //           {/* {routes.map((route, index) => (
  //             <Route
  //               key={index}
  //               path={route.path}
  //               exact={route.exact}
  //               children={<route.main />}
  //             />
  //           ))} */}
  //         </Switch>
  //       </div>
  //     </Router>
  //   </div>
  // );
}

export default App;
