import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import the router

import PlayersView from './pages/PlayersView';
import MyTeamView from './pages/MyTeamView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/playersview" element={<PlayersView />} />
        <Route path="/myteamview" element={<MyTeamView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
