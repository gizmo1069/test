import { useState } from 'react'
import Image from './components/image';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Feedback from './components/Feedback';
import Character from './components/Character';
import Plot from './components/Plot';

import './App.scss'



const App = () => {


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  }

  const Text = ({text, handleTextChange}) => <>
    <h3>Paste your writing:</h3>
    <textarea
      value={text}
      onChange={handleTextChange}
      rows="10"
      cols="50"
      placeholder="Enter text here..."
    />
  </>

  


  return (
    <div className="container">
      {/* <h1>Storywriting Helper</h1>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Feedback" {...a11yProps(0)} />
        <Tab label="Character" {...a11yProps(1)} />
        <Tab label="Plot" {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Text {...{text, handleTextChange}} />
        <Feedback text={text} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Text {...{text, handleTextChange}} />
        <Character text={text} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Text {...{text, handleTextChange}} />
        <Plot text={text} />
      </CustomTabPanel> */}

      {/* <div>{team.length > 0 && <div className='table_container'><TableContainer component={Paper}>
        <Table sx={{ minWidth: 0 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Abilities</TableCell>
              <TableCell align="left">Moves</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${row.nationalPokedex}.png`}/>
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.abilities.join(", ")}</TableCell>
                <TableCell align="left">{row.moves.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div>}</div> */}

      <Image />
    </div>
  )
}

export default App;
