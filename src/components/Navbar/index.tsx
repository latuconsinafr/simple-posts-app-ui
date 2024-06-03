import { Container, Heading, Button, Box } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  withAuthNav?: boolean;
}

const APP_NAME = process.env.REACT_APP_NAME;

const Navbar: React.FC<NavbarProps> = ({ withAuthNav = false }) => {
  const navigate = useNavigate();

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  const handleRegisterNavigation = () => {
    navigate("/register");
  };

  return (
    <Box bg="gray.900" color="white" py={4} px={8}>
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              {APP_NAME}
            </Link>
          </Heading>
          {withAuthNav && (
            <Box>
              <Button
                colorScheme="blue"
                mr={4}
                size="sm"
                onClick={handleRegisterNavigation}
              >
                Register
              </Button>
              <Button colorScheme="blue" size="sm" onClick={handleLoginNavigation}>
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
