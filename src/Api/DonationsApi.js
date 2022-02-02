import Axios from 'axios'
import { APIconfig } from '../Config'

export const registerDonation = async (userId, data) => {
    var result = await Axios.post(`${APIconfig.url}/donationes/new-donation/${userId}`, data)
    return result;
}

export const getAllDonations = async () => {
    var result = await Axios.get(`${APIconfig.url}/donationes`)
    return result;
}

export const getAllUsers = async () => {
    var result = await Axios.get(`${APIconfig.url}/users/all`)
    return result;
}

