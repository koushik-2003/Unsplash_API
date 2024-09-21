const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Unsplash API credentials
const UNSPLASH_ACCESS_KEY = 'h0-jBsRh72VvJgIX_H7mi65FgZu1bDAD9Hj1liVQESg'; // Replace with your Unsplash API key

// Route to search for images
app.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query, per_page: 9 },
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
    });

    const images = response.data.results.map(img => ({
      url: img.urls.small,
      description: img.alt_description
    }));

    res.json(images);
  } catch (error) {
    res.status(500).send('Error fetching images from Unsplash');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
