import React from "react";
import { Link, Box, Flex, Text, Stack } from "@chakra-ui/react";

function Logo(props) {
    return (
      <Box {...props}>
        <Text fontSize="lg" fontWeight="bold" minWidth="15em">
          SCP Baseline Generator
        </Text>
      </Box>
    );
}

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={20}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem color="white" to="/">Home</MenuItem>
        {/* <MenuItem color="white" to="/examples">Examples </MenuItem>
        <MenuItem color="white" to="/best-practices">Best Practices </MenuItem> */}
        <MenuItem color="white" to="/about">About </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["secondary.500", "secondary.500", "transparent", "transparent"]}
      color={["white", "white", "secondary.1000", "secondary.1000"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;