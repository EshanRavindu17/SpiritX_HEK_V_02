import { BrowserRouter,Route,Routes } from 'react-router-dom'
import AdminPanel from './pages/AdminPanel'
import Players from './components/Players'
import Summary from './components/Summary'
import AddPlayer from './components/AddPlayer'
import PlayerStatistics from './components/PlayerStatistics'

//Eshan
import BudgetView from './pages/BudgetView'
import PlayersView from './pages/PlayersView';
import SelectTeam from './pages/SelectTeam';
import TeamView from './pages/TeamView';

import EditPlayer from './components/EditPlayer'
import LeaderboardView from './pages/LeaderboardView';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/playersview" element={<PlayersView />} />
        <Route path="/selectteam" element={<SelectTeam />} />
        <Route path="/teamview" element={<TeamView />} />
        <Route path="/budgetview" element={<BudgetView />} />
        <Route path="/leaderboardview" element={<LeaderboardView />} />
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
