import Resources from './Resources';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import About from './About';
import NavBar from "./NavBar";
import PersistLogin from "./sessions/PersistLogin";
import Login from "./sessions/Login";
import PrivateRoute from "./routes/PrivateRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";
import Signup from "./sessions/Signup";

function AppRoutes() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route element={<PersistLogin />} >
                    <Route exact path="/" element={
                        <PrivateRoute>
                            <Resources />
                        </PrivateRoute>
                    } />
                    <Route path="/about" element={<About />} />
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
                    {/*<Route exact path="/logout" element={*/}
                    {/*    <PublicOnlyRoute>*/}
                    {/*        <Login />*/}
                    {/*    </PublicOnlyRoute>*/}
                    {/*} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
