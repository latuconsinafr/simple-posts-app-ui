import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RoleBasedRoute from "./components/RoleBasedRoute";
import Users from "./pages/User";
import Posts from "./pages/Post";
import NotAuthorized from "./pages/NotAuthorized";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route
            path="users/*"
            element={
              <RoleBasedRoute requiredRole="admin" element={Users} path={""} />
            }
          />
          <Route path="posts/*" element={<Posts />} />
        </Route>
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
