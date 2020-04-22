import loginStore from '../../store/LoginStore';
import { transactionsEndpoint } from './Endpoints';
import { responseHandler } from './Utils';

class TransactionsAPIService {
  static getTransactions = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + loginStore.token);
    var options = { headers }
    const request = new Request(transactionsEndpoint, options);
    const response = await fetch(request);
    return responseHandler(response);
  }
  
  static createTransaction = async (name: string, amount: number) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + loginStore.token)
      var options = {
          method: "POST",
          headers,
          body: JSON.stringify({ name, amount })
      }
      const request = new Request(transactionsEndpoint, options);
      const response = await fetch(request);
      return responseHandler(response);
    }
  }

  export default TransactionsAPIService;
