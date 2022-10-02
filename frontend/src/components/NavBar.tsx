import {Link, NavLink } from "react-router-dom";
import {FcHome} from "react-icons/fc"
import {useState} from "react";
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import {useSelector} from "react-redux";
import {RootState} from "../store";

function NavBar() {
    const accessToken = useSelector((state : RootState) => state.session.accessToken);
    const currentUser = useSelector((state : RootState) => state.session.currentUser);
    const [togglerNav, setTogglerNav] = useState(false);
    const clickHandler = () => {
        setTogglerNav(!togglerNav);
    };
    let sessionLink;
    if (accessToken) {
        console.log(accessToken)
        sessionLink = <>
            <NavLink to="/logout" className="nav-link" onClick={clickHandler}>
                Logout
            </NavLink>
            <NavLink to={"/profile"} className="nav-link" onClick={clickHandler} >{currentUser?.username}</NavLink>
        </>
    }
    return (
        <nav className="h-auto md:h-24 p2 bg-blue-200 mx-auto flex
        justify-between md:items-center mb-4">
            <div className="px-5">
                <Link to="/">
                    <FcHome className="text-6xl" />
                </Link>
            </div>
            <div className={togglerNav ? "flex flex-col gap-4 md:inline" : "hidden md:inline"}>
                <NavLink to="/" className="nav-link" onClick={clickHandler}>
                    Home
                </NavLink>
                <NavLink to="/about" className="nav-link" onClick={clickHandler}>
                    About
                </NavLink>
                { sessionLink }
            </div>
            <button
                className="inline md:hidden self-start nav-link"
                onClick={clickHandler}
            >
                {togglerNav ? <AiOutlineClose /> : <FaBars />}
            </button>
        </nav>
    )
}
export default NavBar;