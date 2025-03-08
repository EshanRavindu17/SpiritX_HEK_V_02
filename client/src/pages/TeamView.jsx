import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../axios.js';

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
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Error message state

  const handleAddPlayer = (player) => {
    if (team.length < 11 && !team.find((p) => p.name === player.name)) {
      setTeam([...team, player]);
      setTeamPoints((prevPoints) => prevPoints + player.points);
      setRemainingPlayers(remainingPlayers.filter((p) => p.name !== player.name));
    }
  };
  // Initialize the team with all available players (team is full initially)

  const [team, setTeam] = useState(availablePlayers);
  const initialPoints = availablePlayers.reduce((sum, player) => sum + player.points, 0);
  const [teamPoints, setTeamPoints] = useState(initialPoints);
  const [remainingPlayers, setRemainingPlayers] = useState([]); // Fixed missing state
  const [errorMessage, setErrorMessage] = useState(''); // Moved inside the component

  const navigate = useNavigate()

  const handleRemovePlayer = async (player) => {
    try {
      // 🔐 Secure API call with JWT token
      const jwtToken = localStorage.getItem("token"); 

      const response = await api.get("/test", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      console.log("API Call Successful:", response.data);

      console.log("API Call Successful:", errorMessage);
      console.log("API Call Successful:", remainingPlayers);

    } catch (error) {
      if (error.response) {
        console.log('Server Error:', error.response.data);
        setErrorMessage(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        console.log('Client Error:', error.message);
        setErrorMessage('Network error. Please try again.');
      }
    }

    // ✅ Update UI after API call
    setTeam((prevTeam) => prevTeam.filter((p) => p.name !== player.name));
    setTeamPoints((prevPoints) => prevPoints - player.points);
    setRemainingPlayers((prevPlayers) => [...prevPlayers, player]);

  
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 p-4 md:p-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        aria-live="polite"
      />
      <div className="container mx-auto max-w-6xl bg-transparent">
        {/* Category Selector (Adapted as Static Labels) */}
        <div className="mb-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full py-6 text-center md:px-6 md:py-2 text-2xl md:text-6xl font-semibold rounded-full bg-gray-200 text-gray-800">
            Your Team
          </div>
        </div>

        {/* Search & Filter Section (Simplified as Static Text) */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-8 relative">
          <div className="relative w-full md:w-2/3"></div>
        </div>

        {/* Budget Overview Section (Adapted as Team Points) - Display only when team is full */}

        {team.length === 11 && (
          <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h3 className="text-lg md:text-xl text-gray-200">Total Points</h3>
              <div className="text-xl md:text-3xl text-white font-bold">{teamPoints.toLocaleString()}</div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${teamPoints > 500 ? 'bg-green-600' : 'bg-green-600'}`}
                  style={{ width: `${(teamPoints / 1000) * 100}%` }} // Assuming max points ~1000 for demo
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {((teamPoints / 1000) * 100).toFixed(1)}% of potential points used
              </p>
            </div>
          </div>
        )}


      {/* Display error message if any */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="mb-4">
        <h3 className="text-lg mb-2">Available Players</h3>
        <ul>
          {remainingPlayers.map((player) => (
            <li key={player.name} className="p-2 border-b flex justify-between items-center">
              <span>{player.name} - {player.university}</span>

        {/* Available Players Section - Show Add Player Button only when team length < 11 */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
          <div className="text-center item-center justify-center">
            <p className="text-white ">
              {team.length === 11 ? 'Team is full' : ''}
            </p>
            {team.length < 11 && (

              <button
                onClick={() => { navigate('/selectteam'); }}
                className="bg-green-600 text-white py-4 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Add new player"
              >
                Add Player
              </button>
            )}
          </div>
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

        {/* Your Team Section */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl md:text-2xl text-gray-200">Your Team</h3>
                <span className="text-sm md:text-lg text-yellow-400 font-semibold bg-gray-800 px-2 py-1 rounded-full">
                  {team.length}/11 Players Selected
                </span>
              </div>
            </div>
          </div>
          {team.length === 0 ? (
            <p className="text-gray-500">No players selected yet</p>
          ) : (
            <div className="space-y-4">
              {team.map((player) => (
                <div
                  key={player.name}
                  className="flex flex-col md:flex-row justify-between items-center bg-gray-700 p-4 rounded-xl hover:bg-gray-600 transition duration-300"
                >
                  <div className="flex flex-col mb-2 md:mb-0">
                    <span className="text-white font-medium">{player.name}</span>
                    <span className="text-gray-400 text-sm">{player.university}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleRemovePlayer(player)}
                      className="bg-red-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label={`Remove ${player.name} from team`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Total Points Section (Displayed only when team is complete) */}
        {team.length === 11 && (
          <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h3 className="text-lg md:text-xl text-gray-200">Total Points</h3>
              <div className="text-xl md:text-3xl text-white font-bold">{teamPoints.toLocaleString()}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


export default TeamView;
