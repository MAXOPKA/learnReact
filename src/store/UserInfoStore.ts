import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import UsersAPIService from "../services/api/Users";
import UserInfoType from '../types/UserInfoType';

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
    setUserInfo(user: UserInfoType) {
      self.userInfo.id = user.id;
      self.userInfo.name = user.name;
      self.userInfo.email = user.email;
      self.userInfo.balance = user.balance;
    },
    getUserInfo() {
      this.setIsLoading(true);

      (new UsersAPIService()).getUserInfo()
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
