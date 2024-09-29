// src/components/Stocks.js
import React, { useEffect, useState } from 'react';

const Stocks = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch stock data from an API
  const fetchStockData = async () => {
    try {
      const response = await fetch('YOUR_API_URL_HERE'); // Replace with your API URL
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stocks Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.price}</td>
              <td>{stock.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
