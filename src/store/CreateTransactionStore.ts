import { types } from "mobx-state-tree";

const createTransactionStore = types.model({
    name: types.optional(types.string, ''),
    amount: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setName(newName) {
      self.name = newName
    },
    loadingStart() {
      self.isLoading = true
    },
    loadingFinish() {
      self.isLoading = false
    },
}))

export default createTransactionStore;
