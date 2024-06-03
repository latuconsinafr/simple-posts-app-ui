import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import PostList from "../../components/Posts/PostList";
import PostDetail from "../../components/Posts/PostDetail";
import PostForm from "../../components/Posts/PostForm";

const User: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Sidebar />
      <Box ml="250px" mt="20px" p="4">
        <Text fontSize="2xl" fontWeight="bold" p={5}>
          Posts
        </Text>
        <Routes>
          <Route
            path="*"
            element={
              <Box padding="1.25em">
                <PostList />
              </Box>
            }
          />
          <Route
            path="/create"
            element={
              <Box padding="1.25em">
                <PostForm />
              </Box>
            }
          />
          <Route
            path="/:id"
            element={
              <Box padding="1.25em">
                <PostDetail />
              </Box>
            }
          />
          <Route
            path="/:id/edit"
            element={
              <Box padding="1.25em">
                <PostForm />
              </Box>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default User;
