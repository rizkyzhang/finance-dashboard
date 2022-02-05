import Chart from "react-apexcharts";

export const StockChart = ({ stock, pricesSeries }) => {
  const chartOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      background: "#22242D",
    },
    title: {
      text: `${stock} CandleStick Chart`,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={pricesSeries}
      type="candlestick"
      width="100%"
      height={350}
    />
  );
};
