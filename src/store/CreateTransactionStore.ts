import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import TransactionsAPIService from "../services/api/Transactions";
import userInfoStore from './UserInfoStore';

const createTransactionStore = types.model({
    isLoading: types.optional(types.boolean, false),
    isCreated: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, "")
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setIsCreated(isCreated: boolean) {
      self.isCreated = isCreated;
    },
    setError(error: boolean, errorMessage?: string) {
      self.error = error;
      self.errorMessage = errorMessage || "";
    },
    createTransaction(name: string, amount: number) {
      this.setIsLoading(true);

      (new TransactionsAPIService()).createTransaction(name, amount)
      .then(
        (result) => {
          runInAction("createTransactionSuccess", () => {
            this.setIsCreated(true);
            this.setIsLoading(false);
            userInfoStore.getUserInfo();
          });
        },
        (error) => {
          runInAction("createTransactionError", () => {
            this.setError(true, error);
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default createTransactionStore.create();
