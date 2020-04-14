import { types } from "mobx-state-tree";
import TransactionType from '../types/TransactionType';

export const transaction = types.model("Transaction", {
  id: types.identifier,
  date: types.string,
  username: types.string,
  amount: types.number,
  balance: types.number
})

const transactionsStore = types.model({
    transactions: types.optional(types.arrayOf(TransactionType)),
    isLoading: types.optional(types.boolean, false)
  }).actions(self => ({
    setTransactions(transactions) {
      self.transactions = transactions
    },
    loadingStart() {
      self.isLoading = true
    },
    loadingFinish() {
      self.isLoading = false
    },
}))

export default transactionsStore;
