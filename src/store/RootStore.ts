import CreateTransactionStore from './CreateTransactionStore';
import LoginStore from './LoginStore';
import RegistrationStore from './RegistrationStore';
import TransactionsStore from './TransactionsStore';

const rootStore = types
    .model("rootStore", {
      createTransactionStore: types.optional(CreateTransactionStore, {
        name: "",
        amount: 0,
        isLoading: false
      })
    })
    .actions(self => ({
        login(email, password) {

        },
        registration(name, email, password) {

        },
        getTransactions() {

        },
        createTransaction(name, amount) {

        },
        userInfo() {

        },
    }))

export default rootStore;
