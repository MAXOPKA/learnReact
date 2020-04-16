import { types } from "mobx-state-tree";
import CreateTransactionStore from './CreateTransactionStore';
import LoginStore from './LoginStore';
import RegistrationStore from './RegistrationStore';
import TransactionsStore from './TransactionsStore';
import UserInfoStore from './UserInfoStore';
import GetUsersStore from './GetUsersStore';

const RootStore = types
  .model("rootStore", {
    loginStore: types.optional(LoginStore, {
      isLoading: false
    }),
    registrationStore: types.optional(RegistrationStore, {
      isLoading: false
    }),
    transactionsStore: types.optional(TransactionsStore, {
      isLoading: false
    }),
    createTransactionStore: types.optional(CreateTransactionStore, {
      isLoading: false
    }),
    getUsersStore: types.optional(GetUsersStore, {
      isLoading: false
    }),
    userInfoStore: types.optional(UserInfoStore, {
      isLoading: false
    })
  })

export default RootStore;
