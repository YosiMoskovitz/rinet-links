import Axios from 'axios'
import { APIconfig } from '../Config'

export const AddLink = (newLink) => {
    var result = Axios.post(`${APIconfig.url}/links `, newLink)
    .then((res) => {
        return resReturn(res, 'נשמר')
    }).catch((err) => {
        return resReturn(err.response)
    })
    return result
}

export const EditLink = (Link) => {
    var result = Axios.patch(`${APIconfig.url}/links/${Link.id}`, Link)
        .then((res) => {
            return resReturn(res, 'עודכן')
        }).catch((err) => {
            return resReturn(err.response)
        })
    return result
}

export const DeleteLink = (Link) => {
    var result = Axios.delete(`${APIconfig.url}/links/${Link}`)
    .then((res) => {
        return resReturn(res, 'נמחק')
    }).catch((err) => {
        return resReturn(err.response)
    })
    return result
}

const resReturn = (res, action) => {
    var result = res
    switch (res.status) {
        case 401:
            result.handler = res.handler
            break;
        case 404:
            result.handler = res.handler
            result.handler.message = 'לא נמצא';
            break;
        case 200:
            result.handler.message = `הלינק ${action} בהצלחה!`;
            break;
        default:
            result.handler = res.handler;
            break;
    }
    return result;
}