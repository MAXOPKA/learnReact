import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import userInfoStore from "./UserInfoStore";
import AccountAPIService from '../services/api/Account';

const loginStore = types.model({
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, ""),
    token: types.optional(types.string, window.localStorage.getItem('jwt') || ""),
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setToken(token: string) {
      console.log("set Token" + token);

      self.token = token;
      window.localStorage.setItem('jwt', token);
    },
    setError(error: boolean, errorMessage?: string) {
      self.error = error;
      self.errorMessage = errorMessage || "";
    },
    login(email: string, password: string) {
      this.setIsLoading(true);

      (new AccountAPIService()).login(email, password)
      .then(
        (result) => {
          runInAction("loginSuccess", () => {
            this.setToken(result.id_token);
            this.setIsLoading(false);
            userInfoStore.getUserInfo();
          });
        },
        (error) => {
          runInAction("loginError", () => {
            this.setError(true, error);
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default loginStore.create();
