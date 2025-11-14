import { useCallback, useEffect, useState, type FC } from "react";
import type { Product } from "../../models/product";
import { ProductRow } from "./ProductRow";
import { getProducts } from "../../services/products";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../styles.css";

export const ProductLanding: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProduct = useCallback(async () => {
    const res = await getProducts().then((res) => {
      setProducts(res!);
    });
    return res;
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const columns = [
    "Name",
    "Description",
    "Category",
    "Subcategory",
    "Seller's Name",
    "Price",
    "Quantity",
  ];

  const tableStyle = {
    minWidth: 700,
    maxHeight: "calc(100vh - 120px)",
    marginTop: "10px",
  };

  const headerStyle = {
    "& .MuiTableCell-root": { backgroundColor: "#4a4a4a" },
  };

  return (
    <div className="bodySettings">
      <TableContainer component={Paper} sx={tableStyle}>
        <Table stickyHeader aria-label="simple table">
          <TableHead sx={headerStyle} className="tableHeadSettings">
            <TableRow>
              {columns.map((column: string, index: number) => (
                <TableCell key={index} align="left" className="tableCell">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
