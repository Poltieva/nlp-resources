function validAccessToken(tokens) {
    return tokens.created_at + tokens.expires_in < Date.now();
}

function refreshAccessToken() {
    //logout - delete localStorage tokens
    //login without getting User.info
}

export default function authHeader() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    //TODO refresh token if expired
    if (tokens.access_token) {
        if (validAccessToken(tokens)) {
            return { Authorization: 'Bearer ' + tokens.access_token };
        } else {
            refreshAccessToken()
            authHeader()
        }

    } else {
        return {};
    }
}