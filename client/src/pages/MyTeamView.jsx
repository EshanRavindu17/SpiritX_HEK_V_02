import React, { useState } from 'react';

// Sample categories
const categories = ['Batters', 'Bowlers', 'All-rounders'];

const SelectTeamView = () => {
  const [selectedCategory, setSelectedCategory] = useState('Batters');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Select Your Team</h2>
      <div className="mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category)}
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
          >
            {category}
          </button>
        ))}
      </div>
      <div>
        <h3 className="text-lg mb-2">{selectedCategory} Players</h3>
        {/* Replace with dynamic player list based on category */}
        <ul>
          <li className="p-2 border-b">Player 1 (Details here)</li>
          <li className="p-2 border-b">Player 2 (Details here)</li>
          {/* More players based on category */}
        </ul>
      </div>
    </div>
  );
};

export default SelectTeamView;
