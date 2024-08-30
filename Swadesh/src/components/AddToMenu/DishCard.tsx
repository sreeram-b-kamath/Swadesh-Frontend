import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Grid } from "@mui/material";
import Data from "./Data.json";

export default function RecipeReviewCard() {
  return (
    <>
      <Box sx={{ color: "#446732", fontWeight: "bold", marginTop: "10px" }}>
        Menu{" "}
      </Box>
      <Grid container spacing={1}>
        {Data.map((result, index) => (
          <Grid
            item
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
