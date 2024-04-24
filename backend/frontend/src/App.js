// transcript_bot_frontend/src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const fetchTranscript = async () => {
    try {
      const response = await fetch('/fetch_transcript/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: videoUrl }),
      });
      const data = await response.json();
      if (data.success) {
        fetchChat();
      } else {
        alert('Failed to fetch transcript.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const fetchChat = async () => {
    try {
      const response = await fetch('/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput, video_url: videoUrl }),
      });
      const data = await response.json();
      setChatHistory([...chatHistory, { user: userInput, bot: data.response }]);
      setUserInput('');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="App">
      <h1>Transcript Bot</h1>
      <input type="text" value={videoUrl} onChange={handleVideoUrlChange} placeholder="Enter YouTube URL" />
      <button onClick={fetchTranscript}>Fetch Transcript</button>
      <div className="ChatContainer">
        {chatHistory.map((item, index) => (
          <div key={index}>
            <p><strong>You:</strong> {item.user}</p>
            <p><strong>Bot:</strong> {item.bot}</p>
          </div>
        ))}
      </div>
      <input type="text" value={userInput} onChange={handleUserInputChange} placeholder="Ask me a question" />
      <button onClick={fetchChat}>Ask</button>
    </div>
  );
}

export default App;
