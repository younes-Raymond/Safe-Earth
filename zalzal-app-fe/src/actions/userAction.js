
import axios from 'axios'

export const sendLocation = async (latitude, longitude) => {
    try {
      const response = await axios.post('/api/v1/CheckUserLocation', {
        latitude,
        longitude,
      });
      console.log('Location updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating location:', error);
    }

};



// update the contribution









