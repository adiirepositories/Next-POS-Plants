import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MediaCard from "@/components/MediaCard";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types.d";

interface Props {
  products: Product[];
}
 
export default function ProductList({ products }: Props) {
  return (
    // <>
    // 	<h1 className='text-3xl font-semibold mb-4'>Products</h1>
    // 	<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
    // 		{products.map(product => (
    // 			<ProductCard key={product.id} product={product} />
    // 		))}
    // 	</div>

    // <Grid xs={12} sm={6}>
    // <Grid>
    <Grid container rowSpacing={1} columnSpacing={1} sx={{mb:'4em', mt:'1em'}}>
      {products.map((product) => (
        <Grid xs={12} sm={2.4}>
          <ProductCard key={product.id} product={product} />
        </Grid>
      ))}
    </Grid>
    // </>
  );
}
