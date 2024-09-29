import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage'; // Import HomePage
import LandingPage from './components/LandingPage';
import GetSerial from "./components/GetSerial"
import StreamlitDashboard from './components/StreamlitDashboard';
const YourApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
                <Route path="/landing" element={<LandingPage/>}/>
                <Route path="/serial" element={<GetSerial/>}/>
                <Route path="/dashboard" element={<StreamlitDashboard/>} />

            </Routes>
        </Router>
    );
};

export default YourApp;