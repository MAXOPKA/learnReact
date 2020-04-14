import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootStore from './store/RootStore';

const fetcher = url => window.fetch(url).then(response => response.json())
const store = rootStore.create(
    {},
    {
        fetch: fetcher,
        alert: m => console.log(m) // Noop for demo: window.alert(m)
    }
)

ReactDOM.render(
  <Provider rootStore={store} >
      <App compiler='TypeScript' framework='React' rootStore={store} />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
