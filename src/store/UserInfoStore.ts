import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
import UsersAPIService from "../services/api/Users";
import UserInfoType from '../types/UserInfoType';

export const userInfo = types.model("UserInfo", {
  id: types.identifier,
  name: types.string,
  email: types.string,
  balance: types.number,
})

const userInfoStore = types.model({
    userInfo: types.optional(userInfo, { id: "", name: "", email: "", balance: 0 }),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, ""),
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setUserInfo(userInfo: UserInfoType) {
      //self.userInfo = userInfo
    },
    getUserInfo() {
      this.setIsLoading(true);

      (new UsersAPIService()).getUserInfo()
      .then(res => res.json())
      .then(
        (result) => {
          runInAction("getUserInfoSuccess", () => {
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("getUserInfoInfo", () => {
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default userInfoStore;
