import React, { memo } from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from 'antd';
const { Text } = Typography;

interface Props {
  title: string;
}

export const IssuesField: React.FC<Props> = memo((props: Props) => {
  const { title } = props;
  return (
    <div>
      <h1 className="App__FieldTitle">{title}</h1>
      <Paper elevation={12} className="App__IssuesField">
        <Text disabled>Move something here...</Text>
      </Paper>
    </div>
  );
});