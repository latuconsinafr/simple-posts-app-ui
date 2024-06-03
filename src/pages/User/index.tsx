import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import UserList from "../../components/Users/UserList";
import UserDetail from "../../components/Users/UserDetail";
import UserForm from "../../components/Users/UserForm";

const User: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Sidebar />
      <Box ml="250px" mt="20px" p="4">
        <Text fontSize="2xl" fontWeight="bold" p={5}>
          Users
        </Text>
        <Routes>
          <Route
            path="*"
            element={
              <Box padding="1.25em">
                <UserList />
              </Box>
            }
          />
          <Route
            path="/create"
            element={
              <Box padding="1.25em">
                <UserForm />
              </Box>
            }
          />
          <Route
            path="/:id"
            element={
              <Box padding="1.25em">
                <UserDetail />
              </Box>
            }
          />
          <Route
            path="/:id/edit"
            element={
              <Box padding="1.25em">
                <UserForm />
              </Box>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default User;
