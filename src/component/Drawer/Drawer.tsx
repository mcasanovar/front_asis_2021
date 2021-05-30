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

  const styleText: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: 16
  };

  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={true}
      style={{ height: '95.9vh', width: 130 }}
      onClick={(e) => { }}
    >
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to='/dashboard'>Dashboard</Link>
      </Menu.Item>
      <SubMenu key="2" icon={<MailOutlined />} title="Administración">
        <Menu.Item key="gi">
          <Link to='/gi' style={{...styleText}}>Grupo de Interes</Link>
        </Menu.Item>
        <Menu.Item key="empleados">
          <Link to='/employees' style={{...styleText}}>Empleados</Link>
        </Menu.Item>
        <Menu.Item key="calendario" style={{...styleText}}>
          <Link to='/calendario' style={{...styleText}}>Calendario</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="3" icon={<AppstoreOutlined />} title="Operaciones">
        <Menu.Item key="solicitudes">
          <Link to='/solicitudes'  style={{...styleText}}>Solicitudes</Link>
        </Menu.Item>
        <Menu.Item key="reservas">
          <Link to='/reservas'  style={{...styleText}}>Reservas</Link>
        </Menu.Item>
        <Menu.Item key="evaluaciones">
          <Link to='/evaluaciones'  style={{...styleText}}>Evaluaciones</Link>
        </Menu.Item>
        <Menu.Item key="resultados">
          <Link to='/resultados'  style={{...styleText}}>Resultados</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="4" icon={<AppstoreOutlined />} title="Finanzas">
        <SubMenu key="sub8" title="Ingresos"  style={{...styleText}}>
          <Menu.Item key="facturaciones">
            <Link to='/facturaciones' style={{...styleText}}>Facturaciones</Link>
          </Menu.Item>
          <Menu.Item key="pagos">
            <Link to='/pagos' style={{...styleText}}>Pagos</Link>
          </Menu.Item>
          <Menu.Item key="cobranza">
            <Link to='/cobranzas' style={{...styleText}}>Cobranza</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub9" title="Egresos"  style={{...styleText}}>
          <Menu.Item key="gas_ent">
            <Link to='/gastos_entradas' style={{...styleText}}>Gastos / Entradas</Link>
          </Menu.Item>
          <Menu.Item key="salidas">
            <Link to='/salidas' style={{...styleText}}>Salidas</Link>
          </Menu.Item>
          <Menu.Item key="existencia">
            <Link to='/existencia' style={{...styleText}}>Existencia</Link>
          </Menu.Item>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
};

export default DrawerComponent;
