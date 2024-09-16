import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


interface ConfirmationModalProps {
  open: boolean;
  isActive: boolean;
  modalType: string;
  onClose: () => void;
  onConfirm: (confirmation: boolean) => void; // Callback for confirmation
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '70%', sm: '50%', md: '40%' ,lg:'30%'}, // Responsive width
  
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  textAlign:'center'
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, isActive, modalType, onClose, onConfirm }) => {

  const handleConfirmationYes = () => {
    onConfirm(true);
    console.log("onConfirm: Yes");
    onClose();
  };

  const handleConfirmationNo = () => {
    onConfirm(false);
    console.log("onConfirm: No");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Center the modal
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isActive !== true && modalType === "activate"
            ? "Do you want to Activate this restaurant?"
            : modalType === "delete"
            ? "Do you want to delete this restaurant?"
            : "Do you want to Deactivate this restaurant?"}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 2, width: 1 }}>
          <Button
            onClick={handleConfirmationYes}
            sx={{
              borderRadius: 4,
              backgroundColor: 'green',
              color: 'white',
              mx: 4,
              '&:hover': {
                backgroundColor: 'darkgreen', // Darker shade of green on hover
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Optional: shadow effect
              },
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleConfirmationNo}
            sx={{
              borderRadius: 4,
              backgroundColor: 'red',
              color: 'white',
              mx: 4,
              '&:hover': {
                backgroundColor: 'darkred', // Darker shade of red on hover
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Optional: shadow effect
              },
            }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
