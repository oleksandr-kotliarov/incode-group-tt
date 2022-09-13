import React, { memo, useEffect } from 'react';
import { LinkInput } from './components/LinkInput';
import { Navigation } from './components/Navigation';

import './App.scss';
import { KanbanBoard } from './components/KanbanBoard';
import { setKanban } from './features/kanbanSlice';
import { useAppDispatch } from './app/hooks';
import { useGetIssuesByRepoQuery } from './services/repository';

export const App: React.FC = memo(() => {
  const { data } = useGetIssuesByRepoQuery('facebook/react');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setKanban({ col: 0, tasks: data || [] }));
  }, [data]);

  return (
    <div className="App">
      <LinkInput />
      <Navigation />
      <KanbanBoard />
    </div>
  );
});
