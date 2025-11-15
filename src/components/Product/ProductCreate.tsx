import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState, type FC } from "react";
import type { Product } from "../../models/product";
import "../../styles.css";
import { createProduct } from "../../services/products";
import { useNavigate } from "react-router-dom";

export const ProductCreate: FC = () => {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    sellerName: "",
    price: 0,
    quantity: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/Products`;
    navigate(path);
  };

  const saveProduct = async (): Promise<void> => {
    await createProduct(newProduct).then(() => {
      routeChange();
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, maxWidth: 600, mx: "auto" }}
      className="bodySettings"
    >
      <Typography variant="h5" mb={2}>
        Add New Product
      </Typography>

      <Box>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Product Name"
              name="name"
              fullWidth
              required
              value={newProduct.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              required
              value={newProduct.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Category"
              name="category"
              fullWidth
              required
              value={newProduct.category}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Subcategory"
              name="subcategory"
              fullWidth
              required
              value={newProduct.subcategory}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Seller Name"
              name="sellerName"
              fullWidth
              required
              value={newProduct.sellerName}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              required
              value={Number(newProduct.price)}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              fullWidth
              required
              value={Number(newProduct.quantity)}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12} mt={1}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                saveProduct();
              }}
              fullWidth
            >
              Save Product
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
