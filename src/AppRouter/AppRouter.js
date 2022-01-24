import { React, useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom';
import { LinksContextProvider } from '../store/Links-context'
import { LoginContextProvider } from '../store/Login-context';
import LoginContext from '../store/Login-context'
import { AxiosInterceptors } from '../Components/Utils'
import { Layout, ManegeBox, LoginContainer } from '../Components/layout'

import { Login } from '../Pages/Login'
import NotFound from '../Pages/NotFound'
import { Home } from '../Pages/Home';
import { Manage } from '../Pages/Manage';
import { Account } from '../Pages/Account/';
import { ResetPass } from '../Pages/ResetPass';
import { NewPass } from '../Pages/NewPass';
import { Signup } from '../Pages/Signup'
import { AccountVeri } from '../Pages/AccountVeri'
import { LinksTable } from '../Components/LinksTable';
import { UsersTable } from '../Components/UsersTable';
import { AddLink } from '../Pages/Manage/AddLink';

var userType = null;

const PrivateRoutes = () => {
  const loginCtx = useContext(LoginContext)
  userType = loginCtx.user.role.title;
  return loginCtx.isLogged ?
    (
      <Layout>
        <Outlet />
      </Layout>
    )
    : (<Navigate to="/login" />);
}

const AxiosResListener = (props) => {
  AxiosInterceptors();
  return <></>;
}

const ManageRoutes = () => {
  return userType === 'admin' ? (
    <ManegeBox>
    <Outlet />
  </ManegeBox>
  ) : 
  (<Navigate to="/" />)
}

const LoginCtxProvider = () => {
  return (
    <LoginContextProvider>
      <Outlet />
    </LoginContextProvider>
  )
}

const LinksCtxProvider = () => {
  return (
    <LinksContextProvider>
      <Outlet />
    </LinksContextProvider>
  )
}

export function AppRouter() {

  return (
    <BrowserRouter>
      {<AxiosResListener />}
      <Routes>
        <Route element={<LoginCtxProvider />}>
          <Route element={<PrivateRoutes />}>
            <Route element={<LinksCtxProvider />}>
              <Route index element={<Home />} />
              <Route path='account' element={<Account />} />
              <Route element={<ManageRoutes />}>
                <Route path="/manage" element={<Manage />} />
                <Route path='/manage/addlink' element={<AddLink />} />
                <Route path='links' element={<LinksTable />} />
                <Route path='users' element={<UsersTable />} />
              </Route>
            </Route>
          </Route>
          <Route element={<LoginContainer />}>
            <Route path="login" element={<Login />} />
            <Route exec path="reset-password" element={<ResetPass />} />
            <Route path="reset-password/:userId/:token" element={<NewPass />} />
            <Route path="account-verification/:userId/:token" element={<AccountVeri />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}