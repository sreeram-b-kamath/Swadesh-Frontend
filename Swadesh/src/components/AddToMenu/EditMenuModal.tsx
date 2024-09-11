import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Resizer from "react-image-file-resizer";

interface EditMenuModalProps {
  open: boolean;
  handleClose: () => void;
  menuItemId: number;
  restaurantId: number;
}

const EditMenuModal: React.FC<EditMenuModalProps> = ({
  open,
  handleClose,
  menuItemId,
  restaurantId,
}) => {
  const [formValues, setFormValues] = useState({
    id: 0,
    name: "",
    description: "",
    primaryImage: "",
    money: 0,
    menuCategoryId: "",
    menuFilterIds: [] as number[],
    ingredientIds: [] as number[],
  });

//   const [categories, setCategories] = useState<any[]>([]);
//   const [restrictions, setRestrictions] = useState<any[]>([]);
//   const [ingredients, setIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  useEffect(() => {
    if (open) {
      // Fetch menu item details
      axios
        .get(`https://localhost:7107/api/MenuItems/${menuItemId}`)
        .then((response) => {
          const data = response.data;
          setFormValues({
            id: data.id,
            name: data.name,
            description: data.description,
            primaryImage: data.primaryImage,
            money: data.money,
            menuCategoryId: data.menuCategoryId.toString(),
            menuFilterIds: data.menuFilterIds,
            ingredientIds: data.ingredientIds,
          });
          setPreviewImage(data.primaryImage);
        })
        .catch((error) => {
          console.error("Error fetching menu item details:", error);
        });

      // Fetch categories, restrictions, and ingredients
      Promise.all([
        axios.get(`https://localhost:7107/api/Category/${restaurantId}`),
        axios.get(`https://localhost:7107/api/Restriction/${restaurantId}`),
        axios.get(`https://localhost:7107/api/Ingredients`),
      ])
        .then(([categoryResponse, restrictionResponse, ingredientResponse]) => {
          setCategories(categoryResponse.data);
          setRestrictions(restrictionResponse.data);
          setIngredients(ingredientResponse.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [open, menuItemId, restaurantId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
    fieldName: string
  ) => {
    const value = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: Array.isArray(value) ? value.map(Number) : Number(value),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizeFile(file);
        setFormValues((prevValues) => ({
          ...prevValues,
          primaryImage: resizedImage,
        }));
        setPreviewImage(URL.createObjectURL(file)); // Set preview image
      } catch (error) {
        console.error("Failed to resize image:", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formValues.name,
      primaryImage: formValues.primaryImage,
      description: formValues.description,
      money: formValues.money,
      restaurantId: restaurantId,
      menuCategoryId: parseInt(formValues.menuCategoryId, 10), // Convert to number
      menuFilterIds: formValues.menuFilterIds, // Already numbers
      active: true,
      ingredientIds: formValues.ingredientIds, // Already numbers
    };

    console.log("Payload being submitted:", payload);

    axios
      .patch(`https://localhost:7107/api/MenuItems/${menuItemId}`, payload) // Use menuItemId from props
      .then((response) => {
        console.log("Menu item updated successfully:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating menu item:", error);
      });
  };

  if (loading) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#e4ffd6",
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography sx={{color:"#446732"}} variant="h6" component="h2" gutterBottom>
          Edit Menu Items
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Dish Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Price"
                name="money"
                type="number"
                value={formValues.money}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            {/* <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select
                  name="menuCategoryId"
                  value={formValues.menuCategoryId}
                  onChange={(e) => handleSelectChange(e, "menuCategoryId")}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Restrictions</InputLabel>
                <Select
                  name="menuFilterIds"
                  multiple
                  value={formValues.menuFilterIds}
                  onChange={(e) => handleSelectChange(e, "menuFilterIds")}
                >
                  {restrictions.map((restriction) => (
                    <MenuItem key={restriction.id} value={restriction.id}>
                      {restriction.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Ingredients</InputLabel>
                <Select
                  name="ingredientIds"
                  multiple
                  value={formValues.ingredientIds}
                  onChange={(e) => handleSelectChange(e, "ingredientIds")}
                >
                  {ingredients.map((ingredient) => (
                    <MenuItem key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                type="file"
                onChange={handleImageUpload}
                fullWidth
              />
              {previewImage && (
                <Box mt={2}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ width: "100%", maxHeight: "200px" }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "right" }}>
  <Button
    variant="contained"
    type="submit"
    sx={{
      backgroundColor: "green", // Button background color
      color: "white", // Text color
      "&:hover": {
        backgroundColor: "darkgreen", // Hover effect
      },
    }}
  >
    Save
  </Button>
  <Button
    variant="outlined"
    onClick={handleClose}
    sx={{
      ml: 2,
      borderColor: "green", // Border color for outlined button
      color: "green", 
      "&:hover": {
        backgroundColor: "rgba(0, 128, 0, 0.1)",
      },
    }}
  >
    Cancel
  </Button>
</Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EditMenuModal;
