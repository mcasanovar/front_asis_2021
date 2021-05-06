import React, { FunctionComponent, useState, useEffect } from 'react';
import { Typography, Popover } from 'antd';

import { Button } from "antd";
import { MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';

interface TopBarProps {
  onClick: () => void
};

const TopBarComponent: FunctionComponent<TopBarProps> = ({
  onClick
}) => {
  const { Text } = Typography;

  const [giName, setgiName] = useState<string>('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const handleCloseSession = () => {
    localStorage.removeItem('userLogged');
    window.location.reload();
    return
  }

  //--------------------------------------USEEEFECT
  useEffect(() => {
    const userLogged = localStorage.getItem('userLogged');
    if (userLogged !== null) {
      setgiName(JSON.parse(userLogged).gi.razon_social || '');
    }
  }, []);

  return (
    <div className='mainContainer-topbar'>
      <Button
        onClick={() => onClick()}
        icon={<MenuUnfoldOutlined style={{ fontSize: '1.2rem' }} />}
      />
      <div>
        <Text>Usuario activo : </Text>
        <Text>{giName}</Text>
      </div>
      <Popover
        content={
          <>
            <Button style={{ backgroundColor: '#E6100D', color: 'white' }}
              onClick={() => handleCloseSession()}>
              Si</Button>
            <Button type='default'
              onClick={() => setDeleteConfirmation(false)}>
              No</Button>
          </>
        }
        title="¿Seguro que desea cerrar la session?"
        trigger="click"
        visible={deleteConfirmation}
        onVisibleChange={() => setDeleteConfirmation(true)}
      >
        <Button
          onClick={() => { }}
          type='default'
          icon={<PoweroffOutlined style={{ fontSize: '1.1rem', color: 'black' }} />}
        >
          Cerrar
        </Button>
      </Popover>
    </div>
  );
};

export default TopBarComponent;