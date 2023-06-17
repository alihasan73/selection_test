import { combineReducers } from "redux";

import userReducers from "./auth";

const rootReducer = combineReducers({
	auth: userReducers,
});

export default rootReducer;
