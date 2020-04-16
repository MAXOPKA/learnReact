import { transactionsEndpoint } from './Endpoints';

class TransactionsAPIService {
  getTransactions = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = { headers }
    const request = new Request(transactionsEndpoint, options);
    const response = await fetch(request);
    return response;
  }
  createTransaction = async (userName: string, amount: number) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      var options = {
          method: "POST",
          headers,
          body: JSON.stringify({ userName, amount })
      }
      const request = new Request(transactionsEndpoint, options);
      const response = await fetch(request);
      return response;
    }
  }

  export default TransactionsAPIService;
