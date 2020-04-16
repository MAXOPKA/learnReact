import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import AccountAPIService from '../services/api/Account';

const loginStore = types.model({
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    login(email: string, password: string) {
      this.setIsLoading(true);

      (new AccountAPIService()).login(email, password)
      .then(res => res.json())
      .then(
        (result) => {
          runInAction("loginSuccess", () => {
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("loginError", () => {
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default loginStore;
