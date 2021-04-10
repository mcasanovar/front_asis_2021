import React, { FunctionComponent } from 'react';

import { Button } from "antd";
import { MenuUnfoldOutlined } from '@ant-design/icons';

interface TopBarProps {
  onClick: () => void
};

const TopBarComponent: FunctionComponent<TopBarProps> = ({
  onClick
}) => {
  return (
    <div className='mainContainer-topbar'>
      {/* <MenuUnfoldOutlined style={{ fontSize: '2rem', cursor: 'pointer' }} /> */}
      <Button 
        onClick={() => onClick()} 
        icon={<MenuUnfoldOutlined style={{ fontSize: '1.2rem' }} />}></Button>
    </div>
  );
};

export default TopBarComponent;