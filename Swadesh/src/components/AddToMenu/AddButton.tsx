import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface AddButtonProps {
  onClick: () => void;
}
const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Button
      sx={{
        backgroundColor: "honeydew",
        color: "#446732",
        width: "50px",
        height: "50px",
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
      variant="contained"
      onClick={onClick}
      href="#contained-buttons"
    >
      <AddIcon />
    </Button>
  );
};
export default AddButton;
