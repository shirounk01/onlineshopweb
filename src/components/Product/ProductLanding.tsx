import { useCallback, useEffect, useState, type FC } from "react";
import type { Product } from "../../models/product";
import { ProductRow } from "./ProductRow";
import { getProducts } from "../../services/products";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
    maxHeight: "80vh",
    "& .MuiTableCell-head": { backgroundColor: "#4a4a4a", color: "white" },
    "& .MuiTableRow-root:nth-of-type(even)": { backgroundColor: "#e9e9e9ff" },
    "& .MuiTableRow-root:hover": { backgroundColor: "#ccccccff" },
  };

  const createProduct = { route: "createProduct" };

  const boxStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const searchBarStyle = {
    width: 1 / 2,
    backgroundColor: "white",
    boxShadow: 3,
  };

  return (
    <Box className="bodySettings">
      <Grid container spacing={2}>
        <Grid size={12} alignItems="center" justifyContent="center">
          <Box sx={boxStyle}>
            <TextField
              id="outlined-basic"
              label="Search products..."
              variant="outlined"
              fullWidth
              sx={searchBarStyle}
              value={query}
              onChange={handleSearch}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Grid>

        <Grid size={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5">Filters</Typography>
            <Box my={2}>
              <TextField
                label="Min price"
                type="number"
                sx={{ width: 1 / 2 }}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <TextField
                label="Max price"
                type="number"
                sx={{ width: 1 / 2 }}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </Box>
            <ButtonGroup variant="contained" fullWidth>
              <Button variant="contained" color="primary" onClick={runFilters}>
                Filter
              </Button>
              <Button variant="contained" color="error" onClick={resetFilters}>
                Reset
              </Button>
            </ButtonGroup>
          </Paper>
          <Link to={`/${createProduct.route}`}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ my: 2 }}
            >
              Create new product
            </Button>
          </Link>
        </Grid>

        <Grid size={9}>
          <Paper elevation={3}>
            <TableContainer component={Paper} sx={tableStyle}>
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.map((column: string, index: number) => (
                      <TableCell key={index} align="left">
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={999} align="center">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayProducts.map((product) => (
                      <ProductRow key={product.id} product={product} />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
