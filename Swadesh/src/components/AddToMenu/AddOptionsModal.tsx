import { Box, Button, Modal } from "@mui/material";
import React from "react";

interface AddOptionsModalProps {
  open: boolean;
  handleClose: () => void;
  handleOptionSelect: (option: string) => void;
}

const AddOptionsModal: React.FC<AddOptionsModalProps> = ({
  open,
  handleClose,
  handleOptionSelect,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 200,
          bgcolor: "honeydew",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => handleOptionSelect("addRestrictions")}
            sx={{
              color: "white",
              fontSize: "9px",
              backgroundColor: "#446732",
              "&:active": { backgroundcolor: "honeydew" },
              width: "130px",
            }}
          >
            Add Restrictions
          </Button>
          <Button
            onClick={() => handleOptionSelect("addCategories")}
            sx={{
              marginTop: "30px",
              color: "white",
              fontSize: "9px",
              backgroundColor: "#446732",
              "&:active": { backgroundcolor: "honeydew" },
              width: "130px",
            }}
          >
            Add Categories
          </Button>
          <Button
            onClick={() => handleOptionSelect("addItemToMenu")}
            sx={{
              marginTop: "30px",
              color: "white",
              fontSize: "9px",
              backgroundColor: "#446732",
              "&:active": { backgroundcolor: "honeydew" },
              width: "130px",
            }}
          >
            Add an Item to Menu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddOptionsModal;
