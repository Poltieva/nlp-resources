import './css/App.css';
import Resources from './components/Resources';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import About from './components/About';
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Resources />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
