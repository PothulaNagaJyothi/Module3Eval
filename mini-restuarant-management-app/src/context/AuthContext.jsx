import React,{ createContext,useState } from 'react';

export const AuthContext=createContext();
export const AuthProvider=({ children })=> {const[user,setuser]=useState(null);
    const login=(email,password)=> {if(email==='admin@gmail.com'&& password==='admin1234')
    {
        setuser({role:'Admin',email});
        return 'Admin';
    }
    else if (email==='customer@gmail.com' && password==='customer1234')
    {
        setuser({role:'Customer',email});
        return 'Customer';
    }
    else {
        alert('Invalid email or password');
        return null;
    }
    };

    const logout =()=>setuser(null);
    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};