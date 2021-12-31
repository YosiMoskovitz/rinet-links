import { APIconfig } from "../Config";
import Axios from 'axios'

export async function loginUser(dispatch, loginPayload) {
	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await Axios.post(`${APIconfig.url}/users/login`, loginPayload);
		let data = response.data;

		if (data.user) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}

		dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
		console.log(data.errors[0]);
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
		console.log(error);
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
}
