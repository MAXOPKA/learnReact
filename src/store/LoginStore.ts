import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import AccountAPIService from '../services/api/Account';
import { handleResponse } from "../services/api/Utils";

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
    login(email: string, password: string) {
      this.setIsLoading(true);

      (new AccountAPIService()).login(email, password)
      .then(res => handleResponse(res))
      .then(
        (result) => {
          runInAction("loginSuccess", () => {
            console.log(result);

            this.setToken(result.id_token);
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("loginError", () => {
            console.log('errror');

            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default loginStore.create();
