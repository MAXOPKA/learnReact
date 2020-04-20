import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import loginStore from "./LoginStore";
import userInfoStore from "./UserInfoStore";
import AccountAPIService from "../services/api/Account";

const registrationStore = types.model({
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, "")
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setError(error: boolean, errorMessage?: string) {
      self.error = error;
      self.errorMessage = errorMessage || "";
    },
    registration(name: string, email: string, password: string) {
      this.setIsLoading(true);
      (new AccountAPIService()).registration(name, email, password)
      .then(
        (result) => {
          runInAction("registrationSuccess", () => {
            loginStore.setToken(result.id_token);
            this.setIsLoading(false);
            userInfoStore.getUserInfo();
          });
        },
        (error) => {
          runInAction("registrationError", () => {
            this.setError(true, error);
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default registrationStore.create();
