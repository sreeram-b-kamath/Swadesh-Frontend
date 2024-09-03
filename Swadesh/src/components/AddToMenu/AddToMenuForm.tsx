import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import categoriesData from "./Categories.json";
import restrictionsData from "./Restrictions.json";
import ingredientsData from "./Ingredients.json";
import { Category, Restriction, Ingredient } from "./Types";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Dish Name is required"),
  description: Yup.string().required("Description is required"),
  money: Yup.number()
  .required("Price is required")
  .positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
  restrictions: Yup.array().of(
    Yup.number().required("Restrictions are required") // Changed from string
  ),
  ingredients: Yup.array()
  .of(Yup.number()) // Changed from string
  .required("At least one ingredient is required"),
});

interface AddToMenuFormProps {
  onSubmit: (values: typeof initialValues) => void;
  onCancel: () => void;
}
const initialValues = {
  name: "",
  description: "",
  primaryImage: "",
  money: 0,
  category: "",
  menuCategoryId: 0,
  restrictions: [] as number[],
  menuFilterIds: [] as number[],
  ingredients: [] as number[],
  ingredientIds: [] as number[],
  restaurantId: 1,
};
export const AddToMenuForm: React.FC<AddToMenuFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file uploaded", file.name);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitting form values:", values); // Debug log
          onSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{ color: "#446732", fontWeight: "bold", marginTop: "10px" }}
            >
              Add to your menu
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                padding: "10px",
              }}
            >
              <FormControl variant="outlined">
                <Grid container spacing={2}>
                  {/* <-Dish Name-> */}

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "13px",
                        marginBottom: "10px",
                      }}
                    >
                      Your Dish's Name
                    </Typography>
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "12px",
                          color: "#446732",
                        },
                        "& .MuiInputBase-root": {
                          fontSize: "13px",
                        },
                      }}
                      id="name"
                      label="Example: Idli Sambar"
                      variant="outlined"
                      fullWidth
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.name && touched.name)}
                      helperText={<ErrorMessage name="name" />}
                    />
                  </Grid>
                  {/* <-Description-> */}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "13px",
                        marginBottom: "10px",
                      }}
                    >
                      Description
                    </Typography>
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "12px",
                          color: "#446732",
                        },
                        "& .MuiInputBase-root": {
                          fontSize: "13px",
                        },
                      }}
                      id="description"
                      label="Example: A brief description of your dish"
                      variant="outlined"
                      fullWidth
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.description && touched.description)}
                      helperText={<ErrorMessage name="description" />}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  {/* <-price-> */}

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "13px",
                        marginBottom: "10px",
                      }}
                    >
                      Price
                    </Typography>
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "12px",
                          color: "#446732",
                        },
                        "& .MuiInputBase-root": {
                          fontSize: "13px",
                        },
                      }}
                      id="money"
                      label="Example: 140"
                      variant="outlined"
                      fullWidth
                      name="money"
                      value={values.money}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.money && touched.money)}
                      helperText={<ErrorMessage name="money" />}
                    />
                  </Grid>
                  {/* <-Category-> */}

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "13px",
                        marginBottom: "10px",
                      }}
                    >
                      Select category
                    </Typography>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.category && touched.category)}
                    >
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ fontSize: "12px", color: "#446732" }}
                      >
                        Select options
                      </InputLabel>
                      <Select
                        sx={{
                          color: "#446732",
                          fontSize: "13px",
                        }}
                        labelId="demo-simple-select-label"
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {categoriesData.map((category: Category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.Name}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="error-message"
                      />
                    </FormControl>
                  </Grid>
                  {/* <-Restriction-> */}

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "13px",
                        marginBottom: "10px",
                      }}
                    >
                      Select Restrictions
                    </Typography>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(
                        errors.restrictions && touched.restrictions
                      )}
                    >
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ fontSize: "12px", color: "#446732" }}
                      >
                        Select options
                      </InputLabel>
                      <Select
                        multiple
                        sx={{
                          color: "#446732",
                          fontSize: "13px",
                        }}
                        labelId="demo-simple-select-label"
                        id="restrictions"
                        name="restrictions"
                        value={values.restrictions}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        renderValue={(selected) =>
                          (selected as number[])
                            .map(
                              (id) =>
                                restrictionsData.find((r) => r.id === id)
                                  ?.restriction
                            )
                            .join(", ")
                        }
                      >
                        {restrictionsData.map((restriction: Restriction) => (
                          <MenuItem key={restriction.id} value={restriction.id}>
                            {restriction.restriction}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name="restrictions"
                        component="div"
                        className="error-message"
                      />
                    </FormControl>
                  </Grid>
                  {/* <-Main Ingredients-> */}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "13px",
                        marginBottom: "10px",
                      }}
                    >
                      Select Main Ingredients
                    </Typography>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.ingredients && touched.ingredients)}
                    >
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ fontSize: "12px", color: "#446732" }}
                      >
                        Select options
                      </InputLabel>
                      <Select
                        multiple
                        sx={{
                          color: "#446732",
                          fontSize: "13px",
                        }}
                        labelId="demo-simple-select-label"
                        id="ingredients"
                        name="ingredients"
                        value={values.ingredients}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        renderValue={(selected) =>
                          (selected as number[])
                            .map(
                              (id) =>
                                ingredientsData.find((i) => i.id === id)
                                  ?.ingredient
                            )
                            .join(", ")
                        }
                      >
                        {ingredientsData.map((ingredient: Ingredient) => (
                          <MenuItem key={ingredient.id} value={ingredient.id}>
                            {ingredient.ingredient}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name="ingredients"
                        component="div"
                        className="error-message"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "13px",
                        marginBottom: "10px",
                      }}
                    >
                      Upload Dish's image
                    </Typography>
                    <Button
                      sx={{
                        color: "#446732",
                        fontSize: "13px",
                        backgroundColor: "honeydew",
                        "&:active": {
                          backgroundColor: "#446732",
                          color: "white",
                        },
                      }}
                      variant="contained"
                      component="label"
                      color="primary"
                      fullWidth
                    >
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "50px",
              }}
            >
              <Button
                onClick={onCancel}
                variant="contained"
                type="button"
                sx={{
                  marginTop: "30px",
                  color: "white",
                  fontSize: "9px",
                  backgroundColor: "#446732",
                  "&:active": { backgroundcolor: "honeydew" },
                  width: "130px",
                }}
              >
                Go back to menu
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginTop: "30px",
                  color: "white",
                  fontSize: "9px",
                  backgroundColor: "#446732",
                  "&:hover": { backgroundColor: "#365d23" }, 
                  width: "130px",
                }}
              >
                Add to menu
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
