"use client";
import { forwardRef, useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import RadioGroup from "@mui/material/RadioGroup";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DateType } from "../types";
import styled from "@emotion/styled";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Swal from "sweetalert2";

//cloudinary stuff
import { CldUploadButton } from "next-cloudinary";
import CloudinaryImage from "../cloudinary/cldImage";
import { loadComponents } from "next/dist/server/load-components";

// import cloudinary from "cloudinary";

const addProducts = () => {
  // ** States

  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = useState(true);
  // const [image, setImage] = useState(null);
  const [publicID, setpublicID] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const [img, setImg] = useState("");
  const [imgLength, setimgLength] = useState();
  const [images, setimages] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imagesMultiple, setimagesMultiple] = useState([]);




  const handleImageChange = (e: any) => {
          //single images upload

    const file = e.target.files[0];
    setImg(e.target.files[0]);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }


      //multiple images upload
    // const files = e.target.files;
    // setimgLength(files.length)
    // const imageArray:string[] = [];
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   const multupleimageUrl = URL.createObjectURL(file);
    //   imageArray.push(multupleimageUrl);
    // }

    // setSelectedImages(imageArray);

  };

  const handleImageUpload = async () => {
    // const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ephihn7y"); // Replace with your Cloudinary upload preset

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    // Extract the URL of the uploaded image from the Cloudinary response
    const imageUrl = JSON.stringify(response.data.secure_url);
    const public_idCode = JSON.stringify(response.data.public_id);

    console.log(public_idCode);
    console.log("imageUrl "+imageUrl);

    // const imageUrl = response.data.pu;
    console.log("onsubmit log " + images);
  };

  const handleDeleteImage = async () => {
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // Replace with your Cloudinary cloud name
      const apiKey = "326949168479271"; // Replace with your Cloudinary API key
      const apiSecret = "uXElAX7Y9UKMmhgKxuitThv1b0k@dfuvawjsm"; // Replace with your Cloudinary API secret

      // Construct the Cloudinary URL for the image deletion
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

      // Set up the data for the DELETE request
      const data = {
        public_id: publicID, // The public ID of the image you want to delete
        api_key: apiKey,
        api_secret: apiSecret,
      };

      // Send the DELETE request to Cloudinary
      const response = await axios.delete(url, { data });

      if (response.status === 200) {
        console.log("Image deleted successfully.");
        // You can update the UI to reflect the deletion.
      } else {
        console.error("Error deleting image:", response.data);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
    console.log("tes delete");
  };

  // console.log("publicId " + publicID);

  interface StateUrl {
    password: string;
  }

  interface FormInputs {
    productName: string;
    description: string;
    urlImage: string[] | null;
    price: string | null;
  }

  const defaultValues = {
    description: "",
    productName: "",
    urlImage: [],
    price: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues });

  // const onSubmit = () => alert("Form Submitted");

  const onSubmit = async (data: FormInputs) => {
    setisLoading(true);

    const formData = new FormData();

    formData.append("file", img);
    formData.append("upload_preset", "ephihn7y"); // Replace with your Cloudinary upload preset
    

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    // Extract the URL of the uploaded image from the Cloudinary response
    // single image

    const imageUrl = JSON.stringify(response.data.secure_url);
    const public_idCode = JSON.stringify(response.data.public_id);

    console.log(public_idCode);
    console.log("onsubmit log " + imageUrl);

    axios
      .post(
        "/api/add_products",

        {
          productName: data.productName,
          description: data.description,
          urlImage: imageUrl,
          // urlImage: ["ikan","kucing"],
          price: Number(data.price),
        }
      )
      .then(() => {
        console.log("promise log " + images);

        setisLoading(false);
        Swal.fire("Success", "Product Added to Table");
        reset();
      })

      .catch(() => {
        Swal.fire("Something went wrong!");
        setisLoading(false);
      });

    setImage(null);
  };

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  const StyledCard = styled(Card)(({ theme }) => ({
    // transition: "transform 0.15s ease-in-out",
    // "&:hover": { transform: "scale3d(1.04, 1.04, 1)" },
    border: "none",
    // marginTop:'1em',
    marginBottom: "1em",
  }));

  const StyledInput = styled(TextField)(({ theme }) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  }));

  return (
    <StyledCard
      variant="outlined"
      sx={{
        p: "2em",
        // borderRadius: 2,
      }}
    >
      <CardHeader title="Add Product" />

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="productName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Product Name"
                          onChange={onChange}
                          placeholder=""
                          error={Boolean(errors.productName)}
                          aria-describedby="validation-schema-productName"
                        />
                      )}
                    />
                    {errors.productName && (
                      <FormHelperText
                        sx={{ color: "error.main" }}
                        id="validation-schema-productName"
                      >
                        {errors.productName.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="price"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <StyledInput
                          type="number"
                          InputProps={{
                            inputProps: { min: 1 },
                          }}
                          value={value}
                          label="Price"
                          onChange={onChange}
                          // placeholder='0'
                          error={Boolean(errors.price)}
                          aria-describedby="validation-schema-price"
                        />
                      )}
                    />
                    {errors.price && (
                      <FormHelperText
                        sx={{ color: "error.main" }}
                        id="validation-schema-price"
                      >
                        {errors.price.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          {...field}
                          label="Description"
                          error={Boolean(errors.description)}
                          aria-describedby="validation-basic-description"
                        />
                      )}
                    />
                    {errors.description && (
                      <FormHelperText
                        sx={{ color: "error.main" }}
                        id="validation-basic-description"
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button size="large" type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  {/* <CldUploadButton
                    uploadPreset="ephihn7y"
                    className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                  /> */}

                  {/* <CloudinaryImage/> */}

                  <Box m={"20px"}>
                    <input
                      // onClick={() => setisImage(false)}
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      multiple
                    />
                    {/* {image && <img src={image} alt="Uploaded" />} */}
                    {/* {selectedImages.map((imageUrl, index) => ( */}

                    {/* {selectedImages.map((multupleimageUrl, index) => ( */}
                    {image && 
                      <Image
                        // key={index}
                        src={image.toString()}
                        width={150}
                        height={150}
                        // alt={`Uploaded Image ${index}`}
                        alt="Uploaded"
                        style={{ margin: '5px' }}

                      />
                    }
                  </Box>
                </Grid>
              </Grid>
            </form>
            <Button
              onClick={handleDeleteImage}
              size="large"
              type="submit"
              variant="contained"
            >
              delete image with public id
            </Button>

            <Button
              onClick={handleImageUpload}
              size="large"
              type="submit"
              variant="contained"
            >
              upload image
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </StyledCard>
  );
};

export default addProducts;
