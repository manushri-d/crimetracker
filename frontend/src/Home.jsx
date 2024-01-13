import React, { useState, useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  position: 'absolute',
  bottom: '1em',
  right: '1em',
  width: '35vw',
  height: '40vh',
};

const LALocation = {
  lat: 34.0549, 
  lng: -118.2426, 
};

const markerLocations = [
  { lat: 34.1685, lng: -118.4019 },
  { lat: 34.1867, lng: -118.4225 },
  { lat: 34.0459, lng: -118.2545 },
  { lat: 34.0538, lng: -118.2667 },
  { lat: 34.1866, lng: -118.5535 },
];

export const Home =  (given) => {  
  const [areaName, setAreaName] = useState('');
  const [areaDetails, setAreaDetails] = useState(null);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBrzOqPg6zp8HAwcsdp9-fufNAwomtodbQ',
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/search?area_name=${encodeURIComponent(areaName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const responseData = await response.json();
  
      if (Array.isArray(responseData) && responseData.length > 0) {
        setAreaDetails(responseData); 
      } else {
        setAreaDetails([]); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="home-container">
      <h1>Crime Tracker</h1>  
      <form className="search-container" onSubmit={handleSearch}>
        <h2>What area do you want to go to?</h2>
        <label htmlFor="search">Search</label>
        <input onChange={(e) => setAreaName(e.target.value)} type="text" placeholder="Van Nuys" id="search"></input> 
        <button type="submit">Submit</button>   
        <div className="button-container">
          <button className="top-right-button" onClick={() => given.onPageSwitch('hello')}>User Settings</button>
          <button className="specifics-button" onClick={() => given.onPageSwitch('specifics')}>Specifics</button>
          <button className="specifics-button2" onClick={() => given.onPageSwitch('report')}>Report</button>
        </div> 
      </form>
      {areaDetails && areaDetails.length > 0 ? (
        <div className="table-container">
          <h3>Area Details for {areaName}:</h3>
          <table>
            <thead>
              <tr>
                <th>DR_NO</th>
                <th>AreaCode</th>
                <th>AreaName</th>
                <th>Location</th>
                <th>CrossStreet</th>
                <th>Lat</th>
                <th>Lon</th>
              </tr>
            </thead>
            <tbody>
              {areaDetails.map((area, index) => (
                <tr key={index}>
                  <td>{area.DR_NO}</td>
                  <td>{area.AreaCode}</td>
                  <td>{area.AreaName}</td>
                  <td>{area.Location}</td>
                  <td>{area.CrossStreet}</td>
                  <td>{area.Lat}</td>
                  <td>{area.Lon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No data available</div>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={LALocation}
      >
        {markerLocations.map((locationVal, i) => (
          <Marker key={i} position={locationVal} />
        ))}
      </GoogleMap>
    </div>
  );
};

