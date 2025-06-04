import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/home/Home.jsx'
import About from './components/about/About.jsx'
import Pricing from './components/pricing/Pricing.jsx'
import OldAC from './components/old_ac/old_ac.jsx'
import Profile from './pages/Profile.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import ServiceRequestForm from './components/ServiceRequestForm.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Admin route protection component
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/');
    }
  }, [user, navigate]);

  return user && user.is_admin ? children : null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'old_ac',
        element: <OldAC />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'request-service',
        element: <ServiceRequestForm />,
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/*',
        element: (
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        ),
      },
      {
        path: '*',
        element: <div>Page Not Found</div>,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
