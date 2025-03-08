import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ID, storage } from '../utils/appwrite';

const AddPlayer = () => {
    const navigate = useNavigate();
    const [playerData, setPlayerData] = useState({
        name: '',
        university: '',
        category: '',
        totalRuns: '',
        ballsFaced: '',
        inningsPlayed: '',
        wickets: '',
        oversBowled: '',
        runsConceded: '',
        image: null,
    });

    const handleChange = (e) => {
        setPlayerData({ ...playerData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async(e) => {
        setPlayerData({ ...playerData, image: e.target.files[0] });
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (!playerData.image) {
                alert("Please select an image file");
                return;
            }
    
            
            const createImage = await storage.createFile(
                "67cc226d0001417ce866", 
                ID.unique(),
                playerData.image 
            );
    
            
            const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/67cc226d0001417ce866/files/${createImage.$id}/view?project=67b75725001e624bd1d0`;
    
            
            const updatedPlayerData = { ...playerData, image: imageUrl };
    
            
            const response = await axios.post('http://localhost:4000/api/admin/addplayer', updatedPlayerData, {
                headers: { "Content-Type": "application/json" }
            });
    
            if (response.data.success) {
                alert("Player added successfully");
                navigate('/admin-panel');
            }
        } catch (error) {
            alert("Adding failed!!!!!");
            console.error("Error:", error);
        }
    };
    

    return (
        <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6 font-poppins'>Add New Player</h2>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto space-y-4'>
                {/* Player Name */}
                <div>
                    <label className='block text-gray-700 font-medium'>Player Name</label>
                    <input
                        type='text'
                        name='name'
                        value={playerData.name}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                        required
                    />
                </div>
                
                {/* University */}
                <div>
                    <label className='block text-gray-700 font-medium'>University</label>
                    <input
                        type='text'
                        name='university'
                        value={playerData.university}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                        required
                    />
                </div>
                
                {/* Category Selection */}
                <div>
                    <label className='block text-gray-700 font-medium'>Category</label>
                    <select
                        name='category'
                        value={playerData.category}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                        required
                    >
                        <option value=''>Select Category</option>
                        <option value='Batsman'>Batsman</option>
                        <option value='Bowler'>Bowler</option>
                        <option value='All-Rounder'>All-Rounder</option>
                    </select>
                </div>

                {/* Player Image Upload */}
                <div>
                    <label className='block text-gray-700 font-medium'>Player Image</label>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-md file:border-none file:cursor-pointer'
                        required
                    />
                </div>

                {/* Stats Fields in Two Columns */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {[
                        { label: 'Total Runs', name: 'totalRuns' },
                        { label: 'Balls Faced', name: 'ballsFaced' },
                        { label: 'Innings Played', name: 'inningsPlayed' },
                        { label: 'Wickets', name: 'wickets' },
                        { label: 'Overs Bowled', name: 'oversBowled' },
                        { label: 'Runs Conceded', name: 'runsConceded' },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className='block text-gray-700 font-medium'>{field.label}</label>
                            <input
                                type='number'
                                name={field.name}
                                value={playerData[field.name]}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition-all'
                >
                    Add Player
                </button>
            </form>
        </div>
    );
};

export default AddPlayer;
