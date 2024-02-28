import React, { useState } from 'react';
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
  Snackbar,
  InputAdornment,
  TextField,
  Autocomplete,
  FormHelperText
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
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
import { uploadCsvDataToServer , downloadCsvFile, saveSettingsAdmin } from '../../actions/userAction'
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Country, State, City }  from 'country-state-city';
import { settingsSchema  } from '../Auth/validationShema';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const leafletMapStyles = [
  { title: 'Streets', value: 'streets' },
  { title: 'Satellite', value: 'satellite' },
  { title: 'Outdoors', value: 'outdoors' },
  // Add more Leaflet.js map styles as needed
];

const languageOptions = [
  { title: 'English', firstLetter: 'E' },
  { title: 'French', firstLetter: 'F' },
  { title: 'Arabic', firstLetter: 'A' },
];



const SettingsPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [csvData, setCsvData] = React.useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading ,setLoading ] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  // Define your state variables and other necessary state management hooks
  const formik = useFormik({
    initialValues: {
      fullName:'',
      email:'',
      associationNumber: '', 
      selectedCountry: '',
      selectedState: {},
      selectedCity: {},
      mapStyle:'Streets',
      selectedLanguage:''
    },
    validationSchema: settingsSchema,
    onSubmit: async (values) => {
      sendformIkToServer(values); // Pass the actual form values
    },
  });
  
  const sendformIkToServer = async (formIkData) => {
    try {
      // Call your function to update details
      const response = await saveSettingsAdmin(formIkData);
  
      // Handle the response accordingly
      console.log('Response from savesettingsAdmin func:', response);
      
      // Dispatch an action if needed
      // dispatch(saveSettingsAdmin(response)); // Assuming you have an action to update settings
    } catch (error) {
      // Handle errors
      console.error('Error updating details:', error);
    }
  }
  

  React.useEffect(() => {
    // Fetch countries
    const fetchCountries = async () => {
      const countriesData = await Country.getAllCountries();
      // console.log(countriesData)
      setCountries(countriesData);
    };

    fetchCountries();
  }, []);


  const handleCountryChange = async (event, value) => {
    // console.log('value: ',value)
    setSelectedCountry(value);
    formik.setFieldValue('selectedCountry', value); 
    formik.setFieldValue('selectedState', '');

    setStates([]);
    setCities([]);
    // Fetch states of the selected country
    try {
      const statesData = await State.getStatesOfCountry(value);
      console.log('state data: ',statesData)
      setStates(statesData);
      setSelectedState(''); // Reset selected state when changing the country
    } catch (error) {
      console.error('Error fetching states:', error);
      
    }
  };
  

  const handleStateChange = (event, value) => {
    // console.log('value of state: ',value)
    setSelectedState(value);
    // const stateObject = states.find(state => state.isoCode === value)
    formik.setFieldValue('selectedState', value);
    setCities([])

    // Fetch cities of the selected state
    const fetchCities = async () => {
      console.log('selected country: => ',selectedCountry)
      const citiesData = await City.getCitiesOfState(selectedCountry,value);
      console.log('cities:', citiesData)
      setCities(citiesData);
    };

    fetchCities();
  };

 


  const handleFileUpload = async () => {
    setLoading(true);

    // Convert the CSV data to an array of lines
    const lines = csvData.split('\n');
 
    // Prepare the data for uploading to the server
    const dataToSend = lines.map((line) => {
        const [lat, lon, name] = line.split(',');

        // Check if the line has valid data (not empty and contains latitude, longitude, and name)
        if (lat.trim() !== '' && lon.trim() !== '' && name.trim() !== '') {
            return { lat: lat.trim(), lon: lon.trim(), name: name.trim() };
        } else {
            return null; // Return null for lines with missing or empty data
        }
    }).filter(item => item !== null); // Filter out null values (empty lines or lines with missing data)

    
    // Call the function to upload the prepared data to the server
    console.log('dataToSend:', dataToSend);
    try {
      const res = await uploadCsvDataToServer(dataToSend);
      console.log('res:', res);

      // Show success snackbar
      setSnackbarSeverity('success');
      setSnackbarMessage('🎉 Data saved successfully! 🎉 Your villages data is ready for download.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving villages:', error);

      // Show error snackbar
      setSnackbarSeverity('error');
      setSnackbarMessage('😔 Internal Server Error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
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
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 8,
          width: '100%',
          m: 1,
          left: '10%',
          overflowY: 'auto',  
          maxHeight: 'calc(100vh - 120px)',
        }}
      >
        
        <Card
      sx={{
        p: 1,
        border: '1px solid #ddd',
        borderRadius: 8,
        width: '90%',
        m: '5%',
        color:'#fff',
        backgroundImage:'url(https://source.unsplash.com/random?wallpapers)',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center'
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
        </FormGroup>
      </CardContent>
    </Card>
    
        

      <Box display="flex" flexDirection="column" mb={2}>

      <Box mb={2} display="flex" alignItems="center" width='90%'>
  <MapIcon sx={{ mr: 2 }} />
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel id="map-style-label">Maps Style</InputLabel>
    <Select
    label="MapStyles"
      labelId="map-style-label"
      id="map-style"
      value={formik.values.mapStyle}
      onChange={formik.handleChange}
      style={{ width: '100%' }}
    >
      {leafletMapStyles.map((style) => (
        <MenuItem key={style.value} value={style.title}>
          {style.title}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>


    <Box mb={2} display="flex" alignItems="center" width='90%'>
  <LanguageIcon sx={{ mr: 2 }} />
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel id="language-label">Language</InputLabel>
    <Select
      label='Language'
      labelId="language-label"
      id="language"
      name="selectedLanguage" // Add the name attribute
      value={formik.values.selectedLanguage}
      onChange={formik.handleChange} // Use Formik's handleChange
    >
      {languageOptions.map((language) => (
        <MenuItem key={language.title} value={language.title}>
          {language.title}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>



<Box marginBottom={'5%'}>


  <FormControl sx={{ minWidth: 200, width: '90%' }}>
  <InputLabel id="country-label">Country</InputLabel>
    <Select
      label="Country"
      labelId="country-label"
      id="country"
      value={formik.values.selectedCountry}
      onChange={(e) => handleCountryChange(e, e.target.value)}
      error={formik.touched.selectedCountry && Boolean(formik.errors.selectedCountry)}
    >
      {countries.map((country) => (
        <MenuItem key={country.isoCode} value={country.isoCode}>
          {country.name}
        </MenuItem>
      ))}
    </Select>
    {formik.touched.selectedCountry && formik.errors.selectedCountry && (
      <FormHelperText error>{formik.errors.selectedCountry}</FormHelperText>
    )}
  </FormControl>

  <FormControl sx={{ minWidth: 200, width: '90%', marginTop: 2 }}>
    <InputLabel id="state-label">State</InputLabel>
    <Select
      label='State'
      labelId="state-label"
      id="state"
      value={formik.values.selectedState}
      onChange={(e) => handleStateChange(e, e.target.value)}
      disabled={!formik.values.selectedCountry}
      error={formik.touched.selectedState && Boolean(formik.errors.selectedState)}
    >
      {states.map((state) => (
        <MenuItem key={state.isoCode} value={state.isoCode}>
          {state.name}
        </MenuItem>
      ))}
    </Select>
    {formik.touched.selectedState && formik.errors.selectedState && (
      <FormHelperText error>{formik.errors.selectedState}</FormHelperText>
    )}
  </FormControl>

  <FormControl sx={{ minWidth: 200, width: '90%', marginTop: 2 }}>
    <InputLabel id="city-label">City</InputLabel>
    <Select
      label="City"
      labelId="city-label"
      id="city"
      value={formik.values.selectedCity}
      onChange={(e) => formik.setFieldValue('selectedCity', e.target.value)}
      disabled={!formik.values.selectedState}
      error={formik.touched.selectedCity && Boolean(formik.errors.selectedCity)}
    >
      {cities.map((city) => (
        <MenuItem key={city.name} value={city.name}>
          {city.name}
        </MenuItem>
      ))}
    </Select>
    {formik.touched.selectedCity && formik.errors.selectedCity && (
      <FormHelperText error>{formik.errors.selectedCity}</FormHelperText>
    )}
  </FormControl>
</Box>


<Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>

<Box mb={2} display="flex"  alignItems='center' sx={{width:'90%'}} >
            <PersonIcon sx={{ mr: 2 }} />
            <TextField
  label="Full Name"
  name="fullName" 
  value={formik.values.fullName}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
  helperText={formik.touched.fullName && formik.errors.fullName}
  style={{ width: '100%' }}
/>
</Box>


<Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
  <TextField
    label="Association Number"
    name="associationNumber"
    value={formik.values.associationNumber}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.associationNumber && Boolean(formik.errors.associationNumber)}
    helperText={formik.touched.associationNumber && formik.errors.associationNumber}
    style={{ width: '100%' }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <BusinessIcon />
        </InputAdornment>
      ),
    }}
  />
</Box>



<Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
<EmailIcon sx={{ mr: 2 }} />
<TextField
  type="email"
  label="Email"
  name="email" 
  value={formik.values.email}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.email && Boolean(formik.errors.email)}
  helperText={formik.touched.email && formik.errors.email}
  style={{ width: '100%' }}
/>
</Box>

        <Box mb={2} display="flex" alignItems="center" sx={{ width: '100%' }}>

        <TextField
          label="CSV Data"
          multiline
          rows={10}
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          fullWidth
          disabled={loading} //disable text enter when data loading to prevent error interval
        />
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple={false}
          type="file"
          onChange={handleFileSelect}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
<label htmlFor='contained-button-file'>
  <IconButton component="span">
    <CloudUploadIcon />
  </IconButton>
</label>

  <IconButton onClick={() => setOpenDialog(true)}>
    <HelpOutlineIcon />
  </IconButton>

  </Box>

  </Box>




      <Typography variant="body1">
        Example format:lat, lon, name, London Town etc.
      </Typography>






      <Box
  sx={{
    p: 3,
          border: '1px solid #ddd',
          borderRadius: 8,
          width: '90%',
          m: 1,
          left: '10%',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'space-evenly'

  }}
>
  <Box >
  <Button variant="contained" disabled={loading} onClick={handleFileUpload} startIcon={loading ? <CircularProgress size={24}  /> : <CloudUploadIcon />}>
    Upload CSV File
  </Button>
  </Box>
  <Box sx={{ mr: 1 }}>
  <Button variant="contained" disabled={loading} onClick={downloadCsvFile} startIcon={loading ? <CircularProgress size={24}  /> : <CloudUploadIcon />}>
    Download Current  CSV Data
  </Button>
  </Box>
</Box>




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
    51.5074,-0.1278,London,Capital city of the United Kingdom
    <br />
    51.5074,-0.1278,Westminster,Administrative area in central London
  </Typography>
</DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

    
      <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>

    </Box>

    <Button
  type="submit"
  variant="contained" 
  color='primary'
  onClick={formik.handleSubmit}
  // disabled={!formik.isValid } 
>
  Save
</Button>


        </Box>
     
     
     
  );
};

export default SettingsPage;
