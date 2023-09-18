import React, { useState } from 'react';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  ListItemAvatar,
  Avatar,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CloseIcon from '@mui/icons-material/Close';



function Menu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };
  

  return (
    <>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button>
            <ListItemText primary="" />
            <Card>
            <CardMedia
              component="img"
              height="200"
              image=""
              alt="Your Image"
              src="https://res.cloudinary.com/dktkavyr3/image/upload/v1694878224/OIP_cq2j7h.jpg"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                example: village Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AddressExample: 123 Main St, City
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +123-456-7890
              </Typography>
              <Typography variant="body2" color="text.secondary">
                status: danger
              </Typography>
              <Typography variant="body2" color="text.secondary">
                peaple: 1000 person
              </Typography>
            </CardContent>
          </Card>
          </ListItem>

          <ListItem button>
            <ListItemText primary="item 2" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="item 3" />
          </ListItem>
        </List>
      </Drawer>

      <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
    </>
  );
}

export default Menu;
