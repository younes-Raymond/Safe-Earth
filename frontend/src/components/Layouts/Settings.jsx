import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  Dialog,
  DialogTitle,
  CardContent,
  DialogContent, 
  DialogActions,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { uploadCsvFileToServer } from '../../actions/userAction'
const leafletMapStyles = [
  { title: 'Streets', value: 'streets' },
  { title: 'Satellite', value: 'satellite' },
  { title: 'Outdoors', value: 'outdoors' },
  // Add more Leaflet.js map styles as needed
];

const citiesInMorocco = ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier'];

const languageOptions = [
  { title: 'English', firstLetter: 'E' },
  { title: 'French', firstLetter: 'F' },
  { title: 'Arabic', firstLetter: 'A' },
];



const SettingsPage = () => {
  const defaultMapStyle = 'Streets';
  const [mapStyle, setMapStyle] = useState(defaultMapStyle);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = React.useState(false);
  const [csvData, setCsvData] = React.useState('');
  const [openDialog, setOpenDialog] = useState(false);



  const handleSave = () => {
    // Add logic to save the settings
    console.log('Settings saved!');
  };


  const handleFileUpload = () => {
    // Convert the CSV data to an array of lines
    const lines = csvData.split('\n');

    // Prepare the data for uploading to the server
    const dataToSend = lines.map((line) => {
      const [lat, lon, name, details] = line.split(',');
      return { lat, lon, name, details };
    });

    // Call the function to upload the prepared data to the server
    uploadCsvFileToServer(dataToSend)
      .then((data) => {
        console.log('Response from server:', data);
      })
      .catch((error) => {
        console.error('Error uploading CSV file:', error);
      });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvData(e.target.result);
      };
      reader.readAsText(file);
    }
  };


  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };


  const handleMapStyleChange = (_, newValue) => {
    setMapStyle(newValue);
  };

  const DarkModeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >

      <Box
        sx={{
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 8,
          width: '80%',
          m: 1,
          left: '10%',
          overflowY: 'auto',  // Add overflowY to enable scrolling
          maxHeight: 'calc(100vh - 120px)',
        }}
      >
        
        <Card

      sx={{
        p: 1,
        border: '1px solid #ddd',
        borderRadius: 8,
        width: '80%',
        m: 10,
        left: '10%',
      }}
    >
         <Typography variant="h5" mb={3}>
          <AccountCircleIcon sx={{ m:1}} />
          Profile Settings
        </Typography>

      <CardContent>
        <FormGroup sx={{ mb: 3 }}>
          {/* Add more switches here */}
          <FormControlLabel
          control={<DarkModeSwitch checked={darkMode} onChange={handleDarkModeToggle} />}
          label="Dark Mode"
        />
          <FormControlLabel
            control={<Switch />}
            label="Toggle Switch 2"
          />
        </FormGroup>
      </CardContent>
    </Card>
    
        

        <Box display="flex" flexDirection="column" mb={2}>

        <Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
      <MapIcon sx={{ mr: 2 }} />
      <Autocomplete
        id="map-style"
        options={leafletMapStyles}
        getOptionLabel={(option) => option.title}
        value={mapStyle}
        onChange={handleMapStyleChange}
        renderInput={(params) => <TextField {...params} label="How Maps Look Like" />}
        style={{ width: '100%' }}
      />
    </Box>


          <Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
            <LanguageIcon sx={{ mr: 2 }} />
            <FormControl sx={{ minWidth: 200, width: '100%' }}>
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languageOptions.map((language) => (
                  <MenuItem key={language.title} value={language.title}>
                    {language.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
            <LocationCityIcon sx={{ mr: 2 }} />
            <FormControl sx={{ minWidth: 200, width: '100%' }}>
              <InputLabel id="city-label">City in Morocco</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {citiesInMorocco.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
            <LockIcon sx={{ mr: 2 }} />
            <TextField
              type="password"
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: '100%' }}
            />
          </Box>

          <Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
            <LockIcon sx={{ mr: 2 }} />
            <TextField
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%' }}
            />
          </Box>

          <Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
            <LockIcon sx={{ mr: 2 }} />
            <TextField
              type="password"
              label="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              style={{ width: '100%' }}
            />
          </Box>

          <Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
            <PersonIcon sx={{ mr: 2 }} />
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ width: '100%' }}
            />
          </Box>

          <Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
            <EmailIcon sx={{ mr: 2 }} />
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%' }}
            />
          </Box>
        
      <Box display="flex" alignItems="center">
        <TextField
          label="CSV Data"
          multiline
          rows={10}
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          fullWidth
        />
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple={false}
          type="file"
          onChange={handleFileSelect}
        />
    <IconButton component="span">
      <CloudUploadIcon />
    </IconButton>
  <IconButton onClick={() => setOpenDialog(true)}>
    <HelpOutlineIcon />
  </IconButton>
      </Box>
      <Typography variant="body1">
        Example format:lat, lon, name, London Town etc.
      </Typography>
      <Button variant="contained" onClick={handleFileUpload}>Upload CSV File</Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>CSV Data Format</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please enter the CSV data in the following format:
            <br />
            <br />
            Latitude, Longitude, Name, Details if applicable
            <br />
            For example:
            <br />
            -8.4162805,31.3821957,TALAMANZOU,TALAMANZOU
            <br />
            -8.4410987,31.2326184,2OUIAT SIDI BOUATHMANE,ZAOUIAT SIDI BOUATHMANE
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
  );
};

export default SettingsPage;
