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
import { Layout, ManegeBox } from '../Components/layout'

import { Login } from '../Pages/Login'
import NotFound from '../Pages/NotFound'
import { Home } from '../Pages/Home';
import { Manage } from '../Pages/Manage';
import { Account } from '../Pages/Account/';
import { LinksTable } from '../Components/LinksTable/LinksTable';
import { AddLink } from '../Pages/Manage/AddLink'
import { Upload } from '../Components/Upload';


const PrivateRoutes = () => {
  const loginCtx = useContext(LoginContext)
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
  return (
    <ManegeBox>
      <Outlet />
    </ManegeBox>
  )
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
              <Route element={<ManageRoutes />}>
                <Route path="/manage" element={<Manage />} />
                <Route path='/manage/addlink' element={<AddLink />} />
                <Route path='links' element={<LinksTable />} />
                <Route path='upload' element={<Upload />} />
                <Route path='account' element={<Account />} />
              </Route>
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}