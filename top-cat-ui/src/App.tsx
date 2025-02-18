import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TitlesPage from "./pages/TitlesPage";
import MovieShowDetailsPage from "./pages/MovieShowDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/titles-page" element={<TitlesPage />} />
        <Route path="/movieShowDetailsPage/:id" element={<MovieShowDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
