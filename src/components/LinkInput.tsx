import React, { memo } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Col, Row } from 'antd';

export const LinkInput: React.FC = memo(() => {
  return (
    <Row gutter={12}>
      <Col span={8}>
        <TextField 
          id="outlined-basic" 
          label="Enter repo URL" 
          variant="outlined"
          size="small"
          fullWidth
        />
      </Col>
      <Col span={8}>
        <Button variant="outlined" size="large">
          Load issues
        </Button>
      </Col>
    </Row>
  );
});
