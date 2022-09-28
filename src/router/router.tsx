import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "../components/coins";
import Coin from "../components/coin";
import Price from "../components/price";
import Chart from "../components/chart";

const Router = () => {
  return (
    <div>
      <BrowserRouter basename="/coin-app">
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId" element={<Coin />}>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
