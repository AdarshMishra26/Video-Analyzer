
import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/chat', { user_input: userInput });
            setChatHistory([...chatHistory, { user: userInput, bot: response.data.response }]);
            setUserInput('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <h1 className="text-center text-3xl font-bold text-gray-800 p-6">Chat with TranscriptBot</h1>
                <div id="chatbox" className="px-6 py-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
                    {chatHistory.map((message, index) => (
                        <p key={index} className="text-gray-800">
                            <strong>You:</strong> {message.user}<br />
                            <strong>TranscriptBot:</strong> {message.bot}
                        </p>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex items-center justify-between px-4 pb-4">
                    <input
                        type="text"
                        name="user_input"
                        id="user_input"
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
