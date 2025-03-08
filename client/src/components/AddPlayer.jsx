import React, { useState } from 'react';

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
