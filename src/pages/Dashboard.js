import { StockChart, StockData, StockNews, StockSelector } from "../components";

export const Dashboard = ({
  setStock,
  stock,
  stockProfile,
  stockNewsList,
  stockHistoricalData,
  pricesSeries,
  isLoading,
}) => {
  return (
    <>
      <StockSelector setStock={setStock} />
      <StockData
        stockHistoricalData={stockHistoricalData}
        stockProfile={stockProfile}
        isLoading={isLoading}
      />
      <StockNews
        stock={stock}
        stockNewsList={stockNewsList}
        isLoading={isLoading}
      />
      <StockChart stock={stock} pricesSeries={pricesSeries} />
    </>
  );
};
