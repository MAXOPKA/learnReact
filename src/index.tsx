import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mst-react-router';
import { Router } from 'react-router';
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
import routerStore from "./store/RouterStore";

const history = syncHistoryWithStore(createBrowserHistory(), routerStore);

const stores = {
  loginStore,
  registrationStore,
  transactionsStore,
  createTransactionStore,
  userInfoStore,
  getUsersStore,
  routerStore
};

ReactDOM.render(
  <Provider {...stores} >
    <Router history={history} >
      <App compiler='TypeScript' framework='React' />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
