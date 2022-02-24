import React, { useState } from 'react';
import { Menu, Tooltip } from 'antd';
import {
  Link
} from "react-router-dom";
import {
  PieChartOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
  DollarCircleFilled,
  ControlFilled
} from "@ant-design/icons";
import { getUserFromLocalStorage } from '../../functions/getLocalStorage';
import { MODULES_PERMISSION } from '../../constants/var';

interface IDrawerComponentProps {
}

const DrawerComponent: React.FunctionComponent<IDrawerComponentProps> = (props) => {
  const { SubMenu } = Menu;

  const styleText: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: 16
  };

  const roles = getUserFromLocalStorage();

  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={true}
      style={{ height: 'auto', width: 130 }}
      onClick={(e) => { }}
    >
      {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_DASHBOARD) > -1 &&
        <Menu.Item key="1" icon={<PieChartOutlined style={{ fontSize: '20px' }} />}>
          <Link to='/'>Dashboard</Link>
        </Menu.Item>
      }
      <SubMenu key="2" icon={<UsergroupAddOutlined style={{ fontSize: '20px' }} />} title="Administración">
        {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_GI) > -1 &&
          <Menu.Item key="gi">
            <Link to='/gi' style={{ ...styleText }}>Grupo de Interes</Link>
          </Menu.Item>
        }
        {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_EMPLOYEES) > -1 &&
          <Menu.Item key="empleados">
            <Link to='/employees' style={{ ...styleText }}>Empleados</Link>
          </Menu.Item>
        }
        {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_CALENDAR) > -1 &&
          <Menu.Item key="calendario" style={{ ...styleText }}>
            <Link to='/calendario' style={{ ...styleText }}>Calendario</Link>
          </Menu.Item>
        }
      </SubMenu>
      <SubMenu key="3" icon={<BarChartOutlined style={{ fontSize: '20px' }} />} title="Operaciones">
        {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_REQUESTS) > -1 &&
          <Menu.Item key="solicitudes">
            <Link to='/solicitudes' style={{ ...styleText }}>Solicitudes</Link>
          </Menu.Item>
        }
        {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_RESERVATIIONS) > -1 &&
          <Menu.Item key="reservas">
            <Link to='/reservas' style={{ ...styleText }}>Reservas</Link>
          </Menu.Item>
        }
        {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_EVALUATIONS) > -1 &&
          <Menu.Item key="evaluaciones">
            <Link to='/evaluaciones' style={{ ...styleText }}>Evaluaciones</Link>
          </Menu.Item>
        }
        {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_RESULTS) > -1 &&
          <Menu.Item key="resultados">
            <Link to='/resultados' style={{ ...styleText }}>Resultados</Link>
          </Menu.Item>
        }
      </SubMenu>
      <SubMenu key="4" icon={<DollarCircleFilled style={{ fontSize: '20px' }} />} title="Finanzas">
        <SubMenu key="sub8" title="Ingresos" style={{ ...styleText }}>
          {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_INVOICES) > -1 &&
            <Menu.Item key="facturaciones">
              <Link to='/facturaciones' style={{ ...styleText }}>Facturaciones</Link>
            </Menu.Item>
          }
          {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_PAYMENTS) > -1 &&
            <Menu.Item key="pagos">
              <Link to='/pagos' style={{ ...styleText }}>Pagos</Link>
            </Menu.Item>
          }
          {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_REQUESTPAYMENT) > -1 &&
            <Menu.Item key="cobranza">
              <Link to='/cobranzas' style={{ ...styleText }}>Cobranza</Link>
            </Menu.Item>
          }
        </SubMenu>
        <SubMenu key="sub9" title="Egresos" style={{ ...styleText }}>
          {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_EXPENSES) > -1 &&
            <Menu.Item key="gas_ent">
              <Link to='/gastos_entradas' style={{ ...styleText }}>Gastos / Entradas</Link>
            </Menu.Item>
          }
          {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_OUTPUTS) > -1 &&
            <Menu.Item key="salidas">
              <Link to='/salidas' style={{ ...styleText }}>Salidas</Link>
            </Menu.Item>
          }
          {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_EXISTENSES) > -1 &&
            <Menu.Item key="existencia">
              <Link to='/existencia' style={{ ...styleText }}>Existencia</Link>
            </Menu.Item>
          }
        </SubMenu>
      </SubMenu>
      {!!roles && roles.permisos.indexOf(MODULES_PERMISSION.M_ADMIN) > -1 &&
        <SubMenu key="5" icon={<ControlFilled style={{ fontSize: '20px' }} />} title="Administración">
          <SubMenu key="sub10" title="Procesos" style={{ ...styleText }}>
            <Menu.Item key="adminSolicitudes">
              <Link to='/admin/solicitudes' style={{ ...styleText }}>Solicitudes</Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
      }
    </Menu>
  );
};

export default DrawerComponent;
