import { useCallback, useEffect, useState, type FC } from "react";
import type { Product } from "../../models/product";
import { ProductRow } from "./ProductRow";
import { getProducts } from "../../services/products";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "../../styles.css";
import { Link } from "react-router-dom";

export const ProductLanding: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");

  const getProduct = useCallback(async () => {
    const res = await getProducts().then((res) => {
      setProducts(res!);
      setFilteredProducts(res!);
    });
    return res;
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    console.log(filteredProducts);
  };

  const displayProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const runFilters = () => {
    let result = [...filteredProducts];

    if (typeof minPrice === "number") {
      result = result.filter((p) => p.price >= minPrice);
    }
    if (typeof maxPrice === "number") {
      result = result.filter((p) => p.price <= maxPrice);
    }

    setFilteredProducts(result);
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setFilteredProducts(products);
  };

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

  const createProduct = { route: "createProduct" };

  return (
    <div className="bodySettings">
      <TextField
        id="outlined-basic"
        label="Search products..."
        variant="outlined"
        value={query}
        onChange={handleSearch}
      />
      <TextField
        label="Min price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <TextField
        label="Max price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <Button variant="contained" color="success" onClick={runFilters}>
        Filter
      </Button>
      <Button variant="contained" color="error" onClick={resetFilters}>
        Reset
      </Button>
      <Link to={`/${createProduct.route}`}>
        <Button variant="contained" color="success">
          Create
        </Button>
      </Link>
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
            {displayProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
