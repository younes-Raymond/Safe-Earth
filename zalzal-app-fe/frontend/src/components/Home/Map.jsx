import React, { useEffect, useState,} from "react";
import BingMapsReact from "bingmaps-react";
import Papa from 'papaparse'
import VillageData from './Douars50km.csv' 
import { getLocationAndSendOnMapReady } from "../../utils/getLocation";
import * as geolib from 'geolib'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert'
import { 
Alert,
Typography
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setUserInsideCircle } from "../../reducers/mapSlice";


function Map() {
  const [pushPins, setPushPins] = useState([]);
  const [bingMapReady, setBingMapReady] = useState(false);
  const BingMapApiKey = "AhWIRQ2jlGpIYCjYkTns5knl56C05ervAIg4S_6cekLW_Gy864oVc8b4LBphnGLK";
  // const [userLocation, setUserLocation] = useState(null); 
  const [alertOpen , setAlertOpen ] = useState(false);
  const dispatch = useDispatch();
  const isUserInsideCircle = useSelector((s) => s.map.isUserInsideCircle);

  const CenterEarthQuake = {
    latitude: 31.07317457220632,
    longitude: -8.406957080277902,
  }


  const circleRadiusInMeters = 100 * 1000; 

  const handlePushpinClick = () => {
    console.log("handlePushpinClick");
  };

  const handleMoreInfoClick = () => {
    console.log("hansssadleMoreInfoClick");
  };



  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(VillageData, {
        download: true,
        delimiter: ",",
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            latitude: parseFloat(row[1]),
            longitude: parseFloat(row[0]),
            name: row[2],
          }));

          const pushPinsData = parsedData.map((village) => ({
            center: {
              latitude: village.latitude,
              longitude: village.longitude,
            },

            options: {
              title: village.name,
              color: "red", //
              icon: "",
              enableHoverStyle: true,
              label: village.name,
            },
            infobox: {
              title: "Information",
              description: "This is an infobox for the pushpin.",
              actions: [
                {
                  label: "More Info",
                  eventHandler: handleMoreInfoClick,
                },
              ],
            },
            events: {
              click: handlePushpinClick,
            },
          }));

          setPushPins(pushPinsData);
          setBingMapReady(true);
        },
      });
    };
    fetchParseData();
  }, []);



  // i use this to test the isuserIndideCircel function 
const userLocation= {
  latitude:31.2326184,
  longitude:-8.4410987
}

  
const ckeckIsUserInsideCircle = () => {
    if (userLocation && userLocation.latitude !== undefined && userLocation.longitude !== undefined) {
      const { latitude, longitude } = userLocation;
      if (CenterEarthQuake && typeof CenterEarthQuake.latitude === 'number' && typeof CenterEarthQuake.longitude === 'number') {
        const distanceInMeters = geolib.getDistance(
          { latitude, longitude },
          CenterEarthQuake
        );
  
        return distanceInMeters <= circleRadiusInMeters;
      }
    }
    return false;
  };
  

const handleMapReady = () => {
    // console.log("Bing Map is ready for use.");
    if (alertOpen){
      setAlertOpen(false);
    }
    getLocationAndSendOnMapReady()
      .then((location) => {
        // setUserLocation(location);
        // Check if the user is inside the circle
        const insideCircle = ckeckIsUserInsideCircle();
        dispatch(setUserInsideCircle(insideCircle));
        if(insideCircle){
          setAlertOpen(true);
          console.log("User is inside the circle:", insideCircle);
        } else {
          console.log("User is outside the circle.", insideCircle)
        }
      })
      .catch((error) => {
        console.error('Error getting user location:', error);
      });
  };

  
const handleAlertClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setAlertOpen(false)
}


  return (
    <>
    <BingMapsReact
      bingMapsKey= {BingMapApiKey} 
      height="700px"
      pushPins={bingMapReady ? pushPins : null}
      onMapReady={handleMapReady} 
      mapOptions={{
        navigationBarMode: "compact",
        showBreadcrumb: true,
        colorScheme: {
          primaryColor: "white"
        },
      }}
      width="100%"
      viewOptions={{
        mapTypeId: "aerial",
        labelOverlay: "visible",
        zoom: 9.5,
        center: CenterEarthQuake
      }}
    />


<div className="snackBar">
<Snackbar

  sx={{
    width: '40%',
    height: 'auto',
    '& .MuiAlert-root': {
      width: '100%', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity:'0.7'
    },
  }}
  open={alertOpen}
  autoHideDuration={6000}
  onClose={handleAlertClose}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    severity="info"
    onClose={handleAlertClose}
    sx={{ width: '100%' }} 
  >
    Get in touch with us to help us gather data about the people and the village.
  </MuiAlert>
</Snackbar>
</div>





  </>
  );
}

export default Map;
