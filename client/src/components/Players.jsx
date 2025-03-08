import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa';
import image1 from '../assets/images/profile.jpg';
import { useNavigate } from 'react-router-dom';

const Players = () => {
  const [playersData, setPlayersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating real-time data fetching
    const fetchPlayers = () => {
      setPlayersData([
        {
          id: 1,
          name: 'Virat Kohli',
          category: 'All Rounder',
          totalRuns: Math.floor(Math.random() * 2000),
          ballsFaced: Math.floor(Math.random() * 300),
          inningsPlayed: Math.floor(Math.random() * 50),
          wickets: Math.floor(Math.random() * 50),
          oversBowled: Math.floor(Math.random() * 100),
          runsConceded: Math.floor(Math.random() * 500),
          image: image1,
        },
        {
          id: 2,
          name: 'MS Dhoni',
          category: 'Batsman',
          totalRuns: Math.floor(Math.random() * 2000),
          ballsFaced: Math.floor(Math.random() * 300),
          inningsPlayed: Math.floor(Math.random() * 50),
          wickets: Math.floor(Math.random() * 50),
          oversBowled: Math.floor(Math.random() * 100),
          runsConceded: Math.floor(Math.random() * 500),
          image: image1,
        },
        {
          id: 3,
          name: 'Jasprit Bumrah',
          category: 'Bowler',
          totalRuns: Math.floor(Math.random() * 2000),
          ballsFaced: Math.floor(Math.random() * 300),
          inningsPlayed: Math.floor(Math.random() * 50),
          wickets: Math.floor(Math.random() * 50),
          oversBowled: Math.floor(Math.random() * 100),
          runsConceded: Math.floor(Math.random() * 500),
          image: image1,
        },
        {
          id: 4,
          name: 'Rohit Sharma',
          category: 'Batsman',
          totalRuns: Math.floor(Math.random() * 2000),
          ballsFaced: Math.floor(Math.random() * 300),
          inningsPlayed: Math.floor(Math.random() * 50),
          wickets: Math.floor(Math.random() * 50),
          oversBowled: Math.floor(Math.random() * 100),
          runsConceded: Math.floor(Math.random() * 500),
          image: image1,
        },
      ]);
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 5000); // Update stats every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen text-gray-900'>
      <h2 className='text-4xl font-bold text-center mb-6 font-poppins text-purple-600'>Player List</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {playersData.map((player) => (
          <div
            key={player.id}
            className='bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-4 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 border border-gray-300'
            onClick={() => {
              localStorage.setItem('player', JSON.stringify(player));
              navigate('/admin-panel/player-statistics');
            }}
          >
            <img
              src={player.image}
              alt={player.name}
              className='w-20 h-20 rounded-full border-4 border-purple-500 object-cover shadow-md'
            />
            <h3 className='text-lg font-semibold  font-poppins'>{player.name}</h3>
            <span className='px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-medium'>{player.category}</span>
            <div className='flex space-x-2 mt-3'>
              <button className='bg-blue-500 text-white px-3 py-1 rounded-md flex items-center space-x-2 hover:bg-blue-400 transition-all shadow-md text-sm'>
                <FaEdit /> <span>Edit</span>
              </button>
              <button className='bg-red-500 text-white px-3 py-1 rounded-md flex items-center space-x-2 hover:bg-red-400 transition-all shadow-md text-sm'>
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
