import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { ProductLanding } from "../components/Product/ProductLanding";

export const AppRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<App />}>
          <Route path={"/Products"} element={<ProductLanding />} />
        </Route>
      </Routes>
    </>
  );
};
