import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


const defaultCategories = ['Appetizers', 'Main Course', 'Dessert'];
const restaurantId = 1;  

interface Category {
  id: number;
  name: string;
  active: boolean;
  restaurantId: number;
}

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

const CustomCategory = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [existingCategories, setExistingCategories] = useState<Category[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`https://localhost:7107/api/Category/${restaurantId}`);
        const data = response.data;

        if (data && data.$values && data.$values.length > 0) {
          setExistingCategories(data.$values);
          setSelectedCategories(data.$values.map((category: Category) => category.name));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim().toLowerCase();
    if (trimmedCategory && !selectedCategories.map(category => category.toLowerCase()).includes(trimmedCategory)) {
      setSelectedCategories([...selectedCategories, newCategory.trim()]);
      setNewCategory('');
      setSnackbarMessage('Category added successfully');
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage('Category already exists');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    setSelectedCategories(selectedCategories.filter(category => category !== categoryToDelete));
  };

  const handleBack = () => {
    navigate('/add-to-menu'); 
  };
  const handleSave = async () => {
    try {
      console.log("Selected Categories:", selectedCategories);
      console.log("Existing Categories:", existingCategories);

      const categoriesToAdd = selectedCategories.filter(
        category => 
          !existingCategories.some(existing => existing.name.toLowerCase() === category.toLowerCase())
      );

      const categoriesToDelete = existingCategories
        .filter(existing => 
          !selectedCategories.map(cat => cat.toLowerCase()).includes(existing.name.toLowerCase())
        )
        .map(existing => existing.id);

      console.log("Categories to Add:", categoriesToAdd);

      if (categoriesToAdd.length > 0) {
        const addRequests = categoriesToAdd.map(name => {
          const payload = {
            name,
            restaurantID: restaurantId,
            active: true
          };
          console.log("Posting Payload:", payload);
          return axios.post(`https://localhost:7107/api/Category`, payload);
        });
        await Promise.all(addRequests);
      }

      console.log("Categories to Delete:", categoriesToDelete);

      if (categoriesToDelete.length > 0) {
        const deleteRequests = categoriesToDelete.map(id => {
          console.log("Deleting ID:", id);
          return axios.delete(`https://localhost:7107/api/Category/${id}`);
        });
        await Promise.all(deleteRequests);
      }

      setSnackbarMessage('Categories saved successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error("Error saving categories:", error);
      setSnackbarMessage('Error saving categories');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ m: 1, width: 300 }}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="demo-multiple-checkbox-label">Food Category</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            input={<OutlinedInput label="Food Category" />}
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
          label="Add Custom Food Category"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          sx={{ mt: 2, width: '100%' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
  <Button 
    variant="contained" 
    onClick={handleAddCategory} 
    sx={{ width: 'auto', backgroundColor: '#446732', borderRadius: 3 }} 
    disabled={!newCategory.trim()}
  >
    Add
  </Button>
</Box>

      </Box>

      <Box sx={{ width: 300, mt: 3, p: 2 }}>
        <Typography sx={{ color: "black", fontSize: '1rem' }} variant="h6">Selected Categories:</Typography>
        {selectedCategories.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxHeight: 150, overflowY: 'auto' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6,gap:1}}>
          <Button 
            variant="contained" 
            sx={{ width: 'auto', backgroundColor: '#446732', borderRadius: 3 }} 
            disabled={selectedCategories.length === 0} 
            onClick={handleSave}
          >
            Save
          </Button>
          <Button 
            variant="contained" 
            sx={{ width: 'auto', backgroundColor: '#446732', borderRadius: 3 }} 
            onClick={handleBack}
          >
            Back
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom',horizontal:'center' }}

        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CustomCategory;
