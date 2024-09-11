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
import Resizer from "react-image-file-resizer";
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  fetchRestriction,
  AddToMenuFormProps,
  initialValues,
  Ingredients,
  fetchIngredients,
  Category,
  Restriction,
  fetchCategories,
} from "../../Store/AddToMenu/AddToMenuStore";
import { useLoginStore } from "../../Store/useLoginStore";

const resizeFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        if (typeof uri === "string") {
          resolve(uri);
        } else {
          reject(new Error("Failed to resize the image"));
        }
      },
      "base64"
    );
  });

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Dish Name is required")
    .min(3, "Dish Name must be at least 3 characters long")
    .max(100, "Dish Name cannot be more than 100 characters long"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description cannot be more than 200 characters long"),

  money: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(0.01, "Price must be at least 0.01"),

  category: Yup.string().required("Category is required"),

  restrictions: Yup.array()
    .of(Yup.number())
    .min(1, "At least one restriction must be selected")
    .required("Restrictions are required"),

  ingredients: Yup.array()
    .of(Yup.number())
    .min(1, "At least one ingredient must be selected")
    .max(3, "You can select a maximum of 3 ingredients")
    .required("Ingredients are required"),

  primaryImage: Yup.mixed().required("Image is required"),
});

const AddToMenuForm: React.FC<AddToMenuFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("Upload Image");
  const { restaurantId } = useLoginStore();

  
  useEffect(() => {
    const fetchDataForDropdown = async () => {
      if (!restaurantId) {
        setError("Restaurant ID is missing");
        return;
      }
      try {
        setLoading(true);
        const categoriesData = await fetchCategories(restaurantId);
        const restrictionsData = await fetchRestriction(restaurantId);
        const ingredientsData = await fetchIngredients();

        setCategories(categoriesData);
        setRestrictions(restrictionsData);
        setIngredients(ingredientsData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch Data...");
      } finally {
        setLoading(false);
      }
    };
    fetchDataForDropdown();
  }, [restaurantId]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitting form values:", values);
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
          setFieldValue,
          setFieldError,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{ color: "#446732", fontWeight: "bold", marginTop: "4px" }}
            >
              Add to your menu
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                padding: "4px",
              }}
            >
              <FormControl variant="outlined">
                <Grid container spacing={2}>
                  {/* <-Dish Name-> */}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "12px",
                        marginBottom: "4px",
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
                        marginBottom: "4px",
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
                        fontSize: "12px",
                        marginBottom: "4px",
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
                        fontSize: "12px",
                        marginBottom: "4px",
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
                        {loading ? (
                          <MenuItem disabled>Loading ...</MenuItem>
                        ) : error ? (
                          <MenuItem disabled>{error}</MenuItem>
                        ) : (
                          categories.map((category: Category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      <Typography
                        sx={{
                          color: "#d10000",
                          fontSize: "9px",
                          marginTop: "4px",
                          marginLeft: "14px",
                        }}
                      >
                        <ErrorMessage
                          name="category"
                          component="div"
                          className="error-message"
                        />
                      </Typography>
                    </FormControl>
                  </Grid>
                  {/* <-Restriction-> */}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "12px",
                        marginBottom: "4px",
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
                                restrictions.find((r) => r.id === id)?.name
                            )
                            .join(", ")
                        }
                      >
                        {restrictions.map((restriction: Restriction) => (
                          <MenuItem key={restriction.id} value={restriction.id}>
                            {restriction.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography
                        sx={{
                          color: "#d10000",
                          fontSize: "9px",
                          marginTop: "4px",
                          marginLeft: "14px",
                        }}
                      >
                        <ErrorMessage name="restrictions" />
                      </Typography>
                    </FormControl>
                  </Grid>
                  {/* <-Main Ingredients-> */}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "12px",
                        marginBottom: "4px",
                      }}
                    >
                      Select Three Main Ingredients
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
                        onChange={(event) => {
                          const { value } = event.target;
                          if (value.length <= 3) {
                            setFieldValue("ingredients", value);
                          }
                        }}
                        onBlur={handleBlur}
                        renderValue={(selected) =>
                          (selected as number[])
                            .map(
                              (id) => ingredients.find((i) => i.id === id)?.name
                            )
                            .join(", ")
                        }
                      >
                        {ingredients.map((ingredient: Ingredients) => (
                          <MenuItem key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography
                        sx={{
                          color: "#d10000",
                          fontSize: "9px",
                          marginTop: "4px",
                          marginLeft: "14px",
                        }}
                      >
                        <ErrorMessage name="ingredients" />
                      </Typography>
                    </FormControl>
                  </Grid>
                  {/* <-Dish's Image-> */}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "12px",
                        marginBottom: "4px",
                      }}
                    >
                      {fileName}{" "}
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
                        "&:focus": {
                          backgroundColor: "#446732",
                          color: "white",
                        },
                      }}
                      variant="contained"
                      component="label"
                      fullWidth
                    >
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            try {
                              const resizedImage = await resizeFile(file);
                              setFieldValue("primaryImage", resizedImage);
                              setFileName(file.name);
                            } catch (error) {
                              setFieldError(
                                "primaryImage",
                                "Failed to resize image"
                              );
                            }
                          }
                        }}
                      />
                    </Button>
                    {errors.primaryImage && touched.primaryImage && (
                      <Typography
                        sx={{
                          color: "#d10000",
                          fontSize: "9px",
                          marginTop: "4px",
                          marginLeft: "14px",
                        }}
                      >
                        {errors.primaryImage}
                      </Typography>
                    )}
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
                  width: "140px",
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
export default AddToMenuForm;
