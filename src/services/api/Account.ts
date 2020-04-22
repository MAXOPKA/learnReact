import { loginEndpoint, registrationEndpoint } from './Endpoints';
import { responseHandler } from './Utils';

class AccountAPIService {
  static login = async (email: string, password: string) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      var options = {
          method: "POST",
          headers,
          body: JSON.stringify({ email, password })
      }

      const request = new Request(loginEndpoint, options);
      const response = await fetch(request);

      return responseHandler(response);
  }

  static registration = async (name: string, email: string, password: string) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      var options = {
          method: "POST",
          headers,
          body: JSON.stringify({ username: name, email, password })
      }
      const request = new Request(registrationEndpoint, options);
      const response = await fetch(request);
      return responseHandler(response);
  }
}

  export default AccountAPIService;
