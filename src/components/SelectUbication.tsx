import { useState, useEffect } from 'react';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { getUserLocation } from '../utils/GetLocation.ts';

export function SelectUbication() {
  const [countryid, setCountryid] = useState<number>(0);
  const [stateid, setStateid] = useState<number>(0);
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch user location on mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        setCoords(location);
        setUserCoords(location); // Save the user's location for later use
      } catch (err) {
        setError("Unable to fetch location");
        console.error(err);
      }
    };

    fetchLocation();
  }, []);

  // Handle case if the navigator cannot access location
  if (!navigator.geolocation) {
    alert("Your Browser cannot obtain your location");
    throw new Error("Your Browser cannot obtain your location");
  }

  // Construct the Google Maps URL based on selected or user location
  const mapUrl = selectedCoords
  ? `https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${selectedCoords[0]},${selectedCoords[1]}&t=&z=15&ie=UTF8&iwloc=B&output=embed`
  : coords
  ? `https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${coords[0]},${coords[1]}&t=&z=15&ie=UTF8&iwloc=B&output=embed`
  : `https://maps.google.com/maps?width=100%25&height=400&hl=en&q=10.01625,-84.21163&t=&z=15&ie=UTF8&iwloc=B&output=embed`; // Default location


  // Handle form submission or location updates
  const handleGetNewLocation = () => {
    // Update map URL with the selected coordinates
    if (selectedCoords) {
      setCoords(selectedCoords); // Update coords with the selected location
      console.log(`https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${selectedCoords[0]},${selectedCoords[1]}&t=&z=15&ie=UTF8&iwloc=B&output=embed`);
    }
  };

  const handleUseUserLocation = () => {
    setSelectedCoords(null); // Reset to user's location
    setCoords(userCoords); // Set coords to user's location
  };

  return (
    <div>
      <h2>User Location</h2>
      {error && <p>{error}</p>}
      {coords ? (
        <p>Longitude: {coords[1]}, Latitude: {coords[0]}</p>
      ) : (
        <p>Fetching location...</p>
      )}
      <form>
        <h6>Country</h6>
        <CountrySelect
          onChange={(e) => {
            setCountryid(e.id);
          }}
          placeHolder="Select Country"
        />
        <h6>State</h6>
        <StateSelect
          countryid={countryid}
          onChange={(e) => {
            setStateid(e.id);
          }}
          placeHolder="Select State"
        />
        <h6>City</h6>
        <CitySelect
          countryid={countryid}
          stateid={stateid}
          onChange={(e) => {
            // Extract latitude and longitude from the city object if available
            const latitude = e.latitude  ? parseFloat(e.latitude) : 0;
            const longitude = e.longitude ? parseFloat(e.longitude) : 0;
            setSelectedCoords([latitude, longitude]);
          }}
          placeHolder="Select City"
        />
        <br/>
        <button type="button" onClick={handleGetNewLocation}>Get New Location</button>
      </form>
      <br/>
      <button type="button" onClick={handleUseUserLocation}>Use User Location</button>

      <h2>See location in the map</h2>
      <div className='map-section'>
        <iframe
          width="100%"
          height="400"
          src={mapUrl}
          title="Location Map"
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>
    </div>
  );
}
