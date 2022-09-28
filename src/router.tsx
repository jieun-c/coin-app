import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/coins";
import Coin from "./routes/coin";
import Price from "./routes/price";
import Chart from "./routes/chart";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
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
