import React, { Component } from "react";
import { connect } from "react-redux";
import {Navigate} from 'react-router-dom';

class Profile extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentUser: null
    //     }
    // }

    // componentDidMount() {
    //     this.setState({
    //         currentUser: UserService.getUserInfo()
    //     })
    // }


    render() {
        // const currentUser = this.state.currentUser;
        // console.log(currentUser)

        // if (!currentUser) {
        //     return <Navigate to="/login" />;
        // }


        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        zassssd
                        {/*<strong>{currentUser.username}</strong> Profile*/}
                    </h3>
                </header>
                {/*<p>*/}
                {/*    <strong>Token:</strong> {currentUser.access_token.substring(0, 20)} ...{" "}*/}
                {/*    {currentUser.access_token}*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    <strong>Id:</strong> {currentUser.id}*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    <strong>Email:</strong> {currentUser.email}*/}
                {/*</p>*/}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);