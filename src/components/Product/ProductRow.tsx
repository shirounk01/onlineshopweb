import { TableCell, TableRow } from "@mui/material";
import type { FC } from "react";
import type { Product } from "../../models/product";

export const ProductRow: FC<{ product: Product }> = ({ product }) => {
  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{product.subcategory}</TableCell>
      <TableCell>{product.sellerName}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.quantity}</TableCell>
    </TableRow>
  );
};
