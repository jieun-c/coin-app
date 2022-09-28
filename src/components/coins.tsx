import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../service/atom";
import { fetchCoins } from "../service/api";

const Container = styled.div`
  padding: 0 10px;
  width: 100%;
  max-width: 480px;
  min-width: 320px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.span`
  display: block;
  text-align: center;
  margin-top: 2em;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid;
  border-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    transition: color 0.2s ease-in;
    padding: 20px;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () =>
    setDarkAtom((prev) => {
      sessionStorage.setItem("isDark", (!prev).toString());
      return !prev;
    });

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button
          style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}
          onClick={toggleDarkAtom}
        >
          Change Theme
        </button>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100)?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
