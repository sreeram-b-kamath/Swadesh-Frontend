import React, { useState, MouseEvent, useEffect } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  Checkbox,
  Box,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRestaurantStore } from "../../Store/useRestaurantStore";

// Define the types for the checkbox options
interface Option {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  onChange: (selectedFilters: string[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onChange }) => {
  const { restrictions, fetchRestrictions } = useRestaurantStore((state) => ({
    restrictions: state.restrictions,
    fetchRestrictions: state.fetchRestrictions,
  }));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const jwtToken  = localStorage.getItem('jwtToken');
  const [options, setOptions] = useState<Option[]>([
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
  ]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

 

  useEffect(() => {
    // Fetch initial restrictions when component mounts
    fetchRestrictions(jwtToken);
console.log(" restrictions",restrictions);
    // Simulate updating options based on fetched restrictions
    const updateOptions = () => {
      restrictions.forEach(element => {
        const newOptions: Option[] = [
          ...options,
          {id: element, label: element}// Example: Add options based on fetched data
          
        ];
        setOptions(newOptions);
        console.log("hii newOptions:",newOptions)
      });
      console.log("options:",options)
    };

    updateOptions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRestrictions]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (id: string) => {
    const newChecked = checked.includes(id)
      ? checked.filter((item) => item !== id)
      : [...checked, id];
    setChecked(newChecked);
    onChange(newChecked); // Notify parent of filter change
  };

  return (
    <Box sx={{ mr: 1 }}>
      <IconButton
        onClick={handleClick}
        aria-controls="filter-menu"
        aria-haspopup="true"
        sx={{pl:0}}
      >
        <FilterListIcon sx={{ fontSize: 32, color: "#446732" }} />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleToggle(option.id)}
            sx={{ minWidth: "200px !important" }}
          >
            <Checkbox
              edge="start"
              checked={checked.includes(option.id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterDropdown;
