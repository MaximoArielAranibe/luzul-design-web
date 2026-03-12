import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import React from 'react';
import WhatsAppButton from './components/WhatsAppButton';
import ShowVideos from './components/ShowVideos';
import ScrollToTop from './utils/ScrollToTop';

function App() {

  return (
    <BrowserRouter>

    <ScrollToTop />

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
