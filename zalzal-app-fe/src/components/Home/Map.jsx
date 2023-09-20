//Due to the asynchronous nature of the Bing Maps API you may encounter errors if you change props before the map has finished an initial load. You can pass a function to the onMapReady prop that will only run when the map has finished rendering.
//look at the issuse , https://github.com/milespratt/bingmaps-react/issues/56
//please read this article before start update this component: https://learn.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/asynchronous-requests
import React, { useEffect, useState } from "react";
import BingMapsReact from "bingmaps-react";
import Papa from 'papaparse'
import VillageData from './Douars50km.csv' 

function Map() {
  const [pushPins, setPushPins] = useState([]);
  const [bingMapReady, setBingMapReady] = useState(false);

 const CenterEarthQuake =  {
  latitude: 31.07317457220632,
  longitude: -8.406957080277902,
}

  const handlePushpinClick = () => {
    console.log("handlePushpinClick");
  };

  const handleMoreInfoClick = () => {
    console.log("handleMoreInfoClick");
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
              color: "red",
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


  return (
    <BingMapsReact
      bingMapsKey="AhWIRQ2jlGpIYCjYkTns5knl56C05ervAIg4S_6cekLW_Gy864oVc8b4LBphnGLK"
      height="700px"
      pushPins={bingMapReady ? pushPins : null} 
      onMapReady={() => {
        setBingMapReady(true)
      }}

      mapOptions={{
        navigationBarMode: "compact", //compact
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
  );
}

export default Map;
