import {
  Text,
  Box,
  Heading,
  Flex,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

export const StockData = ({ stockHistoricalData, stockProfile, isLoading }) => {
  return (
    <Box color="white" fontFamily="Nunito">
      <Flex
        direction={["column", "column", "column", "row"]}
        justifyContent="space-between"
        gap={2}
        fontSize={20}
      >
        <Stack direction="column" p={5} bg="blackAlpha.300" borderRadius="lg">
          <SkeletonText isLoaded={!isLoading}>
            <Heading mb={5}>{stockHistoricalData?.meta?.symbol}</Heading>
            <Text mb={5} fontSize={30}>
              {stockHistoricalData?.meta?.currency}
            </Text>
            <Text fontSize={30}>
              ${stockHistoricalData?.meta?.regularMarketPrice.toFixed(2)}
            </Text>
          </SkeletonText>
        </Stack>
        <Box bg="blackAlpha.300" borderRadius="lg" p={5}>
          <SkeletonText isLoaded={!isLoading}>
            <Heading mb={3}>Stock Profile</Heading>
            <Text>Sector: {stockProfile?.sector}</Text>
            <Text>Industry: {stockProfile?.industry}</Text>
            <Text>Phone: {stockProfile?.phone}</Text>
            <Text>Website: {stockProfile?.website}</Text>
          </SkeletonText>
        </Box>
        <Box bg="blackAlpha.300" borderRadius="lg" p={5}>
          <SkeletonText isLoaded={!isLoading}>
            <Heading mb={3}>Company Address</Heading>
            <Text>Address: {stockProfile.address1}</Text>
            <Text>Zip: {stockProfile.zip}</Text>
            <Text>City: {stockProfile.city}</Text>
            <Text>Country: {stockProfile.country}</Text>
          </SkeletonText>
        </Box>
      </Flex>
    </Box>
  );
};
