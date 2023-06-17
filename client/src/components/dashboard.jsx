import { Flex, Spacer, Box, Image, Text, Link, Select } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function Dashboard() {
	const select = useSelector((state) => state.auth);
	console.log(select);
	return (
		<>
			<Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
				<Box
					maxW={"470px"}
					// bgColor={"red.500"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Box w={"500px"} p={2} display={"flex"} alignItems={"center"} gap={2}>
						<Image
							src="https://bit.ly/dan-abramov"
							boxSize="50px"
							objectFit="cover"
							borderRadius="full"
						/>
						<Text fontWeight={"bold"}>{select.username}</Text>
					</Box>
					<Box
						w={"40px"}
						h={"40px"}
						// bgColor={"yellow"}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<BsThreeDots size={"20px"} />
					</Box>
				</Box>
				<Box maxW={"470px"} bgColor={"red.500"}>
					<Image
						src="https://images.pexels.com/photos/5878503/pexels-photo-5878503.jpeg?auto=compress&cs=tinysrgb&w=300://bit.ly/dan-abramov"
						boxSize="500px"
						objectFit="cover"
						// borderRadius="full"
					/>
				</Box>
				<Box maxW={"470px"}>
					<Box
						w={"470px"}
						// bgColor={"yellow.500"}
						display={"flex"}
						// flexDir={"column"}
						justifyContent={"space-between"}
					>
						<Box
							display={"flex"}
							gap={1}
							alignItems={"center"}
							justifyContent={"center"}
						>
							<Box
								w={"50px"}
								h={"50px"}
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<FcLike size={"30px"} />
							</Box>
							<Box
								w={"50px"}
								h={"50px"}
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<AiOutlineComment size={"30px"} />
							</Box>
						</Box>
						<Box>
							<Box
								w={"50px"}
								h={"50px"}
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<BsBookmark size={"25px"} />
							</Box>
						</Box>
					</Box>
				</Box>
				<Box maxW={"470px"}>
					<Box
						w={"470px"}
						// bgColor={"blue.500"}
						borderBottom={"1px solid black"}
						display={"flex"}
						flexDir={"column"}
						justifyContent={"space-between"}
						gap={1}
						p={4}
					>
						<Text>23.800 likes</Text>
						<Text>
							<Link fontWeight={"bold"}>{select.username}</Link> Lorem ipsum
							dolor sit amet consectetur adipisicing elit. Rem, eaque?
						</Text>
						<Text>View All comments</Text>
					</Box>
				</Box>
			</Flex>
		</>
	);
}
