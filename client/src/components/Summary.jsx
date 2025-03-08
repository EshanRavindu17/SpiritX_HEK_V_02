import React from 'react';
import { FaChartBar, FaTrophy, FaRunning, FaBowlingBall } from 'react-icons/fa';
import image1 from '../assets/images/profile.jpg';

const tournamentData = {
  overallRuns: 1200,
  overallWickets: 80,
  highestRunScorer: {
    name: 'Virat Kohli',
    runs: 350,
    image: image1,
  },
  highestWicketTaker: {
    name: 'Jasprit Bumrah',
    wickets: 15,
    image: image1,
  },
};

const Summary = () => {
  return (
    <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 font-poppins'>Tournament Summary</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
        {/* Overall Runs */}
        <div className='bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all'>
          <FaRunning className='text-4xl text-purple-600' />
          <div>
            <h3 className='text-xl font-semibold text-gray-800 font-poppins'>Overall Runs</h3>
            <p className='text-2xl font-bold text-gray-900'>{tournamentData.overallRuns}</p>
          </div>
        </div>
        
        {/* Overall Wickets */}
        <div className='bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all'>
          <FaBowlingBall className='text-4xl text-blue-600' />
          <div>
            <h3 className='text-xl font-semibold text-gray-800 font-poppins'>Overall Wickets</h3>
            <p className='text-2xl font-bold text-gray-900'>{tournamentData.overallWickets}</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        {/* Highest Run Scorer */}
        <div className='bg-white shadow-md rounded-xl p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition-all'>
          <img
            src={tournamentData.highestRunScorer.image}
            alt={tournamentData.highestRunScorer.name}
            className='w-24 h-24 rounded-full border-4 border-purple-600 object-cover'
          />
          <h3 className='text-xl font-semibold text-gray-800 font-poppins'>{tournamentData.highestRunScorer.name}</h3>
          <span className='px-4 py-1 bg-purple-600 text-white rounded-full text-sm'>Highest Run Scorer</span>
          <p className='text-lg font-bold text-gray-900'>{tournamentData.highestRunScorer.runs} Runs</p>
        </div>
        
        {/* Highest Wicket Taker */}
        <div className='bg-white shadow-md rounded-xl p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition-all'>
          <img
            src={tournamentData.highestWicketTaker.image}
            alt={tournamentData.highestWicketTaker.name}
            className='w-24 h-24 rounded-full border-4 border-blue-600 object-cover'
          />
          <h3 className='text-xl font-semibold text-gray-800 font-poppins'>{tournamentData.highestWicketTaker.name}</h3>
          <span className='px-4 py-1 bg-blue-600 text-white rounded-full text-sm'>Highest Wicket Taker</span>
          <p className='text-lg font-bold text-gray-900'>{tournamentData.highestWicketTaker.wickets} Wickets</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
