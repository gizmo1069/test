// import { useState } from 'react'
// import Image from './components/image';
// import axios from 'axios';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// import Feedback from './components/Feedback';
// import Character from './components/Character';
// import Plot from './components/Plot';

// import './App.scss'



// const App = () => {


//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };



//   function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && children}
//       </div>
//     );
//   }

//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
//   }

//   const [text, setText] = useState('');

//   const handleTextChange = (event) => {
//     setText(event.target.value);
//   }

//   const Text = ({text, handleTextChange}) => <>
//     <h3>Paste your writing:</h3>
//     <textarea
//       value={text}
//       onChange={handleTextChange}
//       rows="10"
//       cols="50"
//       placeholder="Enter text here..."
//     />
//   </>




//   return (
//     <div className="container">
//       {/* <h1>Storywriting Helper</h1>
//       <Tabs value={value} onChange={handleChange} centered>
//         <Tab label="Feedback" {...a11yProps(0)} />
//         <Tab label="Character" {...a11yProps(1)} />
//         <Tab label="Plot" {...a11yProps(2)} />
//       </Tabs>
//       <CustomTabPanel value={value} index={0}>
//         <Text {...{text, handleTextChange}} />
//         <Feedback text={text} />
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         <Text {...{text, handleTextChange}} />
//         <Character text={text} />
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         <Text {...{text, handleTextChange}} />
//         <Plot text={text} />
//       </CustomTabPanel> */}

//       {/* <div>{team.length > 0 && <div className='table_container'><TableContainer component={Paper}>
//         <Table sx={{ minWidth: 0 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//             <TableCell></TableCell>
//               <TableCell align="left">Name</TableCell>
//               <TableCell align="left">Type</TableCell>
//               <TableCell align="left">Abilities</TableCell>
//               <TableCell align="left">Moves</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {team.map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${row.nationalPokedex}.png`}/>
//                 </TableCell>
//                 <TableCell align="left">{row.name}</TableCell>
//                 <TableCell align="left">{row.type}</TableCell>
//                 <TableCell align="left">{row.abilities.join(", ")}</TableCell>
//                 <TableCell align="left">{row.moves.join(", ")}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer></div>}</div> */}

//       <Image />
//     </div>
//   )
// }

// export default App;


import React, { useState } from 'react';
import { SwatchesPicker } from 'react-color';
import axios from 'axios';
import './App.scss';

