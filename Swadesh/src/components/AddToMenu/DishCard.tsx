import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useState, useEffect } from "react";
import NodataGif from "../../assets/pan-unscreen.gif";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  MenuItems,
  Ingredients,
  fetchRestriction,
  Restriction,
} from "../../Store/AddToMenu/AddToMenuStore";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  fetchMenuItems,
  initialValues,
  fetchIngredients,
  deleteMenuItems,
} from "../../Store/AddToMenu/AddToMenuStore";
import React from "react";

export default function RecipeReviewCard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [ingredient, setIngredient] = useState<Ingredients[]>([]);
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);
  const [selectedRestriction, setSelectedRestriction] = useState<string>("");
  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [deleteFailureOpen, setdeleteFailureOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const handleDeleteClick = (menuItemId: number) => {
    setDeleteItemId(menuItemId);
    setConfirmOpen(true);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
    setConfirmOpen(false);
    setdeleteFailureOpen(false);
  };
  const handleDeleteConfirm = async () => {
    if (deleteItemId !== null) {
      try {
        await deleteMenuItems(deleteItemId);
        setMenuItems(menuItems.filter((item) => item.id !== deleteItemId));
        setSuccessOpen(true);
      } catch (error) {
        console.error("Error deleting menu item", error);
        setdeleteFailureOpen(true);
      }
    }
    setConfirmOpen(false);
    setDeleteItemId(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const MenuItemsData = await fetchMenuItems(initialValues.restaurantId);
        const IngredientsData = await fetchIngredients();
        const restrictionsData = await fetchRestriction(
          initialValues.restaurantId
        );
        setRestrictions(restrictionsData);
        setMenuItems(MenuItemsData);
        setIngredient(IngredientsData);
      } catch (error) {
        console.error("Error fetching menu items", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIngredientsImages = (IngredientIds: number[]) => {
    return ingredient
      .filter((ingredients) => IngredientIds.includes(ingredients.id))
      .map((ingredients) => {
        if (ingredients.image.startsWith("data:")) {
          return ingredients.image;
        }
        return `data:image/png;base64,${ingredients.image}`;
      });
  };

  const filteredData = menuItems.filter(
    (item: MenuItems) =>
      selectedRestriction === "" ||
      item.menuFilterIds.includes(parseInt(selectedRestriction))
  );

  const restrictionIds = [
    ...new Set(menuItems.flatMap((item) => item.menuFilterIds)),
  ];

  const restrictionsMap = new Map(
    restrictions.map((restriction) => [restriction.id, restriction.name])
  );

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            margin: "auto",
            padding: 0,
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <img width={170} src={NodataGif} alt="No items yet" />
          <Typography
            sx={{ color: "#446732", fontSize: "14px", fontFamily: "cursive" }}
          >
            Loading Menu...
          </Typography>
        </Box>
      ) : filteredData.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            margin: "auto",
            padding: 0,
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <img width={170} src={NodataGif} alt="No items yet" />
          <Typography sx={{ color: "#446732", fontFamily: "cursive" }}>
            OOPs!! No Items in the Menu!
          </Typography>
          <Typography
            sx={{ color: "#446732", fontSize: "14px", fontFamily: "cursive" }}
          >
            Add by clicking the bottom button
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Typography sx={{ color: "#446732", fontWeight: "bold" }}>
              Menu{" "}
            </Typography>
            <FormControl sx={{ minWidth: 150, position: "relative" }}>
              <InputLabel
                id="category-label"
                sx={{
                  position: "absolute",
                  top: "-7px",
                  left: "0px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  color: "#446732",
                }}
              >
                Filter menu
                <FilterAltIcon sx={{ fontSize: "1rem", color: "#446732" }} />
              </InputLabel>
              <Select
                labelId="restriction-label"
                value={selectedRestriction}
                onChange={(e) => setSelectedRestriction(e.target.value)}
                label="Filter menu"
                sx={{
                  "& .MuiSelect-select": {
                    padding: "10px 10px",
                    fontSize: "1rem",
                    color: "#446732",
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {restrictionIds.map((id) => (
                  <MenuItem key={id} value={id.toString()}>
                    {restrictionsMap.get(id) || "Unknown"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={1}>
            {filteredData.map((result, index) => (
              <Grid
                item
                key={index}
                xs={6}
                sm={4}
                md={4}
                lg={2}
                display="flex"
                justifyContent="space-around"
              >
                <Card
                  key={index}
                  sx={{
                    width: 120,
                    height: 170,
                    backgroundColor: "honeydew",
                    m: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image={result.primaryImage}
                    alt="Dish image"
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 1,
                      height: "25%",
                    }}
                  >
                    <Box className="dish">
                      <Typography
                        color="text.primary"
                        sx={{ fontSize: "10px" }}
                      >
                        {result.name}
                      </Typography>
                    </Box>
                    <Box className="price">
                      <Typography sx={{ color: "black", fontSize: "10px" }}>
                        ₹{result.money}
                      </Typography>
                    </Box>
                    <Box className="bottomRow">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                        }}
                      >
                        <Box
                          className="ingredienceIcons"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                          }}
                        >
                          {getIngredientsImages(result.ingredientIds).map(
                            (image, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={image}
                                alt="Ingredient"
                                style={{
                                  width: 15,
                                  height: 15,
                                  marginRight: 3,
                                  paddingTop: 5,
                                }}
                              />
                            )
                          )}
                        </Box>
                        <DeleteIcon
                          sx={{
                            fontSize: "19px",
                            color: "brown",
                            marginTop: "3px",
                          }}
                          onClick={() => handleDeleteClick(result.id)}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}{" "}
      <Snackbar
        open={confirmOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message="Are you sure you want to delete this item?"
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "honeydew",
            color: "#446732",
          },
          "& .MuiButton-root": {
            color: "#446732",
          },
        }}
        action={
          <>
            <Button color="inherit" onClick={handleDeleteConfirm}>
              Confirm
            </Button>
            <Button color="inherit" onClick={handleAlertClose}>
              Cancel
            </Button>
          </>
        }
      />
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully deleted item from your menu.{" "}
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteFailureOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Failed to delete item. Please try again
        </Alert>
      </Snackbar>
    </>
  );
}
