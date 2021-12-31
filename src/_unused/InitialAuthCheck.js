import Axios from 'axios'

import { APIconfig } from '../Config'

export async function InitialAuthCheck() {
    Axios.defaults.withCredentials = true;
    var auth = {}; 
    await Axios.get(`${APIconfig.url}/users/auth`)
        .then((res) => {
            if (res.status === 200) {
                auth =  {
                    status: true,
                    user: res.data
                };
            }
            if (res.status === 401) {
                auth =  {
                    status: false,
                    user: undefined
                };
            }
        })
        return auth 
}