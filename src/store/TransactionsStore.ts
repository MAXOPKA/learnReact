import { runInAction } from "mobx";
import { types, cast } from "mobx-state-tree";
import TransactionsAPIService from "../services/api/Transactions";
import { handleResponse } from "../services/api/Utils";
import TransactionType from '../types/TransactionType';

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
    setTransactions(transactions: TransactionType[]) {
      self.transactions = cast(transactions);
    },
    setError(error: boolean, errorMessage?: string) {
      self.error = error;
      self.errorMessage = errorMessage || "";
    },
    getTransactions() {
      this.setIsLoading(true);

      (new TransactionsAPIService()).getTransactions()
      .then(res => handleResponse(res))
      .then(
        (result) => {
          runInAction("getTransactionsSuccess", () => {
            this.setTransactions(result.trans_token);
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("getTransactionsError", () => {
            console.log(error);

            this.setError(true, error)
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default transactionsStore.create();
