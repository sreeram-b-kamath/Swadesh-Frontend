import { Box } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../../components/UI/SearchBar";
import RestaurantList from "./Components/RestaurantList";
import FilterDropdown from "../../components/UI/FilterDropdown";
import { useState } from "react";
 
const AdminLanding = () => {
  // State to manage selected filters
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
 
  // Handle filter changes
  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };
 
  return (
    <Box
      sx={{
        p: 3,
        height: "90vh",
        // border: "1px solid green",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          textAlign: "right",
          alignSelf: "center",
          color: "green",
        }}
      >
        <FaUserCircle fontSize={40} />
      </Box>
      <Box sx={{ display: "flex", py: 1, color: "#006E1A" ,flexDirection: { xs: "column", sm: "row" },gap:2}}>
        <Box sx={{ flex: 1, fontSize: "48px" ,display:'flex',}}>Restaurants</Box>
 
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: {xs:"left",sm:"right"},
            // alignSelf: "center",
            // ml:{xs:"-15px"}
          }}
        >
          <FilterDropdown onChange={handleFilterChange} />{" "}
          {/* Pass filter change handler */}
          <SearchBar />{" "}
        </Box>
      </Box>
      <RestaurantList filters={selectedFilters} /> {/* Pass selected filters */}
    </Box>
  );
};
 
export default AdminLanding;