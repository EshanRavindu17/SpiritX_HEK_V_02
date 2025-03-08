import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import image1 from '../assets/images/profile.jpg';
import { useNavigate } from 'react-router-dom';

const playersData = [
  {
    id: 1,
    name: 'Virat Kohli',
    category: 'All Rounder',
    totalRuns:1200,
    ballsFaced:200,
    inningsPlayed:12,
    wickets:10,
    oversBowled:22,
    runsConceded:240,
    image: image1,
  },
  {
    id: 2,
    name: 'MS Dhoni',
    category: 'Batsman',
    totalRuns:1200,
    ballsFaced:200,
    inningsPlayed:12,
    wickets:10,
    oversBowled:22,
    runsConceded:240,
    image: image1,
  },
  {
    id: 3,
    name: 'Jasprit Bumrah',
    category: 'Bowler',
    totalRuns:1200,
    ballsFaced:200,
    inningsPlayed:12,
    wickets:10,
    oversBowled:22,
    runsConceded:240,
    image:image1,
  },
    {
        id: 4,
        name: 'Rohit Sharma',
        category: 'Batsman',
        totalRuns:1200,
        ballsFaced:200,
        inningsPlayed:12,
        wickets:10,
        oversBowled:22,
        runsConceded:240,
        image: image1,
    }
];

const Players = () => {
    const navigate = useNavigate()
  return (
    <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 font-poppins'>Player List</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {playersData.map((player) => (
          <div key={player.id} className='bg-white rounded-xl shadow-md p-5 flex flex-col items-center space-y-4 hover:shadow-lg transition-all'
          onClick={()=>{
            localStorage.setItem('player', JSON.stringify(player));
            navigate('/admin-panel/player-statistics');
          }}
          >
            <img
              src={player.image}
              alt={player.name}
              className='w-24 h-24 rounded-full border-4 border-purple-600 object-cover'
            />
            <h3 className='text-xl font-semibold text-gray-800 font-poppins'>{player.name}</h3>
            <span className='px-4 py-1 bg-purple-600 text-white rounded-full text-sm'>{player.category}</span>
            <div className='flex space-x-4'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-all'>
                <FaEdit /> <span>Edit</span>
              </button>
              <button className='bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-600 transition-all'>
                <FaTrash /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
