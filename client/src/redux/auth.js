import { auth_types } from "./types";
const init = {
	id: "",
	fullname: "",
	username: "",
	email: "",
	avatar_url: "",
	status: "",
};

function userReducers(state = init, action) {
	if ((action.type = auth_types.login)) {
		return {
			...state,
			...action?.payload,
		};
	} else {
		return init;
	}
}
export default userReducers;
