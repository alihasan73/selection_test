import { Box, Flex } from "@chakra-ui/react";
import {
	AiOutlineInstagram,
	AiOutlineSearch,
	AiOutlineCompass,
	AiOutlinePlusCircle,
	AiOutlineLogin,
} from "react-icons/ai";
import { GrHomeRounded } from "react-icons/gr";
import { ImFilm } from "react-icons/im";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { auth_types } from "../redux/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
	const nav = useNavigate();
	const dispatch = useDispatch();
	function logout() {
		dispatch({ type: auth_types.logout });
		localStorage.removeItem("token");
		nav("/");
	}
	return (
		<Flex
			maxW={"100px"}
			h={"100vh"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"space-between"}
			borderRight={"1px solid black"}
		>
			<Flex direction={"column"} gap={"20px"}>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					my={"10"}
				>
					<AiOutlineInstagram size={"42px"} />
				</Box>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<GrHomeRounded size={"32px"} />
				</Box>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<AiOutlineSearch size={"42px"} />
				</Box>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<AiOutlineCompass size={"42px"} />
				</Box>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<ImFilm size={"42px"} />
				</Box>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<IoIosNotificationsOutline size={"42px"} />
				</Box>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<AiOutlinePlusCircle size={"42px"} />
				</Box>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<RxAvatar size={"42px"} />
				</Box>
			</Flex>
			<Flex direction={"column"}>
				<Box
					w={"50px"}
					h={"50px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					my={"10"}
					onClick={logout}
					cursor={"pointer"}
				>
					<AiOutlineLogin size={"42px"} />
				</Box>
			</Flex>
		</Flex>
	);
}
