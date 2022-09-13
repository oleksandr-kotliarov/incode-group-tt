import { Paper } from '@mui/material';
import React, { FC, memo } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setKanban } from '../features/kanbanSlice';
import { Col, Row } from 'antd';
import { IssueCard } from './IssueCard';

export const KanbanBoard: FC = memo(() => {
  const dispatch = useAppDispatch();
  const { kanban } = useAppSelector((state) => state);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (destination !== undefined) {
      if (source.droppableId !== destination.droppableId) {
        const sourceColIndex = kanban.findIndex((col) => col.id === source.droppableId);
        const destinationColIndex = kanban.findIndex((col) => col.id === destination.droppableId);

        const sourceCol = kanban[sourceColIndex];
        const destinationCol = kanban[destinationColIndex];

        const sourceTask = [...sourceCol.tasks];
        const destinationTask = [...destinationCol.tasks];

        const [removed] = sourceTask.splice(source.index, 1);

        destinationTask.splice(destination.index, 0, removed);

        dispatch(setKanban({ col: sourceColIndex, tasks: sourceTask }));
        dispatch(setKanban({ col: destinationColIndex, tasks: destinationTask }));
      } else {
        const sourceColIndex = kanban.findIndex((col) => col.id === source.droppableId);
        const sourceCol = kanban[sourceColIndex];

        const sourceTask = [...sourceCol.tasks];
        const [removed] = sourceTask.splice(source.index, 1);

        sourceTask.splice(destination.index, 0, removed);

        const editedCol = {
          ...kanban[sourceColIndex],
          tasks: sourceTask,
        };

        dispatch(setKanban({ col: sourceColIndex, tasks: editedCol.tasks }));
      }
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
