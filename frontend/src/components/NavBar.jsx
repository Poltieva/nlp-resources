import {Link, NavLink } from "react-router-dom";
import {FcHome} from "react-icons/fc"
import {Component} from "react";
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import {logout} from "../actions/auth";
import {connect, useSelector} from "react-redux";
import {LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS} from "../actions/type";


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.state = {
            toggler: false,
            currentUser: this.props.user
        }
    }
    logOut() {
        this.props.dispatch(logout());
    }
    clickHandler() {
        this.setState({toggler: !this.state.toggler})
    }

    render() {
        return (
            <nav className="h-auto md:h-24 p2 bg-blue-200 mx-auto flex
        justify-between md:items-center mb-4">
                <div className="px-5">
                    <Link to="/">
                        <FcHome className="text-6xl" />
                    </Link>
                </div>
                <div className={this.state.toggler ? "flex flex-col gap-4 md:inline" : "hidden md:inline"}>
                    <NavLink to="/" className="nav-link" onClick={this.clickHandler}>
                        Home
                    </NavLink>
                    <NavLink to="/recommend" className="nav-link" onClick={this.clickHandler}>
                        Search & Recommendations
                    </NavLink>
                    <NavLink to="/about" className="nav-link" onClick={this.clickHandler}>
                        About
                    </NavLink>
                    { this.state.currentUser && this.state.currentUser !== {} ? (
                        <><NavLink to="/login" className="nav-link" onClick={this.logOut}>
                            Logout</NavLink><NavLink to={"/profile"} className="nav-link"
                                                     onClick={this.clickHandler}>{this.state.currentUser.username}</NavLink></>
                        ): (<>
                        <NavLink to="/login" className="nav-link" onClick={this.clickHandler}>
                            Login</NavLink>
                    </>)
                    }
                </div>
                <button
                    className="inline md:hidden self-start nav-link"
                    onClick={this.clickHandler}
                >
                    {this.state.toggler ? <AiOutlineClose /> : <FaBars />}
                </button>
            </nav>
        )
    }

}
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(NavBar);
