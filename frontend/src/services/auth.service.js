import axios from "axios";
import UserService from "./user.service";

let LOGIN_URL = undefined
let SIGNUP_URL = undefined
let LOGOUT_URL = undefined
let CLIENT_ID = undefined
let CLIENT_SECRET = undefined;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    LOGIN_URL = `${process.env.REACT_APP_API_URL}/oauth/token`;
    SIGNUP_URL = `${process.env.REACT_APP_API_URL}/users`;
    LOGOUT_URL = `${process.env.REACT_APP_API_URL}/oauth/revoke`;
    CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
} else {
    LOGIN_URL = `http://167.172.182.52/oauth/token`;
    SIGNUP_URL = `http://167.172.182.52/users`;
    LOGOUT_URL = `http://167.172.182.52/oauth/revoke`;
    CLIENT_ID = null //process.env.REACT_APP_CLIENT_ID;
    CLIENT_SECRET = null //process.env.REACT_APP_CLIENT_SECRET;
}

class AuthService {

    refreshTokens(token) {
        const data = {
            grant_type: "refresh_token",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: token
        }
        return axios
            .post(LOGIN_URL, data)
            .then(async (response) => {
                let user;
                if (response.data.access_token) {
                    localStorage.setItem("tokens", JSON.stringify(response.data));
                    console.log(response.data)
                    user = await UserService.getUserInfo()
                    localStorage.setItem("user", user);
                }
                return {
                    ...response.data, currentUser: user};
            });
    }

    login(email, password) {
        const data = {
            grant_type: "password",
            email: email,
            password: password,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }
        return axios
            .post(LOGIN_URL, data)
            .then(async (response) => {
                let user;
                if (response.data.access_token) {
                    localStorage.setItem("tokens", JSON.stringify(response.data));
                    user = await UserService.getUserInfo()
                    localStorage.setItem("user", user);
                }
                return {...response.data, currentUser: JSON.parse(user)};
            });
    }

    logout(withUser = true) {
        axios.post(LOGOUT_URL, {
            "token": JSON.parse(localStorage.getItem('tokens')).access_token,
            "client_secret": CLIENT_SECRET,
            "client_id": CLIENT_ID
        }).then((_) => {
            localStorage.removeItem("tokens");
            if (withUser) { localStorage.removeItem("user"); }
        })
    }

    register(username, email, password) {
        const data = {
            email: email,
            password: password,
            username: username,
            client_id: CLIENT_ID,
        }
        return axios.post(SIGNUP_URL, data);
    }
}

export default new AuthService();