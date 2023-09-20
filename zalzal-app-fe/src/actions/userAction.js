
import axios from 'axios'

export const sendLocation = async (latitude, longitude) => {
    try {
      const res = await axios.post('/api/v1/CheckUserLocation', {
        latitude,
        longitude,
      });
      console.log('Location updated successfully:', res.data);
    } catch (error) {
      console.error('Error updating location:', error);
    }

};

// function to update the village damageLevel
export const updateVillageDamageLevel = async (villageName, damageLevel) => {
  try {
    const res = await axios.put(`/api/v1/villages/${villageName}`, {
      damageLevel,
    });
    console.log('Village damage level updated successfully:', res.data);
  } catch (error) {
    console.error('Error updating village damage level:', error);
  }
};

// function to update the village people affected
export const updateVillagePeopleAffected = async (villageName, peopleAffected) => {
  try {
    const res = await axios.put(`/api/v1/villages/${villageName}`, {
      peopleAffected,
    });
    console.log('Village people affected updated successfully:', res.data);
  } catch (error) {
    console.error('Error updating village people affected:', error);
  }
};

// function to update the village imageUrls
export const updateVillageImageUrls = async (villageName, imageUrls) => {
  try {
    const res = await axios.put(`/api/v1/villages/${villageName}`, {
      imageUrls,
    });
    console.log('Village image URLs updated successfully:', res.data);
  } catch (error) {
    console.error('Error updating village image URLs:', error);
  }
};

// function to update the village videoUrls
export const updateVillageVideoUrls = async (villageName, videoUrls) => {
  try {
    const res = await axios.put(`/api/v1/villages/${villageName}`, {
      videoUrls,
    });
    console.log('Village video URLs updated successfully:', res.data);
  } catch (error) {
    console.error('Error updating village video URLs:', error);
  }
};

// function to add the village liveStreamUrl
export const addVillageLiveStreamUrl = async (villageName, liveStreamUrl) => {
  try {
    const res = await axios.put(`/api/v1/villages/${villageName}`, {
      liveStreamUrl,
    });
    console.log('Village live stream URL added successfully:', res.data);
  } catch (error) {
    console.error('Error adding village live stream URL:', error);
  }
};

// function to add the village userContributions
export const addUserContributionsToVillage = async (villageName, userContributions) => {
  try {
    const res = await axios.put(`/api/v1/villages/${villageName}`, {
      userContributions,
    });
    console.log('User contributions added to village successfully:', res.data);
  } catch (error) {
    console.error('Error adding user contributions to village:', error);
  }
};



export const sendDialogData = async (dialogData) => {
  try {
    const res = await axios.post('/api/v1/sendDialogData', dialogData);

    console.log('Dialog data sent successfully:', res.data);
  } catch (error) {
    console.error('Error sending dialog data:', error);
  }
};


export const searchKeyword = async (keyword) => {
  try {
    const res = await axios.post(`/api/v1/${keyword}`);
    console.log(res.data);
  } catch (error) {
    console.error('Error sending keyword data:', error);
  }
};


