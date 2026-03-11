import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import React from 'react';
import WhatsAppButton from './components/WhatsappButton';
import ShowVideos from './components/ShowVideos';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <WhatsAppButton />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/videos' element={<ShowVideos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
