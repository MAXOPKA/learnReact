import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import UsersAPIService from "../services/api/Users";
import UserType from "../types/UserType";

export const userItem = types.model("UserItem", {
  id: types.identifier,
  name: types.string
})

const getUsersStore = types.model({
    transactions: types.optional(types.array(userItem), []),
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setTransactions(users: UserType[]) {
      // self.transactions = transactions
    },
    getUsers(query: string) {
      this.setIsLoading(true);

      (new UsersAPIService()).getUsers(query)
      .then(res => res.json())
      .then(
        (result) => {
          runInAction("getUsersSuccess", () => {
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("getUsersError", () => {
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default getUsersStore;
