import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Router>
        {/* We apply a max-width and center the container */}
        <div className='container mx-auto p-4'>
          {/* This is a test component to see our styles */}
          <div className='bg-slate-800 p-8 rounded-xl shadow-lg'>
            <h1 className='text-4xl font-bold text-center text-white'>
              CoinTrack
            </h1>
          </div>
          {/* Routes will go here later */}
        </div>
      </Router>
    </>
  );
}

export default App
