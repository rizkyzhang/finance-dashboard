import { Image, Stack, Text, Wrap, chakra } from "@chakra-ui/react";
import { footerStyle, designedStyle, codedStyle } from "./style";

export const Footer = () => {
  return (
    <Stack as="footer" {...footerStyle}>
      <Text>
        <chakra.span {...designedStyle}>designed</chakra.span> &{" "}
        <chakra.span {...codedStyle}>&lt;/coded&gt;</chakra.span> by Rizky
      </Text>
      <Wrap justify="center">
        <Image
          src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
          alt="React Router logo"
          display="inline-block"
        />
        <Image
          src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white"
          alt="Chakra UI logo"
          display="inline-block"
        />
        <Image
          src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"
          alt="Supabase logo"
          display="inline-block"
        />
        <Image
          src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"
          alt="Vercel logo"
          display="inline-block"
        />
      </Wrap>
    </Stack>
  );
};
