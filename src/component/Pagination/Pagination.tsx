import * as React from 'react';
import { Pagination } from 'antd';

interface IPaginationComponentProps {
  actualPage: number,
  onChange: (newPage: number) => number | void
  totalItems: number,
  pageSize: number
}

const PaginationComponent: React.FunctionComponent<IPaginationComponentProps> = ({
  actualPage,
  onChange,
  totalItems,
  pageSize
}) => {
  return (
    <Pagination 
      current={actualPage} 
      onChange={(page: number) => onChange(page)} 
      total={totalItems}
      pageSize={pageSize}
      showTotal={total => `Total ${total} registro/s`}
    />
  );
};

export default PaginationComponent;
