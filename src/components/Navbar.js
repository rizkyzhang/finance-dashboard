import { Flex, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useUser, useSupabase } from "use-supabase";

export const Navbar = () => {
  const user = useUser();
  const supabase = useSupabase();

  return (
    <Flex
      as="nav"
      position="sticky"
      top={0}
      left={0}
      zIndex="sticky"
      justifyContent={["space-around", "flex-end"]}
      p={5}
      bg="#22252C"
      color="white"
      w="full"
    >
      <Link
        as={ReactRouterLink}
        fontSize="2xl"
        _hover={{ color: "blue.500" }}
        to="/"
        mr={5}
      >
        Dashboard
      </Link>
      {!user && (
        <>
          <Link
            as={ReactRouterLink}
            fontSize="2xl"
            _hover={{ color: "blue.500" }}
            to="/signup"
            mr={5}
          >
            Sign Up
          </Link>
          <Link
            as={ReactRouterLink}
            fontSize="2xl"
            _hover={{ color: "blue.500" }}
            to="/signin"
          >
            Sign In
          </Link>
        </>
      )}
      {user && (
        <Link
          fontSize="2xl"
          _hover={{ color: "blue.500" }}
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </Link>
      )}
    </Flex>
  );
};
