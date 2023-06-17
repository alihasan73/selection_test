import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function ProtectedPage({
	children,
	guestOnly = false,
	needLogin = false,
}) {
	const [data, setData] = useState({});
	async function refreshReader() {
		const token = JSON.parse(localStorage.getItem("token"));
		if (token) {
			await api
				.get("/users/token", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => setData(res.data));
		}
	}
	const nav = useNavigate();

	console.log(data);

	useEffect(() => {
		refreshReader();
	}, []);
	useEffect(() => {
		if (guestOnly && data?.email) {
			return nav("/");
		} else if (needLogin && !data?.email) {
			return nav("/dashboard");
		}
	}, [data, nav, guestOnly, needLogin]);
	return children;
}
