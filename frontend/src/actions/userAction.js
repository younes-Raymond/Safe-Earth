import axios from 'axios';



// export const getAllAnnouncement = async () => {
//   try {
//     const res = await axios.get('/api/v1/getAnnouncement');
//     const announcementsArray = res.data.announcements;
//     console.log(announcementsArray);
    
//     // Return the data from the response
//     return res.data.announcements;
//   } catch (error) {
//     console.error('Error fetching announcements:', error);
//     throw error;
//   }
// };

export const sendQueryToDatabase =  async (query) => {
  try {
    const res  = await axios.get(`/api/v1/search/${query}`);
    // console.log(res.data);
return res.data
  } catch (error) {
   console.error('error getting results:', error)
   throw error;
  }
};



export const uploadCsvFileToServer = async (file) => {
  try {
    const res = await axios.post('./api/v1/uploadScvFile', file)
    console.log(res.data);
    return res.data
  } catch (error) {
    console.error('error getting results of scv file:', error)
  }
}