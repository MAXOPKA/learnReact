import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import { observer, inject } from "mobx-react";
import Container from '@material-ui/core/Container';
import { Provider } from "mobx-react";
import { Instance, onSnapshot } from "mobx-state-tree";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Trancactions from "./pages/Transactions";
import CreateTransaction from "./pages/CreateTransaction";
import UserInfo from "./components/UserInfo";
import 'typeface-roboto';

type AppProps = {
    compiler: string;
    framework: string;
}

class App extends Component<AppProps> {
  render() {
    return (
      <Container maxWidth="sm" >
        <h1>Parrot Wings</h1>
        <UserInfo />
        <div className='content'>
          <BrowserRouter>
            <Route exact path='/' component={Trancactions}/>
            <Route path='/login' component={Login}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/create-transaction' component={CreateTransaction}/>
          </BrowserRouter>
        </div>
      </Container>
    );
  }
}

export default App;
