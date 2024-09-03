import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Data from "./Data.json";
import { useState } from "react";

export default function RecipeReviewCard() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredData = Data.filter(
    (result) => selectedCategory === "" || result.dishName === selectedCategory
  );
  const dishNames = [...new Set(Data.map((item) => item.dishName))];
  return (
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
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel
            id="category-label"
            sx={{
              fontSize: "0.85rem",
              color: "#446732",
            }}
          >
            Category
          </InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
            sx={{
              "& .MuiSelect-select": {
                padding: "10px 10px",
                fontSize: "0.5rem",
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {dishNames.map((dishName, index) => (
              <MenuItem key={index} value={dishName}>
                {dishName}
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
                image={result.image}
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
                  <Typography color="text.primary" sx={{ fontSize: "10px" }}>
                    {result.dishName}
                  </Typography>
                </Box>
                <Box className="price">
                  <Typography sx={{ color: "black", fontSize: "10px" }}>
                    ₹{result.price}
                  </Typography>
                </Box>
                <Box
                  className="bottomRow"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Box className="ingredienceIcons">
                    <FavoriteIcon
                      style={{
                        fontSize: "20px",
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
