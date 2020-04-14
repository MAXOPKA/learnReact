import { types } from "mobx-state-tree";

const registrationStore = types.model({
    name: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setName(name) {
      self.name = name
    },
    setEmail(email) {
      self.email = email
    },
    setPassword(password) {
      self.password = password
    },
    loadingStart() {
      self.isLoading = true
    },
    loadingFinish() {
      self.isLoading = false
    },
}))

export default registrationStore;
