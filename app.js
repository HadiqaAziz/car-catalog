const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; 

// Route to list cars
app.get('/api/cars', async (req, res) => {
  try {
    const { make } = req.query;
    const apiUrl = `https://exam.razoyo.com/api/cars?make=${make || ''}`;
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching car data:', error.message);
    res.status(error.response.status || 500).json({ error: error.message });
  }
});

// Route to get a single car by ID
app.get('/api/cars/:id', async (req, res) => {
  try {
    const carId = req.params.id;
    const apiUrl = `https://exam.razoyo.com/api/cars/${carId}`;
    const token = req.headers.authorization.split('Bearer ')[1];
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching car details:', error.message);
    res.status(error.response.status || 500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});