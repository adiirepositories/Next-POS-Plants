import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Product } from "@/app/types.d";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "@emotion/styled";
import { CardActionArea } from "@mui/material";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const StyledCard = styled(Card)(({ theme }) => ({
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.04, 1.04, 1)" },
    border: "none",
    // marginTop:'1em',
    marginBottom: "1em",
  }));

  return (
    <Grid xs={12} sm={3}>
      <CardActionArea>
        <StyledCard
          variant="outlined"
          sx={{
            borderRadius: 2,
            display: "flex",
            justiyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            // alt="Random image"
            // src="https://source.unsplash.com/random"
            width={800}
            height={800}
            style={{
              maxWidth: "100%",
              height: "260px",
              objectFit: "cover",
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: 700 }}
            >
              {product.title}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
              ${product.price}
            </Typography>
          </CardContent>
          <CardActions sx={{ mt: -3 }}>
            {/* <Button size="small">Share</Button>
          <Button size="small">Learn More</Button> */}
            <Button sx={{ "& svg": { mr: 2 } }}>
              <AddShoppingCartIcon />
              Add to Cart
            </Button>
          </CardActions>
        </StyledCard>
      </CardActionArea>
    </Grid>
  );
}
