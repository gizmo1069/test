import React, { useState } from 'react';
import axios from 'axios';

import "./index.scss";

export default function Plot({ text }) {
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [plot, setPlot] = useState('');

    const handleTextChange = (event) => {
        setDescription(event.target.value);
    }

    const generatePlot = () => {
        setLoading(true);
        setPlot('');
        axios.post('http://localhost:8000/plot', {
            text,
            description
        })
            .then(res => {
                setLoading(false);
                setPlot(res.data.plotSummary);
            })
            .catch(err => {
                setLoading(false);
                alert("Oops, something went wrong. Please try again.")
            })
    }

    return (
        <div className="long-text-component">
            <h3>The story should...</h3>
            <textarea
                value={description}
                onChange={handleTextChange}
                rows="10"
                cols="50"
                placeholder="Enter text here..."
            />
            <div>
                <button onClick={generatePlot}>{loading ? "Waiting..." : "Generate plot"}</button>
            </div>
            {plot && <div>
                <div className="margin">Plot</div>
                <div>{plot}</div>
            </div>}
        </div>
    );
}
