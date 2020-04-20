import loginStore from '../../store/LoginStore';
import { loginEndpoint, registrationEndpoint } from './Endpoints';

class AccountAPIService {
  login = async (email: string, password: string) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      var options = {
          method: "POST",
          headers,
          body: JSON.stringify({ email, password })
      }
      console.log(options);

      const request = new Request(loginEndpoint, options);
      const response = await fetch(request);
      return response;
  }
  registration = async (name: string, email: string, password: string) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      var options = {
          method: "POST",
          headers,
          body: JSON.stringify({ username: name, email, password })
      }
      const request = new Request(registrationEndpoint, options);
      const response = await fetch(request);
      return response;
  }
}

  export default AccountAPIService;
