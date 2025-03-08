import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartBar, FaTrophy, FaRunning, FaBowlingBall } from 'react-icons/fa';
import image1 from '../assets/images/profile.jpg'; // Default image if player image is not available

const Summary = () => {
    const [totalRuns, setTotalRuns] = useState(0);
    const [totalWickets, setTotalWickets] = useState(0);
    const [highestRunScorer, setHighestRunScorer] = useState({});
    const [highestWicketTaker, setHighestWicketTaker] = useState({});

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/admin/tournament-summary');
                if (response.data.success) {
                    setHighestRunScorer(response.data.highestRunScorer);
                    setHighestWicketTaker(response.data.highestWicketTaker);
                    setTotalRuns(response.data.totalRuns);
                    setTotalWickets(response.data.totalWickets);
                }
            } catch (error) {
                alert("Failed to fetch tournament summary");
                console.error("Error fetching tournament summary:", error);
            }
        };
        fetchSummary();
    }, []);

    return (
        <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6 font-poppins'>Tournament Summary</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                {/* Overall Runs */}
                <div className='bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all'>
                    <FaRunning className='text-4xl text-purple-600' />
                    <div>
                        <h3 className='text-xl font-semibold text-gray-800 font-poppins'>Overall Runs</h3>
                        <p className='text-2xl font-bold text-gray-900'>{totalRuns}</p>
                    </div>
                </div>
                
                {/* Overall Wickets */}
                <div className='bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all'>
                    <FaBowlingBall className='text-4xl text-blue-600' />
                    <div>
                        <h3 className='text-xl font-semibold text-gray-800 font-poppins'>Overall Wickets</h3>
                        <p className='text-2xl font-bold text-gray-900'>{totalWickets}</p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                {/* Highest Run Scorer */}
                <div className='bg-white shadow-md rounded-xl p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition-all'>
                    <img
                        src={highestRunScorer.image || image1} // Use fetched image or default
                        alt={highestRunScorer.name || "N/A"}
                        className='w-24 h-24 rounded-full border-4 border-purple-600 object-cover'
                    />
                    <h3 className='text-xl font-semibold text-gray-800 font-poppins'>{highestRunScorer.name || "N/A"}</h3>
                    <span className='px-4 py-1 bg-purple-600 text-white rounded-full text-sm'>Highest Run Scorer</span>
                    <p className='text-lg font-bold text-gray-900'>{highestRunScorer.runs || 0} Runs</p>
                </div>
                
                {/* Highest Wicket Taker */}
                <div className='bg-white shadow-md rounded-xl p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition-all'>
                    <img
                        src={highestWicketTaker.image || image1} // Use fetched image or default
                        alt={highestWicketTaker.name || "N/A"}
                        className='w-24 h-24 rounded-full border-4 border-blue-600 object-cover'
                    />
                    <h3 className='text-xl font-semibold text-gray-800 font-poppins'>{highestWicketTaker.name || "N/A"}</h3>
                    <span className='px-4 py-1 bg-blue-600 text-white rounded-full text-sm'>Highest Wicket Taker</span>
                    <p className='text-lg font-bold text-gray-900'>{highestWicketTaker.wickets || 0} Wickets</p>
                </div>
            </div>
        </div>
    );
};

export default Summary;
