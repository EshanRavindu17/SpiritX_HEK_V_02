import React, { useState } from 'react';

// Sample player data (add points to each player)
const availablePlayers = [
  { name: 'Player 1', university: 'University A', points: 50 },
  { name: 'Player 2', university: 'University B', points: 60 },
  { name: 'Player 3', university: 'University C', points: 55 },
  { name: 'Player 4', university: 'University D', points: 70 },
  { name: 'Player 5', university: 'University E', points: 80 },
  { name: 'Player 6', university: 'University F', points: 65 },
  { name: 'Player 7', university: 'University G', points: 50 },
  { name: 'Player 8', university: 'University H', points: 75 },
  { name: 'Player 9', university: 'University I', points: 85 },
  { name: 'Player 10', university: 'University J', points: 90 },
  { name: 'Player 11', university: 'University K', points: 60 },
];

const TeamView = () => {
  const [team, setTeam] = useState([]);
  const [teamPoints, setTeamPoints] = useState(0);
  const [remainingPlayers, setRemainingPlayers] = useState(availablePlayers);

  const handleAddPlayer = (player) => {
    if (team.length < 11 && !team.find((p) => p.name === player.name)) {
      setTeam([...team, player]);
      setTeamPoints(teamPoints + player.points);
      setRemainingPlayers(remainingPlayers.filter((p) => p.name !== player.name));
    }
  };

  const handleRemovePlayer = (player) => {
    setTeam(team.filter((p) => p.name !== player.name));
    setTeamPoints(teamPoints - player.points);
    setRemainingPlayers([...remainingPlayers, player]);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#d1d5db] via-[#e5e7eb] to-[#f3f4f6] text-white p-6 md:p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg p-6 mb-5 rounded-lg text-center w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-extrabold uppercase tracking-[0.2em] text-black drop-shadow-lg">
          Select Your Team
        </h2>
      </div>

      {/* Team Status */}
      <div className="w-full mb-8">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-gray-800 mb-2 drop-shadow-md">
          {team.length}/11 Players Selected
        </h3>
        {team.length === 11 && (
          <h4 className="text-green-500 text-sm md:text-base uppercase tracking-wide">
            Team is complete! Total Points: {teamPoints}
          </h4>
        )}
      </div>

      {/* Available Players */}
      <div className="w-full mb-8">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-gray-800 mb-4 drop-shadow-md">
          Available Players
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {remainingPlayers.map((player) => (
            <li
              key={player.name}
              className="relative bg-gradient-to-br from-[#1c2526] to-[#2a2e35] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col justify-between min-h-[220px] overflow-hidden transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative z-10 flex items-start space-x-4 mb-3">
                <div className="w-24 h-24 rounded-full bg-gray-700 bg-opacity-50 border-2 border-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-gray-400 text-xs uppercase">Upload</span>
                </div>
                <div className="flex-1 text-right">
                  <span className="text-lg font-extrabold uppercase tracking-wider text-white drop-shadow-md">
                    {player.name}
                  </span>
                  <p className="text-xs text-gray-300 uppercase tracking-wide drop-shadow-sm">
                    {player.university}
                  </p>
                </div>
              </div>
              <div className="relative z-10 mt-1 h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto opacity-80"></div>
              <div className="relative z-10 mt-auto">
                <button
                  onClick={() => handleAddPlayer(player)}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-300 w-full shadow-md hover:shadow-lg"
                  aria-label={`Add ${player.name} to team`}
                >
                  Add
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Your Team */}
      <div className="w-full mt-4">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-gray-800 mb-4 drop-shadow-md">
          Your Team
        </h3>
        {team.length === 0 && (
          <p className="text-center text-gray-400 uppercase tracking-wide text-sm">
            No players selected yet
          </p>
        )}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((player) => (
            <li
              key={player.name}
              className="relative bg-gradient-to-br from-[#1c2526] to-[#2a2e35] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col justify-between min-h-[220px] overflow-hidden transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative z-10 flex items-start space-x-4 mb-3">
                <div className="w-24 h-24 rounded-full bg-gray-700 bg-opacity-50 border-2 border-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-gray-400 text-xs uppercase">Upload</span>
                </div>
                <div className="flex-1 text-right">
                  <span className="text-lg font-extrabold uppercase tracking-wider text-white drop-shadow-md">
                    {player.name}
                  </span>
                  <p className="text-xs text-gray-300 uppercase tracking-wide drop-shadow-sm">
                    {player.university}
                  </p>
                </div>
              </div>
              <div className="relative z-10 text-center text-sm text-gray-300 uppercase tracking-wide">
                Points: {player.points}
              </div>
              <div className="relative z-10 mt-1 h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto opacity-80"></div>
              <div className="relative z-10 mt-auto">
                <button
                  onClick={() => handleRemovePlayer(player)}
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-300 w-full shadow-md hover:shadow-lg"
                  aria-label={`Remove ${player.name} from team`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Total Points */}
      <div className="w-full mt-8">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-gray-800 mb-2 drop-shadow-md">
          Total Points: {teamPoints}
        </h3>
      </div>
    </div>
  );
};

export default TeamView;