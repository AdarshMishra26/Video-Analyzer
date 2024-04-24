import React, { useState } from 'react';
import axios from 'axios';

const Index = () => {
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/index', { video_url: videoUrl });
            // Redirect or handle response as needed
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">TranscriptBot</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label htmlFor="video_url" className="text-gray-700">Enter YouTube video URL:</label>
                    <input
                        type="text"
                        name="video_url"
                        id="video_url"
                        required
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="px-4 py-2 rounded-md border-none bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Start Chat
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Index;
