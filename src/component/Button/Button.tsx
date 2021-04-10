import * as React from 'react';
import { Button } from "antd";
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface IButtonProps {
  title: string,
  size?: SizeType,
  customStyle?: object,
  ghost?: boolean,
  onClick: () => void
}

const ButtonComponent: React.FunctionComponent<IButtonProps> = ({
  title,
  size = 'middle',
  customStyle = {},
  ghost = false,
  onClick
}) => {
  return (
    <Button 
      size={size}
      style={{ 
        paddingInline: '15px', 
        height: '2rem',
        ...customStyle 
      }}
      ghost={ghost}
      onClick={() => onClick()}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
