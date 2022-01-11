import Axios from 'axios'
import { APIconfig } from '../Config'
import translate from '../Components/Utils/engToHeb.json';

export const LoginReq = async (user) => {
    var result = {status: undefined, data: undefined}
    await Axios.post(`${APIconfig.url}/users/login`, user)
        .then((res) => {
            if (res.status === 200) {
                result.status = 'OK'
                result.data = res.data
            }
        })
        .catch((err) => {
            if (err.response && err.response.handler) {
                result.status = 'ERROR'
                result.data = translate[err.response.data]
            }
            else {
                result.status = 'ERROR'
                result.data = 'שגיאה פנימית'
            }
        })
        return result
}

export const SignupReq = async (user) => {
    var result = {status: undefined, data: undefined}
    await Axios.post(`${APIconfig.url}/users/signup`, user)
        .then((res) => {
            if (res.status === 200) {
                result.status = 'OK'
                result.data = `החשבון נוצר בהצלחה וממתין לאימות. בדוק את תיבת הדוא"ל שלך.`
            }
        })
        .catch((err) => {
            if (err.response && err.response.handler) {
                result.status = 'ERROR'
                result.data = translate[err.response.data]
            }
            else {
                result.status = 'ERROR'
                result.data = 'שגיאה פנימית'
            }
        })
        return result
}

export const LogOutReq = async ()=> {
    var result = {status: undefined}
    await Axios.post(`${APIconfig.url}/users/logout`)
    .then((res) => {
        if (res.status === 200) {
            result.status = 'OK'
        }
    })
    .catch((err) => {
        console.log(err)
        if (err.response.handler) {
            result.status = 'ERROR'
            result.data = translate[err.response.handler.message]
        }
    })
    return result
}

export const accountTokenValid = async (userId, token) => {
    var result = {status: undefined, data: undefined}
    await Axios.post(`${APIconfig.url}/users/account-verification`, {userId, token})
        .then((res) => {
            if (res.status === 200) {
                console.log(res)
                result.type = 'res'
                result.status = 'OK'
                result.data = 'החשבון אומת בהצלחה!'
            }
        })
        .catch((err) => {
            if (err.response && err.response.handler) {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = err.response.handler.message
            }
            else {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = 'שגיאה פנימית'
            }
        })
        return result
}

export const ResetPassEmailReq = async (email) => {
    var result = {status: undefined, data: undefined}
    await Axios.post(`${APIconfig.url}/password-reset/sendEmail`, email)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                result.type = 'res'
                result.status = 'OK'
                result.data = 'דוא"ל לאיפוס סיסמה נשלח בהצלחה!'
            }
            else {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = res.message
            }
        })
        .catch((err) => {
            if (err.response && err.response.handler) {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = translate[err.response.data.message]
            }
            else {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = 'שגיאה פנימית'
            }
        })
        return result
}

export const ResetPassTokenValid = async (userId, token) => {
    var result = {status: undefined, data: undefined}
    await Axios.post(`${APIconfig.url}/password-reset/verifyReq`, {userId, token})
        .then((res) => {
            if (res.status === 200) {
                result.type = 'res'
                result.status = 'OK'
                result.token = res.data.renewalToken
            }
        })
        .catch((err) => {
            if (err.response && err.response.handler) {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = err.response.handler.message
            }
            else {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = 'שגיאה פנימית'
            }
        })
        return result
}

export const NewPassReq = async (userId, token, password) => {
    var result = {status: undefined, data: undefined}
    await Axios.post(`${APIconfig.url}/password-reset/new-password`, {userId, token, password})
        .then((res) => {
            if (res.status === 200) {
                result.type = 'res'
                result.status = 'OK'
                result.data = translate[res.data.message]
            }
        })
        .catch((err) => {
            if (err.response && err.response.handler) {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = err.response.handler.message
            }
            else {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = 'שגיאה פנימית'
            }
        })
        return result
}

export const ChangePassReq = async (oldPassword, newPassword) => {
    var result = {status: undefined, data: undefined}
    await Axios.post(`${APIconfig.url}/users/change-password`, {oldPassword, newPassword})
        .then((res) => {
            if (res.status === 200) {
                console.log(res)
                result.type = 'res'
                result.status = 'OK'
                result.data = translate[res.data]
            }
        })
        .catch((err) => {
            console.log(err)
            if (err.response && err.response.data.message) {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = translate[err.response.data.message]
            }
            else if (err.response && err.response.data){
                result.type = 'res'
                result.status = 'ERROR'
                result.data = translate[err.response.data]
            }
            else {
                result.type = 'res'
                result.status = 'ERROR'
                result.data = err.response
            }
        })
        return result
}

export const DeleteUserReq = async ()=> {
    var result = {status: undefined, data: undefined}
    await Axios.post(`${APIconfig.url}/users/delete-user`)
    .then((res) => {
        if (res.status === 200) {
            result.type = 'res'
            result.status = 'OK'
            result.data = translate[res.data.message]
        }
    })
    .catch((err) => {
        if (err.response) {
            result.type = 'res'
            result.status = 'ERROR'
            result.data = translate[err.response.data.message]
        }
    })
    return result
}

// const resReturn = (res, data) => {
//     var result = res
//     result.type = 'res'
//     switch (res.status) {
//         case 401:
//             result.handler = res.handler
//             break;
//         case 404:
//             result.handler = res.handler
//             result.handler.message = 'לא נמצא';
//             break;
//         case 200:
//             result.handler.message = `הלינק בהצלחה!`;
//             break;
//         default:
//             result.handler = res.handler;
//             break;
//     }

//     result.data = data
//     if (res.status > 200) result.status = 'ERROR'
//     else result.status = 'OK'

//     return result;
// }

