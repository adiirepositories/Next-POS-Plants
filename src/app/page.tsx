"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MediaCard from "@/components/MediaCard";
import ProductList from "@/components/products/ProductList";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Product } from "./types";
import Chart from "../components/dashboard/chart";
import CardStatisticsTransactions from "../components/dashboard/CardStatisticsTransactions";

// import { useEffect, useState } from 'react';

// interface State {
// 	products: Product[]
// 	isLoading: boolean
// 	error: any
// }

// interface Actions {
// 	fetchData: () => Promise<void>
// }

// const INITIAL_STATE: State = {
// 	products: [],
// 	isLoading: false,
// 	error: null,
// }
export default function HomePage() {
  // const [productState, setproductState] = useState<Product[]>([]);

  // useEffect(() => {

  //   fetch("https://dummyjson.com/products")
  //     .then((data) => data.json())
  //     .then((json) => setproductState(json.products))
  // }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* <div> */}
      {/* <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Hello 👋</AlertTitle>
          This app uses the Next.js App Router and Material UI v5.
        </Alert> */}

      <Grid container rowSpacing={5} columnSpacing={5} mb={"2em"} mt={"2em"}>
        <Grid xs={12} sm={9}>
          <Chart />
        </Grid>
        <Grid xs={12} sm={3}>
          <MediaCard
            heading="HSL and HSV"
            text="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
          />
        </Grid>
        <Grid xs={12} sm={12} mt={"2em"}>
          <CardStatisticsTransactions />
        </Grid>
      </Grid>

      {/* </div> */}
    </Box>
  );
}
