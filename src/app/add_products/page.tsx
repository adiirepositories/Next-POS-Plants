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
// import {useDropzone} from 'react-dropzone';

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
  const [imgMultiple, setimgMultiple] = useState<string[] | null>([]);
  const [imgLength, setimgLength] = useState();
  const [images, setimages] = useState("");
  const [selectedImages, setselectedImages] = useState<string[] | null>([]);
  const [imagesMultiple, setimagesMultiple] = useState<string[] | null>([]);
  const [imagesName, setimagesName] = useState<string[] | null>([]);
  const [isImages, setisImages] = useState<boolean>(false);
  const folder = "nextjs13pos";

  let arr: string[] = [];
  let imgNames: string[] = [];

  useEffect(() => {
    setimgMultiple(null);
    setselectedImages(null);
  }, []);

  const handleRemoveImage = (e: any) => {
    console.log("handleRemoveImage");

    const t = selectedImages!.filter((item, index) => index !== e);
    const i = imagesName!.filter((item, index) => index !== e);
    // const s = imgMultiple!.filter((item, index) => index !== e);

    // const updatedImages: string[] = [...imgMultiple!];
    // updatedImages.splice(e);
    // setimgMultiple(updatedImages);

    const updatedImages = [...imgMultiple!];
    updatedImages.splice(e, 1);
    setimgMultiple(updatedImages);

    // if (selectedImages!.length === 0) {
    //   Swal.fire("Enter images");
    // } else {
    // setimgMultiple(s);

    setselectedImages(t);
    // }
    setimagesName(i);
    console.log(selectedImages);
    console.log(imgMultiple);
  };

  const handleAddImageChange = (e: any) => {
    // single images upload

    const file = e.target.files[0];
    // let imgNames: string[] = [];

    if (selectedImages!.length > 6 || selectedImages!.length === 6) {
      Swal.fire("Enter images max 6!");
    } else {
      if (file.size <= 5 * 1024 * 1024) {
        if (imagesName?.includes(file.name)) {
          Swal.fire("Image has been choosen.");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result);
            // setselectedImages(current => [...current!, file]);
          };
          reader.readAsDataURL(file);
          const multupleimageUrl = URL.createObjectURL(file);
          const multupleimageName = file.name;
          // imgNames.push(multupleimageName);

          // if (selectedImages!.length > 6 || selectedImages!.length === 6) {
          //   Swal.fire("Enter images max 6!");
          // } else {
          setselectedImages((current) => [...current!, multupleimageUrl]);
          setimgMultiple([...imgMultiple!, file]);
          setimagesName((current) => [...current!, multupleimageName]);

          // setimagesName(imgNames)

          // }

          // setselectedImages(current => [...current!, multupleimageUrl]);
        }
      } else {
        Swal.fire("Please select a file smaller than 5MB.");

        setImage(null);
      }
    }

    // console.log("readerresult "+image);
  };

  const handleImageChange = (e: any) => {
    // multiple images upload
    const files = e.target.files;

    // setimgLength(files.length);
    // setimgMultiple((current) => [...current!, files]);
    // setimgMultiple([...imgMultiple!, files]);
    setimgMultiple(files);
    const nms = files[0].name;

    setImg(files);
    if (files) {
      setisImages(true);
    }

    if (files.length > 6 || files.length === 0) {
      Swal.fire("Enter images max 6!");
    } else {
      // setimgMultiple((current) => [...current!, files]);

      const imageArray: string[] = [];
      // let imgNames: string[] = [];

      for (let i = 0; i < files.length; i++) {
        if (files && files[i].size <= 5 * 1024 * 1024) {
          const file = files[i];
          const multupleimageUrl = URL.createObjectURL(file);
          const multupleimageName = files[i].name;

          imageArray.push(multupleimageUrl);
          imgNames.push(multupleimageName);
        } else {
          Swal.fire("Please select a file smaller than 5MB.");
        }

        // const file = files[i];
        // const multupleimageUrl = URL.createObjectURL(file);
        // imageArray.push(multupleimageUrl);
      }

      // setimgMultiple([...imgMultiple!, files]);

      setselectedImages(imageArray);
      setimagesName(imgNames);
    }
    console.log("tesimgmuliple " + imgMultiple);
    console.log("tessetselectedImages " + selectedImages);
    console.log("imagename " + imagesName);
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

  //main fnctions
  const onSubmit = async (data: FormInputs) => {
    setisLoading(true);

    try {
      // let arr: string[] = []
      for (let i = 0; i < selectedImages!.length; i++) {
        // const data = await uploadcloudinary(selectedImages[i])

        const formData = new FormData();

        formData.append("file", imgMultiple![i]);
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
        const result = imageUrl.slice(1, -1);

        // imgMultiple[i]

        arr.push(result);
        // setimagesMultiple(arr)
      }

      setimagesMultiple(arr);
      // console.log("multiple link " + imagesMultiple);
      // console.log("multiple link " + arr);
    } catch (errors) {}

    // setimagesMultiple(arr);

    if (selectedImages && selectedImages.length > 0) {
      await axios
        .post(
          "/api/add_products",

          {
            productName: data.productName,
            description: data.description,
            // urlImage: data.urlImage,
            urlImage: arr,
            // urlImage: ["ikan","kucing"],
            price: Number(data.price),
          }
        )

        .then(() => {
          setisLoading(false);
          Swal.fire("Success", "Product Added to Table");
          reset();
          setselectedImages(null);
          setimgMultiple(null);
          setimagesName(null);
        })

        .catch(() => {
          Swal.fire("Something went wrong!");
          setimgMultiple(null);
          setselectedImages(null);

          setisLoading(false);
        });

      setImage(null);
    } else {
      Swal.fire("Insert Images !");
      setisLoading(false);
    }

    setselectedImages(null);
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
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple={true}
                      />
                    </label>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <Button size="large" type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>

                <Grid item xs={12} sm={12}>
                  {/* <CldUploadButton
                    uploadPreset="ephihn7y"
                    className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                  /> */}

                  {/* <CloudinaryImage/> */}

                  <Box m={"20px"}>
                    {/* <input
                      // onClick={() => setisImage(false)}
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      multiple={true}
                    /> */}
                    {/* {image && <img src={image} alt="Uploaded" />} */}
                    {/* {selectedImages.map((imageUrl, index) => ( */}

                    {selectedImages &&
                      selectedImages!.map((multupleimageUrl, index) => (
                        // {image &&
                        <Grid item xs={12} md={2} sm={2}>
                          <Box>
                            <Image
                              onClick={() => handleRemoveImage(index)}
                              key={index}
                              src={multupleimageUrl.toString()}
                              width="0"
                              height="0"
                              // alt={`Uploaded Image ${index}`}
                              alt="Uploaded"
                              style={{ margin: "5px" }}
                              sizes="100vw"
                              className="w-full h-auto"
                            />

                            <Typography
                              gutterBottom
                              variant="body2"
                              color="text.secondary"
                            >
                              {imagesName![index]}
                            </Typography>
                            {/* <Button
                            sx={{mt:-10}}
                              type="button"
                              size="medium"
                              onClick={() => handleRemoveImage(index)}
                              // sx={{ mr: 2 }}
                              variant="contained"
                              disabled={isLoading}
                            ></Button> */}
                          </Box>
                        </Grid>

                        // }
                      ))}

                    <Grid item xs={12} md={2} sm={2}>
                      {selectedImages?.length != 0 &&
                        selectedImages != null && (
                          <div className="flex items-center justify-center w-full ">
                            <label className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-8 h-8  text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={handleAddImageChange}
                                accept="image/*"
                              />
                            </label>
                          </div>

                          // <input
                          //   // onClick={() => setisImage(false)}
                          //   type="file"
                          //   onChange={handleAddImageChange}
                          //   accept="image/*"
                          //   multiple={true}
                          // />
                        )}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </form>
            {/* <Button
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

            <Button
              onClick={handleImageUploadMultiple}
              size="large"
              type="submit"
              variant="contained"
            >
              upload multiple image
            </Button> */}
          </CardContent>
        </Card>
      </Grid>
    </StyledCard>
  );
};

export default addProducts;
