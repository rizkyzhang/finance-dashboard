import axios from "axios";
import env from "react-dotenv";

// Proxy url is needed so we can call the APIs without geting CORS error.
const proxyUrl = `https://cool-proxy.herokuapp.com/`;

export const getHistoricalData = async (stock) => {
  try {
    const apiUrl = `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/${stock}`;

    const getHistoricalDataResponse = await axios.get(apiUrl);

    return getHistoricalDataResponse?.data?.chart?.result[0];
  } catch (error) {
    return "Error";
  }
};

export const getStockProfile = async (stock) => {
  try {
    const apiUrl = `${proxyUrl}https://query2.finance.yahoo.com/v11/finance/quoteSummary/${stock}?modules=assetProfile`;

    const getStockProfileResponse = await axios.get(apiUrl);

    return getStockProfileResponse?.data?.quoteSummary?.result[0].assetProfile;
  } catch (error) {
    return "Error";
  }
};

export const getStockNewsList = async (stock) => {
  const stocksMap = {
    AAPL: "Apple",
    AMZN: "Amazon",
    BABA: "Alibaba",
    FB: "Facebook",
    GOOG: "Google",
    MSFT: "Microsoft",
    NVDA: "Nvidia",
    TSLA: "Tesla",
    V: "VISA",
    WMT: "Walmart",
  };

  try {
    const apiUrl = `${proxyUrl}https://newsapi.org/v2/everything?q=${stocksMap[stock]}&apiKey=${env.NEWSAPI_API_KEY}`;

    const getStockNewsListResponse = await axios.get(apiUrl);

    return getStockNewsListResponse?.data?.articles;
  } catch (error) {
    return "Error";
  }
};
