"use client";
import { CldImage } from "next-cloudinary";
import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box/Box';



// export default function CloudinaryImage({ publicId, width,height,alt }: { publicId: string, width:number,height:number,alt:string}) {
    export default function CloudinaryImage() {
        const [image, setImage] = useState(null);

    const handleImageUpload = async (e:any) => {
        const file = e.target.files[0];
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ephihn7y'); // Replace with your Cloudinary upload preset
    
        const response = await axios.post(
          
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
          
        );
    
        // Extract the URL of the uploaded image from the Cloudinary response
        const imageUrl = response.data.secure_url;
        setImage(imageUrl);
        console.log(image)
      };
      console.log(image)

  
    return (

        <Box>
        <input type="file" onChange={handleImageUpload} accept="image/*" />
{image && <img src={image} alt="Uploaded" />}
        </Box>
//   <CldImage
//   preserveTransformations
//   src={publicId}
//   width={width}
//   height={height}
//   alt={alt}
// />

)
}
