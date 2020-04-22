import { runInAction } from "mobx";
import { types, cast } from "mobx-state-tree";
import TransactionsAPIService from "../services/api/Transactions";
import ITransaction from '../interfaces/ITransaction';

export const transaction = types.model("Transaction", {
  id: types.number,
  date: types.string,
  username: types.string,
  amount: types.number,
  balance: types.number
})

const transactionsStore = types.model({
    transactions: types.optional(types.array(transaction), []),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, ""),
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setTransactions(transactions: ITransaction[]) {
      self.transactions = cast(transactions);
    },
    setError(error: boolean, errorMessage?: string) {
      self.error = error;
      self.errorMessage = errorMessage || "";
    },
    getTransactions() {
      this.setIsLoading(true);

      TransactionsAPIService.getTransactions()
      .then(
        (result) => {
          runInAction("getTransactionsSuccess", () => {
            this.setTransactions(result.trans_token);
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("getTransactionsError", () => {
            this.setError(true, error);
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default transactionsStore.create();
