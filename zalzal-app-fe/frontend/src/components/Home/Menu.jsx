import React, { useState , useRef, useEffect} from 'react';
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
import { 
  sendDialogData,
  getAllAnnouncement,
} from '../../actions/userAction';
import { useSelector } from 'react-redux';


function Menu() {

  const [open, setOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);
  const  isUserInsideCircle =  useSelector((s) => s.map.isUserInsideCircle);
  const [imageBase64, setImageBase64] = useState('');
  const [videoBase64, setVideoBase64] = useState(''); 
  const imageFileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);
  const [newNeed, setNewNeed ] = useState('')
  const [announcements, setAnnouncements] = useState([]);
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


const handleAddNeed = () => {
  if (newNeed.trim() !== '') {
    setFormValues((prevValues) => ({
      ...prevValues,
      needs: [...prevValues.needs, newNeed], // Add the new need to the array
    }));
    setNewNeed(''); // Clear the input field
  }
};

const handleRemoveNeed = (indexToRemove) => {
  setFormValues((prevValues) => ({
    ...prevValues,
    needs: prevValues.needs.filter((_, index) => index !== indexToRemove), // Remove the need at the specified index
  }));
};




useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getAllAnnouncement();
      setAnnouncements(data);
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error fetching announcements:', error);
    }
  };

  fetchData();
}, []); // The empty dependency array ensures the effect runs once after initial render

  
  useEffect(() => {
    if (isUserInsideCircle) {
      // console.log('yes its inside it im from menu compo..')
      setIsInfoDialogOpen(true)
    }
  }, [isUserInsideCircle]);




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
  const imageInput = imageFileInputRef.current;
  imageInput.accept = 'image/*'; // Set the accept attribute to allow only image files
  imageInput.click();
};


const handleAddVideoClick = () => {
  // Trigger the file input when the button is clicked
  const videoInput = videoFileInputRef.current;
  videoInput.accept = 'video/*'; // Set the accept attribute to allow only video files
  videoInput.click();
};


const handleFileInputChange = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0]; // Get the first selected file

    // Initialize a FileReader
    const reader = new FileReader();

    // Define a callback function for when the file is loaded
    reader.onload = (event) => {
      const base64Data = event.target.result; // This is the base64-encoded data

      // Check if it's an image or video and handle accordingly
      if (file.type.startsWith('image')) {
        setImageBase64(base64Data);
        console.log('Image Base64:', base64Data);
      } else if (file.type.startsWith('video')) {
        setVideoBase64(base64Data);
        console.log('Video Base64:', base64Data);
      }
    };

    // Read the file as a data URL (base64)
    reader.readAsDataURL(file);
  }
};



const handleSubmit = () => {
  validationSchema
    .validate(formValues, { abortEarly: false })
    .then(() => {
      // Create an object for dialogData
      const dialogData = {
        villageName: formValues.villageName,
        address: formValues.address,
        phone: formValues.phone,
        status: formValues.status,
        people: formValues.people,
        needs: formValues.needs, // Send the array of needs directly
        imageURL: imageBase64,
        // videoURL: videoBase64,
      };

      console.log(videoBase64);
      const formData = new FormData();
      formData.append('dialogData', JSON.stringify(dialogData));
      
      // Now you can send formData to your server
      sendDialogData(formData)
        .then((response) => {
          console.log('Response from server:', response);
          // Handle the response from the server as needed
        })
        .catch((error) => {
          console.error('Error sending data to server:', error);
          // Handle the error as needed
        });
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

    {/* start menu items  */}
   
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
  <List>
    {announcements.map((announcement) => (
      <ListItem key={announcement._id}>
        <Card>
          <Typography variant="h5" component="div" sx={{ textAlign: 'center', m: '3px' }}>
            {announcement.villageName}
          </Typography>
          {console.log(announcement.imageURL?.url)}
          <CardMedia
  component="img"
  height="200"
  alt="Your Image"
  src={announcement.imageURL?.url || ''}
/>

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {`Address: ${announcement.address}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Phone: ${announcement.phone}`}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex',
               alignItems: 'center', 
               
               justifyContent: 'space-between' }}
            >
              {`Status: ${announcement.status}`}
              <ListItemIcon>
                <NotificationsActiveIcon sx={{ color: 'red' }} />
              </ListItemIcon>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`People: ${announcement.people} person`}
            </Typography>
            <Button variant="outlined" onClick={handleInfoClick}>
              Request Village Info
            </Button>
          </CardContent>
        </Card>
      </ListItem>
    ))}
  </List>
</Drawer>

 






      {/* end menu items  */}

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
    <MenuItem value="Low">

    <ListItemIcon>
    <NotificationsActiveIcon sx={{ color: 'red' }} />
    </ListItemIcon>
    High</MenuItem>
    <MenuItem value="Medium">
    <ListItemIcon>
    <NotificationsIcon sx={{ color: 'orange' }} />
    </ListItemIcon >
    Medium</MenuItem>
    <MenuItem value="High"> 
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
        ref={imageFileInputRef}
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
        ref={videoFileInputRef}
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
  value={newNeed}
  onChange={(e) => setNewNeed(e.target.value)}
  InputProps={{
    endAdornment: (
      <IconButton size="small" onClick={handleAddNeed}>
        <AddCircleIcon />
      </IconButton>
    ),
  }}
/>
{/* Display added needs here */}
{formValues.needs.map((need, index) => (
  <div key={index}>
    <TextField value={need} variant="outlined" />
    <IconButton onClick={() => handleRemoveNeed(index)}>
      <DeleteIcon />
    </IconButton>
  </div>
))}
          <Button variant="outlined" onClick={handleCloseInfoDialog} style={{ marginRight: '16px' }}>
            Cancel
          </Button>
          <Button
  variant="contained"
  color="primary"
  onClick={handleSubmit}

  // disabled={Object.keys(formErrors).length > 0
  // }
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
