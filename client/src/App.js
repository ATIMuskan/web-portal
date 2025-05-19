import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AskUs from './pages/AskUs';

function App() {
  return (
    <Router>  
      <div className="App">
       
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ask-us" element={<AskUs />} />
          </Routes>
      
      </div>
    </Router>
  );
}

export default App;
