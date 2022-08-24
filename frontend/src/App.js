import Resources from './components/Resources';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import About from './components/About';
import NavBar from "./components/NavBar";
import PersistLogin from "./components/sessions/PersistLogin";
import Login from "./components/sessions/Login";
import PrivateRoute from "./components/routes/PrivateRoute";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route element={<PersistLogin />} >
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/" element={
                        <PrivateRoute>
                            <Resources />
                        </PrivateRoute>
                    } />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
