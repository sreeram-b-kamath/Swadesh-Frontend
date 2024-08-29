import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const defaultCategories = [
  "Vegetarian",
  "Non-Vegetarian",
  "Gluten-Free",
  "Vegan",
  "Non-alcoholic",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CustomRestriction = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !selectedCategories.includes(trimmedCategory)) {
      setSelectedCategories([...selectedCategories, trimmedCategory]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    setSelectedCategories(selectedCategories.filter(category => category !== categoryToDelete));
  };
  const handleSave = () => {
    console.log("Selected Restrictions:", selectedCategories);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ m: 1, width: 300 }}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="demo-multiple-checkbox-label">Food Restriction</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            input={<OutlinedInput label="Food Restriction" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {defaultCategories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Add Custom Food Restrictions"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          sx={{ mt: 2, width: '100%' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" onClick={handleAddCategory} sx={{ width: 'auto', backgroundColor: '#446732', borderRadius: 3 }}>
            Add
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: 300, mt: 1, p: 2, maxHeight: 200, overflowY: 'auto' }}>
        <Typography sx={{ color: "black" }} variant="body1">Selected Restrictions:</Typography>
        {selectedCategories.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedCategories.map((category) => (
              <Chip
                key={category}
                label={category}
                onDelete={() => handleDeleteCategory(category)}
                sx={{ backgroundColor: '#446732', color: 'white', borderRadius: 3 }}
              />
            ))}
          </Box>
        ) : (
          <Typography sx={{ color: "grey" }} variant="body1">Nothing selected</Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button 
            variant="contained" 
            sx={{ width: 'auto', backgroundColor: '#446732', borderRadius: 3 }} 
            disabled={selectedCategories.length === 0} 
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomRestriction;
