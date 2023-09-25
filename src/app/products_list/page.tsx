"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import Table_list from "@/components/product_list/table_list_2";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { ProductList } from "../types";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import axios from "axios";
import CardHeader from "@mui/material/CardHeader";
import styled from "@emotion/styled";

interface State {
  products: ProductList[];
  isLoading: boolean;
  error: any;
}

export default function productsList() {
  const [producListtState, setproductListState] = useState<ProductList[]>([]);
  const [isLoading, setisLoading] = useState(true);

  async function getProducts() {
    // const apiUrl = "https://jsonplaceholder.typicode.com/todos/";
    const apiUrl = "https://dummyjson.com/products";

    axios
      .get(apiUrl)
      .then((response) => {
        setproductListState(response.data.products);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setisLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const StyledCard = styled(Card)(({ theme }) => ({
    // transition: "transform 0.15s ease-in-out",
    // "&:hover": { transform: "scale3d(1.04, 1.04, 1)" },
    border: "none",
    // marginTop:'1em',
    marginBottom: "1em",
  }));

  // console.log(producListtState);
  return (
    <Box sx={{ height: "300", width: "100%", border: "none" }}>
      {/* <Card sx={{p:"2em"}}> */}
      <StyledCard
        variant="outlined"
        sx={{
          p: "2em",
          // borderRadius: 2,
        }}
      >
        <CardHeader title="Product List" />

        <Table_list tablelist={producListtState} />
      </StyledCard>
      {/* <CardHeader title='Product List' /> */}
      {/* <Box sx={{ height: 500 }}> */}
      {/* <Table_list tablelist = {producListtState} /> */}

      {/* </Box>  */}
      {/* </Card> */}
    </Box>
  );
}
