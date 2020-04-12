import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Container from '@material-ui/core/Container';
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

class App extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Container maxWidth="sm" >
          <h1>Parrot Wings</h1>
          <ul className='header'>
            <UserInfo />
            <li><NavLink to='/'>Transactions</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/registration'>Registration</NavLink></li>
            <li><NavLink to='/create-transaction'>Create Transaction</NavLink></li>
          </ul>
          <div className='content'>
            <Route exact path='/' component={Trancactions}/>
            <Route path='/login' component={Login}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/create-transaction' component={CreateTransaction}/>
          </div>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
