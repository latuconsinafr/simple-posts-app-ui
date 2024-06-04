import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const NotAuthorized: React.FC = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h1" size="xl" mb={4}>
        Not Authorized
      </Heading>
      <Text>You do not have permission to access this page.</Text>
    </Box>
  );
};

export default NotAuthorized;
