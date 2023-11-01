// "use client";
// import { forwardRef, useState, ChangeEvent } from "react";
import React, { useState } from 'react';
import axios from 'axios';

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import { CldUploadButton } from "next-cloudinary";
import cloudinary from "cloudinary";
import CloudinaryImage from "./cldImage";
import Box from '@mui/material/Box/Box';

// interface State {
//   password: string;
//   showPassword: boolean;
// }

// interface FormInputs {
//   productName: string;
//   description: string;
//   price: number;
// }

// const defaultValues = {
//   description: "",
//   productName: "",
//   price: 0,
// };

const cloudinaryImages = async () => {
  // ** States
  // const [state, setState] = useState<State>({
  //   password: "",
  //   showPassword: false,
  // });
  // const [isLoading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [image, setImage] = useState(null);

  // const handleImageUpload = async (e:any) => {
  //   const file = e.target.files[0];

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', 'ephihn7y'); // Replace with your Cloudinary upload preset

  //   const response = await axios.post(
      
  //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //     formData
      
  //   );

  //   // Extract the URL of the uploaded image from the Cloudinary response
  //   const imageUrl = response.data.secure_url;
  //   setImage(imageUrl);
  // };





  // const results = await cloudinary.v2.search
  //   .expression("resource_type:image")
  //   .sort_by("public_id", "desc")
  //   .max_results(5)
  //   .execute();
  // console.log(results.resources[0]);

  return (
    <Card>
      <CardHeader title="Add Product" />

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>

                <CloudinaryImage/>
                {/* <CloudinaryImage
                  publicId={results.resources[1].url}
                  width={300}
                  height={300}
                  alt="Add Product"
                /> */}
                tes cloduinary
                {/* <Box>
                <input type="file" onChange={handleImageUpload} accept="image/*" />
      {image && <img src={image} alt="Uploaded" />}
                </Box> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Card>
  );
};

export default cloudinaryImages;
