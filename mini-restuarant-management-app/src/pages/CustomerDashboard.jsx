import React, { useContext, useState, useRef, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';

const CustomerDashboard = () => {
  const { restaurants } = useContext(RestaurantContext);
  
  const searchInputRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterParking, setFilterParking] = useState("All");

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredRestaurants = restaurants.filter((res) => {
    const matchesSearch = 
      res.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "All" || res.type === filterType;
    
    const matchesParking = 
      filterParking === "All" || res.parkingLot.toString() === filterParking;

    return matchesSearch && matchesType && matchesParking;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Dashboard</h2>

      <nav style={{ 
        display: 'flex', 
        gap: '15px', 
        padding: '15px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '8px',
        marginBottom: '20px',
        alignItems: 'center' 
      }}>

        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', width: '250px' }}
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '8px' }}>
          <option value="All">All Cuisine Types</option>
          {["Rajasthani", "Gujarati", "Mughlai", "Jain", "Thai", "North Indian", "South Indian"].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select value={filterParking} onChange={(e) => setFilterParking(e.target.value)} style={{ padding: '8px' }}>
          <option value="All">Any Parking</option>
          <option value="true">With Parking</option>
          <option value="false">No Parking</option>
        </select>
      </nav>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((res) => (
            <div key={res.restaurantID} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '12px', 
              padding: '15px', 
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
            }}>
              <img 
                src={res.image} 
                alt={res.restaurantName} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              <h3 style={{ margin: '15px 0 5px 0' }}>{res.restaurantName}</h3>
              <p style={{ color: '#555', fontSize: '14px' }}>{res.address}</p>
              <hr />
              <p><strong>Cuisine:</strong> {res.type}</p>
              <p><strong>Parking:</strong> {res.parkingLot === "true" || res.parkingLot === true ? "Available ✅" : "Not Available ❌"}</p>
            </div>
          ))
        ) : (
          <p>No restaurants found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;