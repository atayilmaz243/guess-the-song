import React, { useState } from 'react';
import { Home } from './components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Categories } from './components/categories';
import Play from './components/play';

const App = () => {
  const [audioContext, setAudioContext] = useState(null);

  const initializeAudioContext = () => {
    if (!audioContext) {
      const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(newAudioContext);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/guess-the-song" element={<Home initAudio = {initializeAudioContext}/>} />
        <Route path="/categories" element={<Categories initAudio = {initializeAudioContext}/>} />
        <Route path="/play/:musician" element={<Play audioContext = {audioContext}/>} />
      </Routes>
    </Router> 
  );
};

export default App;
