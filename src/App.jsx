import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home"
import AboutUs from "./components/About";
import ContactUs from './components/ContactUs';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallary';

import VideoGallery from './components/VideoGallery';
import Services from './components/Services';
import Admin from './components/admin';
import AdminUserManagement from './components/AdminUserManagement';
import { Calendar } from 'lucide-react';
import Donate from './components/Donate';
import Signup from './components/Signup';
import Event from './components/eventcalender';
import EventManagement from './components/EventManagement';
import DonationManagement from './components/DonationManagement';
import ServiceDetails from './components/ServiceDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login'




function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/footer" element={<Footer/>} />
      <Route path="/gallery" element={<Gallery/>} />
      <Route path="/contact" element={<ContactUs/>} />
      <Route path="/video" element={<VideoGallery/>} />
      <Route path="/service" element={<Services/>} />
      <Route path="/donate" element={<Donate/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/admin/users" element={<AdminUserManagement/>} />
      <Route path="/event" element={<Event/>} />
      <Route path="/eventadmin" element={<EventManagement/>} />
      <Route path="/donateadmin" element={<DonationManagement/>} />
      <Route path="/servicedetails/:id" element={<ServiceDetails />} />
      <Route path="/login" element={<Login/>} />


      <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin/>
            </ProtectedRoute>
          }
        />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUserManagement />
          </ProtectedRoute>
        }
      />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUserManagement />
            </ProtectedRoute>
          }
        />

      
    

      </Routes>
      <Footer/>
    </Router>
  );

}

export default App
