import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddTwoToneIcon from '@mui/icons-material/NotificationAddTwoTone';
import { Search as SearchIcon, FilterList as FilterIcon, } from "@mui/icons-material";
function NavBar() {
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [isHovered, setIsHovered ] = useState(false);
  

  const handleSearch = (event) => {
    // Implement your search logic here
    console.log('Searching for:', event.target.value);
  };

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
          // flexGrow: 1, 
          ml: 2, 
          borderRadius: '50px', 
          width: paperWidth,
          height:'50px',
           position: 'absolute', 
           left: '50%', 
           transform: 'translateX(-50%)', 
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
              sx={{textAlign:"center", paddingLeft:"10%", ...inputPlaceHolderStyle, }}
            />
          </Paper>
          <IconButton sx={{ p: '5px', left: '50%' }} aria-label="filter" onClick={handleFilterClick}>
            <FilterIcon sx={{color:"white", width:"50px"}} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>

    

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
