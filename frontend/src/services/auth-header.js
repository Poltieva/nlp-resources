import {LOGIN_FAIL, LOGIN_SUCCESS, SET_MESSAGE} from "../actions/type";
import AuthService from "./auth.service";

function validAccessToken(tokens) {
    return tokens.created_at + tokens.expires_in < Date.now();
}

function refreshAccessToken(token) {
    AuthService.refreshTokens(token)
}

export default function authHeader() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));

    if (!tokens.access_token) { return {}; }
    if (validAccessToken(tokens)) {
        return { Authorization: 'Bearer ' + tokens.access_token };
    }
    if (!tokens.refresh_token) { return {}; }

    refreshAccessToken(tokens.refresh_token);
    authHeader();
}