import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../axios.js';
import axios from 'axios';

const TeamView = () => {
  const [team, setTeam] = useState([]);
  const [teamPoints, setTeamPoints] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const userId = localStorage.getItem('id');

  const navigate = useNavigate();

 

  const handleRemovePlayer = async(player) => {

    try{
      const response = await axios.post('http://localhost:4000/api/user/removePlayer', {
        player_id: player.id,
        id: userId
      });
      if(response.data.success){
        toast.success(`Player ${player.name} removed successfully!`);
        setTeam((prevTeam) => {
          const newTeam = prevTeam.filter((p) => p.name !== player.name);
          setTeamPoints((prevPoints) => prevPoints - player.points);
          return newTeam;
        });
      }
    }catch(error){
      console.log('Error removing player:', error);
      toast.error(error.message || 'Failed to remove player. Please try again.');
    }
    
    setErrorMessage(''); // Clear error on successful removal
  };

  const handleSubmitTeam = async () => {
    try {
      const jwtToken = localStorage.getItem('token');
      if (!jwtToken) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await api.post(
        '/api/user/submitTeam',
        {
          team: team, // Send full team array; backend extracts IDs
          id: userId, // Use actual user ID from localStorage
        },
        {
          headers: { Authorization: `Bearer ${jwtToken}` }, // Fixed syntax
        }
      );

      if (response.data.success) {
        toast.success(`Team submitted successfully! Team ID: ${response.data.id}`);
        navigate('/team-success');
      } else {
        throw new Error(response.data.message || 'Failed to submit team');
      }
    } catch (error) {
      console.error('Error submitting team:', error);
      setErrorMessage(error.message || 'Failed to submit team. Please try again.');
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
    const fetchTeam = async () => {
      try {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.get(
          `http://localhost:4000/api/user/getTeam/${userId}`);

        if (response.data.success) {
          const fetchedPlayers = response.data.team.players;
          setTeam(fetchedPlayers);
          setTeamPoints(fetchedPlayers.reduce((sum, p) => sum + p.points, 0));
        } else {
          throw new Error(response.data.message || 'Failed to fetch team');
        }
      } catch (error) {
        console.error('Error fetching team:', error);
        toast.error(error);
      }
    };

    if (userId) {
      fetchTeam();
    } else {
      setErrorMessage('Please log in to view your team.');
      toast.error('Please log in to view your team.');
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} aria-live="polite" />
      <div className="container mx-auto max-w-6xl bg-transparent">
        {/* Header */}
        <div className="mb-6 text-center bg-gray-900">
  <h2 
    className="sm:text-xl md:text-5xl font-extrabold tracking-wider drop-shadow-md text-white"
    style={{ fontFamily: "'Copperplate', 'Palatino Linotype', 'Arial Black', sans-serif" }}
  >
    Your Team
  </h2>
</div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

        {/* Total Points (Shown only when team has players) */}
        {team.length == 11 && (
          <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h3 className="text-lg md:text-xl text-gray-200">Total Points</h3>
              <div className="text-xl md:text-3xl text-white font-bold">{teamPoints.toLocaleString()}</div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all duration-500 bg-green-600"
                  style={{ width: `${(teamPoints / 1000) * 100}%` }} // Fixed syntax
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {((teamPoints / 1000) * 100).toFixed(1)}% of potential points used
              </p>
            </div>
          </div>
        )}

        {/* Add Player Section */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-lg mb-6">
          <h3 className="text-xl md:text-2xl text-gray-200 mb-4">Add Players</h3>
          {team.length === 11 ? (
            <p className="text-white text-center">Team is full</p>
          ) : (
            <div className="text-center">
              <button
                onClick={() => navigate('/selectteam')}
                className="bg-green-600 text-white py-4 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Add new player"
              >
                Add Player
              </button>
            </div>
          )}
        </div>

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
            {team.length > 0 && (
              <button
                onClick={() => setTeam([])} // Simplified clear team
                className="mt-2 md:mt-0 bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Clear team"
              >
                Clear Team
              </button>
            )}
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
                    <span className="text-yellow-400 font-bold">Points: {player.points}</span>
                    <button
                      onClick={() => handleRemovePlayer(player)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label={`Remove ${player.name} from team`} // Fixed syntax
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Team Button (Shown only when team is full) */}
        {team.length === 11 && (
          <div className="text-center">
            <button
              onClick={handleSubmitTeam}
              className="bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Submit team"
            >
              Submit Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamView;