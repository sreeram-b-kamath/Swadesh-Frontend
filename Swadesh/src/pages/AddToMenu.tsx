import { Box, Button } from "@mui/material";
import RecipeReviewCard from "../components/AddToMenu/DishCard";
import Navbar from "../components/AddToMenu/Navbar";
import { AddButton } from "../components/AddToMenu/AddButton";
import { useState } from "react";
import { AddToMenuForm } from "../components/AddToMenu/AddToMenuForm";
import AddOptionsModal from "../components/AddToMenu/AddOptionsModal";
import { useNavigate } from "react-router-dom";


const AddToMenu = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAddClick = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setShowForm(false);
  };
  const handleOptionSelect = (option: string) => {
    if (option === "addItemToMenu") {
      setShowForm(true);}
      else if (option === "addRestrictions") {
        navigate('/restrictions');
    } else if (option === "addCategories") {
      navigate('/categories');
  } else {
      setShowForm(false);
    }
    setModalOpen(false);
  };

  const handleSave = () => {
    setShowForm(false);
  };
  const handleCancel = () => {
    setShowForm(false);
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
            <AddToMenuForm />
            <Box
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
                onClick={handleSave}
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
            </Box>
          </Box>
        ) : (
          <Box>
            <RecipeReviewCard />
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
