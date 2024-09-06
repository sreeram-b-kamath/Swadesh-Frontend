import { Box } from "@mui/material";
import DishCard from "../components/AddToMenu/DishCard";
import Navbar from "../components/AddToMenu/navbar";
import { AddButton } from "../components/AddToMenu/AddButton";
import { useState } from "react";
import { AddToMenuForm } from "../components/AddToMenu/AddToMenuForm";
import AddOptionsModal from "../components/AddToMenu/AddOptionsModal";
import axios from "axios";
import { initialValues } from "../Store/AddToMenu/AddToMenuStore";

const AddToMenu = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleAddClick = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setShowForm(false);
  };
  const handleOptionSelect = (option: string) => {
    if (option === "addItemToMenu") {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
    setModalOpen(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log("Menu item entered:");

      const dataToPost = {
        name: values.name,
        primaryImage: values.primaryImage,
        description: values.description,
        money: values.money,
        restaurantId: values.restaurantId,
        menuCategoryId: values.category,
        menuFilterIds: values.restrictions,
        ingredientIds: values.ingredients,
      };

      const response = await axios.post(
        "https://localhost:7107/api/MenuItems/PostToMenuAsync",
        dataToPost
      );

      console.log("Data posted successfully", response.data);
      alert("Added to your menu Succesfully");
      setShowForm(false);
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "96vw",
          backgroundColor: "#f5fffa",
          padding: "1rem 1rem",
        }}
      >
        <Navbar />
        {showForm ? (
          <Box>
            <AddToMenuForm onSubmit={handleSubmit} onCancel={handleCancel} />
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "50px",
              }}
            >
              <Button
                onClick={handleCancel}
                variant="contained"
                color="primary"
                type="submit"
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
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: "30px",
                  color: "white",
                  fontSize: "9px",
                  backgroundColor: "#446732",
                  "&.hover": { backgroundcolor: "honeydew" },
                  width: "130px",
                }}
              >
                Add to menu
              </Button>
            </Box> */}
          </Box>
        ) : (
          <Box>
            <DishCard />
          </Box>
        )}
        {!showForm && (
          <Box>
            <AddButton onClick={handleAddClick} />
          </Box>
        )}
        ;
        <AddOptionsModal
          open={modalOpen}
          handleClose={handleModalClose}
          handleOptionSelect={handleOptionSelect}
        />
      </Box>
    </>
  );
};

export default AddToMenu;
