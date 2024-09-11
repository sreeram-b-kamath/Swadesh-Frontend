import { Alert, Box } from "@mui/material";
import { lazy, Suspense, useState } from "react";
import { initialValues } from "../Store/AddToMenu/AddToMenuStore";
import { useNavigate } from "react-router-dom";
import { postMenuItem } from "../Store/AddToMenu/AddToMenuStore";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import React from "react";
import { useLoginStore } from "../Store/useLoginStore";
const DishCard = lazy(() => import("../components/AddToMenu/DishCard"));
const AddButton = lazy(() => import("../components/AddToMenu/AddButton"));
const Navbar = lazy(() => import("../components/AddToMenu/Navbar"));
const AddToMenuForm = lazy(
  () => import("../components/AddToMenu/AddToMenuForm")
);
const AddOptionsModal = lazy(
  () => import("../components/AddToMenu/AddOptionsModal")
);

const AddToMenu = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] =
    useState<boolean>(false);
  const [failureSnackbarOpen, setFailureSnackbarOpen] =
    useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const navigate = useNavigate();
  const { restaurantId } = useLoginStore((state) => ({
    restaurantId: state.restaurantId,
  }));

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
    } else if (option === "addRestrictions") {
      navigate("/restrictions");
    } else if (option === "addCategories") {
      navigate("/Categories");
    } else {
      setShowForm(false);
    }
    setModalOpen(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (restaurantId === null) {
      setSnackbarMessage("Restaurant ID is not available");
      setFailureSnackbarOpen(true);
      return;
    }
    try {
      const response = await postMenuItem(values, restaurantId);
      console.log("Data posted successfully", response);
      setSnackbarMessage("Added to your menu successfully");
      setSuccessSnackbarOpen(true);
      setShowForm(false);
    } catch (error) {
      console.error("Error posting data", error);
      setSnackbarMessage("Failed to add item to menu");
      setFailureSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
    setFailureSnackbarOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#f5fffa",
          padding: "1rem 1rem",
        }}
      >
        <Suspense fallback={<div>Loading NavBar....</div>}>
          <Navbar />
        </Suspense>
        {showForm ? (
          <Box>
            <Suspense fallback={<div>Loading Form...</div>}>
              <AddToMenuForm onSubmit={handleSubmit} onCancel={handleCancel} />
            </Suspense>
          </Box>
        ) : (
          <Box>
            <Suspense fallback={<div>Loading Dish Card...</div>}>
              <DishCard />
            </Suspense>
          </Box>
        )}
        {!showForm && (
          <Box>
            <Suspense fallback={<div>Loading Button...</div>}>
              <AddButton onClick={handleAddClick} />
            </Suspense>
          </Box>
        )}
        ;
        <Suspense fallback={<div>Loading Button...</div>}>
          <AddOptionsModal
            open={modalOpen}
            handleClose={handleModalClose}
            handleOptionSelect={handleOptionSelect}
          />
        </Suspense>
      </Box>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={failureSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToMenu;
