import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const History = ({ prompt, response }) => {
  return (
    <Box mt={5} mb={5} p={2} sx={{ backgroundColor: '#f0f0f5', borderRadius: '5px' }}>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant='subtitle2'>Prompt:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{prompt}</Typography>
        </Grid>
      </Grid>
      <Grid container mt={4}>
        <Grid item xs={2}>
          <Typography variant='subtitle2'>Response:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{response}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default History;