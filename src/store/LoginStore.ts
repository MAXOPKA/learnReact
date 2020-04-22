import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import userInfoStore from "./UserInfoStore";
import routerStore from "./RouterStore";
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
      window.localStorage.setItem('jwt', token);
      if (token !== "" && self.token === "") {console.log('push');
        routerStore.push("/");
      }

      if (token === "" && self.token !== "") {console.log('push');
        routerStore.push("/login");
      }

      self.token = token;
    },
    setError(error: boolean, errorMessage?: string) {
      self.error = error;
      self.errorMessage = errorMessage || "";
    },
    login(email: string, password: string) {
      this.setIsLoading(true);

      AccountAPIService.login(email, password)
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
  .views(self =>({
    isLogin: () => self.token !== ""
}));

export default loginStore.create();
