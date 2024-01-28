import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  InputBase,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Grow,
  ClickAwayListener,
  Paper as SuggestionsPaper,

} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddTwoToneIcon from '@mui/icons-material/NotificationAddTwoTone';
import { Search as SearchIcon, FilterList as FilterIcon, } from "@mui/icons-material";
import axios from 'axios';
import zIndex from '@mui/material/styles/zIndex';
import { sendQueryToDatabase } from '../../actions/userAction';
function NavBar() {
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [isHovered, setIsHovered ] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [openSuggestions, setOpenSuggestions ] = useState(false);
    const bingMapsApiKey = "AhWIRQ2jlGpIYCjYkTns5knl56C05ervAIg4S_6cekLW_Gy864oVc8b4LBphnGLK";
    const anchorRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');


    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `http://dev.virtualearth.net/REST/v1/Autosuggest`,
          {
            params: {
              query: query,
              key: bingMapsApiKey,
            },
          }
        );
        const data = response.data;
        console.log(data)
        if (data.resourceSets && data.resourceSets[0].resources[0].value) {
          const suggestedEntities = data.resourceSets[0].resources[0].value
          // console.log(suggestedEntities)
          setSuggestions(suggestedEntities);
          setOpenSuggestions(true)
        } else {
          setOpenSuggestions(false);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setOpenSuggestions(false);
      }
    };
  
    useEffect(() => {
      if (query.trim() !== '') {
        fetchSuggestions();
      } else {
        setSuggestions([]);
        setOpenSuggestions(false);
      }
    }, [query]);
  
    const handleSearch = (event) => {
      // Implement your search logic here
      setQuery(event.target.value)
      setSearchQuery(event.target.value)
      sendQueryToDatabase(searchQuery);
      console.log('Searching for:', event.target.value);
    };
  
    // const handleKeyPress = (event) => {
    //   if (event.key === 'Enter') {
    //   }
    // };
    
  const handleFilterClick = () => {
    console.log("Filter icon clicked");
    setIsFilterDialogOpen(true);
  }
  
  const handleOnmousEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleCloseFilterDialog = () => {
    setIsFilterDialogOpen(false);
  }

  const  paperWidth = isHovered ? '60%' : '40%';

  const inputPlaceHolderStyle = {
    '::placeholder': {
      color: 'red',
      fontStyle: 'italic',
      top:'-5%'
    },
  };

  return (
    <>

    <AppBar position="static" sx={{ height: '40px', boxShadow: 'none' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">

          <Paper 
          component="form" 
          sx={{ 
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            ml: 2, 
            borderRadius: '50px', 
            width: paperWidth,
            height:'50px',
            position: 'absolute', 
            // left: '50%', 
            // transform: 'translateX(-50%)', 
            top:'5px',
            transition: 'width 0.3s ease-in-out',
          }}

          onMouseEnter={handleOnmousEnter}
          onMouseLeave={handleMouseLeave}
          >
            <IconButton sx={{ p: '5px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search for Village peaple and more......"
              fullWidth
              onChange={handleSearch}
              // onKeyDown={handleKeyPress}
              sx={{textAlign:"center", paddingLeft:"10%", ...inputPlaceHolderStyle, }}
              ref={anchorRef}
            />
          </Paper>
          <IconButton sx={{ p: '5px', left: '50%' }} aria-label="filter" onClick={handleFilterClick}>
            <FilterIcon sx={{color:"white", width:"50px"}} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>



      <Popper
        open={openSuggestions}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement="bottom-start"
        style={{zIndex:999}}
        // sx={
          
        // }
      > 
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpenSuggestions(false)}>
                <SuggestionsPaper>
                  <List>
                    {suggestions.map((suggestion, index) => (
                      <ListItem key={index}>
                            {/* <h2>results...</h2> */}
                            {/* {console.log(suggestion?.name)} */}
                        <ListItemText primary={suggestion.name} />
                      </ListItem>
                    ))}
                  </List>
                </SuggestionsPaper>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>




   

<Dialog open={isFilterDialogOpen} onClose={handleCloseFilterDialog}>
<DialogTitle>Filter Options</DialogTitle>
<DialogContent>
  
<List>
            <ListItem button>
              <ListItemIcon>
                <NotificationsActiveIcon sx={{ color: 'red' }} />
              </ListItemIcon>
              <ListItemText primary="High Damage" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NotificationsIcon sx={{ color: 'orange' }} />
              </ListItemIcon >
              <ListItemText primary="Medium Damage" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NotificationAddTwoToneIcon sx={{ color: 'green' }} />
              </ListItemIcon>
              <ListItemText primary="Low Damage" />
            </ListItem>
</List>





</DialogContent>
</Dialog>

</>

  );
}

export default NavBar;