function App() {
  // State for each input field
  const [gender, setGender] = useState('male');
  const [skinTone, setSkinTone] = useState('#ffdbac');
  const [hairStyle, setHairStyle] = useState('');
  const [hairColor, setHairColor] = useState('#000000');
  const [eyeShape, setEyeShape] = useState('');
  const [eyeColor, setEyeColor] = useState('#795548');
  const [topType, setTopType] = useState('');
  const [bottomType, setBottomType] = useState('');
  const [shoeType, setShoeType] = useState('');
  const [outfit, setOutfit] = useState('');
  const [background, setBackground] = useState('');
  const [type, setType] = useState('faceshot');
  const [pose, setPose] = useState('');
  const [expression, setExpression] = useState('');
  const [profession, setProfession] = useState('');
  const [race, setRace] = useState('');


  const [skinSwatch, setSkinSwatch] = useState(false);
  const [hairSwatch, setHairSwatch] = useState(false);
  const [eyeSwatch, setEyeSwatch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const skintones =
    [
      ["#FFDBAC", "#FDE0CF", "#FFE5CC", "#FFEDDA", "#F8E4CD"],
      ["#F1C27D", "#D2B48C", "#C2A080", "#BA9267", "#B89C78"],
      ["#C68642", "#8D5524", "#AF6E51", "#A1785D", "#B5835A"],
      ["#654321", "#4E3013", "#5C4033", "#705E48", "#6E4E37"],
      ["#3B1F1F", "#271B10", "#2F1B0C", "#361F13", "#3A2C25"]
    ];

  // Handlers for each input change
  const handleSkinToneChange = (color, event) => {
    setSkinTone(color.hex);
    setSkinSwatch(false);
  };
  const handleHairColorChange = (color, event) => {
    setHairColor(color.hex);
    setHairSwatch(false);
  };
  const handleEyeColorChange = (color, event) => {
    setEyeColor(color.hex);
    setEyeSwatch(false);
  };
  const handleOutfitChange = (e) => {
    setOutfit(e.target.value);
  }
  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
  }
  const handlePoseChange = (e) => {
    setPose(e.target.value);
  }
  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
  }
  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  }
  const handleRaceChange = (event) => {
    setRace(event.target.value);
  };
  const handleHairStyleChange = (e) => setHairStyle(e.target.value);
  const handleTopTypeChange = (e) => setTopType(e.target.value);
  const handleBottomTypeChange = (e) => setBottomType(e.target.value);
  const handleShoeTypeChange = (e) => setShoeType(e.target.value);


  // Placeholder for generate avatar function
  const generateAvatar = () => {
    setLoading(true);
    setUrl('');
    let prompt = `Generate a prompt for dalle-3 for the following description. It's an cartoon style avatar for social media. A ${type} image of a ${gender} ${race} ${profession}. Skin tone is ${skinTone}. Hair color is ${hairColor}. Eye color is ${eyeColor}. Hairstyle is ${hairStyle}. Outfit and physical features are ${outfit}. Pose and facial expressions are ${pose}. Background is ${background}. Make sure you replace the color hex code with color names, and only include color names in the prompt.`;
    console.log(prompt);
    axios.post(`${import.meta.env.API_URL}image`, {
      prompt
    })
      .then(res => {
        setLoading(false);
        setUrl(res.data.url);
      })
      .catch(err => {
        setLoading(false);
        alert("Oops, something went wrong. Please try again.")
      })
  };

  return (
    <div className="App">
      <header>
        AI Avatar Creator
        <p>Craft Your Digital Persona with AI</p>
      </header>
      <main>
        <div className="avatar-display">
          {!url && <div className='img_note'>Your customized avatar will appear here after click "Generate" button!</div>}
          <img src={url ? url : gender + ".png"} id="avatar" />
        </div>
        <div className="controls">
          <div className="control-section">
            Gender:
            <span className='tag' style={gender === 'male' ? { borderColor: '#45ad6b' } : {}} onClick={() => setGender("male")}>Male</span>
            <span className='tag' style={gender === 'female' ? { borderColor: '#45ad6b' } : {}} onClick={() => setGender("female")}>Female</span>
            <span className='tag' style={gender === 'nonbinary' ? { borderColor: '#45ad6b' } : {}} onClick={() => setGender("nonbinary")}>Non-binary</span>
          </div>
          <div className="control-section">
            Race:
            <select name="race" id="race-select" value={race} onChange={handleRaceChange}>
              <option value="">--Please choose an option--</option>
              <option value="Caucasian">Caucasian</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Black">Black</option>
              <option value="Middle-Eastern">Middle-Eastern</option>
              <option value="South Asian">South Asian</option>
              <option value="East Asian">East Asian</option>
              <option value="Native American">Native American</option>
              <option value="Pacific Islander">Pacific Islander</option>
              <option value="Mixed Race">Mixed Race</option>
            </select>
          </div>
          <div className="control-section">
            Profession:
            <input class="hairstyle_input" value={profession} onChange={handleProfessionChange} />
          </div>
          <div className="control-section">
            Skin Tone:
            <div className='color_block' style={{ backgroundColor: skinTone }} onClick={() => setSkinSwatch(true)}></div>
            {skinSwatch && <div className='swatch_container'>
              <SwatchesPicker onChangeComplete={handleSkinToneChange} colors={skintones} />
            </div>}
          </div>
          <div className="control-section">
            Hair Color:
            <div className='color_block' style={{ backgroundColor: hairColor }} onClick={() => setHairSwatch(true)}></div>
            {hairSwatch && <div className='swatch_container'>
              <SwatchesPicker onChangeComplete={handleHairColorChange} />
            </div>}
            <span style={{ marginLeft: 24 }}>Hair Style: </span>
            <input class="hairstyle_input" value={hairStyle} onChange={handleHairStyleChange} />
          </div>
          <div className="control-section">
            Eye Color:
            <div className='color_block' style={{ backgroundColor: eyeColor }} onClick={() => setEyeSwatch(true)}></div>
            {eyeSwatch && <div className='swatch_container'>
              <SwatchesPicker onChangeComplete={handleEyeColorChange} />
            </div>}
          </div>
          <div className="control-section" style={{ flexDirection: 'column', alignItems: 'start' }}>
            Outfit & other physical features:
            <div style={{ marginTop: 8 }}>
              <textarea value={outfit} onChange={handleOutfitChange} placeholder="tank top, tattoo on left arm" />
            </div>
          </div>
          <div className="control-section" style={{ flexDirection: 'column', alignItems: 'start' }}>
            Pose & Facial Expression:
            <div style={{ marginTop: 8 }}>
              <textarea value={pose} onChange={handlePoseChange} placeholder="serious face" />
            </div>
          </div>
          <div className="control-section" style={{ flexDirection: 'column', alignItems: 'start' }}>
            Background:
            <div style={{ marginTop: 8 }}>
              <textarea value={background} onChange={handleBackgroundChange} placeholder="gym" />
            </div>
          </div>
          {/* <div className="control-section" style={{ marginTop: 24 }}>
            <button onClick={generateAvatar}>Generate</button>
          </div> */}
          <div className="control-section">
            <span className='tag' style={type === 'faceshot' ? { borderColor: '#45ad6b' } : {}} onClick={() => setType("faceshot")}>Faceshot</span>
            <span className='tag' style={type === '1/4 body shot' ? { borderColor: '#45ad6b' } : {}} onClick={() => setType("1/4 body shot")}>1/4 Body</span>
            <span className='tag' style={type === '3/4 body shot' ? { borderColor: '#45ad6b' } : {}} onClick={() => setType("3/4 body shot")}>3/4 Body</span>
            <span className='tag' style={type === 'full body shot' ? { borderColor: '#45ad6b' } : {}} onClick={() => setType("full body shot")}>Full Body</span>
          </div>
        </div>
      </main>
      <footer>
        <button className="save-button" onClick={generateAvatar}>{loading ? "Gerating avatar..." : "Generate"}</button>
        {/* <button className="save-button" style={{ marginTop: 8 }}>Save/Export</button> */}
      </footer>
    </div>
  );
}

export default App;
