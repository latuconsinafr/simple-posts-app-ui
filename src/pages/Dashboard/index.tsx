import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <Box bg="gray.100" minHeight="100vh">
        <Sidebar />
      <Navbar withAuthNav={true} />
      <Flex>
        <Box flex="1" p={8}>
          {/* Dashboard Content */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
