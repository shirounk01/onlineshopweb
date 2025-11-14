import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { ProductLanding } from "../components/Product/ProductLanding";
import { ProductCreate } from "../components/Product";

export const AppRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<App />}>
          <Route path={"/Products"} element={<ProductLanding />} />
          <Route path={"/CreateProduct"} element={<ProductCreate />} />
        </Route>
      </Routes>
    </>
  );
};
