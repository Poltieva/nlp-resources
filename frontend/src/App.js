import Resources from './components/Resources';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import About from './components/About';
import NavBar from "./components/NavBar";
import PersistLogin from "./components/sessions/PersistLogin";
import Login from "./components/sessions/Login";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicOnlyRoute from "./components/routes/PublicOnlyRoute";
import Signup from "./components/sessions/Signup";
import ResourceForm from './components/ResourceForm';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route element={<PersistLogin />} >
                    <Route exact path="/" element={
                        // <PrivateRoute>
                    <Resources />
                        // </PrivateRoute>
                    } />
                    <Route path="/about" element={<About />} />
                    <Route exact path="/create-new-resource" element={<ResourceForm />} />
                    <Route path="/update-resource/:id" element={<ResourceForm />} />
                    <Route exact path="/login" element={
                        <PublicOnlyRoute>
                            <Login />
                        </PublicOnlyRoute>
                    } />
                    <Route exact path="/signup" element={
                        <PublicOnlyRoute>
                            <Signup />
                        </PublicOnlyRoute>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
