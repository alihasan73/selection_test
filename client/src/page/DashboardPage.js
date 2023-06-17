import { Box } from "@chakra-ui/react";
import Dashboard from "../components/dashboard";
import Sidebar from "../components/sidebar";

export default function DashboardPage() {
	return (
		<>
			<Box display={"flex"}>
				<Box maxW={"100px"} w={"100px"}>
					<Sidebar />
				</Box>
				<Box mx={"auto"}>
					<Dashboard />
				</Box>
			</Box>
		</>
	);
}
