import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopThreePodium from '../components/TopThreePodium';
import LeaderboardTable from '../components/LeaderboardTable';
import image1 from "../assets/images/icon.png"; // Dummy image
import { useNavigate } from 'react-router-dom';


const loggedInUser = 'loggedInUser'; // Assuming this is the logged-in user's username

const sortLeaderboard = (data) => {
  return [...data].sort((a, b) => b.points - a.points);
};

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const naviagte=useNavigate();
  // Memoize sorted leaderboard to avoid unnecessary re-sorts
  const sortedLeaderboard = useMemo(() => sortLeaderboard(leaderboardData), [leaderboardData]);
  const topThree = sortedLeaderboard.slice(0, 3);
  const others = sortedLeaderboard.slice(3);

  // Fetch leaderboard data from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      naviagte('/login');
    }
   
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/getLeaderboard');
        if (response.data.success) {
          // Map backend data to frontend format
          const formattedData = response.data.leaderboard.map(entry => ({
            username: entry.ownerName,
            points: entry.totalPoints,
            image: image1 // Use dummy image for all entries
          }));
          setLeaderboardData(formattedData);
        } else {
          toast.error(response.data.message || "Failed to load leaderboard");
        }
      } catch (error) {
        console.log('Error fetching leaderboard:', error);
        toast.error(error.message || 'Failed to fetch leaderboard. Please try again.');
      }
    };

    fetchLeaderboard(); // Call the function
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative overflow-hidden">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Spotlight Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))
          `,
          backgroundColor: '#111827', // gray-900
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-wide drop-shadow-lg">
            Leaderboard
          </h2>
        </div>

        {/* Top 3 Section */}
        <div className="px-4 sm:px-6 md:px-8 py-6">
          {leaderboardData.length > 0 ? (
            <TopThreePodium topThree={topThree} loggedInUser={loggedInUser} />
          ) : (
            <p className="text-center text-gray-400">Loading or no leaderboard data available...</p>
          )}
        </div>

        {/* Leaderboard List */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 pb-6">
          {leaderboardData.length > 0 ? (
            <LeaderboardTable others={others} loggedInUser={loggedInUser} />
          ) : (
            <p className="text-center text-gray-400">No additional leaderboard entries to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;