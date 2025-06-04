import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { format } from 'date-fns';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingRequests: 0,
  });
  const [serviceRequests, setServiceRequests] = useState([]);
  const [buyerInquiries, setBuyerInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('serviceRequests');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is admin
    if (!user || !user.is_admin) {
      navigate('/');
      return;
    }

    // Fetch admin dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    // Fetch service requests
    const fetchServiceRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/service-requests', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setServiceRequests(data);
        } else {
          setError('Failed to fetch service requests');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to connect to server');
      }
    };

    // Fetch buyer inquiries
    const fetchBuyerInquiries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/buyer-inquiries', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setBuyerInquiries(data);
        } else {
          setError('Failed to fetch buyer inquiries');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to connect to server');
      }
    };

    fetchDashboardData();
    fetchServiceRequests();
    fetchBuyerInquiries();
  }, [user, navigate]);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/service-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setServiceRequests(serviceRequests.map(request => 
          request.id === requestId ? { ...request, status: newStatus } : request
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const updateServiceRequestStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/service-requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchServiceRequests();
      } else {
        setError('Failed to update status');
      }
    } catch (error) {
      console.error('Update error:', error);
      setError('Failed to connect to server');
    }
  };

  const updateBuyerInquiryStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/buyer-inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchBuyerInquiries();
      } else {
        setError('Failed to update status');
      }
    } catch (error) {
      console.error('Update error:', error);
      setError('Failed to connect to server');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4">Admin Panel</Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Paper>
          </Grid>

          {/* Stats Cards */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Users
                </Typography>
                <Typography variant="h5">{stats.totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Bookings
                </Typography>
                <Typography variant="h5">{stats.totalBookings}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pending Requests
                </Typography>
                <Typography variant="h5">{stats.pendingRequests}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Service Requests Table */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Service Requests
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Service Type</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Preferred Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {serviceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          {format(new Date(request.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell>{request.service_type}</TableCell>
                        <TableCell>
                          {request.email}<br />
                          {request.phone}
                        </TableCell>
                        <TableCell>
                          {format(new Date(request.preferred_date), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth size="small">
                            <Select
                              value={request.status}
                              onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="approved">Approved</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              // Add view details functionality
                              console.log('View details:', request);
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Buyer Inquiries Table */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Buyer Inquiries
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>AC Title</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {buyerInquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell>
                          {format(new Date(inquiry.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>{inquiry.ac_title}</TableCell>
                        <TableCell>
                          <FormControl fullWidth size="small">
                            <Select
                              value={inquiry.status}
                              onChange={(e) => updateBuyerInquiryStatus(inquiry.id, e.target.value)}
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="contacted">Contacted</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              // Add view details functionality
                              console.log('View details:', inquiry);
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminPanel; 