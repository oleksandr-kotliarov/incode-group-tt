import { createSlice } from '@reduxjs/toolkit';
import { Issue } from '../types/Issue';
import { v4 as uuidv4 } from 'uuid';

interface KanbanField {
  id: string;
  title: string;
  tasks: Issue[];
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
    setKanban: (state, actions) => {
      state = actions.payload;
    },

    setKanbanTodos: (state, actions) => {
      const todos = state[0];

      if (actions.payload) {
        todos.tasks = actions.payload;
      }

      state = [todos, ...state.slice(1)];
    }
  },
});

export const { setKanban, setKanbanTodos } = kanbanSlice.actions;

export default kanbanSlice.reducer;