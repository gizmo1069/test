import React, { useState } from 'react';
import axios from 'axios';

import "./index.scss";

export default function Character({ text }) {
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [character, setCharacter] = useState(null);

    const handleTextChange = (event) => {
        setDescription(event.target.value);
    }

    const generateCharacter = () => {
        setLoading(true);
        setCharacter(null);
        axios.post('http://localhost:8000/character', {
            text,
            description
        })
            .then(res => {
                setLoading(false);
                setCharacter(res.data.character);
            })
            .catch(err => {
                setLoading(false);
                alert("Oops, something went wrong. Please try again.")
            })
    }

    return (
        <div className="long-text-component">
            <h3>I want to create a character who...</h3>
            <textarea
                value={description}
                onChange={handleTextChange}
                rows="10"
                cols="50"
                placeholder="Enter text here..."
            />
            <div>
                <button onClick={generateCharacter}>{loading ? "Waiting..." : "Generate character"}</button>
            </div>
            {character && <div>
                <div className="margin">Description</div>
                <div>{character?.description}</div>
                <div className="margin">Integration into the story</div>
                <div>{character?.integration}</div>
                <div className="margin">Purpose of character</div>
                <div>{character?.purpose}</div>
            </div>}
        </div>
    );
}
