import { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    address: '',
    preferred_date: null,
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const serviceTypes = [
    'AC Installation',
    'AC Repair',
    'AC Maintenance',
    'AC Gas Refill',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service_type: '',
          address: '',
          preferred_date: null,
          message: '',
        });
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to submit form. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Request AC Service
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Service request submitted successfully!
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Service Type"
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
          >
            {serviceTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Address"
            name="address"
            multiline
            rows={3}
            value={formData.address}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Preferred Service Date"
              value={formData.preferred_date}
              onChange={(newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  preferred_date: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ mt: 2 }} required />
              )}
              minDate={new Date()}
            />
          </LocalizationProvider>
          <TextField
            margin="normal"
            fullWidth
            label="Additional Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Request
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceRequestForm; 