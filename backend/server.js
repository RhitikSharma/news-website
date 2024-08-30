const express = require('express');
const axios = require('axios');
const app = express();

let cachedHeadlines = null;
let lastFetchTime = null;

app.get('/api/headlines', async (req, res) => {
  const currentTime = Date.now();

  if (cachedHeadlines && lastFetchTime && (currentTime - lastFetchTime) < 3600000) {
    return res.json(cachedHeadlines);
  }

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY`
    );
    cachedHeadlines = response.data;
    lastFetchTime = currentTime;
    res.json(cachedHeadlines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news headlines' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});