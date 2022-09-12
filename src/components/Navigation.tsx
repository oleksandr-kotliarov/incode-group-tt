import React, { memo } from 'react';
import { Breadcrumb } from 'antd';
import { StarOutlined } from '@ant-design/icons';

export const Navigation: React.FC = memo(() => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="">Facebook</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">React</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <StarOutlined />
        100k stars
      </Breadcrumb.Item>
    </Breadcrumb>
  );
});
