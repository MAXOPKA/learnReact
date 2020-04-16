import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import AccountAPIService from "../services/api/Account";

const registrationStore = types.model({
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    registration(name: string, email: string, password: string) {
      this.setIsLoading(true);
      (new AccountAPIService()).registration(name, email, password)
      .then(res => res.json())
      .then(
        (result) => {
          runInAction("registrationSuccess", () => {
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("registrationError", () => {
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default registrationStore;
