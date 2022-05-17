import React, { useState } from 'react';
import './css/app.css';
import { Button, Paper, TextField, Container, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import openai from './services/openAI.js';
import History from './components/History';


const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }

  const sendToAI = () => {
    openai.createCompletion('text-curie-001', {
      prompt: searchText,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    .then(({ data }) => {
      const searchHistoryUpdate = [...searchHistory];
      searchHistoryUpdate.unshift({
        prompt: searchText,
        response: data.choices[0].text
      });
      setSearchHistory(searchHistoryUpdate);
      setSearchText('');
    })
    .catch(() => {
      const searchHistoryUpdate = [...searchHistory];
      searchHistoryUpdate.unshift({
        prompt: searchText,
        response: 'Your prompt failed to receive a response. Please try again later'
      });
      setSearchHistory(searchHistoryUpdate);
      setSearchText('');
    })
  }

  return (
    <Paper className='mainWindow'>
      <Container maxWidth='md'>
        <Typography variant='h2' mt={15}>
          Chat with an AI
        </Typography>
        <TextField
          multiline
          fullWidth
          placeholder="Please enter a prompt..."
          variant="standard"
          rows={15}
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <Container pt={20} sx={{ display: 'flex', flexDirection: 'row'}}>
          <FormControl sx={{ marginTop: '3%', width: '400px'}}>
            <InputLabel>Cat got your tongue? Try one of these!</InputLabel>
            <Select
              label="Cat got your tongue? Try one of these!"
              onChange={handleSearchTextChange}
            >
              <MenuItem value={'How are you?'}>How are you?</MenuItem>
              <MenuItem value={'What\'s up?'}>What's up?</MenuItem>
              <MenuItem value={'What can you do?'}>What can you do?</MenuItem>
              <MenuItem value={'Happy birthday!'}>Happy birthday!</MenuItem>
              <MenuItem value={'I have a question.'}>I have a question.</MenuItem>
              <MenuItem value={'Do you know a joke?'}>Do you know a joke?</MenuItem>
              <MenuItem value={'Do you love me?'}>Do you love me?</MenuItem>
              <MenuItem value={'Will you marry me?'}>Will you marry me?</MenuItem>
              <MenuItem value={'Do you like people?'}>Do you like people?</MenuItem>
              <MenuItem value={'Does Santa Claus exist?'}>Does Santa Claus exist?</MenuItem>
              <MenuItem value={'Are you part of the Matrix?'}>Are you part of the Matrix?</MenuItem>
              <MenuItem value={'Do you have a hobby?'}>Do you have a hobby?</MenuItem>
              <MenuItem value={'I want to speak to a human.'}>I want to speak to a human.</MenuItem>
              <MenuItem value={'What is your name?'}>What is your name?</MenuItem>
              <MenuItem value={'How old are you?'}>How old are you?</MenuItem>
              <MenuItem value={'What day is it today?'}>What day is it today?</MenuItem>
              <MenuItem value={'What do you do with my data?'}>What do you do with my data?</MenuItem>
              <MenuItem value={'Who made you?'}>Who made you?.</MenuItem>
              <MenuItem value={'Where do you live?'}>Where do you live?</MenuItem>
              <MenuItem value={'Do you have a job for me?'}>Do you have a job for me?</MenuItem>
              <MenuItem value={'Are you expensive?'}>Are you expensive?</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{ display: 'block', marginTop: '3%', height: '40px', marginRight: 0, marginLeft: 'auto' }}
            variant='contained'
            onClick={sendToAI}
          >
            Submit
          </Button>
        </Container>
        <Typography variant='h5' mt={4}>
          History:
        </Typography>
        {searchHistory.map((history, index) => (
          <History key={index} prompt={history.prompt} response={history.response} />
        ))}
      </Container>
    </Paper>
  );
}

export default App;
