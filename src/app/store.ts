import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { repositoryApi } from '../services/repository';
import kanbanReducer from '../features/kanbanSlice';

export const store = configureStore({
  reducer: {
    repositoryApi: repositoryApi.reducer,
    kanban: kanbanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(repositoryApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
