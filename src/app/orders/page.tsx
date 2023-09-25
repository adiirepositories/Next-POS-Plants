"use client";

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
import ProductList from "@/components/products/ProductList";
import { Product } from "../types";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material'
import axios from "axios";


interface State {
  products: Product[];
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  error: null,
};

export default function StarredPage(data: any) {
  const [productState, setproductState] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(true)

  async function getProducts() {
   
    const apiUrl = "https://dummyjson.com/products";

    axios.get(apiUrl)
      .then((response) => {
        setproductState(response.data.products);
        setisLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setisLoading(false);
      });

  }
  

  useEffect(() => {

    getProducts();

  }, []);



  return (
    <>
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' title='Loading' />
      </Backdrop>
    <Box sx={{ display: "flex" }}>
   
        <Grid container rowSpacing={3} columnSpacing={3}>
            <ProductList products={productState}/>
        </Grid>
      
    </Box>
    </>
  );
}
