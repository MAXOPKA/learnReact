import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import TransactionsAPIService from "../services/api/Transactions";
import TransactionType from '../types/TransactionType';

export const transaction = types.model("Transaction", {
  id: types.identifier,
  date: types.string,
  username: types.string,
  amount: types.number,
  balance: types.number
})

const transactionsStore = types.model({
    transactions: types.optional(types.array(transaction), []),
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setTransactions(transactions?: TransactionType[]) {
      // self.transactions = transactions
    },
    getTransactions() {
      this.setIsLoading(true);

      (new TransactionsAPIService()).getTransactions()
      .then(res => res.json())
      .then(
        (result) => {
          runInAction("getTransactionsSuccess", () => {
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("getTransactionsError", () => {
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default transactionsStore;
