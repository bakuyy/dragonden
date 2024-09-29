import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage'; // Import HomePage
import Stocks from './components/Stocks'; // Import the Stocks component
import LandingPage from './components/LandingPage';
import GetSerial from "./components/GetSerial"

const YourApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
                <Route path="/landing" element={<LandingPage/>}/>
                <Route path="/serial" element={<GetSerial/>}/>

            </Routes>
        </Router>
    );
};

export default YourApp;
