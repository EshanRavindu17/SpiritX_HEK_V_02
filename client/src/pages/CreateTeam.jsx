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
  // Add more players as needed
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Select Your Team</h2>
      <div className="mb-4">
        <h3 className="text-lg mb-2">{team.length}/11 Players Selected</h3>
        {team.length === 11 && (
          <h4 className="text-green-500">Team is complete! Total Points: {teamPoints}</h4>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg mb-2">Available Players</h3>
        <ul>
          {remainingPlayers.map((player) => (
            <li key={player.name} className="p-2 border-b flex justify-between items-center">
              <span>{player.name} - {player.university}</span>
              <button
                onClick={() => handleAddPlayer(player)}
                className="bg-blue-500 text-white py-1 px-3 rounded"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg mb-2">Your Team</h3>
        {team.length === 0 && <p>No players selected yet</p>}
        <ul>
          {team.map((player) => (
            <li key={player.name} className="p-2 border-b flex justify-between items-center">
              <span>{player.name} - {player.university}</span>
              <span>Points: {player.points}</span>
              <button
                onClick={() => handleRemovePlayer(player)}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg mb-2">Total Points: {teamPoints}</h3>
      </div>
    </div>
  );
};

export default TeamView;
