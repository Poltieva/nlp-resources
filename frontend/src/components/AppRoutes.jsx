import Resources from './Resources';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import About from './About';
import NavBar from "./NavBar";
// import PersistLogin from "./sessions/PersistLogin";
import Login from "./sessions/Login";
// import PrivateRoute from "./routes/PrivateRoute";
// import PublicOnlyRoute from "./routes/PublicOnlyRoute";
import Signup from "./sessions/Signup";
import Logout from "./sessions/Logout";
import ResourceForm from "./ResourceForm";
import Profile from "./profile.component";

function AppRoutes(currentUser) {
    return (
        <>
            <NavBar currentUser={currentUser} />
            <Routes>
                {/*<Route element={<PersistLogin />} >*/}
                    <Route exact path="/" element={<Resources />} />
                    <Route path="/about" element={<About />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/login" element={
                        // <PublicOnlyRoute>
                            <Login />
                        // </PublicOnlyRoute>
                    } />
                    <Route exact path="/signup" element={
                        // <PublicOnlyRoute>
                            <Signup />
                        // </PublicOnlyRoute>
                    } />
                    <Route exact path="/logout" element={
                        // <PrivateRoute>
                            <Logout />
                        // </PrivateRoute>
                    } />
                    <Route exact path={"/update-resource/:id"} element={
                        // <PrivateRoute>
                            <ResourceForm />
                        // </PrivateRoute>
                    } />
                    <Route exact path={"/create-new-resource"} element={
                        // <PrivateRoute>
                            <ResourceForm />
                        // </PrivateRoute>
                    } />
                {/*</Route>*/}
            </Routes>
        </>
    );
}

export default AppRoutes;
