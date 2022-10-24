export default function authHeader() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));

    if (tokens.access_token) {
        return { Authorization: 'Bearer ' + tokens.access_token };
    } else {
        return {};
    }
}