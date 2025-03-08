import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import the router

import PlayersView from './pages/PlayersView';
import SelectTeamView from './pages/TeamView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/playersview" element={<PlayersView />} />
        <Route path="/teamview" element={<SelectTeamView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
