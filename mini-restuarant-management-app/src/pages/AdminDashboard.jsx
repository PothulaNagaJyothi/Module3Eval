import React, { useState, useContext, useRef, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { restaurants, addRestaurant, deleteRestaurant } = useContext(RestaurantContext);
  const navigate = useNavigate();
  
  const searchInputRef = useRef(null);
  
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [form, setForm] = useState({
    restaurantName: "", 
    address: "", 
    type: "Rajasthani", 
    parkingLot: "true",
    image: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg" 
  });


  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    if (!form.restaurantName.trim() || !form.address.trim()) {
      alert("Empty form should not be submitted");
      return;
    }

    const newRestaurant = {
      ...form,
      restaurantID: Date.now() 
    };

    addRestaurant(newRestaurant);

    setForm({
      ...form,
      restaurantName: "",
      address: ""
    });
  };

  const filteredData = restaurants.filter(res => {
    const matchesSearch = 
      res.restaurantName.toLowerCase().includes(search.toLowerCase()) || 
      res.address.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = filterType === "All" || res.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      <div style={{ width: '300px', padding: '20px', borderRight: '2px solid #ddd', backgroundColor: '#f9f9f9' }}>
        <h3>Add Restaurant</h3>
        <form onSubmit={handleAddSubmit}>
          <label>Restaurant Name:</label>
          <input 
            type="text" 
            value={form.restaurantName} 
            onChange={e => setForm({...form, restaurantName: e.target.value})} 
          /><br/><br/>

          <label>Address:</label>
          <input 
            type="text" 
            value={form.address} 
            onChange={e => setForm({...form, address: e.target.value})} 
          /><br/><br/>

          <label>Type:</label>
          <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            <option value="Rajasthani">Rajasthani</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Mughlai">Mughlai</option>
            <option value="Jain">Jain</option>
            <option value="Thai">Thai</option>
            <option value="North Indian">North Indian</option>
            <option value="South Indian">South Indian</option>
          </select><br/><br/>

          <label>Parking Lot:</label>
          <select value={form.parkingLot} onChange={e => setForm({...form, parkingLot: e.target.value})}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select><br/><br/>

          <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
            Add Restaurant
          </button>
        </form>
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        
        <div style={{ marginBottom: '30px', padding: '15px', background: '#eee', borderRadius: '8px' }}>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search by name or address..." 
            style={{ padding: '8px', width: '250px', marginRight: '10px' }}
            onChange={e => setSearch(e.target.value)} 
          />

          <select onChange={e => setFilterType(e.target.value)} style={{ padding: '8px' }}>
            <option value="All">Filter by Type (All)</option>
            <option value="Rajasthani">Rajasthani</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Mughlai">Mughlai</option>
            <option value="Jain">Jain</option>
            <option value="Thai">Thai</option>
            <option value="North Indian">North Indian</option>
            <option value="South Indian">South Indian</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {filteredData.map(res => (
            <div key={res.restaurantID} style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', paddingBottom: '10px' }}>
              <img src={res.image} alt={res.restaurantName} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <div style={{ padding: '10px' }}>
                <h4 style={{ margin: '5px 0' }}>{res.restaurantName}</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>{res.address}</p>
                <p><strong>Type:</strong> {res.type}</p>
                <p><strong>Parking:</strong> {res.parkingLot === "true" ? "Available" : "Not Available"}</p>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button 
                    onClick={() => {
                      if(window.confirm("Are you sure you want to update?")) {
                        navigate('/admin/restaurants/update', { state: res });
                      }
                    }}
                    style={{ flex: 1, padding: '5px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer' }}
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => deleteRestaurant(res.restaurantID)}
                    style={{ flex: 1, padding: '5px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;