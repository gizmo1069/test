import React, { useState } from 'react';
import axios from 'axios';

import "./index.scss";

export default function Feedback({ text }) {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviseLoading, setReviseLoading] = useState(false);
  const [revised, setRevised] = useState("");

  const getFeedback = () => {
    setLoading(true);
    setFeedback(null);
    axios.post('http://localhost:8000/feedback', {
      text
    })
      .then(res => {
        setLoading(false);
        setFeedback(res.data.feedback);
      })
      .catch(err => {
        setLoading(false);
        alert("Oops, something went wrong. Please try again.")
      })
  }

  const getRevised = () => {
    setReviseLoading(true);
    setRevised("");
    axios.post('http://localhost:8000/revise', {
      text,
      suggestions: feedback.suggestions.map(suggestion => suggestion.bulletPointDetail)
    })
      .then(res => {
        setReviseLoading(false);
        setRevised(res.data.revised);
      })
      .catch(err => {
        setReviseLoading(false);
        alert("Oops, something went wrong. Please try again.")
      })
  }

  return (
    <div className="long-text-component">
      <div>
        <button onClick={getFeedback}>{loading ? "Waiting..." : "Get feedback"}</button>
      </div>
      {feedback && <div className='feedback_container'>
        <div>
          <div className="margin">Strengths</div>
          <div>
            {feedback?.strengths?.map(strength => <div>
              <div className='subtitle'>{strength.bulletPointKeyword}</div>
              <div>{strength.bulletPointDetail}</div>
            </div>)}
          </div>
        </div>
        <div>
          <div className="margin">Suggestions</div>
          <div>
            {feedback?.suggestions?.map(suggestion => <div>
              <div className='subtitle'>{suggestion.bulletPointKeyword}</div>
              <div>{suggestion.bulletPointDetail}</div>
            </div>)}
          </div>
        </div>
      </div>}
      {feedback && <div>
        <button onClick={getRevised}>{reviseLoading ? "Waiting..." : "Revise for me"}</button>
      </div>}
      {feedback && <div>
        <div className="margin">Revised version</div>
        <div className='left'>{revised}</div>
      </div>}
    </div>
  );
}
