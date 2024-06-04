import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import User, { UserRole } from "../../interfaces/User";
import { me } from "../../services/Auth";

interface RoleBasedRouteProps {
  element: React.ComponentType<any>;
  requiredRole: UserRole;
  path: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  element: Component,
  requiredRole,
  path,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await me();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path={path}
        element={
          currentUser && currentUser.roles.includes(requiredRole) ? (
            <Component />
          ) : (
            <Navigate to="/not-authorized" />
          )
        }
      />
    </Routes>
  );
};

export default RoleBasedRoute;
