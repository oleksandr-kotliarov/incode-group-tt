import { createSlice } from '@reduxjs/toolkit';
import { Issue } from '../types/Issue';
import { v4 as uuidv4 } from 'uuid';

interface KanbanField {
  id: string;
  title: string;
  tasks: Issue[];
}

interface SetActionPayload {
  col: number;
  tasks: Issue[]
}

export type KanbanState = KanbanField[];

const initialState: KanbanState = [
  {
    id: uuidv4(),
    title: 'Todos',
    tasks: [],
  },
  {
    id: uuidv4(),
    title: 'In Progress',
    tasks: [],
  },
  {
    id: uuidv4(),
    title: 'Done',
    tasks: [],
  }
];

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setKanban: (state, actions: { payload: SetActionPayload }) => {
      const { col, tasks } = actions.payload;
      state[col].tasks = tasks;
    },
  },
});

export const { setKanban } = kanbanSlice.actions;

export default kanbanSlice.reducer;