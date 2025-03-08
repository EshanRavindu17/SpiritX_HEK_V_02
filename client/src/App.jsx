import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import the router

import PlayersView from './pages/PlayersView';
import SelectTeam from './pages/SelectTeam';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/playersview" element={<PlayersView />} />
        <Route path="/selectteam" element={<SelectTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
