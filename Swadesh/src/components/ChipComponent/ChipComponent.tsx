import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface FilterChipsProps {
  filters: string[];
}

const FilterChips: React.FC<FilterChipsProps> = ({ filters }) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipClick = (filter: string) => {
    setSelectedChips((prevSelectedChips) =>
      prevSelectedChips.includes(filter)
        ? prevSelectedChips.filter((chip) => chip !== filter)
        : [...prevSelectedChips, filter]
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px',}}>
      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={1}>
        {filters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            onClick={() => handleChipClick(filter)}
            sx={{
              
              backgroundColor: selectedChips.includes(filter) ? '#31E94D' : '#ECF7E5',
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
      <Typography
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
      </Typography>
    </div>
  );
};

export default FilterChips;
