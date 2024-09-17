import  { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRestaurantStore } from '../../Store/useRestaurantStore';

const SearchBar=()=> {
  const [searchString, setSearchString] = useState('');
  const searchResturants = useRestaurantStore(state => state.searchRestaurants);
  const jwtToken  = localStorage.getItem('jwtToken');

  const handleSearch = async () => {
    await searchResturants(searchString, jwtToken);
  };
useEffect(() => {
  searchResturants(searchString, jwtToken);
  console.log(searchString,"search");
},[searchString]);
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',  width: { xs: 250, sm: 300, md: 400 } }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search restaurants' }}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;