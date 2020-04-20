import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import loginStore from "./LoginStore";
import AccountAPIService from "../services/api/Account";

const registrationStore = types.model({
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, "")
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
            loginStore.setToken(result.id_token);
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

export default registrationStore.create();
