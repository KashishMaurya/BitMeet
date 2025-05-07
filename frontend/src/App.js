import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet.jsx';
import HomeComponent from "./pages/home.jsx";
import History from './pages/history.jsx';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/home" element={<HomeComponent />} />

            <Route path="/" element={<LandingPage />} />

            <Route path="/auth" element={<Authentication />} />
            
            <Route path="/history" element={<History />} />

            <Route path="/:url" element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
