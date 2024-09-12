import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState, useEffect } from "react";
import { MenuItems, Ingredients } from "../../Store/AddToMenu/AddToMenuStore";
import NodataGif from "../../assets/pan-unscreen.gif";
import restrictionsData from "./Restrictions.json";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
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
import { useLoginStore } from '../../Store/useLoginStore'; // Import the Zustand store
import { LoginState } from '../../Store/useLoginStore';

export default function RecipeReviewCard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [ingredient, setIngredient] = useState<Ingredients[]>([]);
  const [selectedRestriction, setSelectedRestriction] = useState<string>("");
  const [alert, setAlert] = useState<{
    message: string;
    severity: "info" | "success" | "error" | "warning";
  } | null>(null);
  const { jwtToken } = useLoginStore((state: LoginState) => ({ jwtToken: state.jwtToken }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const MenuItemsData = await fetchMenuItems(initialValues.restaurantId, jwtToken);
        const IngredientsData = await fetchIngredients(jwtToken);
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
    restrictionsData.map((restriction) => [
      restriction.id,
      restriction.restriction,
    ])
  );
  const handleDelete = async (menuItemId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this menu item?"
    );
    if (isConfirmed) {
      try {
        await deleteMenuItems(menuItemId, jwtToken);

        setMenuItems(menuItems.filter((item) => item.id !== menuItemId));
        setAlert({
          message: "Menu item deleted successfully!",
          severity: "success",
        });
      } catch (error) {
        console.error("Error deleting menu item", error);
        setAlert({
          message: "Failed to delete the menu item. Please try again.",
          severity: "error",
        });
      }
    }
  };

  return (
    <>
      {alert && (
        <Alert
          severity={alert.severity}
          sx={{ position: "fixed", top: 16, right: 16 }}
        >
          {alert.message}
        </Alert>
      )}
      {!loading && filteredData.length === 0 ? (
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
          <img width={200} src={NodataGif} alt="No items yet" />
          <Typography sx={{ color: "#446732", fontFamily: "cursive" }}>
            OOPs!! No Items in the Menu?
          </Typography>
          <Typography
            sx={{ color: "#446732", fontSize: "14px", fontFamily: "cursive" }}
          >
            Add by clicking the bottom icon
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
                  zIndex: -1,
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
                <FilterAltIcon sx={{ fontSize: "1rem" }} />
              </InputLabel>
              <Select
                labelId="category-label"
                value={selectedRestriction}
                onChange={(e) => setSelectedRestriction(e.target.value)}
                label="Restriction"
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
                          onClick={() => handleDelete(result.id)}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
