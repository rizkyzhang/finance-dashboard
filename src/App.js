import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useUser } from "use-supabase";

import { Auth, Dashboard } from "./pages";
import { Layout } from "./components/Layout";
import {
  getHistoricalData,
  getStockNewsList,
  getStockProfile,
} from "./utils/stock";

function App() {
  const [stock, setStock] = useState("AAPL");
  const [stockProfile, setStockProfile] = useState({});
  const [stockHistoricalData, setStockHistoricalData] = useState({});
  const [pricesSeries, setPricesSeries] = useState([]);
  const [stockNewsList, setStockNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const user = useUser();

  const roundPrice = (price) => {
    return price ? +price.toFixed(2) : null;
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const stockHistoricalData = await getHistoricalData(stock);
        const stockProfile = await getStockProfile(stock);
        const stockNewsList = user && (await getStockNewsList(stock));

        if (stockHistoricalData !== "Error" && stockProfile !== "Error") {
          setStockProfile(stockProfile);
          setStockHistoricalData(stockHistoricalData);

          const stockQuote = stockHistoricalData?.indicators?.quote[0];

          const stockPrices = stockHistoricalData?.timestamp.map(
            (timestamp, index) => ({
              x: new Date(timestamp * 1000),
              y: [
                stockQuote.open[index],
                stockQuote.high[index],
                stockQuote.low[index],
                stockQuote.close[index],
              ].map(roundPrice),
            })
          );

          setPricesSeries([
            {
              data: stockPrices,
            },
          ]);

          if (stockNewsList && stockNewsList !== "Error") {
            setStockNewsList(stockNewsList);
          }
        }
      } catch (error) {
        toast({
          title: "Error fetching data",
          status: "error",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [stock, toast, user]);

  return (
    <Layout>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Dashboard
              stockHistoricalData={stockHistoricalData}
              stockProfile={stockProfile}
              stock={stock}
              pricesSeries={pricesSeries}
              stockNewsList={stockNewsList}
              setStock={setStock}
              isLoading={isLoading}
            />
          }
        ></Route>
        <Route exact path="/signup" element={<Auth type="signup" />}></Route>
        <Route exact path="/signin" element={<Auth type="signin" />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
