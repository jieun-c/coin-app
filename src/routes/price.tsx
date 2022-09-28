import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";

const Box = styled.div<IBox>`
  width: 100%;
  padding: 1em;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  span:nth-child(2) {
    color: ${(props) => (props.price >= 0 ? "green" : "red")};
  }
`;

interface IBox {
  price: number;
}

interface ChartProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );

  return (
    <>
      {!isLoading && (
        <>
          <Box price={data?.quotes.USD.percent_change_1h ?? 0}>
            <span>Change rate (last 1 hours) :</span>
            <span>{data?.quotes.USD.percent_change_1h} %</span>
          </Box>
          <Box price={data?.quotes.USD.percent_change_24h ?? 0}>
            <span>Change rate (last 24 hours) :</span>
            <span>{data?.quotes.USD.percent_change_24h} %</span>
          </Box>
          <Box price={data?.quotes.USD.percent_change_7d ?? 0}>
            <span>Change rate (last 7 days) :</span>
            <span>{data?.quotes.USD.percent_change_7d} %</span>
          </Box>
          <Box price={data?.quotes.USD.percent_change_30d ?? 0}>
            <span>Change rate (last 1 months) :</span>
            <span>{data?.quotes.USD.percent_change_30d} %</span>
          </Box>
          <Box price={data?.quotes.USD.percent_change_1y ?? 0}>
            <span>Change rate (last 1 years) :</span>
            <span>{data?.quotes.USD.percent_change_1y} %</span>
          </Box>
        </>
      )}
    </>
  );
};

export default Price;
