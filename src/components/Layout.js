import { Container, Stack } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export const Layout = ({ children }) => {
  return (
    <Container
      minW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDirection="column"
      bg="#282C34"
    >
      <Navbar />
      <Container maxW="container.lg" alignItems="center" px={5} py={10}>
        <Stack spacing={10}>{children}</Stack>

        <ScrollToTop />
      </Container>
      <Footer />
    </Container>
  );
};
