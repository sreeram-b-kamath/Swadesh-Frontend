import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../../../components/UI/ConfirmationModal";
import axios from "axios";
import { useRestaurantStore } from "../../../Store/useRestaurantStore"; // Adjust import path
import { Link } from "react-router-dom";

interface Restaurant {
  id: number;
  name: string;
  email: string;
  logo: string;
  isActive: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onDelete: (id: number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onDelete,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    "activate" | "deactivate" | "delete"
  >("activate");
  const [confirmationResult, setConfirmationResult] = useState<boolean | null>(
    true
  );
  const jwtToken  = localStorage.getItem('jwtToken');
  // Access Zustand store for updating restaurant state
  const updateRestaurantState = useRestaurantStore(
    (state) => state.updateRestaurantState
  );

  // Confirm action and update state or delete
  const handleConfirm = async (confirmation: boolean) => {
    console.log(confirmation);
    setConfirmationResult(confirmation);
    console.log(confirmationResult, "test confirmation");
    if (confirmationResult) {
      if (modalType === "activate" || modalType === "deactivate") {
        // Toggle active state
        const newIsActive = !restaurant.isActive;
        console.log(newIsActive);

        try {
          // Make the API request to update the state on the server
          const response = await axios.patch(
            "https://localhost:7107/Admin/ChangeRestaurantState",
            {
              id: restaurant.id,
              isActive: newIsActive,
            },
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );

          // Check if the response was successful
          if (response.status === 200) {
            // Update Zustand state
            updateRestaurantState(restaurant.id, newIsActive, jwtToken);
            console.log("Restaurant state updated:", restaurant.id);
          } else {
            console.error("Failed to update state");
            console.log("not :", restaurant.id);
          }
        } catch (error) {
          console.error("Error updating state:", error);
        }
      } else if (modalType === "delete") {
        // Call the delete callback if confirmed
        try {
          const response = await axios.delete(
            `https://localhost:7107/Admin/DeleteRestaurant/${restaurant.id}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          console.log(response);
          console.log("delete successful");
          onDelete(restaurant.id);

          // Notify parent to update the UI
        } catch (error) {
          console.error("Error deleting restaurant:", error);
        }
      }
    }
    setOpen(false); // Close the modal after confirmation
  };

  const handleOpen = (type: "activate" | "deactivate" | "delete") => {
    setModalType(type); // Set modal type for the confirmation dialog
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleToggle = () => {
    handleOpen(restaurant.isActive ? "deactivate" : "activate"); // Determine modal type based on state
  };

  const handleDelete = () => {
    handleOpen("delete");
  };

  return (
    <Box
      sx={{
        height: "100px",
        // width: "300px",
        width: {lg:'420px', xs: '300px'},

        borderRadius: 2,
        border: "1px solid black",
        display: "flex",
        "&:hover": { boxShadow: 2 },
      }}
    >
      <Box
        sx={{
          // flex: 4,
          display: "flex",
          width: {xs:" 70%",lg:" 75%",},
          backgroundColor: "#edeaea",
          borderRadius: "7px 0 0 7px",
        }}
      >
        <Box sx={{ flex: 9, alignContent: "space-around", ml: 2, width:'100px' }}>
          <Typography sx={{ fontSize: {xs:"18px",lg:"22px"}, fontWeight: 600, my: 1, width:{xs:'100px', lg:'100%'},height:{lg:'40%'} }}>
            {restaurant.name}
          </Typography>
          <Typography
            sx={{ fontSize: {xs:"11px",lg:"13px"}, width: {xs:"75%", lg: '100%'}, wordWrap: "break-word" ,height:{lg:'40%'}}}
          >
            {restaurant.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex',flexDirection:'column',alignSelf: "center", gap:{xs:'20px',lg:'15px'} }}>
          <Box >
          <IconButton
            onClick={handleToggle}
            sx={{
              color: restaurant.isActive ? "#0aa907" : "red",
              fontSize: 13,
            }}
          >
            <CircleIcon sx={{ fontSize: "15px", mr: 1 }} />
            <Typography sx={{ color: "black", fontSize: {xs:"12px",lg:"14px"} }}>
              {restaurant.isActive ? "Active" : "Inactive"}
            </Typography>
          </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Link to={"/add-to-menu"}>
            <Button
              sx={{
                borderRadius: 12,
                backgroundColor: "#0aa907",
                color: "white",
                height: {xs:"22px",lg:"30px",},
                width: {xs:"50px",lg:"60px"},
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
            >
              View
            </Button>
            </Link>
            <DeleteIcon sx={{ color: "red" }} onClick={handleDelete} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          // flex: 1,
          alignContent: "center",
          backgroundColor: "white",
          width: {xs:"30%",lg:"25%"},
          height: "100%",
          borderRadius: "0 7px 7px 0",
        }}
      >
        <img
          src={restaurant.logo}
          width={"100px"}
          style={{ borderRadius: "7px", backgroundSize:'cover' }}
          alt={`${restaurant.name} logo`} // Added alt text for accessibility
        />
      </Box>
      <ConfirmationModal
        open={open}
        isActive={restaurant.isActive}
        modalType={modalType}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};

export default RestaurantCard;
