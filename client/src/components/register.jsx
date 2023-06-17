import {
	Box,
	Center,
	Flex,
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
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import logo from "../assets/ig.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
	const toast = useToast();
	const nav = useNavigate();
	const [seePassword, setSeePassword] = useState(false);
	const formik = useFormik({
		initialValues: {
			fullname: "",
			username: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			fullname: Yup.string()
				.min(5, "minimun 5 character")
				.max(15, "maximal 15 character")
				.required("required!"),
			username: Yup.string()
				.min(5, "minimun 5 character")
				.max(15, "maximal 15 character")
				.required("required!"),
			email: Yup.string().email("Invalid email format").required("required!"),
			password: Yup.string()
				.min(8, "Minimun 8 character")
				.required("required!"),
			RepeatPassword: Yup.string()
				.required("you need to confirm your password.")
				.oneOf([Yup.ref("password"), null], "The password don't match"),
		}),
		onSubmit: async (values) => {
			console.log(values.email);
			console.log(values.username);
			const checkUsmail = await api
				.get("/users/one", {
					params: {
						email: values.email,
						username: values.username,
					},
				})
				.then((res) => {
					if (Object.keys(res.data).length !== 0) {
						console.log(Object.keys(res.data));
						return true;
					} else {
						return false;
					}
				});
			console.log(checkUsmail);
			if (checkUsmail) {
				return alert("email and username already used");
			} else {
				const result = await api.post("users/", values);
				toast({
					title: result.data.message,
					status: "success",
					duration: 6000,
					isClosable: true,
				});
				nav("/");
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
					gap={2}
					px={14}
					py={10}
				>
					<Box>
						<Image src={logo} w={"200px"}></Image>
					</Box>
					<Box>
						<Text textAlign={"center"} fontWeight={"bold"} color={"#9DB2BF"}>
							Sign up to see photos and videos from your friends
						</Text>
					</Box>
					<Button colorScheme="telegram" w={"310px"} leftIcon={<FaFacebook />}>
						Log in with facebook
					</Button>
					<Flex justifyContent={"center"} alignItems={"center"} my={2}>
						<Divider border={"1px solid #526D82"} w={"100px"} />
						<Text mx={2}>Or</Text>
						<Divider border={"1px solid #526D82"} w={"100px"} />
					</Flex>
					<Input
						placeholder="Email"
						type="email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
					<Text color={"red.800"}>{formik.errors.email}</Text>
					<Input
						placeholder="Full Name"
						type="text"
						name="fullname"
						value={formik.values.fullname}
						onChange={formik.handleChange}
					/>
					<Text color={"red.800"}>{formik.errors.fullname}</Text>
					<Input
						placeholder="Username"
						type="text"
						name="username"
						value={formik.values.username}
						onChange={formik.handleChange}
					/>
					<Text color={"red.800"}>{formik.errors.username}</Text>
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
					<Input
						placeholder="Repeat Password"
						type="Password"
						name="RepeatPassword"
						// value={formik.values.RepeatPassword}
						onChange={formik.handleChange}
					/>
					<Text color={"red.800"}>{formik.errors.RepeatPassword}</Text>
					<Text textAlign={"center"} fontSize={"xs"}>
						People who use our service may have uploaded your contact
						information to Instagram. <Link color={"blue.600"}>Learn More</Link>
					</Text>
					<Text textAlign={"center"} fontSize={"xs"}>
						By signing up, you agree to our{" "}
						<Link color={"blue.700"}>Terms</Link>,
						<Link color={"blue.700"}>Privacy Policy</Link>
						<Link color={"blue.700"}>and Cookies Policy</Link>
					</Text>
					<Button
						colorScheme="twitter"
						w={"310px"}
						type="submit"
						onClick={formik.handleSubmit}
					>
						Sign Up
					</Button>
				</Flex>
				<Flex
					border={"1px solid #526D82"}
					w={"100vw"}
					maxW={"420px"}
					justifyContent={"center"}
					p={6}
				>
					<Text fontSize="md">
						have an account?{" "}
						<Link color={"blue.400"} onClick={() => nav("/")}>
							Log In
						</Link>
					</Text>
				</Flex>
			</Flex>
		</Center>
	);
}
