import instance from '../components/api/axios';
import authHeader from './auth-header';

const RESOURCES_URL = `${process.env.REACT_APP_API_URL}/resources`;
const CURRENT_USER_URL = `${process.env.REACT_APP_API_URL}/users/me`;

class UserService {
    getResource(id) {
        return instance.get(`${RESOURCES_URL}/${id}`,
            { headers: authHeader() })
    }
    postNewResource(payload) {
        return instance.post(RESOURCES_URL, payload,
            { headers: authHeader() })
    }
    updateResource(id, payload) {
        return instance.put(`${RESOURCES_URL}/${id}`, payload,
            { headers: authHeader() })
    }
    async getUserInfo() {
        return await instance
            .get(CURRENT_USER_URL, { headers: authHeader() })
            .then((response) => {
                return JSON.stringify(response.data);
            })
            .catch((error) => {
                console.log(error.response.data)
                return null;
            })
    }
}

export default new UserService();