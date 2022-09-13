import { Paper } from '@mui/material';
import React, { FC, memo, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setKanbanTodos } from '../features/kanbanSlice';
import { useGetIssuesByRepoQuery } from '../services/repository';
import { Col, Row } from 'antd';
import { IssueCard } from './IssueCard';

export const KanbanBoard: FC = memo(() => {
  const initialKanban = useAppSelector((state) => state.kanban);
  const [kanban, setKanban] = useState(initialKanban);
  const { data } = useGetIssuesByRepoQuery('facebook/react');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setKanbanTodos(data));
  }, [data]);

  useEffect(() => {
    setKanban(initialKanban);
  }, [initialKanban]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (destination !== undefined) {
      const sourceColIndex = kanban.findIndex((col) => col.id === source.droppableId);
      const sourceCol = kanban[sourceColIndex];
      console.log(sourceCol);

      const sourceTask = [...sourceCol.tasks];
      const [removed] = sourceTask.splice(source.index, 1);

      sourceTask.splice(destination.index, 0, removed);

      const editedCol = {
        ...kanban[sourceColIndex],
        tasks: sourceTask,
      };

      const tempKanban = [...kanban];
      tempKanban.splice(sourceColIndex, 1, editedCol);

      setKanban(tempKanban);
    }
  };

  return (
    <Row gutter={60}>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        {kanban.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <Col
                span={8}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h1 className="App__FieldTitle">{section.title}</h1>
                <Paper elevation={12} className="App__IssuesField">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.node_id}
                      index={index}
                      draggableId={task.node_id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.5 : 1,
                          }}
                        >
                          <IssueCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Paper>
              </Col>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </Row>
  );
});
