
import axios from 'axios'


export const sendLocation = async (latitude, longitude) => {
    try {
      const res = await axios.post(`/api/v1/CheckUserLocation`, {
        latitude,
        longitude,
      });
      console.log('Location updated successfully:', res.data);
    } catch (error) {
      console.error('Error updating location:', error);
    }

};



export const sendDialogData = async (dialogData) => {
  try {
    const res = await axios.post(`/api/v1/villages/${dialogData}`, {
      dialogData,
    });
    console.log('User contributions added to village successfully:', res.data);
  } catch (error) {
    console.error('Error adding user contributions to village:', error);
  }
};

// update the contribution









