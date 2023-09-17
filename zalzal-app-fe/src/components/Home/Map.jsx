import React from "react";
import BingMapsReact from "bingmaps-react";

function Map() {
  return (
    <BingMapsReact
      bingMapsKey="AhWIRQ2jlGpIYCjYkTns5knl56C05ervAIg4S_6cekLW_Gy864oVc8b4LBphnGLK"
      height="500px"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="500px"
      viewOptions={{
        center: { latitude: 31.07317457220632, longitude: -8.406957080277902 },
        mapTypeId: "grayscale",
      }}
    />
  );
}

export default Map;