import axios from 'axios';


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



// Usage example:
export const uploadCsvDataToServer = async (csvData) => {
  try {
    const res = await axios.post('/api/v1/uploadCsvData', csvData );
    console.log('res:',res);
    return res;
  } catch (error) {
    console.error('Error uploading CSV data:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};



// Usage example:
export const getAllVillagesData = async (csvData) => {
  try {
    const res = await axios.get('/api/v1/getAllVilagesData');
    // console.log('res:',res);
    return res.data;
  } catch (error) {
    console.error('Error uploading CSV data:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};



export const downloadCsvFile = async () => {
  try {
    const res = await axios.get('/api/v1/downloadCsvFile', {
      responseType: 'blob' // Specify response type as blob to handle binary data
    });

    // Create a blob object from the response data
    const blob = new Blob([res.data], { type: 'text/csv' });

    // Create a download link element
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'villages.csv'; // Set the filename for the downloaded file
    document.body.appendChild(a);

    // Trigger the download by simulating a click on the link
    a.click();

    // Clean up by removing the temporary URL and link element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Log the response data if needed
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error('Error downloading CSV file:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};

