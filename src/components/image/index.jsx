import React, { useState } from 'react';
import axios from 'axios';
import RadioGroup from '../RadioGroup';
import { ChromePicker } from 'react-color';
import Dropdown from '../Select';

import "./index.scss";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Pikachu',
  'Eevee',
  'Charizard',
  'Squirtle',
  'Bulbasaur',
  'Charmander',
  'Jigglypuff',
  'Snorlax',
  'Psyduck',
  'Gengar',
  'Gyarados',
  'Mudkip'
];



export default function Image() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);


  const [pokemons, setPokemons] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPokemons(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  // sex

  const [sex, setSex] = useState('male');

  const handleSexChange = (event) => {
    //setSex(event.target.value);
  };

  const sexFormControl = {
    label: "Gender",
    radios: [
      {
        value: "boy",
        subLabel: "Boy"
      },
      {
        value: "girl",
        subLabel: "Girl"
      }
    ]
  }

  // hair

  const [hairColor, setHairColor] = useState('#fff');

  const handleChangeComplete = (color) => {
    setHairColor(color.hex);
  };


  const getUrl = () => {
    setLoading(true);
    setUrl('');
    axios.post('http://localhost:8000/image', {
      appearance,
      scene,
      pokemons
    })
      .then(res => {
        setLoading(false);
        setUrl(res.data.url);
      })
      .catch(err => {
        setLoading(false);
        alert("Oops, something went wrong. Please try again.")
      })
  }

  // top wear
  const [topStyle, setTopStyle] = useState('');

  const handleTopStyleChange = (event) => {
    setTopStyle(event.target.value);
  };

  const topStyleFormControl = {
    label: "Top Style",
    options: [
      {
        value: "T-Shirt",
        subLabel: "T-Shirt"
      },
      {
        value: "blouse",
        subLabel: "Blouse"
      },
      {
        value: "hoodie",
        subLabel: "Hoodie"
      },
      {
        value: "sweater",
        subLabel: "Sweater"
      },
      {
        value: "sleeveless",
        subLabel: "Sleeveless"
      },
      {
        value: "jacket",
        subLabel: "Jacket"
      }
    ]
  }


  const [appearance, setAppearance] = useState('');

  const handleAppearanceChange = (event) => {
    setAppearance(event.target.value);
  }

  const [scene, setScene] = useState('');

  const handleSceneChange = (event) => {
    setScene(event.target.value);
  }

  const Text = ({ text, handleTextChange, placeholder }) => <>
    <textarea
      value={text}
      onChange={handleTextChange}
      rows="10"
      cols="50"
      placeholder={placeholder}
    />
  </>

  return (
    <div className="long-text-component">
      <h3>Describe your character's appearance:</h3>
      <textarea
        value={appearance}
        onChange={handleAppearanceChange}
        rows="10"
        cols="50"
        placeholder="hair style, pose, skin color, etc..."
      />
      <h3>Describe the scene and actions:</h3>
      <textarea
        value={scene}
        onChange={handleSceneChange}
        rows="10"
        cols="50"
        placeholder="eg. living room, tea party, etc..."
      />
      <div style={{ marginTop: 24 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Pokemons</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={pokemons}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={pokemons.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='img_container'>
        {pokemons.map(pokemon => <img src={`/${pokemon}.png`} height='150' />)}
      </div>
      {/* <div>
        <RadioGroup value={sex} handleChange={handleSexChange} formControl={sexFormControl} />
      </div>
      <div>
        <ChromePicker handleChangeComplete={handleChangeComplete} />
      </div>
      <div>
        <Dropdown value={topStyle} handleChange={handleTopStyleChange} formControl={topStyleFormControl} />
      </div> */}
      <div>
        <button onClick={getUrl}>{loading ? "Waiting..." : "Generate image"}</button>
      </div>
      {url && <div>
        <img src={url} />
      </div>}
    </div>
  );
}
