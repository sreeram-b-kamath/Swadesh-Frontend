import { Avatar, Box, Button, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "react-qr-code";
import { useRef, useState, useEffect } from "react";

import axios from "axios"; 
import { useLoginStore } from "../../Store/useLoginStore";
import { LoginState } from '../../Store/useLoginStore';


interface Restaurant {
  name: string;
  logo: string;
  ownerName : string;
  address: string;
  status: string;
}

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null); // Store restaurant data here

  const navRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef();
  const { restaurantId } = useLoginStore();

  // Function to toggle the navbar
  const toggleNavBar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const { jwtToken } = useLoginStore((state: LoginState) => ({ jwtToken: state.jwtToken }));

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Fetch restaurant data on component mount
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`https://localhost:7107/api/Restaurant/${restaurantId}`, {
          headers: {
             Authorization: `Bearer ${jwtToken}`, // Ensure this has the correct format
          },});
          console.log(response.data);
          
        setRestaurant(response.data); 
      } catch (error) {
        console.error("Error fetching restaurant data", error);
      }
    };
    fetchRestaurantData();
  }, [jwtToken]);  // Ensure jwtToken is included in the dependency array
  
  return (
    <>
      <Box
        className="Header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          gap: "1rem",
        }}
      >
        <MenuIcon
          className="menuButton"
          sx={{ color: "#446732", cursor: "pointer" }}
          onClick={toggleNavBar}
        />

        <Box
          className="restarauntName"
          sx={{
            display: "flex",
            color: "#446732",
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          {restaurant && (
            <img
              src={restaurant.logo}
              alt={`${restaurant.name} logo`}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
          )}
          {restaurant ? restaurant.name : "Loading..."}{" "}
          {/* Display restaurant name */}
        </Box>

        <Box>
          <Avatar
            sx={{ bgcolor: "#446732", width: 25, height: 25, fontSize: "10px" }}
            aria-label="recipe"
            onClick={toggleProfile}
          ></Avatar>
        </Box>

        <nav
          ref={navRef}
          style={{
            zIndex: 2,
            position: "fixed",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            flexDirection: "column",
            backgroundColor: "honeydew",
            transition: "transform 1s ease",
            transform: isNavOpen ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
            }}
          >
            <CloseIcon
              className="closeButton"
              sx={{ color: "#446732", cursor: "pointer" }}
              onClick={toggleNavBar}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                href="/"
                sx={{
                  color: "#446732",
                  textDecoration: "none",
                  padding: "0.5rem",
                  "&:hover": { color: "#446732", fontWeight: "bold" },
                }}
              >
                Home
              </Link>
              <Link
                href="/about"
                sx={{
                  color: "#446732",
                  textDecoration: "none",
                  padding: "0.5rem",
                  "&:hover": { color: "#446732", fontWeight: "bold" },
                }}
              >
                About Us
              </Link>
              <Link
                href="/menu"
                sx={{
                  color: "#446732",
                  textDecoration: "none",
                  padding: "0.5rem",
                  "&:hover": { color: "#446732", fontWeight: "bold" },
                }}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                sx={{
                  color: "#446732",
                  textDecoration: "none",
                  padding: "0.5rem",
                  "&:hover": { color: "#446732", fontWeight: "bold" },
                }}
              >
                Private Policy
              </Link>
            </Box>
          </Box>
        </nav>

        <Box
          ref={profileRef}
          style={{
            zIndex: 2,
            position: "fixed",
            top: "0",
            right: "0",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "honeydew",
            transition: "transform 0.9s ease",
            transform: isProfileOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <CloseIcon
            className="closeButton"
            sx={{
              color: "#446732",
              cursor: "pointer",
              position: "absolute",
              top: "1rem",
              right: "1rem",
            }}
            onClick={toggleProfile}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "black",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap : "30px"
              }}
            >
              <Box
                sx={{
                  width: "256px",
                  height: "256px",
                  backgroundColor: "#446732",
                }}
              >
                <QRCode
                        value={"http://192.168.221.87:5173/preference-selection"}
                        bgColor={"#FFFFFF"}
                        fgColor={"#000000"}
                        size={256}
                    />
              </Box>
              <Button>Download</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
