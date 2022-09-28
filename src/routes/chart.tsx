import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const isDark = useRecoilValue(isDarkAtom);

  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <>
      <ReactApexChart
        type="candlestick"
        series={[
          {
            data:
              data?.map((item) => {
                return {
                  x: item.time_close,
                  y: [
                    item.open.toFixed(2),
                    item.high.toFixed(2),
                    item.low.toFixed(2),
                    item.close.toFixed(2),
                  ],
                };
              }) ?? [],
          },
        ]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
          },
          chart: {
            width: 500,
            height: 500,
            background: "transparent",
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
            labels: {
              formatter: (value) => `$ ${value.toFixed(2)}`,
            },
          },
        }}
      />
    </>
  );
};

export default Chart;
