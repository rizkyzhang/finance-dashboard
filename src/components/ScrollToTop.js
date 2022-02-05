import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

export const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <IconButton
          onClick={scrollToTop}
          icon={<TriangleUpIcon />}
          position="fixed"
          bottom="30px"
          right="30px"
          padding="15px"
          bg="blue.500"
          color="white"
          _hover={{
            bg: "transparent",
            border: "1px solid",
            borderColor: "blue.500",
          }}
        />
      )}
    </>
  );
};
