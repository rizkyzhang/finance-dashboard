import { Select } from "@chakra-ui/react";

export const StockSelector = ({ setStock }) => {
  const stocks = [
    "AAPL",
    "AMZN",
    "BABA",
    "FB",
    "GOOG",
    "MSFT",
    "NVDA",
    "TSLA",
    "V",
    "WMT",
  ];

  return (
    <Select
      onChange={(event) => setStock(event.target.value)}
      w="200px"
      size="lg"
      bg="blackAlpha.300"
      color="white"
      border="none"
      cursor="pointer"
    >
      <option hidden>Select Stock</option>
      {stocks.map((stock, index) => {
        return (
          <option key={index} style={{ background: "#22242D" }} value={stock}>
            {stock}
          </option>
        );
      })}
    </Select>
  );
};
