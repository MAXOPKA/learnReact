import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import UsersAPIService from "../services/api/Users";
import IUserInfo from '../interfaces/IUserInfo';

export const userInfo = types.model("UserInfo", {
  id: types.number,
  name: types.string,
  email: types.string,
  balance: types.number,
})

const userInfoStore = types.model({
    userInfo: types.optional(userInfo, { id: 0, name: "", email: "", balance: 0 }),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, ""),
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setError(error: boolean, errorMessage: any) {
      self.error = error;
      self.errorMessage = errorMessage;
    },
    setUserInfo(userInfo: IUserInfo) {
      self.userInfo.id = userInfo.id;
      self.userInfo.name = userInfo.name;
      self.userInfo.email = userInfo.email;
      self.userInfo.balance = userInfo.balance;
    },
    getUserInfo() {
      this.setIsLoading(true);

      UsersAPIService.getUserInfo()
      .then(
        (result) => {
          runInAction("getUserInfoSuccess", () => {
            this.setUserInfo(result.user_info_token);
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("getUserInfoInfo", () => {
            this.setError(true, error);
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default userInfoStore.create();
