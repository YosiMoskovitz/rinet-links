import Axios from 'axios'
import { APIconfig } from '../Config'
import translate from '../Components/Utils/engToHeb.json';

//base settings for all login requests
const LoginAxios = Axios.create({ baseURL: APIconfig.url });
LoginAxios.defaults.withCredentials = true;
LoginAxios.interceptors.response.use(
    function (response) {
        return resHandler(response);
    },
    function (error) {
        if (error.response) return resHandler(error.response)
        else return resHandler(error);
    }
);

//Login Funcs
export const LoginReq = async (user) => {
    var result = await LoginAxios.post(`/users/login`, user)
    return result;
}

export const VerifyRecaptchaReq = async (token) => {
    var result = await Axios.post(`${APIconfig.url}/users/recaptcha-verification`, token)
    return result;
}

export const SignupReq = async (user) => {
    var result = await LoginAxios.post(`/users/signup`, user)
    return result;
}

export const LogOutReq = async () => {
    var result = await LoginAxios.post(`/users/logout`)
    return result;
}

export const accountTokenValid = async (userId, token) => {
    var result = await LoginAxios.post(`/users/account-verification`, { userId, token })
    return result;
}

export const ResetPassEmailReq = async (email) => {
    var result = await LoginAxios.post(`/password-reset/sendEmail`, email)
    return result;
}

export const ResetPassTokenValid = async (userId, token) => {
    var result = await LoginAxios.post(`/password-reset/verifyReq`, { userId, token })
    if (result.resData?.renewalToken)
        result.token = result.resData.renewalToken
    return result;
}

export const NewPassReq = async (userId, token, password) => {
    var result = await LoginAxios.post(`/password-reset/new-password`, { userId, token, password })
    return result;
}

export const ChangePassReq = async (oldPassword, newPassword) => {
    var result = await LoginAxios.post(`/users/change-password`, { oldPassword, newPassword })
    return result;
}

export const EditUserReq = async (user) => {
    var result = await LoginAxios.patch(`/users/edit-user`, user);
    return result;
}

export const EditUserAdminReq = async (user) => {
    var result = await LoginAxios.patch(`/users/edit-user-a`, user);
    return result;
}

export const DeleteUserReq = async () => {
    var result = await LoginAxios.delete(`/users/delete-user`);
    return result;
}

export const AddUserReq = async (user) => {
    //need to add a default password <--
    let userData = user;
    userData.password = '!Aa123456'
    delete userData.userId
    delete userData.isEmailVerified
    var result = await LoginAxios.post(`/users/add-user`, userData);
    return result;
}

export const DeleteUserAdminReq = async (userId) => {
    var result = await LoginAxios.delete(`/users/delete-user-a/${userId}`);
    return result;
}

const resHandler = (res) => {
    var result = res;
    result.type = 'res';
    var msg = '';
    var isMsg = false
    var checkMsg = () => {
        if (msg !== undefined && msg !== '' && msg !== null) isMsg = true
    }

    if (res.data?.message) {
        if (Object.keys(res.data).length > 1) result.resData = res.data;
        msg = translate[res.data.message]
        checkMsg();
        isMsg ? result.data = msg : result.data = res.data.message;
    }
    else if (res.data) {
        msg = translate[res.data]
        checkMsg();
        isMsg ? result.data = msg : result.data = res.data;
    }
    else {
        msg = translate[res]
        checkMsg();
        isMsg ? result.data = msg : result.data = res;
    }

    if (res.status >= 300) {
        result.status = 'ERROR';
    }
    else if (res.status >= 200) {
        result.status = 'OK';
    }
    else {
        result.status = 'ERROR';
        result.data = translate.INTERNAL_ERROR;
    }

    return result;
}

