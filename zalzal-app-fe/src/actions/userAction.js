
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

// function to update the village damageLevel
export const updateVillageDamageLevel = async (villageName, damageLevel) => {
  try {
    const response = await axios.put(`/api/villages/${villageName}`, {
      damageLevel,
    });
    console.log('Village damage level updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating village damage level:', error);
  }
};

// function to update the village people affected
export const updateVillagePeopleAffected = async (villageName, peopleAffected) => {
  try {
    const response = await axios.put(`/api/villages/${villageName}`, {
      peopleAffected,
    });
    console.log('Village people affected updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating village people affected:', error);
  }
};

// function to update the village imageUrls
export const updateVillageImageUrls = async (villageName, imageUrls) => {
  try {
    const response = await axios.put(`/api/villages/${villageName}`, {
      imageUrls,
    });
    console.log('Village image URLs updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating village image URLs:', error);
  }
};

// function to update the village videoUrls
export const updateVillageVideoUrls = async (villageName, videoUrls) => {
  try {
    const response = await axios.put(`/api/villages/${villageName}`, {
      videoUrls,
    });
    console.log('Village video URLs updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating village video URLs:', error);
  }
};

// function to add the village liveStreamUrl
export const addVillageLiveStreamUrl = async (villageName, liveStreamUrl) => {
  try {
    const response = await axios.put(`/api/villages/${villageName}`, {
      liveStreamUrl,
    });
    console.log('Village live stream URL added successfully:', response.data);
  } catch (error) {
    console.error('Error adding village live stream URL:', error);
  }
};

// function to add the village userContributions
export const addUserContributionsToVillage = async (villageName, userContributions) => {
  try {
    const response = await axios.put(`/api/villages/${villageName}`, {
      userContributions,
    });
    console.log('User contributions added to village successfully:', response.data);
  } catch (error) {
    console.error('Error adding user contributions to village:', error);
  }
};

// update the contribution









