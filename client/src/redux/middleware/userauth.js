import { api } from "../../api/api";
import { auth_types } from "../types";

export function userLogin(values) {
	return async function (dispatch) {
		try {
			console.log(values.emna);
			console.log(values.password);
			const token = await api
				.get("/users/login", {
					params: {
						emna: values.emna,
						password: values.password,
					},
				})
				.then((res) => res.data.token);

			const userData = await api
				.get("/users/token", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => res.data);

			console.log(userData);
			if (userData) {
				await dispatch({
					type: auth_types.login,
					payload: userData,
				});
			}

			localStorage.setItem("token", JSON.stringify(token));
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
}
