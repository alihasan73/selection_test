import { Route } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import DashboardPage from "../page/DashboardPage";
// import ForgetEmailPage from "../page/ForgetEmail";
// import ForgetPasswordPage from "../page/ForgetPasswordPage";
import ForgotPassword, {
	RequestForgotPassword,
} from "../components/ForgetPassword";
import ProtectedPage from "./protectedPage";

const routes = [
	<Route path="" key={"loginpage"} element={<LoginPage />}></Route>,
	<Route
		path="/register"
		key={"registerpage"}
		element={<RegisterPage />}
	></Route>,
	<Route
		path="/dashboard"
		key={"dashboardpage"}
		element={
			<ProtectedPage needLogin={true} guestOnly={false}>
				<DashboardPage />
			</ProtectedPage>
		}
	></Route>,
	<Route
		path="/forgot-password/request"
		key="request-forgot-password"
		element={<RequestForgotPassword />}
	></Route>,

	<Route
		path="/forgot-password/:token"
		key="forgot-password"
		element={<ForgotPassword />}
	></Route>,
];

export default routes;
