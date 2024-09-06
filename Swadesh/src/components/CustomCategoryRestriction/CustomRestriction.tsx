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


const defaultRestrictions = ['Vegan', 'Gluten-Free', 'Nut-Free']; 
const restaurantId = 1;  

interface Restriction {
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

const CustomRestriction = () => {
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const [newRestriction, setNewRestriction] = useState('');
  const [existingRestrictions, setExistingRestrictions] = useState<Restriction[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRestrictions = async () => {
      try {
        const response = await axios.get(`https://localhost:7107/api/Restriction/${restaurantId}`);
        const data = response.data;

        if (data && data.$values && data.$values.length > 0) {
          setExistingRestrictions(data.$values);
          setSelectedRestrictions(data.$values.map((restriction: Restriction) => restriction.name));
        }
      } catch (error) {
        console.error("Error fetching restrictions:", error);
      }
    };

    fetchRestrictions();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selectedRestrictions>) => {
    const { target: { value } } = event;
    setSelectedRestrictions(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleBack = () => {
    navigate('/add-to-menu'); 
  };

  const handleAddRestriction = () => {
    const trimmedRestriction = newRestriction.trim();
    if (trimmedRestriction && !selectedRestrictions.includes(trimmedRestriction)) {
      setSelectedRestrictions([...selectedRestrictions, trimmedRestriction]);
      setNewRestriction('');
      setSnackbarMessage('Restriction added successfully');
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage('Restriction already exists');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleDeleteRestriction = (restrictionToDelete: string) => {
    setSelectedRestrictions(selectedRestrictions.filter(restriction => restriction !== restrictionToDelete));
  };

  const handleSave = async () => {
    try {
      console.log("Selected Restrictions:", selectedRestrictions);
      console.log("Existing Restrictions:", existingRestrictions);

      const restrictionsToAdd = selectedRestrictions.filter(
        restriction => !existingRestrictions.some(existing => existing.name === restriction)
      );

      const restrictionsToDelete = existingRestrictions
        .filter(existing => !selectedRestrictions.includes(existing.name))
        .map(existing => existing.id);

      console.log("Restrictions to Add:", restrictionsToAdd);

      if (restrictionsToAdd.length > 0) {
        const addRequests = restrictionsToAdd.map(name => {
          const payload = {
            name,
            restaurantID: restaurantId,
            active: true
          };
          console.log("Posting Payload:", payload);
          return axios.post(`https://localhost:7107/api/Restriction`, payload);
        });
        await Promise.all(addRequests);
      }

      console.log("Restrictions to Delete:", restrictionsToDelete);

      if (restrictionsToDelete.length > 0) {
        const deleteRequests = restrictionsToDelete.map(id => {
          console.log("Deleting ID:", id);
          return axios.delete(`https://localhost:7107/api/Restriction/${id}`);
        });
        await Promise.all(deleteRequests);
      }

      setSnackbarMessage('Restrictions saved successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error("Error saving restrictions:", error);
      setSnackbarMessage('Error saving restrictions');
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
          <InputLabel id="demo-multiple-checkbox-label">Restrictions</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedRestrictions}
            onChange={handleChange}
            input={<OutlinedInput label="Dietary Restrictions" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {defaultRestrictions.map((restriction) => (
              <MenuItem key={restriction} value={restriction}>
                <Checkbox checked={selectedRestrictions.indexOf(restriction) > -1} />
                {restriction}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Add Custom Restriction"
          variant="outlined"
          value={newRestriction}
          onChange={(e) => setNewRestriction(e.target.value)}
          sx={{ mt: 2, width: '100%' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleAddRestriction} 
            sx={{ width: 'auto', backgroundColor: '#446732', borderRadius: 3 }}
            disabled={!newRestriction.trim()}
          >
            Add
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: 300, mt: 3, p: 2 }}>
        <Typography sx={{ color: "black", fontSize: '1rem' }} variant="h6">Selected Restrictions:</Typography>
        {selectedRestrictions.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxHeight: 150, overflowY: 'auto' }}>
            {selectedRestrictions.map((restriction) => (
              <Chip
                key={restriction}
                label={restriction}
                onDelete={() => handleDeleteRestriction(restriction)}
                sx={{ backgroundColor: '#446732', color: 'white', borderRadius: 3 }}
              />
            ))}
          </Box>
        ) : (
          <Typography sx={{ color: "grey" }} variant="body1">Nothing selected</Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 ,gap:1}}>
          <Button 
            variant="contained" 
            sx={{ width: 'auto', backgroundColor: '#446732', borderRadius: 3 }} 
            disabled={selectedRestrictions.length === 0} 
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CustomRestriction;
