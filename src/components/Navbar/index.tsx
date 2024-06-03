import { Container, Heading, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  withAuthNav?: boolean;
}

const APP_NAME = process.env.REACT_APP_NAME;

const Navbar: React.FC<NavbarProps> = ({ withAuthNav = false }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  const handleRegisterNavigation = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <Box bg="gray.900" color="white" py={4} px={8} zIndex="1000" position="relative">
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg" onClick={() => navigate("/")} cursor="pointer">
            {APP_NAME}
          </Heading>
          <Box>
            {isAuthenticated ? (
              <>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={handleLogout}
                  marginRight={4}
                >
                  Logout
                </Button>
              </>
            ) : (
              withAuthNav && (
                <>
                  <Button
                    colorScheme="blue"
                    onClick={handleRegisterNavigation}
                    marginRight={2}
                    size="sm"
                  >
                    Register
                  </Button>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={handleLoginNavigation}
                  >
                    Login
                  </Button>
                </>
              )
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
