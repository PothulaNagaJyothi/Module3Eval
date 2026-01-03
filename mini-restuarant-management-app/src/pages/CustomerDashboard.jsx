import React, { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';

const CustomerDashboard = () => {
  const { restaurants } = useContext(RestaurantContext);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Customer Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {restaurants.map(res => (
          <div key={res.restaurantID} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={res.image} alt={res.restaurantName} style={{ width: '100%' }} />
            <h4>{res.restaurantName}</h4>
            <p>{res.type}</p>
            <p>Parking: {res.parkingLot === "true" ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;