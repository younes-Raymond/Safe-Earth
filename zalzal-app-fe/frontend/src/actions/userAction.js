
import axios from 'axios'


export const sendDialogData = async (DialogData) => {
  try {
    const res = await axios.post(`/api/v1/villages/${DialogData}`, {
      DialogData
    });
    console.log('User contributions added to village successfully:', res.data);
  } catch (error) {
    console.error('Error adding user contributions to village:', error);
  }
};










