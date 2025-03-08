import React, { useEffect, useState } from 'react';

const PlayerStatistics = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const storedPlayer = localStorage.getItem("player");
    if (storedPlayer) {
      setPlayer(JSON.parse(storedPlayer));
    }
  }, []);

  if (!player) return <p className='text-center text-gray-600'>Select a player to view statistics.</p>;

  // Calculate dynamic values
  const battingStrikeRate = player.ballsFaced > 0 ? (player.totalRuns / player.ballsFaced) * 100 : 0;
  const battingAverage = player.inningsPlayed > 0 ? player.totalRuns / player.inningsPlayed : 0;
  const bowlingStrikeRate = player.wickets > 0 ? (player.oversBowled * 6) / player.wickets : 0;
  const economyRate = player.oversBowled > 0 ? (player.runsConceded / (player.oversBowled * 6)) * 6 : 0;

  const playerPoints = (battingStrikeRate / 5) + (battingAverage * 0.8) + (500 / (bowlingStrikeRate || 1)) + (140 / (economyRate || 1));
  const playerValue = Math.round(((9 * playerPoints + 100) * 1000) / 50000) * 50000;

  return (
    <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 font-poppins'>Player Statistics</h2>
      <div className='bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto space-y-4'>
        <h3 className='text-2xl font-semibold text-gray-800 text-center'>{player.name}</h3>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-center'>
          <div className='p-4 bg-gray-200 rounded-md'><span className='block font-semibold'>Total Runs</span>{player.totalRuns}</div>
          <div className='p-4 bg-gray-200 rounded-md'><span className='block font-semibold'>Balls Faced</span>{player.ballsFaced}</div>
          <div className='p-4 bg-gray-200 rounded-md'><span className='block font-semibold'>Innings Played</span>{player.inningsPlayed}</div>
          <div className='p-4 bg-gray-200 rounded-md'><span className='block font-semibold'>Wickets</span>{player.wickets}</div>
          <div className='p-4 bg-gray-200 rounded-md'><span className='block font-semibold'>Overs Bowled</span>{player.oversBowled}</div>
          <div className='p-4 bg-gray-200 rounded-md'><span className='block font-semibold'>Runs Conceded</span>{player.runsConceded}</div>
        </div>

        <h3 className='text-xl font-semibold text-gray-800 mt-6'>Calculated Statistics</h3>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-center'>
          <div className='p-4 bg-purple-200 rounded-md'><span className='block font-semibold'>Batting Strike Rate</span>{battingStrikeRate.toFixed(2)}</div>
          <div className='p-4 bg-purple-200 rounded-md'><span className='block font-semibold'>Batting Average</span>{battingAverage.toFixed(2)}</div>
          <div className='p-4 bg-purple-200 rounded-md'><span className='block font-semibold'>Bowling Strike Rate</span>{bowlingStrikeRate.toFixed(2)}</div>
          <div className='p-4 bg-purple-200 rounded-md'><span className='block font-semibold'>Economy Rate</span>{economyRate.toFixed(2)}</div>
          <div className='p-4 bg-purple-200 rounded-md'><span className='block font-semibold'>Player Points</span>{playerPoints.toFixed(2)}</div>
          <div className='p-4 bg-purple-200 rounded-md'><span className='block font-semibold'>Player Value</span>₹{playerValue.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatistics;