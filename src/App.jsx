import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Present from './pages/Present';
import Letter from './pages/Letter';
import Header from './components/Header';

const ITEMS = Array.from({ length: 22 }).map((_, i) => ({
  id: `item-${i + 1}`,
  date: i < 8 ? "23.02.11" : "", // 초반에만 날짜 표시
  title: `카드 ${i + 1}`,
}));

function App() {
  return (
    <>
      <Router>
        <div className="app-wrapper">
          <Header />
          <Routes>
            <Route path="/test" element={<Home />} />
            <Route path="/test/about" element={<AboutUs />} />
            <Route path="/test/present" element={<Present />} />
            <Route path="/test/letter" element={<Letter />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
