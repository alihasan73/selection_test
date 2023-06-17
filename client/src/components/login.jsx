import {
	Box,
	Center,
	Flex,
	Spacer,
	Input,
	Image,
	Button,
	Divider,
	Text,
	Link,
	useToast,
	InputGroup,
	InputRightElement,
	Icon,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import logo from "../assets/ig.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../api/api";
import { userLogin } from "../redux/middleware/userauth";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Login() {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const [seePassword, setSeePassword] = useState(false);
	const formik = useFormik({
		initialValues: {
			emna: "",
			password: "",
		},
		validationSchema: Yup.object({
			emna: Yup.string().required("required!"),
			password: Yup.string().min(5, "minimum 5 character"),
		}),
		onSubmit: async (values) => {
			try {
				const result = await dispatch(userLogin(values));
				console.log(result);
				if (result) {
					toast({
						title: "Login berhasil",
						status: "success",
						duration: 6000,
						isClosable: true,
					});
					return nav("/dashboard");
				}
				return toast({
					title: "wrong email/password",
					status: "error",
					duration: 6000,
					isClosable: true,
				});
			} catch (error) {
				console.log(error);
				toast({
					title: error.message,
					status: "error",
					duration: 6000,
					isClosable: true,
				});
			}
		},
	});
	return (
		<Center>
			<Flex
				flexDir={"column"}
				height="100vh"
				alignItems="center"
				justifyContent="center"
				gap={4}
			>
				<Flex
					flexDir={"column"}
					w={"100vw"}
					maxW={"420px"}
					justifyContent={"center"}
					alignItems={"center"}
					border={"1px solid #526D82"}
					gap={4}
					p={14}
				>
					<Box>
						<Image src={logo} w={"200px"}></Image>
					</Box>
					<InputGroup>
						<Input
							placeholder="username, or email"
							type="text"
							name="emna"
							value={formik.values.emna}
							onChange={formik.handleChange}
						/>
					</InputGroup>
					<Text color={"red.800"}>{formik.errors.emna}</Text>
					<InputGroup>
						<Input
							placeholder="Password"
							type={seePassword ? "text" : "password"}
							name="password"
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						<InputRightElement>
							<Icon
								as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
								w={"24px"}
								h={"24px"}
								cursor={"pointer"}
								color={"#A5A5A5"}
								onClick={() => setSeePassword(!seePassword)}
							></Icon>
						</InputRightElement>
					</InputGroup>
					<Text color={"red.800"}>{formik.errors.password}</Text>
					<Button
						colorScheme="telegram"
						w={"310px"}
						type="submit"
						onClick={formik.handleSubmit}
					>
						Log In
					</Button>
					<Flex justifyContent={"center"} alignItems={"center"} my={2}>
						<Divider border={"1px solid #526D82"} w={"100px"} />
						<Text mx={2}>Or</Text>
						<Divider border={"1px solid #526D82"} w={"100px"} />
					</Flex>
					<Button
						colorScheme="facebook"
						leftIcon={<FaFacebook />}
						variant={"link"}
						w={"260px"}
						alignItems={"center"}
						justifyContent={"center"}
					>
						Log in with facebook
					</Button>
					<Link my={2} onClick={() => nav("/forgot-password/request")}>
						<Text fontSize="sm">Forget password?</Text>
					</Link>
				</Flex>
				<Flex
					border={"1px solid #526D82"}
					w={"100vw"}
					maxW={"420px"}
					justifyContent={"center"}
					p={6}
				>
					<Text fontSize="md">
						Don't have an account?{" "}
						<Link color={"blue.400"} onClick={() => nav("/register")}>
							Sign Up
						</Link>
					</Text>
				</Flex>
			</Flex>
		</Center>
	);
}
