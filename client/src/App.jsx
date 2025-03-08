import { BrowserRouter,Route,Routes } from 'react-router-dom'
import AdminPanel from './pages/AdminPanel'
import Players from './components/Players'
import Summary from './components/Summary'
import AddPlayer from './components/AddPlayer'
import PlayerStatistics from './components/PlayerStatistics'
import Login from './pages/commonPages/Login'
import PlayersView from './pages/PlayersView';
import SelectTeam from './pages/SelectTeam';
import TeamView from './pages/TeamView';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/fogot-password" element={<PlayersView />} />
        <Route path="/playersview" element={<PlayersView />} />
        <Route path="/selectteam" element={<SelectTeam />} />
        <Route path="/teamview" element={<TeamView />} />
        <Route path='/admin-panel' element={<AdminPanel/>}>
          <Route index element={<Players/>}></Route>
          <Route path='tournament-summary' element={<Summary/>}></Route>
          <Route path='new-player' element={<AddPlayer/>}></Route>
          <Route path='player-statistics' element={<PlayerStatistics/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
