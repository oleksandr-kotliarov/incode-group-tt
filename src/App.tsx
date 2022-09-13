import React, { memo, useEffect } from 'react';
import { LinkInput } from './components/LinkInput';
import { Navigation } from './components/Navigation';

import './App.scss';
import { KanbanBoard } from './components/KanbanBoard';
import { KanbanState, setKanban } from './features/kanbanSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useGetIssuesByRepoQuery } from './services/repository';

export const App: React.FC = memo(() => {
  const { link } = useAppSelector((state) => state.repositoryLink);

  const { data } = useGetIssuesByRepoQuery(link);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setKanban({ col: [0], tasks: [data || []]}));
  }, [data]);

  return (
    <div className="App">
      <LinkInput />
      <Navigation />
      <KanbanBoard />
    </div>
  );
});
