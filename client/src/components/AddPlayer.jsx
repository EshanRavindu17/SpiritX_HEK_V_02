import React, { useState } from 'react';
import { FaUser, FaRunning, FaBaseballBall, FaCheck } from 'react-icons/fa';

const AddPlayer = () => {
  const [playerData, setPlayerData] = useState({
    name: '',
    totalRuns: '',
    ballsFaced: '',
    inningsPlayed: '',
    wickets: '',
    oversBowled: '',
    runsConceded: '',
  });

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Player Data:', playerData);
  };

  return (
    <div className='flex-1 p-6 md:p-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full'>
        <h2 className='text-4xl flex justify-center gap-4 items-center font-bold text-gray-800 mb-6 text-center font-poppins'>
          <FaUser className='inline-block text-purple-600' /> Add New Player
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Player Name */}
          <div>
            <label className='block text-gray-700 font-medium text-lg'>Player Name</label>
            <input
              type='text'
              name='name'
              value={playerData.name}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
              placeholder='Enter player name'
              required
            />
          </div>

          {/* Stats Fields in Two Columns */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              { label: 'Total Runs', name: 'totalRuns', icon: <FaRunning className='text-purple-600' /> },
              { label: 'Balls Faced', name: 'ballsFaced', icon: <FaBaseballBall className='text-purple-600' /> },
              { label: 'Innings Played', name: 'inningsPlayed', icon: <FaRunning className='text-purple-600' /> },
              { label: 'Wickets', name: 'wickets', icon: <FaBaseballBall className='text-purple-600' /> },
              { label: 'Overs Bowled', name: 'oversBowled', icon: <FaRunning className='text-purple-600' /> },
              { label: 'Runs Conceded', name: 'runsConceded', icon: <FaBaseballBall className='text-purple-600' /> },
            ].map((field) => (
              <div key={field.name}>
                <label className='block text-gray-700 font-medium text-lg'>{field.icon} {field.label}</label>
                <input
                  type='number'
                  name={field.name}
                  value={playerData[field.name]}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-purple-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center space-x-2 hover:bg-purple-700 transition-all text-lg'
          >
            <FaCheck /> <span>Add new Player</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;