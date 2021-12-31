import Axios from 'axios'
import { APIconfig } from '../../Config'

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
                result.data = err.response.handler.message
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
            result.data = err.response.handler.message
        }
    })
    return result
}

