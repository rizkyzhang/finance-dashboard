import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useUser } from "use-supabase";
import { SkeletonText } from "@chakra-ui/react";

export const StockNews = ({ stock, stockNewsList, isLoading }) => {
  const user = useUser();

  return (
    <Stack
      h={500}
      overflowY="scroll"
      bg="blackAlpha.300"
      borderRadius="lg"
      p={5}
      color="white"
      spacing={7}
    >
      <Heading>Top {stock} news</Heading>

      {!user && (
        <Center>
          {" "}
          <Text fontSize={30}>Please sign in to view the news</Text>{" "}
        </Center>
      )}

      {user &&
        stockNewsList &&
        stockNewsList.map((stockNews, index) => {
          return (
            <SkeletonText key={index} isLoaded={!isLoading}>
              <Flex
                direction={["column", "column", "row"]}
                justifyContent="space-around"
              >
                <Link mr={10} href={stockNews?.url}>
                  <Image
                    w={300}
                    objectFit="cover"
                    src={stockNews?.urlToImage}
                  />
                </Link>
                <Box>
                  <Link
                    mb={3}
                    fontSize={20}
                    fontWeight="bold"
                    href={stockNews?.url}
                  >
                    {stockNews?.title}
                  </Link>
                  <Text fontSize={14}>{stockNews?.description}</Text>
                </Box>
              </Flex>
            </SkeletonText>
          );
        })}
    </Stack>
  );
};
