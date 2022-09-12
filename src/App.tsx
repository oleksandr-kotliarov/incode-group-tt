import React, { memo } from 'react';
import { IssuesField } from './components/IssuesField';
import { LinkInput } from './components/LinkInput';
import { Navigation } from './components/Navigation';
import { Col, Row } from 'antd';

import './App.scss';

export const App: React.FC = memo(() => {
  return (
    <div className="App">
      <LinkInput />
      <Navigation />
      <Row gutter={60}>
        <Col span={8}>
          <IssuesField title="Todos" />
        </Col>
        <Col span={8}>
          <IssuesField title="In Progress" />
        </Col>
        <Col span={8}>
          <IssuesField title="Done" />
        </Col>
      </Row>
    </div>
  );
});
