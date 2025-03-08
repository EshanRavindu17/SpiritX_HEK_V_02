import { BrowserRouter,Route,Routes } from 'react-router-dom'
import AdminPanel from './pages/AdminPanel'
import Players from './components/Players'
import Summary from './components/Summary'
import AddPlayer from './components/AddPlayer'
import PlayerStatistics from './components/PlayerStatistics'

import PlayersView from './pages/PlayersView';
import SelectTeam from './pages/SelectTeam';
import CreateTeam from './pages/CreateTeam';
import EditPlayer from './components/EditPlayer'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/playersview" element={<PlayersView />} />
        <Route path="/selectteam" element={<SelectTeam />} />
        <Route path="/createteam" element={<CreateTeam />} />
        <Route path='/admin-panel' element={<AdminPanel/>}>
          <Route index element={<Players/>}></Route>
          <Route path='tournament-summary' element={<Summary/>}></Route>
          <Route path='new-player' element={<AddPlayer/>}></Route>
          <Route path='player-statistics' element={<PlayerStatistics/>}></Route>
          <Route path='edit-player/:id' element={<EditPlayer/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
