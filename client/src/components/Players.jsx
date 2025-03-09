import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import image1 from '../assets/images/icon.png';
import { useNavigate } from 'react-router-dom';
import { firestoreDB } from '../../../client/config/firebaseConfig'; // Adjust pathimport { collection, onSnapshot } from 'firebase/firestore';
import { doc, setDoc,collection ,onSnapshot} from 'firebase/firestore';


const Players = () => {
  const navigate = useNavigate();
  const [playersData, setPlayersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let unsubscribe;

    try {
      console.log("Setting up players listener");
      const playersCollection = collection(firestoreDB, 'players');
      console.log("playersCollection",playersCollection)
      unsubscribe = onSnapshot(
        playersCollection,
        (snapshot) => {
          console.log("Snapshot received, docs:", snapshot.docs.length);
          const playersArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPlayersData(playersArray);
          setLoading(false);
        },
        (error) => {
          console.error("Snapshot error:", error);
          alert("Failed to fetch players: " + error.message);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error setting up listener:", error);
      alert("Error initializing players listener");
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        console.log("Unsubscribing from players listener");
        unsubscribe();
      }
    };
  }, []);

  const deletePlayer = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`http://localhost:4000/api/admin/deleteplayer/${id}`);
      if (response.data.success) {
        alert("Player deleted successfully");
        setPlayersData(playersData.filter(player => player.id !== id)); // Kept as per your request
      }
    } catch (error) {
      alert("Failed to delete player");
      console.error("Error deleting player:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className='flex-1 p-6 md:p-8 bg-gray-100 min-h-screen'>
          <h2 className='text-3xl justify-end font-bold text-gray-800 mb-6 font-poppins'>Player List</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {playersData.map((player) => (
              <div
                key={player.id}
                className='bg-white rounded-xl shadow-md p-5 flex flex-col items-center space-y-4 hover:shadow-lg transition-all cursor-pointer'
                onClick={() => {
                  localStorage.setItem('player', JSON.stringify(player));
                  navigate('/admin-panel/player-statistics');
                }}
              >
                <img
                  src={player.image || image1}
                  alt={player.name}
                  className='w-24 h-24 rounded-full border-4 border-purple-600 object-cover'
                />
                <h3 className='text-xl font-semibold text-gray-800 font-poppins'>{player.name}</h3>
                <span className='px-4 py-1 bg-purple-600 text-white rounded-full text-sm'>{player.category}</span>
                <div className='flex space-x-4'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-all'
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin-panel/edit-player/${player.id}`);
                    }}
                  >
                    <FaEdit /> <span>Edit</span>
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-600 transition-all'
                    onClick={(e) => deletePlayer(player.id, e)}
                  >
                    <FaTrash /> <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Players;