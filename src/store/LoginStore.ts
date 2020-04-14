import { types } from "mobx-state-tree";

const loginStore = types.model({
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setName(name) {
      self.name = name
    },
    setPassword() {
      self.password = password
    },
    loadingStart() {
      self.isLoading = true
    },
    loadingFinish() {
      self.isLoading = false
    },
}))

export default loginStore;
