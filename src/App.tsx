import React, { memo, useEffect } from 'react';
import { IssuesField } from './components/IssuesField';
import { LinkInput } from './components/LinkInput';
import { Navigation } from './components/Navigation';
import { Col, Row } from 'antd';

import './App.scss';
import { KanbanBoard } from './components/KanbanBoard';

export const App: React.FC = memo(() => {
  return (
    <div className="App">
      <LinkInput />
      <Navigation />
      <KanbanBoard />
    </div>
  );
});
