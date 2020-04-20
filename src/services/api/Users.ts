import loginStore from '../../store/LoginStore';
import { getUsersEndpoint, userInfoEndpoint } from './Endpoints';


class UsersAPIService {
  getUserInfo = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + loginStore.token);
    var options = { headers }
    const request = new Request(userInfoEndpoint, options);
    const response = await fetch(request);
    return response;
  }
  getUsers = async (query: string) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + loginStore.token);
    var options = {
        method: "POST",
        headers,
        body: JSON.stringify({ query })
    }
    const request = new Request(getUsersEndpoint, options);
    const response = await fetch(request);
    return response;
  }
}

  export default UsersAPIService;
