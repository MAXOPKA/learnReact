import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import loginStore from "./store/LoginStore";
import registrationStore from "./store/RegistrationStore";
import transactionsStore from "./store/TransactionsStore";
import createTransactionStore from "./store/CreateTransactionStore";
import userInfoStore from "./store/UserInfoStore";
import getUsersStore from "./store/GetUsersStore";

const stores = {
  loginStore,
  registrationStore,
  transactionsStore,
  createTransactionStore,
  userInfoStore,
  getUsersStore
};

ReactDOM.render(
    <Provider {...stores} >
      <App compiler='TypeScript' framework='React' />
    </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
