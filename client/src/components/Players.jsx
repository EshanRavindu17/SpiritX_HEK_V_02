import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import image1 from '../assets/images/icon.png';
import { useNavigate } from 'react-router-dom';

const Players = () => {
    const navigate = useNavigate();
    const [playersData, setPlayersData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:4000/api/admin/getplayers');
                if (response.data.success) {
                    setPlayersData(response.data.players);
                }
            } catch (error) {
                alert("Failed to fetch players");
                console.error("Error fetching players:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    const deletePlayer = async (id, e) => {
        e.stopPropagation(); // Prevent triggering parent div click event
        try {
            const response = await axios.delete(`http://localhost:4000/api/admin/deleteplayer/${id}`);
            if (response.data.success) {
                alert("Player deleted successfully");
                setPlayersData(playersData.filter(player => player.id !== id)); // Update state after deletion
            }
        } catch (error) {
            alert("Failed to delete player");
            console.error("Error deleting player:", error);
        }
    };

    return (
        <>{loading ? <div>Loading</div> :
            <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6 font-poppins'>Player List</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {playersData.map((player) => (
                        <div key={player.id} 
                            className='bg-white rounded-xl shadow-md p-5 flex flex-col items-center space-y-4 hover:shadow-lg transition-all cursor-pointer'
                            onClick={() => {
                                localStorage.setItem('player', JSON.stringify(player))
                                navigate('/admin-panel/player-statistics')
                            }}>
                            <img
                                src={player.image || image1}
                                alt={player.name}
                                className='w-24 h-24 rounded-full border-4 border-purple-600 object-cover'
                            />
                            <h3 className='text-xl font-semibold text-gray-800 font-poppins'>{player.name}</h3>
                            <span className='px-4 py-1 bg-purple-600 text-white rounded-full text-sm'>{player.category}</span>
                            <div className='flex space-x-4'>
                                <button className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-all'
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering parent div click event
                                        navigate(`/admin-panel/edit-player/${player.id}`);
                                    }}
                                >
                                    <FaEdit /> <span>Edit</span>
                                </button>
                                <button className='bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-600 transition-all'
                                    onClick={(e) => deletePlayer(player.id, e)}>
                                    <FaTrash /> <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        }
        </>
    );
};

export default Players;