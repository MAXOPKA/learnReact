import { types } from "mobx-state-tree";
import UserInfo from '../types/UserInfo';

export const userInfo = types.model("UserInfo", {
  id: types.identifier,
  name: types.string,
  email: types.string,
  balance: types.number,
})

const userInfoStore = types.model({
    userInfo: types.optional(UserInfo),
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setUserInfo(userInfo) {
      self.userInfo = userInfo
    },
    loadingStart() {
      self.isLoading = true
    },
    loadingFinish() {
      self.isLoading = false
    },
}))

export default userInfoStore;
