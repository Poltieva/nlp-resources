function storeRefreshToken(token: string) {
    localStorage.setItem("refreshToken", token);
}

function removeRefreshToken() {
    localStorage.removeItem("refreshToken");
}

function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

function storeAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
}

function removeAccessToken() {
    localStorage.removeItem("accessToken");
}

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export {storeRefreshToken, removeRefreshToken, getRefreshToken, storeAccessToken, removeAccessToken, getAccessToken};