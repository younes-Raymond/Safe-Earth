import React from "react";
import BingMapsReact from "bingmaps-react";

function Map() {
  const center = { latitude: 31.07317457220632, longitude: -8.406957080277902 };

  const pushPinLocation = `${center.latitude},${center.longitude};5;P10`; // Example pushpin syntax
 console.log(pushPinLocation); 

  return (
    <BingMapsReact
      bingMapsKey="AhWIRQ2jlGpIYCjYkTns5knl56C05ervAIg4S_6cekLW_Gy864oVc8b4LBphnGLK"
      height="700px"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="100%"
      viewOptions={{
        center,
        mapTypeId: "Aerial",
        zoom: 6,
      }}
    //   pushPins={pushPinLocation}
    />
  );
}

export default Map;
