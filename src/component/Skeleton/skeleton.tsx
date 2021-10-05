import React, { FunctionComponent } from 'react';
import { Skeleton } from 'antd';

interface SkeletonProps {
  active: boolean,
  rows: number,
  loading: boolean
}

const SkeletonComponent: FunctionComponent<SkeletonProps> = ({
  active = false,
  rows,
  loading
}) => {
  return (
    <Skeleton 
      active={active}
      paragraph={{ rows: rows }}
      loading={loading}
    />
  )
}

export default SkeletonComponent;
