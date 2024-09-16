import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Filter{
  id:number
  name:string
}
interface FilterChipsProps {
  filters: Filter[];
  onSelectedChipsChange: (selectedChips: number[]) => void; 
}

const FilterChips: React.FC<FilterChipsProps> = ({ filters, onSelectedChipsChange }) => {
  const [selectedChips, setSelectedChips] = useState<number[]>([]);

  const handleChipClick = (filter: number) => {
    const updatedSelectedChips = selectedChips.includes(filter)
    ? selectedChips.filter((chip) => chip !== filter)
    : [...selectedChips, filter];

  setSelectedChips(updatedSelectedChips);
  onSelectedChipsChange(updatedSelectedChips); 
  };
  

  return (
    <div style={{ textAlign: 'center', padding: '20px',}}>
      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={1}>
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.name}
            onClick={() => handleChipClick(filter.id)}
            sx={{
              
              backgroundColor: selectedChips.includes(filter.id) ? '#31E94D' : '#ECF7E5',
              color:'#00430C',
              fontWeight: 'bold',
              padding: '10px ',
              fontSize: '16px',
              fontFamily: "Roboto Flex",
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              border: '1px solid #6C7B67'
            }}
          />
        ))}
      </Stack>
      {/* <Typography
        variant="body2"
        color="primary"
        
        sx={{ 
           color:"#25DEEE", 
           marginTop: '10px',
           fontWeight: 'bold',
           cursor: 'pointer',
           fontSize: '16px',
           fontFamily: "Roboto Flex",
          }}
        onClick={() => setSelectedChips([])}
      >
        skip
      </Typography> */}
    </div>
  );
};

export default FilterChips;
