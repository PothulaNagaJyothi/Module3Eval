import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext,AuthProvider} from './context/AuthContext';
import {RestaurantProvider} from './context/RestaurantContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App () {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/admin/dashboard' element={
            <ProtectedRoute allowedRole='Admin'>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path='/customers/dashboard' element={
            <ProtectedRoute allowedRole='Customer'>
              <CustomerDashboard />
            </ProtectedRoute>
          }
          />
        </Routes>
        </BrowserRouter>
      </RestaurantProvider>
    </AuthProvider>
  );
}