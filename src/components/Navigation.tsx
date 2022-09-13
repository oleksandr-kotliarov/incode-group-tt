import React, { memo } from 'react';
import { Breadcrumb } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useGetRepositoryByRepoQuery } from '../services/repository';
import { capitalize } from '../utils/capitalize';
import { formatStars } from '../utils/formatStars';

export const Navigation: React.FC = memo(() => {
  const { data } = useGetRepositoryByRepoQuery('facebook/react');

  return (
    <Breadcrumb>
      {data && (
        <>
          <Breadcrumb.Item>
            <a href={data.owner.html_url}>{capitalize(data.owner.login)}</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href={data.html_url}>{capitalize(data.name)}</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <StarOutlined />
            {`${formatStars(data.stargazers_count)} stars`}
          </Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
});
