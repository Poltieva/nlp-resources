import Resources from './Resources';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import About from './About';
import NavBar from "./NavBar";
import Login from "./login.component";
import Register from "./register.component";
import ResourceForm from "./ResourceForm";
import Profile from "./profile.component";

function AppRoutes() {
        console.log(process.env.REACT_APP_CLIENT_ID)
    return (
        <>
            <NavBar />
            <Routes>
                    <Route exact path="/" element={<Resources />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/login" element={
                            <Login />
                    } />
                    <Route exact path="/signup" element={
                            <Register />
                    } />
                    <Route exact path="/update-resource/:id" element={
                            <ResourceForm type="update" />
                    } />
                    <Route exact path="/create-new-resource" element={
                            <ResourceForm type="create" />
                    } />
            </Routes>
        </>
    );
}

export default AppRoutes;
