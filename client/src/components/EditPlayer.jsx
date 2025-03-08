import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPlayer = () => {
    const navigate = useNavigate()
    const obj = useParams()
    
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
  });

  useEffect(() => {
        const fetchPlayer = async() => {
            try{
                const response = await axios.get(`http://localhost:4000/api/admin/getplayer/${obj.id}`);
                if(response.data.success){
                    setPlayerData(response.data.player);
                }
            }catch(error){
                alert("Failed to fetch player");
            }
        }
        fetchPlayer();

  }, []);

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
        const response = await axios.put(`http://localhost:4000/api/admin/editplayer/${obj.id}`, 
            playerData);
        if(response.data.success){
            alert("Player edited successfully");
            navigate('/admin-panel');
        }
    }catch(error){
        alert("Adding failed!!!!!")
        console.log(error);
    }
  };

  return (
    <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 font-poppins'>Edit Player</h2>
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
          Edit Player
        </button>
      </form>
    </div>
  );
};

export default EditPlayer;
