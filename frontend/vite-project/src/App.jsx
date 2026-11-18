import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import FundedGrants from './pages/FundedGrants/FundedGrants.jsx';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails.jsx';
import DiscoverInitiatives from './pages/DiscoverInitiatives/DiscoverInitiatives.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/funded-grants" element={<FundedGrants />} />
      <Route path="/initiatives" element={<DiscoverInitiatives />} />
      <Route path="/rfps" element={<DiscoverInitiatives />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
