import React, { createContext,useState,useEffect} from 'react';
export const RestaurantContext=createContext();

export const RestaurantProvider = ({children})=> {
    const [restaurants,setRestaurants]=useState([]);

    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem('evalData'))|| [];
        setRestaurants(data);
    },[]);
    const syncData=(newData)=>{
        setRestaurants(newData);
        localStorage.setItem('evalData',JSON.stringify(newData));
    };
    const addRestaurant=(res)=> {
        const newData=[...restaurants,{...res,restaurantID:Date.now() }];
        syncData(newData);
        alert("Successful addition");
    };

    const updateRestaurant=(updatedRes)=> {
        const newData=restaurants.map(r=>
            r.restaurantID===updatedRes.restaurantID ? updatedRes : r 
        );
        syncData(newData);
        alert("Succesful update");
    };

    const deleteRestaurant =(id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            const newData=restaurants.filter(r => r.restaurantID !== id);
            syncData(newData);
            alert("Successful deletion");
        };
    };

    return (
        <RestaurantContext.Provider value={{ restaurants, addRestaurant,updateRestaurant,deleteRestaurant }}>
            {children};
        </RestaurantContext.Provider>
    );
};