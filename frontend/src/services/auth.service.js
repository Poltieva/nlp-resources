import axios from "axios";
import UserService from "./user.service";

const LOGIN_URL = `${process.env.REACT_APP_API_URL}/oauth/token`;
const SIGNUP_URL = `${process.env.REACT_APP_API_URL}/users`;
const LOGOUT_URL = `${process.env.REACT_APP_API_URL}/oauth/revoke`;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

class AuthService {
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
                    console.log(user)
                    localStorage.setItem("user", user);
                }
                return {...response.data, currentUser: user};
            });
    }

    logout() {
        axios.post(LOGOUT_URL, {
            "token": JSON.parse(localStorage.getItem('tokens')).access_token,
            "client_secret": CLIENT_SECRET,
            "client_id": CLIENT_ID
        }).then((_) => {
            localStorage.removeItem("tokens");
            localStorage.removeItem("user");
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