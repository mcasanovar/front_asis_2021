import * as React from 'react';
import { Button, Tooltip } from "antd";
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { AppstoreAddOutlined, GroupOutlined, SnippetsOutlined } from '@ant-design/icons';

interface IButtonProps {
  title: string,
  size?: SizeType,
  customStyle?: object,
  ghost?: boolean,
  onClick: () => void,
  icon?: string | undefined,
  tooltipText?: string | undefined
}

const ButtonComponent: React.FunctionComponent<IButtonProps> = ({
  title,
  size = 'middle',
  customStyle = {},
  ghost = false,
  onClick,
  icon,
  tooltipText
}) => {

  const handleShowIconButton = (name: string) => {
    switch (name) {
      case 'new':
        return <AppstoreAddOutlined />
      case 'group':
        return <GroupOutlined />
      case 'consolidated':
        return <SnippetsOutlined />
      default:
        return null
    }
  }

  return !!icon ? (
    <Tooltip title={tooltipText}>
      <Button
        icon={handleShowIconButton(icon)}
        style={{
          padding: '0px',
          height: '2rem',
          ...customStyle
        }}
        ghost={ghost}
        size={size}
      />
    </Tooltip>
  ) : (
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
  )


  // return (
  //   <Button 
  //     size={size}
  //     style={{ 
  //       paddingInline: '15px', 
  //       height: '2rem',
  //       ...customStyle 
  //     }}
  //     ghost={ghost}
  //     onClick={() => onClick()}
  //     icon={!!icon ? handleShowIconButton(icon) : null}
  //   >
  //     {title}
  //   </Button>
  //   <Button 
  //     icon={<DownloadOutlined />}
  //     style={{ 
  //       padding: '5px', 
  //       height: '2rem',
  //       ...customStyle 
  //     }}
  //     size={size} 
  //   />
  // );
};

export default ButtonComponent;
