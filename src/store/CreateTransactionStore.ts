import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import TransactionsAPIService from "../services/api/Transactions";
import { handleResponse } from "../services/api/Utils";

const createTransactionStore = types.model({
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, "")
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    createTransaction(userName: string, amount: number) {
      this.setIsLoading(true);

      (new TransactionsAPIService()).createTransaction(userName, amount)
      .then(res => res.json())
      .then(
        (result) => {
          runInAction("createTransactionSuccess", () => {
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("createTransactionError", () => {
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default createTransactionStore.create();
