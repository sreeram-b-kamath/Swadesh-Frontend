import React, { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import RestaurantCard from './RestaurantCard';
import { useRestaurantStore } from '../../../Store/useRestaurantStore';
import InfiniteScroll from 'react-infinite-scroll-component';
import noResultImg from '../../../assets/nojunk.gif';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import loadingIcon from '../../../assets/22.gif';

interface RestaurantListProps {
  filters: string[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ filters }) => {
  const { restaurants, fetchRestaurants, error, loading, hasMore, filterRestaurants } = useRestaurantStore((state) => ({
    restaurants: state.restaurants,
    fetchRestaurants: state.fetchRestaurants,
    error: state.error,
    loading: state.loading,
    hasMore: state.hasMore,
    filterRestaurants: state.filterRestaurants,
  }));
  const getResponsiveHeight = () => {
    if (window.innerWidth < 600) {
      return '150vh'; // Height for xs
    } else {
      return '90vh';  // Height for sm and up
    }
  };
  const loadMoreData = useCallback(() => {
    if (filters.length === 0) {
      
      console.log("no filters reached here")
      fetchRestaurants();
    } else {
      filterRestaurants(filters);
    }
  }, [fetchRestaurants, filterRestaurants, filters]);

  useEffect(() => {
    // Fetch initial data or filtered data
    loadMoreData();
  }, [loadMoreData]);

  if (loading && restaurants.length === 0)
    return (
      <Box
        sx={{
          display: 'flex',
          width: 1,
          alignItems: 'center',
          overflow: 'hidden',
          
        }}
      >
        <CircularProgress />
      </Box>
    );
    if (loading && restaurants.length !== 0) return <Box></Box>;
    if(!loading && restaurants.length ==0 ) return <Box sx={{display:"flex",justifyContent:'center',mt:{sm:"150px",xs:'75px'},flexDirection:'column',alignItems:'center'}}>
    
    <img src={noResultImg} alt="No more results" style={{ width: '200px' }} />
    <Typography variant="body1" sx={{fontWeight:'700'}}>No Restaurants Found</Typography>
  </Box>
  
  if (error) return <div>Error: {error}</div>;
console.log(restaurants);
  return (
    <Box
      id="scrollable-container"
      sx={{
        height: '80vh',
        
        overflowY: 'auto',
        my: 4,
        scrollbarWidth: 'none', // For Firefox
        '&::-webkit-scrollbar': { display: 'none' } // For WebKit browsers
      }}
    >
      <InfiniteScroll
        dataLength={restaurants.length}
        next={loadMoreData}
        hasMore={hasMore}
        style={{ height: getResponsiveHeight() }}
        scrollableTarget="scrollable-container"
        loader={
          hasMore ? (
            <Box
              sx={{
                width: 1,
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden',
                my: 3,
              }}
            >
              <img style={{ height: '10px' }} src={loadingIcon} alt="Loading..." />
            </Box>
          ) : (
            <Box>
              <Typography variant="body1">No more results</Typography>
              <img src={noResultImg} alt="No more results" style={{ width: '200px' }} />
            </Box>
          )
        }
        
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {sm:'repeat(3, 1fr)',},
            gap: 2,
            my: 5,
            
          }}
        >
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onDelete={(id: number) => {
                // Handle delete logic
                fetchRestaurants();
              }}
            />
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default RestaurantList;
