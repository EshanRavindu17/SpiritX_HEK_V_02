import React from 'react';

const players = [
  { name: 'Player 1', university: 'University A' },
  { name: 'Player 2', university: 'University B' },
  // Add more players from the dataset
];

const PlayersView = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Available Players</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index} className="p-2 border-b">
            <div className="flex justify-between">
              <span>{player.name}</span>
              <span>{player.university}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersView;
