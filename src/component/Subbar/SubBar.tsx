import * as React from 'react';

interface ISubBarProps {
  title: string
}

const SubBarComponent: React.FunctionComponent<ISubBarProps> = ({
  title
}) => {
  return (
    <div className="container-subbar">
      <div className='container-subbar-title'>
        <p className='text-muted'>{title}</p>
      </div>
    </div>
  );
};

export default SubBarComponent;
