import React, { useEffect, useState } from 'react';
import LandingPage from './LandingPage';

const GetSerial = () => {
  const [serialData, setSerialData] = useState(null);

  useEffect(() => {
    const fetchSerialData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getAction');
        const data = await response.json();
        setSerialData(data);
      } catch (error) {
        console.error('Error fetching serial data:', error);
      }
    };

    fetchSerialData();

    const interval = setInterval(fetchSerialData, 60);  

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {serialData ? (
        <LandingPage serialData={serialData} />  
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetSerial;
