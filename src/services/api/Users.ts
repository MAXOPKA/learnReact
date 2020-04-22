import loginStore from '../../store/LoginStore';
import { getUsersEndpoint, userInfoEndpoint } from './Endpoints';
import { responseHandler } from './Utils';

class UsersAPIService {
  static getUserInfo = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + loginStore.token);
    var options = { headers }
    const request = new Request(userInfoEndpoint, options);
    const response = await fetch(request);
    return responseHandler(response);
  }
  
  static getUsers = async (filter: string) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + loginStore.token);
    var options = {
        method: "POST",
        headers,
        body: JSON.stringify({ filter })
    }
    const request = new Request(getUsersEndpoint, options);
    const response = await fetch(request);
    return responseHandler(response);
  }
}

  export default UsersAPIService;
