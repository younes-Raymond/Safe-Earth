import React, { useState , useRef} from 'react';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  ListItemIcon,
  // Alert
} from '@mui/material';

import { Menu as MenuIcon, Search as SearchIcon, Photo as PhotoIcon, VideoLibrary as VideoIcon, LiveTv as LiveTvIcon, AddCircle as AddCircleIcon, Delete as DeleteIcon } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddTwoToneIcon from '@mui/icons-material/NotificationAddTwoTone';
import * as Yup from 'yup';
import { sendDialogData } from '../../actions/userAction';



function Menu() {

  const [open, setOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [formValues, setFormValues] = useState({
    villageName: '',
    address: '',
    phone: '',
    status: '',
    people: '',
    imageURL: '',
    videoURL: '',
    liveStreamURL: '',
    needs: [],
  });
  
  const validationSchema = Yup.object().shape({
    villageName: Yup.string().required('Village Name is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone is required'),
    status: Yup.string().required('Status is required'),
    people: Yup.number().typeError('People must be a number').integer('People must be an integer').min(1, 'People must be greater than or equal to 0').required('People is required'),
    imageURL: Yup.string().url('Invalid URL format'),
    videoURL: Yup.string().url('Invalid URL format'),
    liveStreamURL: Yup.string().url('Invalid URL format'),
    needs: Yup.array().of(Yup.string()),
  });




  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

   
  const handleSearch = (event) => {
    console.log("Searching for:", event.target.value);

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  
    // Run Yup validation for the changed field
    Yup.reach(validationSchema, name)
      .validate(value)
      .then(() => {
        // Clear the error for this field
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      })
      .catch((error) => {
        // Set the error message for this field
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      });
  };
  
const handleInfoClick = () => {
    setIsInfoDialogOpen(true);
}

const handleCloseInfoDialog = () => {
  setIsInfoDialogOpen(false)
}


const handleAddImageClick = () => {
  // Trigger the file input when the button is clicked
  fileInputRef.current.click();
};

const handleAddVideoClick = () => {
  // Trigger the file input when the button is clicked
  fileInputRef.current.click();
};


const handleFileInputChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedImage(file);
    setIsInfoDialogOpen(true);
  }
};

const handleSubmit = () => {
  validationSchema
    .validate(formValues, { abortEarly: false })
    .then(() => {
      const dialogData = {
        villageName: formValues.villageName,
        address: formValues.address,
        phone: formValues.phone,
        status: formValues.status,
        people: formValues.people,

      };
      
      sendDialogData(dialogData)
    })
    .catch((errors) => {
      const fieldErrors = {};
      errors.inner.forEach((error) => {
        fieldErrors[error.path] = error.message;
      });
      // Set form errors for all fields
      setFormErrors(fieldErrors);
    });
};

  return (
    <>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
     
        <List>
          <ListItem button>
            <ListItemText primary="" />

            <Card>
            <Typography variant="h5" component="div" sx={{textAlign:'center', m:'3px'}}>
              village Name
              </Typography>
            <CardMedia
              component="img"
              height="200"
              image=""
              alt="Your Image"
              src="https://res.cloudinary.com/dktkavyr3/image/upload/v1694878224/OIP_cq2j7h.jpg"
            />
            <CardContent>
             
              <Typography variant="body2" color="text.secondary">
                AddressExample: 123 Main St, City
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +123-456-7890
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{display:'flex', alignItems:'center', justifyContent: "space-between"}}>
                status: High Damage 
                <ListItemIcon>
    <NotificationsActiveIcon sx={{ color: 'red' }} />
    </ListItemIcon>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                peaple: 1000 person
              </Typography>
              <Button variant="outlined" onClick={handleInfoClick}>
                  Request Village Info
                </Button>
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

      <Dialog open={isInfoDialogOpen} onClose={handleCloseInfoDialog} maxWidth="md">
        <DialogTitle>Request Village Information</DialogTitle>
        <DialogContent>
        <TextField
  label="Village Name"
  fullWidth
  variant="outlined"
  name="villageName" 
  value={formValues.villageName}
  onChange={handleChange}
  error={!!formErrors.villageName}
  helperText={formErrors.villageName}
/>

<TextField
  label="Address"
  fullWidth
  variant="outlined"
  name="address"
  value={formValues.address}
  onChange={handleChange}
  error={!!formErrors.address}
  helperText={formErrors.address}
/>

<TextField
  label="Phone"
  fullWidth
  variant="outlined"
  name="phone"
  value={formValues.phone}
  onChange={handleChange}
  error={!!formErrors.phone}
  helperText={formErrors.phone}
/>

<FormControl fullWidth variant="outlined" >
  <InputLabel>Status</InputLabel>
  <Select
    label="Status"
    fullWidth
    name="status"
    value={formValues.status}
    onChange={handleChange}
    error={!!formErrors.status}
  >
    <MenuItem value="none">
      <em>Select Status</em>
    </MenuItem>
    <MenuItem value="low">

    <ListItemIcon>
    <NotificationsActiveIcon sx={{ color: 'red' }} />
    </ListItemIcon>
    High</MenuItem>
    <MenuItem value="medium">
    <ListItemIcon>
    <NotificationsIcon sx={{ color: 'orange' }} />
    </ListItemIcon >
    Medium</MenuItem>
    <MenuItem value="high"> 
    <ListItemIcon>
    <NotificationAddTwoToneIcon sx={{ color: 'green' }} />
    </ListItemIcon>
    Low</MenuItem>
  </Select>
</FormControl>


<TextField
  label="People"
  fullWidth
  variant="outlined"
  type="number" 
  name="people" 
  value={formValues.people}
  onChange={handleChange}
  error={!!formErrors.people}
  helperText={formErrors.people}
/>

          <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
            Image URLs:
          </Typography>
          <TextField
            label="Image URL"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <PhotoIcon />
                </IconButton>
              ),
            }}
          />
         <Button
        variant="outlined"
        startIcon={<AddCircleIcon />}
        onClick={handleAddImageClick}
      >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
            Add Image
          </Button>

          <div><TextField value=""  variant="outlined" /><IconButton><DeleteIcon /></IconButton></div>
          <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
            Video URLs:
          </Typography>
          <TextField
            label="Video URL"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <VideoIcon />
                </IconButton>
              ),
            }}
          />

          <label>
          <Button 
          variant="outlined" 
          startIcon={<AddCircleIcon />}
          onClick={handleAddVideoClick}
          >
            Add Video
            </Button>

            <input
        type="file"
        ref={fileInputRef}
        accept="video/*"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
      </label>
          {/* Display added video URLs here */}
          {/* Example: <div><TextField value="video1.mp4" variant="outlined" /><IconButton><DeleteIcon /></IconButton></div> */}
          <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
            Live Stream URL:
          </Typography>
          <TextField
            label="Live Stream URL"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <LiveTvIcon />
                </IconButton>
              ),
            }}
          />
          <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
            Needs:
          </Typography>
          <TextField
            label="Need"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <AddCircleIcon />
                </IconButton>
              ),
            }}
          />
          {/* Display added needs here */}
          Example: <div><TextField value="Water" variant="outlined" /><IconButton><DeleteIcon /></IconButton></div>
          <Button variant="outlined" onClick={handleCloseInfoDialog} style={{ marginRight: '16px' }}>
            Cancel
          </Button>
          <Button
  variant="contained"
  color="primary"
  onClick={handleSubmit}
  disabled={Object.keys(formErrors).length > 0}
>
  Upload
</Button>

        </DialogContent>
      </Dialog>
  

  

      <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
    </>
  );

}

export default Menu;
