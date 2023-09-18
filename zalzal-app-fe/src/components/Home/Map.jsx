//https://learn.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/pushpin-syntax-and-icon-styles
import React, { useEffect } from "react";
import BingMapsReact from "bingmaps-react";
import Papa from 'papaparse'
function Map() {







  useEffect(() => {
    const csvFilePath = './Douars_50km.csv'; // Replace with the path to your CSV file

    // Use Fetch API to fetch the CSV file
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true, // Don't treat the first row as headers
          complete: (result) => {
            if (result.data && result.data.length > 0) {
              // Now you have an array of arrays representing CSV rows
              const csvRows = result.data;
              console.log(csvRows); // Log the parsed CSV data

              // To access individual values, you can iterate through csvRows
              csvRows.forEach((row) => {
                const longitude = row[0];
                const latitude = row[1];
                const villageName = row[2];

                console.log(`Longitude: ${longitude}, Latitude: ${latitude}, Village Name: ${villageName}`);
              });
            }
          },
        });
      })
      .catch((error) => {
        console.error("Error reading CSV file:", error);
      });
  }, []);



 




const handlePushpinClick = () => {
 console.log("handlePushpinClick")
}

const handleMoreInfoClick = () =>{
  console.log("handleMoreInfoClick")
}

 const pushPin = {
  center: {
    latitude: 31.07317457220632,
    longitude: -8.406957080277902,
  },
  options: {
    title: "Center EarthQuake",
    color:"red",
    icon:""
  },
  infobox: {
    title:"information",
    description: "This is an infobox for the pushpin.",
    actions: [
   {
    label:"More Info",
    eventHandler: handleMoreInfoClick,
   }
    ]
  },
  events: {
    click: handlePushpinClick,
  },
}


const pushPins = [pushPin]

  return (
    <BingMapsReact
      bingMapsKey="AhWIRQ2jlGpIYCjYkTns5knl56C05ervAIg4S_6cekLW_Gy864oVc8b4LBphnGLK"
      height="700px"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="100%"
      pushPins={pushPins}
      viewOptions={{
        mapTypeId: "Aerial",
        zoom: 10,
        center:{latitude:31.07317457220632, longitude:-8.406957080277902}
      }}
    />
  );
}

export default Map;
