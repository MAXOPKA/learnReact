import React from "react";
import {
  Route,
  BrowserRouter
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Trancactions from "./pages/Transactions";
import CreateTransaction from "./pages/CreateTransaction";
import UserInfo from "./components/UserInfo";
import 'typeface-roboto';

interface AppProps {
    compiler: string;
    framework: string;
}

export default (props: AppProps) => (
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
