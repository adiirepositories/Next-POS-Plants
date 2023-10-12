"use client";
import { forwardRef, useState, ChangeEvent } from "react";

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
import { CldUploadButton } from "next-cloudinary";

interface State {
  password: string;
  showPassword: boolean;
}

interface FormInputs {
  productName: string;
  description: string;
  price: number;
}

const defaultValues = {
  description: "",
  productName: "",
  price: 0,
};

const addProducts = () => {
  // ** States
  const [state, setState] = useState<State>({
    password: "",
    showPassword: false,
  });
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues });

  // const onSubmit = () => alert("Form Submitted");

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    setOpen(true);

    axios
      .post(
        "/api/add_products",

        {
          productName: data.productName,
          description: data.description,
          price: Number(data.price),
        }
      )
      .then(() => {
        // alert("Form has been registered!")
        Swal.fire("Success", "Product Added to Table");
        reset();
        setLoading(false);
      })
      .catch(() => alert("Something went wrong!"));
  };

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  //   const addProductsToDb = async (e:React.FormEvent) => {

  //     e.preventDefault()
  //     axios.post('/api/register', data)
  //     .then(() => alert('User has been registered!'))
  //     .catch(() => alert('Something went wrong!'))

  //     setData({
  //       name: '',
  //       email: '',
  //        password: ''
  //     });
  //  }

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

                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="validation-basic-select"
                      error={Boolean(errors.select)}
                      htmlFor="validation-basic-select"
                    >
                      Category
                    </InputLabel>
                    <Controller
                      name="select"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label="Country"
                          onChange={onChange}
                          error={Boolean(errors.select)}
                          labelId="validation-basic-select"
                          aria-describedby="validation-basic-select"
                        >
                          <MenuItem value="UK">UK</MenuItem>
                          <MenuItem value="USA">USA</MenuItem>
                          <MenuItem value="Australia">Australia</MenuItem>
                          <MenuItem value="Germany">Germany</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.select && (
                      <FormHelperText
                        sx={{ color: "error.main" }}
                        id="validation-basic-select"
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}

                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="validation-basic-select"
                      error={Boolean(errors.select)}
                      htmlFor="validation-basic-select"
                    >
                      Sub Category
                    </InputLabel>
                    <Controller
                      name="select"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label="Country"
                          onChange={onChange}
                          error={Boolean(errors.select)}
                          labelId="validation-basic-select"
                          aria-describedby="validation-basic-select"
                        >
                          <MenuItem value="UK">UK</MenuItem>
                          <MenuItem value="USA">USA</MenuItem>
                          <MenuItem value="Australia">Australia</MenuItem>
                          <MenuItem value="Germany">Germany</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.select && (
                      <FormHelperText
                        sx={{ color: "error.main" }}
                        id="validation-basic-select"
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}

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
                            inputProps: { min: 0 },
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
                  <CldUploadButton
                    uploadPreset="ephihn7y"
                    className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </StyledCard>
  );
};

export default addProducts;
