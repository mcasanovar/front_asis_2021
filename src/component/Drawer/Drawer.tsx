import * as React from 'react';
import { Menu } from 'antd';
import {
  Link
} from "react-router-dom";
import { PieChartOutlined, AppstoreOutlined, MailOutlined } from "@ant-design/icons";

interface IDrawerComponentProps {
}

const DrawerComponent: React.FunctionComponent<IDrawerComponentProps> = (props) => {
  const { SubMenu } = Menu;

  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={true}
      style={{ height: '95.9vh' }}
      onClick={(e) => { }}
    >
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to='/dashboard'>Dashboard</Link>
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
  );
};

export default DrawerComponent;
