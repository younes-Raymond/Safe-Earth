import { sendLocation } from "../actions/userAction";

export const getLocationAndSendOnMapReady = async () => {
  const getLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('latitude:', latitude, 'longitude:', longitude);
          sendLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current position:', error);
          if (error.message.includes('User denied Geolocation')) {
            // Handle user denial here
          } else {
            // Handle other errors or fallback to IP-based location
          }
        },
        { enableHighAccuracy: true }
      );
    } catch (error) {
      console.error('Error accessing geolocation:', error);
      // Handle the error here and call the function to get location by IP
      // getLocationByIP(materialId); // we will do it in the future, please remember me in the meeting
    }
  };

  getLocation();
};



